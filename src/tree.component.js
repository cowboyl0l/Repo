"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var tree_types_1 = require('./tree.types');
var node_draggable_service_1 = require('./draggable/node-draggable.service');
var node_menu_service_1 = require('./menu/node-menu.service');
var draggable_types_1 = require('./draggable/draggable.types');
var menu_types_1 = require('./menu/menu.types');
var editable_type_1 = require('./editable/editable.type');
var tree_service_1 = require('./tree.service');
var event_utils_1 = require('./common/utils/event.utils');
var _ = require('lodash');
var type_utils_1 = require('./common/utils/type.utils');
var tree_styles_1 = require('./tree.styles');
var core_2 = require('@angular/core');
var http_service_1 = require('../demo/http.service');
var TreeInternalComponent = (function () {
    function TreeInternalComponent(nodeMenuService, nodeDraggableService, treeService, element, httpService) {
        this.nodeMenuService = nodeMenuService;
        this.nodeDraggableService = nodeDraggableService;
        this.treeService = treeService;
        this.element = element;
        this.httpService = httpService;
        this.nodeRemoved = new core_1.EventEmitter();
        this.isSelected = false;
        this.isMenuVisible = false;
    }
    TreeInternalComponent.prototype.ngOnInit = function () {
        if (this.tree) {
            var h = this.tree;
            if (h.properties && h.propertieTree == null) {
                var properties = this.tree.properties;
                var newNode = { value: 'Свойства', children: properties, _foldingType: tree_types_1.FoldingType.PropertyExpanded, parentNode: h };
                h.propertieTree = newNode;
                this.tree.children.push(newNode);
            }
        }
        this.indexInParent = 0;
        this.isLeaf = !Array.isArray(this.tree.children);
        this.tree._indexInParent = this.indexInParent;
        this.setUpNodeSelectedEventHandler();
        this.setUpMenuEventHandler();
        this.setUpDraggableEventHandler();
    };
    TreeInternalComponent.prototype.setUpNodeSelectedEventHandler = function () {
        var _this = this;
        this.treeService.nodeSelected$
            .filter(function (e) { return _this.tree !== e.node; })
            .subscribe(function () { return _this.isSelected = false; });
    };
    TreeInternalComponent.prototype.setUpMenuEventHandler = function () {
        var _this = this;
        this.nodeMenuService.nodeMenuEvents$
            .filter(function (e) { return _this.element.nativeElement !== e.sender; })
            .filter(function (e) { return e.action === menu_types_1.NodeMenuAction.Close; })
            .subscribe(function () { return _this.isMenuVisible = false; });
    };
    // DRAG-N-DROP -------------------------------------------------------------------------------------------------------
    TreeInternalComponent.prototype.setUpDraggableEventHandler = function () {
        var _this = this;
        this.nodeDraggableService.draggableNodeEvents$
            .filter(function (e) { return e.action === draggable_types_1.NodeDraggableEventAction.Remove; })
            .filter(function (e) { return e.captured.element === _this.element; })
            .subscribe(function (e) { return _this.onChildRemoved({ node: e.captured.tree }, _this.parentTree); });
        this.nodeDraggableService.draggableNodeEvents$
            .filter(function (e) { return e.action !== draggable_types_1.NodeDraggableEventAction.Remove; })
            .filter(function (e) { return e.target === _this.element; })
            .filter(function (e) { return !_this.hasChild(e.captured.tree); })
            .subscribe(function (e) {
            if (_this.isSiblingOf(e.captured.tree)) {
                return _this.swapWithSibling(e.captured.tree);
            }
            if (_this.isFolder()) {
                return _this.moveNodeToThisTreeAndRemoveFromPreviousOne(e);
            }
            else {
                return _this.moveNodeToParentTreeAndRemoveFromPreviousOne(e);
            }
        });
    };
    TreeInternalComponent.prototype.moveNodeToThisTreeAndRemoveFromPreviousOne = function (e) {
        this.tree.children.push(e.captured.tree);
        this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, { action: draggable_types_1.NodeDraggableEventAction.Remove }));
        this.treeService.nodeMoved$.next({
            node: e.captured.tree,
            parent: this.tree
        });
    };
    TreeInternalComponent.prototype.moveNodeToParentTreeAndRemoveFromPreviousOne = function (e) {
        this.parentTree.children.splice(this.indexInParent, 0, e.captured.tree);
        this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, { action: draggable_types_1.NodeDraggableEventAction.Remove }));
        this.treeService.nodeMoved$.next({
            node: e.captured.tree,
            parent: this.parentTree
        });
    };
    TreeInternalComponent.prototype.isEditInProgress = function () {
        return this.tree._status === tree_types_1.TreeStatus.EditInProgress
            || this.tree._status === tree_types_1.TreeStatus.New;
    };
    TreeInternalComponent.prototype.isPropertyFolder = function () {
        return (this.tree.value == "Свойства" && this.tree.children != null && this.tree.children.length > 0);
    };
    TreeInternalComponent.prototype.isFolder = function () {
        return !this.isLeaf;
    };
    TreeInternalComponent.prototype.hasChild = function (child) {
        return _.includes(this.tree.children, child);
    };
    TreeInternalComponent.prototype.isSiblingOf = function (child) {
        return this.parentTree && _.includes(this.parentTree.children, child);
    };
    TreeInternalComponent.prototype.swapWithSibling = function (sibling) {
        var siblingIndex = this.parentTree.children.indexOf(sibling);
        var thisTreeIndex = this.parentTree.children.indexOf(this.tree);
        this.parentTree.children[siblingIndex] = this.tree;
        this.parentTree.children[thisTreeIndex] = sibling;
        this.tree._indexInParent = siblingIndex;
        sibling._indexInParent = thisTreeIndex;
        this.treeService.nodeMoved$.next({
            node: this.tree,
            parent: this.parentTree
        });
    };
    // FOLDING -----------------------------------------------------------------------------------------------------------
    TreeInternalComponent.prototype.isNodeExpanded = function () {
        // custom
        if (this.tree._foldingType === tree_types_1.FoldingType.PropertyExpanded) {
            return true;
        }
        //
        return this.tree._foldingType === tree_types_1.FoldingType.Expanded;
    };
    TreeInternalComponent.prototype.switchFoldingType = function (e, tree) {
        this.handleFoldingType(e.target.parentNode.parentNode, tree);
    };
    TreeInternalComponent.prototype.getFoldingTypeCssClass = function (node) {
        if (!node._foldingType) {
            if (node.children) {
                node._foldingType = tree_types_1.FoldingType.Expanded;
            }
            else {
                node._foldingType = tree_types_1.FoldingType.Leaf;
            }
        }
        return node._foldingType.cssClass;
    };
    TreeInternalComponent.prototype.getNextFoldingType = function (node) {
        // custom
        if (node._foldingType === tree_types_1.FoldingType.PropertyExpanded) {
            return tree_types_1.FoldingType.PropertyCollapsed;
        }
        else if (node._foldingType === tree_types_1.FoldingType.PropertyCollapsed) {
            return tree_types_1.FoldingType.PropertyExpanded;
        }
        //
        if (node._foldingType === tree_types_1.FoldingType.Expanded) {
            return tree_types_1.FoldingType.Collapsed;
        }
        return tree_types_1.FoldingType.Expanded;
    };
    TreeInternalComponent.prototype.handleFoldingType = function (parent, node) {
        if (node._foldingType === tree_types_1.FoldingType.Leaf) {
            return;
        }
        node._foldingType = this.getNextFoldingType(node);
    };
    // MENU --------------------------------------------------------------------------------------------------------------
    TreeInternalComponent.prototype.onMenuItemSelected = function (e) {
        switch (e.nodeMenuItemAction) {
            case menu_types_1.NodeMenuItemAction.NewTag:
                this.onNewSelected(e);
                break;
            case menu_types_1.NodeMenuItemAction.NewFolder:
                this.onNewSelected(e);
                break;
            case menu_types_1.NodeMenuItemAction.Rename:
                this.onRenameSelected();
                break;
            case menu_types_1.NodeMenuItemAction.Remove:
                this.onRemoveSelected();
                break;
            case menu_types_1.NodeMenuItemAction.ShowObjects:
                this.onShowObjects();
                break;
            default:
                throw new Error("Chosen menu item doesn't exist");
        }
    };
    TreeInternalComponent.prototype.onShowObjects = function () {
        this.treeService.showObjects$.next({
            node: this.tree
        });
        $("#myModal").modal();
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree._status = tree_types_1.TreeStatus.EditInProgress;
        this.isMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        this.treeService.nodeRemoved$.next({
            node: this.tree,
            parent: this.parentTree
        });
        this.nodeRemoved.emit({ node: this.tree });
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        if (!this.tree.children || !this.tree.children.push) {
            this.tree.children = [];
        }
        var newNode = { value: '', _status: tree_types_1.TreeStatus.New };
        if (e.nodeMenuItemAction === menu_types_1.NodeMenuItemAction.NewFolder) {
            newNode.children = [];
        }
        this.isLeaf ? this.parentTree.children.push(newNode) : this.tree.children.push(newNode);
        this.isMenuVisible = false;
    };
    TreeInternalComponent.prototype.onChildRemoved = function (e, parent) {
        if (parent === void 0) { parent = this.tree; }
        var childIndex = _.findIndex(parent.children, function (child) { return child === e.node; });
        if (childIndex >= 0) {
            parent.children.splice(childIndex, 1);
        }
    };
    TreeInternalComponent.prototype.showMenu = function (e) {
        if (event_utils_1.isRightButtonClicked(e)) {
            this.isMenuVisible = !this.isMenuVisible;
            this.nodeMenuService.nodeMenuEvents$.next({
                sender: this.element.nativeElement,
                action: menu_types_1.NodeMenuAction.Close
            });
        }
        e.preventDefault();
    };
    TreeInternalComponent.prototype.applyNewValue = function (e, node) {
        if (e.action === editable_type_1.NodeEditableEventAction.Cancel) {
            if (type_utils_1.isValueEmpty(e.value)) {
                return this.nodeRemoved.emit({ node: this.tree });
            }
            node._status = tree_types_1.TreeStatus.Modified;
            return;
        }
        if (type_utils_1.isValueEmpty(e.value)) {
            return;
        }
        var nodeOldValue = node.value;
        if (type_utils_1.isRenamable(node.value)) {
            node.value = type_utils_1.applyNewValueToRenamable(node.value, e.value);
        }
        else {
            node.value = e.value;
        }
        if (node._status === tree_types_1.TreeStatus.New) {
            this.treeService.nodeCreated$.next({ node: node, parent: this.parentTree });
        }
        if (node._status === tree_types_1.TreeStatus.EditInProgress) {
            this.treeService.nodeRenamed$.next({
                node: node,
                parent: this.parentTree,
                oldValue: nodeOldValue,
                newValue: node.value
            });
        }
        node._status = tree_types_1.TreeStatus.Modified;
    };
    TreeInternalComponent.prototype.onNodeSelected = function (e) {
        if (event_utils_1.isLeftButtonClicked(e)) {
            this.isSelected = true;
            this.treeService.nodeSelected$.next({ node: this.tree });
        }
    };
    __decorate([
        core_1.Input()
    ], TreeInternalComponent.prototype, "tree");
    __decorate([
        core_1.Input()
    ], TreeInternalComponent.prototype, "parentTree");
    __decorate([
        core_1.Input()
    ], TreeInternalComponent.prototype, "indexInParent");
    __decorate([
        core_1.Output()
    ], TreeInternalComponent.prototype, "nodeRemoved");
    TreeInternalComponent = __decorate([
        core_1.Component({
            selector: 'tree-internal',
            styles: tree_styles_1.styles,
            template: "\n  <ul class=\"tree\" *ngIf=\"tree\">\n    <li>\n      <div (contextmenu)=\"showMenu($event)\" [nodeDraggable]=\"element\" [tree]=\"tree\">\n        <div class=\"folding\" (click)=\"switchFoldingType($event, tree)\" [ngClass]=\"getFoldingTypeCssClass(tree)\"></div>\n        <div href=\"#\" class=\"node-value\" *ngIf=\"!isEditInProgress()\" [class.node-selected]=\"isSelected\" (click)=\"onNodeSelected($event)\">{{tree.value}}</div>\n\n        <input type=\"text\" class=\"node-value\" *ngIf=\"isEditInProgress()\"\n               [nodeEditable]=\"tree.value\"\n               (valueChanged)=\"applyNewValue($event, tree)\"/>\n      </div>\n\n      <node-menu *ngIf=\"isMenuVisible\" (menuItemSelected)=\"onMenuItemSelected($event)\"></node-menu>\n\n      <template [ngIf]=\"isNodeExpanded()\">\n        <tree-internal *ngFor=\"let child of tree.children; let position = index\"\n              [parentTree]=\"tree\"\n              [indexInParent]=\"position\"\n              [tree]=\"child\"\n              (nodeRemoved)=\"onChildRemoved($event)\"></tree-internal>\n      </template>\n    </li>\n  </ul>\n  "
        }),
        core_2.Injectable(),
        __param(0, core_1.Inject(node_menu_service_1.NodeMenuService)),
        __param(1, core_1.Inject(node_draggable_service_1.NodeDraggableService)),
        __param(2, core_1.Inject(tree_service_1.TreeService)),
        __param(3, core_1.Inject(core_1.ElementRef)),
        __param(4, core_1.Inject(http_service_1.HttpService))
    ], TreeInternalComponent);
    return TreeInternalComponent;
}());
exports.TreeInternalComponent = TreeInternalComponent;
var TreeComponent = (function () {
    function TreeComponent(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new core_1.EventEmitter();
        this.nodeRemoved = new core_1.EventEmitter();
        this.nodeRenamed = new core_1.EventEmitter();
        this.nodeSelected = new core_1.EventEmitter();
        this.nodeMoved = new core_1.EventEmitter();
        this.showObjects = new core_1.EventEmitter();
    }
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.treeService.nodeRemoved$.subscribe(function (e) {
            _this.nodeRemoved.emit(e);
        });
        this.treeService.nodeRenamed$.subscribe(function (e) {
            _this.nodeRenamed.emit(e);
        });
        this.treeService.nodeCreated$.subscribe(function (e) {
            _this.nodeCreated.emit(e);
        });
        this.treeService.nodeSelected$.subscribe(function (e) {
            _this.nodeSelected.emit(e);
        });
        this.treeService.nodeMoved$.subscribe(function (e) {
            _this.nodeMoved.emit(e);
        });
        this.treeService.showObjects$.subscribe(function (e) {
            _this.showObjects.emit(e);
        });
    };
    __decorate([
        core_1.Input()
    ], TreeComponent.prototype, "tree");
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "nodeCreated");
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "nodeRemoved");
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "nodeRenamed");
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "nodeSelected");
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "nodeMoved");
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "showObjects");
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'tree',
            template: "<tree-internal [tree]=\"tree\"></tree-internal>",
            providers: [tree_service_1.TreeService]
        }),
        __param(0, core_1.Inject(tree_service_1.TreeService))
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map