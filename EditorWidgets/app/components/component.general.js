"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var pipe_general_1 = require("../transformations/pipe.general");
var MultiSelectInput = (function () {
    function MultiSelectInput() {
        this.options = [];
        this.removed = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
    }
    MultiSelectInput.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = [];
        if (!this.items)
            this.items = [];
    };
    MultiSelectInput.prototype.refreshValue = function (value) {
        this.items = value;
        this.selected.emit(this.items);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultiSelectInput.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultiSelectInput.prototype, "selected", void 0);
    MultiSelectInput = __decorate([
        core_1.Component({
            selector: 'select-input',
            inputs: ['items', 'options'],
            template: "\n      <ng-select\n        [items]       = \"options | mapToOptions\"\n        [initData]    = \"items | mapToOptions\"\n        [multiple]    = true\n        (data)     =\"refreshValue($event)\"\n        (selected) =\"selected.emit($event)\"\n        (removed)  =\"removed.emit($event)\"\n      ></ng-select>\n  ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            pipes: [pipe_general_1.MapToOptions]
        }), 
        __metadata('design:paramtypes', [])
    ], MultiSelectInput);
    return MultiSelectInput;
}());
exports.MultiSelectInput = MultiSelectInput;
var SingleSelectInput = (function (_super) {
    __extends(SingleSelectInput, _super);
    function SingleSelectInput() {
        _super.apply(this, arguments);
    }
    SingleSelectInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = {};
        this.items = [this.item];
        _super.prototype.ngOnInit.call(this);
    };
    SingleSelectInput.prototype.refreshValue = function (value) {
        this.item = value[0];
        this.selected.emit(this.items);
    };
    SingleSelectInput = __decorate([
        core_1.Component({
            selector: 'select-input-1',
            inputs: ['item', 'options'],
            template: "\n      <ng-select\n        [items]       = \"options | mapToOptions\"\n        [initData]    = \"items | mapToOptions\"\n        [multiple]    = false\n        (data)        = \"refreshValue($event)\"\n        (removed)     = \"removed.emit($event)\"\n      ></ng-select>\n  ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            pipes: [pipe_general_1.MapToOptions]
        }), 
        __metadata('design:paramtypes', [])
    ], SingleSelectInput);
    return SingleSelectInput;
}(MultiSelectInput));
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