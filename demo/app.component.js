"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_service_1 = require('./http.service');
var object_item_component_1 = require('./objects/object-item.component');
var AppComponent = (function () {
    function AppComponent(httpService, objectItemcomponent) {
        this.httpService = httpService;
        this.objectItemcomponent = objectItemcomponent;
        this.fonts = {
            value: 'notLoaded'
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.getData().subscribe(function (data) { return _this.fonts = data.json(); });
    };
    AppComponent.prototype.onNodeRemoved = function (e) {
        if (e.parent.value.toString() == "Свойства") {
            this.httpService.deleteProperty(e.parent.parentNode.value.toString(), e.node.value.toString());
        }
        else {
            this.httpService.deleteClass(e.node.value.toString());
        }
        this.logEvent(e, 'Удалено');
    };
    AppComponent.prototype.onNodeMoved = function (e) {
        this.logEvent(e, 'Перемещено');
    };
    AppComponent.prototype.onNodeRenamed = function (e) {
        if (e.parent.value.toString() == "Свойства") {
            this.httpService.renameProperty(e.newValue, e.oldValue, e.parent.parentNode.value.toString());
        }
        this.logEvent(e, 'Переименовано');
    };
    AppComponent.prototype.onNodeCreated = function (e) {
        if (e.parent.value.toString() == "Свойства") {
            this.httpService.addProperty(e.node.value.toString(), e.parent.parentNode.value.toString());
        }
        else {
            this.httpService.addClass(e.node.value.toString(), e.parent.value.toString());
        }
        this.logEvent(e, 'Создано');
    };
    AppComponent.prototype.onNodeSelected = function (e) {
        this.logEvent(e, 'Выбрано');
    };
    AppComponent.prototype.showObjects = function (e) {
        this.objectItemcomponent.getObjectData(e.node.value.toString());
        this.logEvent(e, "Объекты");
    };
    AppComponent.prototype.logEvent = function (e, message) {
        console.log(e);
        alertify.message(message + ": " + e.node.value);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [http_service_1.HttpService, object_item_component_1.ObjectItemComponent],
            template: "\n    <div class=\"tree-demo-app\">\n      <div class=\"tree-container\">\n        <p>Fonts tree</p>\n        <tree\n          [tree]=\"fonts\" \n          (nodeRemoved)=\"onNodeRemoved($event)\"\n          (nodeRenamed)=\"onNodeRenamed($event)\"\n          (nodeSelected)=\"onNodeSelected($event)\"\n          (nodeMoved)=\"onNodeMoved($event)\"\n          (nodeCreated)=\"onNodeCreated($event)\"\n          (showObjects)=\"showObjects($event)\"          >\n        </tree>\n      </div>\n      <div class=\"tree-container\">\n      </div>\n    </div>\n    ",
            styles: ["\n   .tree-demo-app {\n      margin: auto;\n      width: -moz-fit-content;\n      width: -webkit-fit-content;\n      width: fit-content;\n    }\n    .tree-demo-app .tree-container {\n      float: left;\n      vertical-align: top;\n      width: 500px;\n    }\n    .tree-demo-app .tree-container p {\n      color: #40a070;\n      font-size: 2em;\n    } \n  "]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map