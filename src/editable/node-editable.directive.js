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
var editable_type_1 = require('./editable.type');
var NodeEditableDirective = (function () {
    function NodeEditableDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        /* tslint:enable:no-input-rename */
        this.valueChanged = new core_1.EventEmitter(false);
    }
    NodeEditableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.elementRef.nativeElement;
        this.renderer.invokeElementMethod(nativeElement, 'focus', []);
        this.renderer.setElementProperty(nativeElement, 'value', this.nodeValue);
    };
    NodeEditableDirective.prototype.applyNewValue = function (newNodeValue) {
        this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
    };
    NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function (newNodeValue) {
        this.valueChanged.emit({ type: 'blur', value: newNodeValue });
    };
    NodeEditableDirective.prototype.cancelEditing = function () {
        this.valueChanged.emit({
            type: 'keyup',
            value: this.nodeValue,
            action: editable_type_1.NodeEditableEventAction.Cancel
        });
    };
    __decorate([
        core_1.Input('nodeEditable')
    ], NodeEditableDirective.prototype, "nodeValue");
    __decorate([
        core_1.Output()
    ], NodeEditableDirective.prototype, "valueChanged");
    __decorate([
        core_1.HostListener('keyup.enter', ['$event.target.value'])
    ], NodeEditableDirective.prototype, "applyNewValue");
    __decorate([
        core_1.HostListener('blur', ['$event.target.value'])
    ], NodeEditableDirective.prototype, "applyNewValueByLoosingFocus");
    __decorate([
        core_1.HostListener('keyup.esc')
    ], NodeEditableDirective.prototype, "cancelEditing");
    NodeEditableDirective = __decorate([
        core_1.Directive({
            selector: '[nodeEditable]'
        }),
        __param(0, core_1.Inject(core_1.Renderer)),
        __param(1, core_1.Inject(core_1.ElementRef))
    ], NodeEditableDirective);
    return NodeEditableDirective;
}());
exports.NodeEditableDirective = NodeEditableDirective;
//# sourceMappingURL=node-editable.directive.js.map