import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { StateSaverService } from './entities/StateSaverService';
import { TreeItem } from './types';

type UseCheckedItems = {
  checkedItems: string[];
  intermediateItems: string[];
  handleCheckItem(id: string): void;
};

export const useCheckedItems = (
  nodeList: TreeItem[],
  treeElements: string[],
  projectId?: string,
): UseCheckedItems => {
  const stateSaverService = new StateSaverService();

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [intermediateItems, setIntermediateItems] = useState<string[]>([]);
  const checkedElemsRef = useRef<string[]>([]);
  const intermediateElemsRef = useRef<string[]>([]);
  stateSaverService.setProjectId(projectId);

  const handleCheckItem = useCallback(
    (id: string): void => {
      const getItemNode = (
        nodes: TreeItem[],
        // eslint-disable-next-line
        id: string,
        isParentChecked = false,
        checked = false,
        isLastChild = true,
      ) => {
        nodes.forEach((_item) => {
          // uncheck
          if ((isLastChild && id === _item.id && checkedElemsRef.current.includes(id)) || checked) {
            checkedElemsRef.current = checkedElemsRef.current.filter((elem) => elem !== _item.id);
            if (_item.nodeList.length) {
              getItemNode(_item.nodeList, id, false, true);
            }
            return;
          }

          // check if parent checked
          if (isParentChecked) {
            checkedElemsRef.current.push(_item.id);
            if (_item.nodeList.length) {
              getItemNode(_item.nodeList, id, true);
            }
          }
          // check by click
          if (id === _item.id) {
            checkedElemsRef.current.push(_item.id);
            if (_item.nodeList.length) {
              getItemNode(_item.nodeList, id, true);
            }
          }

          getItemNode(_item.nodeList, id);

          // uncheck if all children unchecked
          if (
            _item.nodeList.length &&
            !_item.nodeList.some((elem) => checkedElemsRef.current.includes(elem.id))
          ) {
            checkedElemsRef.current = checkedElemsRef.current.filter(
              (element) => element !== _item.id,
            );
            intermediateElemsRef.current = intermediateElemsRef.current.filter(
              (element) => element !== _item.id,
            );
          }

          // intermediate if some children checked
          if (
            (_item.nodeList.length &&
              _item.nodeList.some((elem) => checkedElemsRef.current.includes(elem.id)) &&
              !_item.nodeList.every((elem) => checkedElemsRef.current.includes(elem.id))) ||
            _item.nodeList.some((elem) => intermediateElemsRef.current.includes(elem.id))
          ) {
            checkedElemsRef.current = checkedElemsRef.current.filter(
              (element) => element !== _item.id,
            );
            intermediateElemsRef.current.push(_item.id);
          }

          // check if all children checked
          if (
            _item.nodeList.length &&
            _item.nodeList.every((elem) => checkedElemsRef.current.includes(elem.id))
          ) {
            intermediateElemsRef.current = intermediateElemsRef.current.filter(
              (element) => element !== _item.id,
            );
            checkedElemsRef.current.push(_item.id);
            getItemNode(_item.nodeList, _item.id, true, false, false);
          }
        });
      };
      getItemNode(nodeList, id);
      setCheckedItems(Array.from(new Set(checkedElemsRef.current)));
      setIntermediateItems(Array.from(new Set(intermediateElemsRef.current)));
    },
    [nodeList],
  );
  useLayoutEffect(() => {
    treeElements?.forEach((item) => {
      handleCheckItem(item);
    });
  }, [handleCheckItem, treeElements]);
  const uniqueCheckedElems = Array.from(new Set(checkedItems));
  const uniqueIntermediateElems = Array.from(new Set(intermediateItems));
  return {
    checkedItems: uniqueCheckedElems,
    intermediateItems: uniqueIntermediateElems,
    handleCheckItem,
  };
};
