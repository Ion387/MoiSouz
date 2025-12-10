import { OrganizationNode } from '@/models/Tree';
import {
  TypeUseFetchList,
  useFetchList,
} from '@/services/universal/fetch-list';

interface PropsTreeList {
  type?: TypeUseFetchList;
  prename?: string;
  perPage?: number;
}

export const useFetchTree = (
  { type, prename, perPage }: PropsTreeList = {
    perPage: 10,
  },
) => {
  return useFetchList<OrganizationNode>({
    type,
    name: `${prename ? `${prename}-` : ''}/api/private/orgstructure/tree`,
    api: '/api/private/orgstructure/tree',
    params: {
      itemsPerPage: perPage,
    },
  });
};

export const getParentNode = (
  nodes: OrganizationNode[],
  childId: number,
): OrganizationNode | null => {
  for (const node of nodes) {
    if (node.children) {
      const isDirectChild = node.children.some((child) => child.id === childId);
      if (isDirectChild) {
        return node;
      }
      const parentInChildren = getParentNode(node.children, childId);
      if (parentInChildren) {
        return parentInChildren;
      }
    }
  }

  return null;
};

export const isChildOf = (
  nodes: OrganizationNode[],
  parentId: number,
  childId: number,
): boolean => {
  if (parentId === childId) {
    return false;
  }

  const findParentNode = (
    searchNodes: OrganizationNode[],
  ): OrganizationNode | null => {
    for (const node of searchNodes) {
      if (node.id === parentId) {
        return node;
      }
      if (node.children) {
        const found = findParentNode(node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const parentNode = findParentNode(nodes);

  if (!parentNode) {
    return false;
  }

  const checkInSubtree = (node: OrganizationNode): boolean => {
    if (node.id === childId) {
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (checkInSubtree(child)) {
          return true;
        }
      }
    }

    return false;
  };

  return checkInSubtree(parentNode);
};
