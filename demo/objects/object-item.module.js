"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var object_item_component_1 = require('./object-item.component');
var http_1 = require('@angular/http');
var obj_test_1 = require('./test/obj-test');
var ObjectItemModule = (function () {
    function ObjectItemModule() {
    }
    ObjectItemModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule],
            declarations: [object_item_component_1.ObjectItemComponent, obj_test_1.Objtest],
            exports: [object_item_component_1.ObjectItemComponent, obj_test_1.Objtest],
            providers: [],
            bootstrap: [obj_test_1.Objtest]
        })
    ], ObjectItemModule);
    return ObjectItemModule;
}());
exports.ObjectItemModule = ObjectItemModule;
//# sourceMappingURL=object-item.module.js.map