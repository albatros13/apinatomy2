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
 * Created by Natallia on 6/19/2016.
 */
var core_1 = require('@angular/core');
var ng2_select_1 = require('ng2-select/ng2-select');
var common_1 = require('@angular/common');
var dropdown_1 = require('ng2-bootstrap/components/dropdown');
var MultiSelectInput = (function () {
    function MultiSelectInput() {
        this.options = [];
    }
    MultiSelectInput.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = [];
    };
    MultiSelectInput.prototype.getSelectionSource = function () {
        if (this.options)
            return this.options.map(function (entry) { return ({ id: entry.id, text: entry.name ? entry.name : entry.id }); });
    };
    MultiSelectInput.prototype.getSelected = function () {
        if (this.item)
            return this.item.map(function (entry) { return ({ id: entry.id, text: entry.name ? entry.name : entry.id }); });
        return [];
    };
    MultiSelectInput.prototype.itemSelected = function (value) { };
    MultiSelectInput.prototype.itemRemoved = function (value) { };
    MultiSelectInput.prototype.itemTyped = function (value) { };
    MultiSelectInput.prototype.refreshValue = function (value) {
        this.item = value;
    };
    MultiSelectInput = __decorate([
        core_1.Component({
            selector: 'select-input',
            inputs: ['item', 'options'],
            template: "\n      <ng-select\n        [items]       = \"getSelectionSource()\"\n        [initData]    = \"getSelected()\"\n        [multiple]    = true\n        (data)=\"refreshValue($event)\"\n        (selected)=\"itemSelected($event)\"\n        (removed)=\"itemRemoved($event)\"\n        (typed)=\"itemTyped($event)\"\n      ></ng-select>\n  ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MultiSelectInput);
    return MultiSelectInput;
}());
exports.MultiSelectInput = MultiSelectInput;
var SingleSelectInput = (function () {
    function SingleSelectInput() {
        this.options = [];
    }
    SingleSelectInput.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = [];
    };
    SingleSelectInput.prototype.getSelectionSource = function () {
        if (this.options)
            return this.options.map(function (entry) { return ({ id: entry.id, text: entry.name ? entry.name : entry.id }); });
    };
    SingleSelectInput.prototype.getSelected = function () {
        if (this.item)
            return [{ id: this.item.id, text: this.item.name ? this.item.name : this.item.id }];
        return [];
    };
    SingleSelectInput.prototype.itemSelected = function (value) { };
    SingleSelectInput.prototype.itemRemoved = function (value) { };
    SingleSelectInput.prototype.itemTyped = function (value) { };
    SingleSelectInput.prototype.refreshValue = function (value) {
        this.item = value[0];
    };
    SingleSelectInput = __decorate([
        core_1.Component({
            selector: 'select-input-1',
            inputs: ['item', 'options'],
            template: "\n      <ng-select\n        [items]       = \"getSelectionSource()\"\n        [initData]    = \"getSelected()\"\n        [multiple]    = false\n        (data)=\"refreshValue($event)\"\n        (selected)=\"itemSelected($event)\"\n        (removed)=\"itemRemoved($event)\"\n        (typed)=\"itemTyped($event)\"\n      ></ng-select>\n  ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SingleSelectInput);
    return SingleSelectInput;
}());
exports.SingleSelectInput = SingleSelectInput;
// @Component({
//   selector: 'list',
//   inputs: ['materials'],
//   template: `<template ngFor [ngForOf]="materials" [ngForTemplate]="contentTemplate"></template>`
// })
// export class List {
//   @ContentChild(TemplateRef) contentTemplate: TemplateRef<any>;
// }
var ItemHeader = (function () {
    function ItemHeader() {
    }
    ItemHeader = __decorate([
        core_1.Component({
            selector: 'item-header',
            inputs: ['item', 'icon'],
            template: "\n      <i class=\"pull-left glyphicon\" \n        [ngClass]=\"{'glyphicon-chevron-down': item == selected, 'glyphicon-chevron-right': item != selected}\"></i>&nbsp;\n        {{item.id}} - {{item.name}} \n        <img class=\"pull-right icon\" src=\"{{icon}}\"/>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ItemHeader);
    return ItemHeader;
}());
exports.ItemHeader = ItemHeader;
var SortToolbar = (function () {
    function SortToolbar() {
        this.sorted = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SortToolbar.prototype, "sorted", void 0);
    SortToolbar = __decorate([
        core_1.Component({
            selector: 'sort-toolbar',
            inputs: ['options'],
            template: "\n      <div class=\"btn-group\" dropdown>\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" aria-label=\"SortAsc\" dropdownToggle>\n          <span class=\"glyphicon glyphicon-sort-by-attributes\" aria-hidden=\"true\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"SortAsc\">\n          <li *ngFor=\"let option of options; let i = index\" role=\"menuitem\" (click)=\"sorted.emit(option)\">\n            <a class=\"dropdown-item\" href=\"#\">{{option}}</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"btn-group\" dropdown>\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" aria-label=\"SortDesc\" dropdownToggle>\n          <span class=\"glyphicon glyphicon-sort-by-attributes-alt\" aria-hidden=\"true\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"SortDesc\">\n          <li *ngFor=\"let option of options; let i = index\" role=\"menuitem\" (click)=\"sorted.emit('-'+option)\">\n            <a class=\"dropdown-item\" href=\"#\">{{option}}</a>\n          </li>\n        </ul>\n      </div>\n    ",
            directives: [dropdown_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SortToolbar);
    return SortToolbar;
}());
exports.SortToolbar = SortToolbar;
var EditToolbar = (function () {
    function EditToolbar() {
        this.added = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditToolbar.prototype, "added", void 0);
    EditToolbar = __decorate([
        core_1.Component({
            selector: 'edit-toolbar',
            inputs: ['options'],
            template: "\n      <div class=\"btn-group\" dropdown>\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" aria-label=\"Add\" dropdownToggle>\n          <span class=\"glyphicon glyphicon-plus\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"Add\">\n          <li *ngFor=\"let option of options; let i = index\" role=\"menuitem\" (click)=\"added.emit(option)\">\n            <a class=\"dropdown-item\" href=\"#\">{{option}}</a>\n          </li>\n        </ul>\n      </div>\n    ",
            directives: [dropdown_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], EditToolbar);
    return EditToolbar;
}());
exports.EditToolbar = EditToolbar;
//# sourceMappingURL=component.general.js.map