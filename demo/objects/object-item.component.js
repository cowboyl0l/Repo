"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var http_service_1 = require('../../demo/http.service');
var core_1 = require('@angular/core');
var ObjectItemComponent = (function () {
    function ObjectItemComponent(httpService) {
        this.httpService = httpService;
        this.objectItems = [new ObjectItem(), new ObjectItem(), new ObjectItem()];
    }
    ObjectItemComponent.prototype.getObjectData = function (className) {
        var _this = this;
        console.debug("start");
        this.httpService.getObjects(className).subscribe(function (data) { return _this.objectItems = (data).json(); });
        console.debug(this.objectItems);
        console.debug("end");
    };
    __decorate([
        core_1.Output()
    ], ObjectItemComponent.prototype, "objectItems");
    ObjectItemComponent = __decorate([
        core_1.Component({
            selector: 'objects',
            providers: [http_service_1.HttpService],
            template: "<ul>\n             <obj-test *ngFor=\"let obj of objectItems | async\" [objectItems]=\"obj\"></obj-test>\n          </ul>"
        })
    ], ObjectItemComponent);
    return ObjectItemComponent;
}());
exports.ObjectItemComponent = ObjectItemComponent;
var ObjectItem = (function () {
    function ObjectItem() {
        this.Name = "Name";
        this.rid = "Rid";
    }
    return ObjectItem;
}());
exports.ObjectItem = ObjectItem;
//# sourceMappingURL=object-item.component.js.map