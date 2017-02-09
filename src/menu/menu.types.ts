export enum NodeMenuItemAction {
  NewFolder,
  NewTag,
  Rename,
  Remove,
  ShowObjects
}

export enum NodeMenuAction {
  Close
}

export interface NodeMenuEvent {
  sender: HTMLElement;
  action: NodeMenuAction;
}

export interface NodeMenuItemSelectedEvent {
  nodeMenuItemAction: NodeMenuItemAction;
}
