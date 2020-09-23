import { useState } from 'react';
import { TreeItem } from '@gpn-prototypes/vega-ui';

const getNewTree = (
  nodes: TreeItem[],
  transferringIds: string[],
  receivingId: string,
): Array<TreeItem> => {
  const transferringElements: Array<TreeItem> = [];

  const deepClone = (nodeList: TreeItem[]): Array<TreeItem> => {
    const clone = (item: TreeItem): TreeItem => {
      type TreeItemKeysType = keyof TreeItem;
      const itemKeys = Object.keys(item) as Array<TreeItemKeysType>;

      let newTreeItem = {} as TreeItem;

      itemKeys.forEach((prop: TreeItemKeysType) => {
        const propVal = item[prop];

        if (prop === 'nodeList' && Array.isArray(propVal)) {
          newTreeItem.nodeList = deepClone(propVal);
        } else {
          newTreeItem = { ...newTreeItem, [prop]: propVal };
        }
      });

      return newTreeItem;
    };

    return nodeList.reduce((acc: Array<TreeItem>, node: TreeItem) => {
      if (transferringIds?.includes(node.id)) {
        transferringElements.push({ ...node, parentId: receivingId });

        return acc;
      }

      acc.push(clone(node));

      return acc;
    }, []);
  };

  const getReceiverElem = (id: string, nodeList: Array<TreeItem>): TreeItem | undefined => {
    let result;

    const searchObj = (list: TreeItem[]): void => {
      list.forEach((node: TreeItem) => {
        if (node.id === id) {
          result = node;
        }

        if (node.nodeList) {
          searchObj(node.nodeList);
        }
      });
    };

    searchObj(nodeList);

    return result;
  };

  const newTree = deepClone(nodes);

  const receiverElem = getReceiverElem(receivingId, newTree);

  transferringElements.forEach((elem: TreeItem) => receiverElem?.nodeList?.push(elem));

  return newTree;
};

type TreeApi = {
  sourceTree: TreeItem[];
  handlers: {
    handlePaste: (transferring: string[], receiving: string) => void;
  };
};

export const useTreeApi = (tree: TreeItem[]): TreeApi => {
  const [state, setState] = useState(tree);

  const handlePaste = (transferring: string[], receiving: string): void => {
    const newTree = getNewTree(state, transferring, receiving);

    setState(newTree);
  };

  const handlers = {
    handlePaste,
  };

  return { sourceTree: state, handlers };
};
