"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.domainName = "http://rus36.com:8088";
        //this.domainName = "http://192.168.1.170";
        this.domainName = "http://localhost";
    }
    HttpService.prototype.getData = function () {
        return this.http.get(this.domainName + '/api/Tree/GetTree/FurnitureTestTree');
    };
    HttpService.prototype.getProperty = function () {
        return this.http.get(this.domainName + '/api/Tree/GetTree/FurnitureTestTree');
    };
    HttpService.prototype.getObjects = function (className) {
        return this.http.get(this.domainName + '/api/DataBaseObject/' + className);
    };
    HttpService.prototype.renameProperty = function (newPropertyName, oldPropertyName, propertyOwner) {
        var treeName = "FurnitureTestTree";
        var data = { TreeName: treeName,
            NewPropertyName: newPropertyName,
            OldPropertyName: oldPropertyName,
            NodeName: propertyOwner };
        jQuery.ajax({
            type: "POST",
            url: this.domainName + '/api/Tree/RenameProperty',
            data: data,
            success: function () {
            } });
    };
    HttpService.prototype.addProperty = function (newPropertyName, propertyOwner) {
        var treeName = "FurnitureTestTree";
        var propertyName = "STRING";
        var data = { TreeName: treeName,
            PropertyType: propertyName,
            NodeName: propertyOwner,
            PropertyName: newPropertyName };
        jQuery.ajax({
            type: "POST",
            url: this.domainName + '/api/Tree/AddProperty',
            data: data,
            success: function () {
            } });
    };
    HttpService.prototype.deleteProperty = function (propertyOwner, propertyName) {
        var treeName = "FurnitureTestTree";
        var data = { TreeName: treeName,
            NodeName: propertyOwner,
            PropertyName: propertyName };
        jQuery.ajax({
            type: "POST",
            url: this.domainName + '/api/Tree/RemoveProperty',
            data: data,
            success: function () {
            } });
    };
    HttpService.prototype.addClass = function (newClassName, parentClassName) {
        var TreeName = "FurnitureTestTree";
        var data = { TreeName: TreeName, ParentName: parentClassName, NodeName: newClassName };
        jQuery.ajax({
            type: "POST",
            url: this.domainName + '/api/Tree/AddNode',
            data: data,
            success: function () {
            } });
    };
    HttpService.prototype.deleteClass = function (className) {
        var data = { Class: className, ClassName: 'FurnitureTestTree' };
        jQuery.ajax({
            type: "POST",
            url: this.domainName + '/api/Tree/RemoveTreeRecord',
            data: data,
            success: function () {
            } });
    };
    HttpService = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map