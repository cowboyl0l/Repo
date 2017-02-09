export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  public static PropertyCollapsed: FoldingType = new FoldingType('node-PropertyCollapsed');
  public static PropertyExpanded: FoldingType = new FoldingType('node-PropertyExpanded');
  

  public constructor(private _cssClass: string) {
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;

  parentNode?: TreeModel;
  propertieTree?: TreeModel;
  properties?: Array<TreeModel>;
  type?: string;
  linkedType?: string;
  rid?: string;
}

export enum TreeStatus {
  New,
  Modified,
  EditInProgress
}

export interface RenamableNode {
  setName(name: string): void;
  toString(): string;
}

export interface NodeEvent {
  node: TreeModel;
  parent?: TreeModel;
}

export interface ShowObjectsEvent extends NodeEvent {
}

export interface NodeSelectedEvent extends NodeEvent {
}

export interface NodeDestructiveEvent extends NodeEvent {
  parent: TreeModel;
}

export interface NodeMovedEvent extends NodeDestructiveEvent {
}

export interface NodeRemovedEvent extends NodeDestructiveEvent {
}

export interface NodeCreatedEvent extends NodeDestructiveEvent {
}

export interface NodeRenamedEvent extends NodeDestructiveEvent {
  newValue: string | RenamableNode;
  oldValue: string | RenamableNode;
}
