import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { TreeModel, NodeEvent } from './tree.types';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeMenuService } from './menu/node-menu.service';
import { TreeService } from './tree.service';
export declare class TreeInternalComponent implements OnInit {
    private nodeMenuService;
    private nodeDraggableService;
    private treeService;
    private element;
    tree: TreeModel;
    parentTree: TreeModel;
    indexInParent: number;
    nodeRemoved: EventEmitter<NodeEvent>;
    private isLeaf;
    private isSelected;
    private isMenuVisible;
    constructor(nodeMenuService: NodeMenuService, nodeDraggableService: NodeDraggableService, treeService: TreeService, element: ElementRef);
    ngOnInit(): void;
    private setUpNodeSelectedEventHandler();
    private setUpMenuEventHandler();
    private setUpDraggableEventHandler();
    private moveNodeToThisTreeAndRemoveFromPreviousOne(e);
    private moveNodeToParentTreeAndRemoveFromPreviousOne(e);
    private isEditInProgress();
    private isFolder();
    private hasChild(child);
    private isSiblingOf(child);
    private swapWithSibling(sibling);
    private isNodeExpanded();
    private switchFoldingType(e, tree);
    private getFoldingTypeCssClass(node);
    private getNextFoldingType(node);
    private handleFoldingType(parent, node);
    private onMenuItemSelected(e);
    private onRenameSelected();
    private onRemoveSelected();
    private onNewSelected(e);
    private onChildRemoved(e, parent?);
    private showMenu(e);
    private applyNewValue(e, node);
    private onNodeSelected(e);
}
export declare class TreeComponent implements OnInit {
    private treeService;
    tree: TreeModel;
    nodeCreated: EventEmitter<any>;
    nodeRemoved: EventEmitter<any>;
    nodeRenamed: EventEmitter<any>;
    nodeSelected: EventEmitter<any>;
    nodeMoved: EventEmitter<any>;
    constructor(treeService: TreeService);
    ngOnInit(): void;
}
