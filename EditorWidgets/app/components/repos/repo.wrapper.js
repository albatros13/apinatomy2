"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Natallia on 6/14/2016.
 */
var core_1 = require('@angular/core');
var service_apinatomy2_1 = require('../../providers/service.apinatomy2');
var SortToolbar = (function () {
    function SortToolbar() {
        this.property = "id";
    }
    SortToolbar.prototype.sortAsc = function (prop) {
        this.items.sort(function (a, b) {
            if (a[prop] > b[prop])
                return 1;
            if (a[prop] < b[prop])
                return -1;
            return 0;
        });
    };
    SortToolbar.prototype.sortDesc = function (prop) {
        this.items.sort(function (a, b) {
            if (a[prop] > b[prop])
                return -1;
            if (a[prop] < b[prop])
                return 1;
            return 0;
        });
    };
    SortToolbar = __decorate([
        core_1.Component({
            selector: 'sort-toolbar',
            inputs: ['items'],
            template: "\n      <button type=\"button\" class=\"btn btn-default\" aria-label=\"Sort by attribute\" (click)=\"sortAsc(property)\">\n        <span class=\"glyphicon glyphicon-sort-by-attributes\" aria-hidden=\"true\"></span>\n      </button>\n      <button type=\"button\" class=\"btn btn-default\" aria-label=\"Sort by attribute (desc)\" (click)=\"sortDesc(property)\">\n        <span class=\"glyphicon glyphicon-sort-by-attributes-alt\" aria-hidden=\"true\"></span>\n      </button>\n    ",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], SortToolbar);
    return SortToolbar;
}());
exports.SortToolbar = SortToolbar;
var RepoToolbar = (function () {
    function RepoToolbar() {
    }
    RepoToolbar.prototype.addItem = function () {
        this.items.push(new service_apinatomy2_1.Resource());
    };
    RepoToolbar = __decorate([
        core_1.Component({
            selector: 'repo-toolbar',
            inputs: ['items'],
            template: "\n      <sort-toolbar [items]=\"items\"></sort-toolbar>\n      <button type=\"button\" class=\"btn btn-default\" aria-label=\"Add\" (click)=\"addItem()\">\n         <span class=\"glyphicon glyphicon-plus\"></span>\n      </button>\n    ",
            directives: [SortToolbar]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoToolbar);
    return RepoToolbar;
}());
exports.RepoToolbar = RepoToolbar;
var RepoWrapper = (function () {
    function RepoWrapper() {
        this.selected = null;
    }
    RepoWrapper.prototype.ngOnInit = function () {
        if (this.model && this.model.items && this.model.items[0])
            this.selected = this.model.items[0];
    };
    RepoWrapper.prototype.changeActive = function (item) {
        this.selected = item;
    };
    RepoWrapper.prototype.onSaved = function (item, updatedItem) {
        for (var key in updatedItem) {
            if (updatedItem.hasOwnProperty(key)) {
                item[key] = updatedItem[key];
            }
        }
    };
    RepoWrapper.prototype.onRemoved = function (item) {
        var index = this.model.items.indexOf(item);
        if (index > -1)
            this.model.items.splice(index, 1);
    };
    RepoWrapper = __decorate([
        core_1.Component({
            selector: 'repo-wrapper',
            inputs: ['model'],
            template: "\n        <div class=\"panel panel-info repo\">\n          <div class=\"panel-heading\">{{model.caption}}</div>\n          <div class=\"panel-body\" >\n            <repo-toolbar [items]=\"model.items\"></repo-toolbar>\n              <ng-content></ng-content>\n          </div>\n        </div>\n   \n  ",
            directives: [RepoToolbar]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoWrapper);
    return RepoWrapper;
}());
exports.RepoWrapper = RepoWrapper;
//# sourceMappingURL=repo.wrapper.js.map