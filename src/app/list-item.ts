export interface ListItem {
  id: string;
  // parentId: number | null;
  content: string;
  isCompleted: boolean;
}

export enum FilterType {
  ALL = 'all',
  DONE = 'done',
  ACTIVE = 'active',
}
