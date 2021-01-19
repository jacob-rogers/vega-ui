/* eslint-disable max-classes-per-file */
import { SplitDirection } from './Split';

export interface BranchData {
  splitDirection: SplitDirection;
  breakpoint: number;
}
export interface Branch {
  type: 'branch';
  data: BranchData;
}

type BranchOptions = SplitDirection | { splitDirection: SplitDirection; breakpoint?: number };

export interface LeafData<T> {
  widget: string | undefined;
  context: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Leaf<T = any> {
  type: 'leaf';
  data: LeafData<T>;
}

export type AnyNode = Branch | Leaf;

export class Node {
  static createBranch(dataOrDirection: BranchOptions): Branch {
    let data: BranchData;
    const defaultBreakpoint = 50;

    if (typeof dataOrDirection === 'string') {
      data = {
        splitDirection: dataOrDirection,
        breakpoint: defaultBreakpoint,
      };
    } else {
      data = {
        splitDirection: dataOrDirection.splitDirection,
        breakpoint: dataOrDirection.breakpoint ?? defaultBreakpoint,
      };
    }

    return {
      type: 'branch',
      data,
    };
  }

  static createLeaf(data: Partial<LeafData<unknown>> = {}): Leaf {
    const { widget, context } = data;
    return {
      type: 'leaf',
      data: {
        widget,
        context,
      },
    };
  }

  static cloneLeaf(leaf: Leaf): Leaf {
    return Node.createLeaf(leaf.data);
  }

  static isLeaf(node: AnyNode): node is Leaf {
    return node.type === 'leaf';
  }

  static isBranch(node: AnyNode): node is Branch {
    return node.type === 'branch';
  }
}
