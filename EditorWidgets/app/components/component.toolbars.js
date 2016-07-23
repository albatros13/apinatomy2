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
var common_1 = require('@angular/common');
var dropdown_1 = require('ng2-bootstrap/components/dropdown');
var SortToolbar = (function () {
    function SortToolbar() {
        this.sortByMode = "unsorted";
        this.sorted = new core_1.EventEmitter();
    }
    SortToolbar.prototype.onClick = function (item) {
        this.sortByMode = item;
        this.sorted.emit(item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SortToolbar.prototype, "sorted", void 0);
    SortToolbar = __decorate([
        core_1.Component({
            selector: 'sort-toolbar',
            inputs: ['options'],
            template: "\n      <div class=\"btn-group\" dropdown>\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" aria-label=\"SortAsc\" dropdownToggle>\n          <span class=\"glyphicon glyphicon-sort-by-attributes\" aria-hidden=\"true\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"SortAsc\">\n          <li role=\"menuitem\" (click)=\"onClick('unsorted')\">\n            <a class=\"dropdown-item\" href=\"#\">\n            <span *ngIf=\"sortByMode == 'unsorted'\">&#10004;</span>\n            (unsorted)</a>\n          </li>\n          <li class=\"divider\"></li>\n          <li *ngFor=\"let option of options; let i = index\" role=\"menuitem\" (click)=\"onClick(option)\">\n            <a class=\"dropdown-item\" href=\"#\">\n              <span *ngIf=\"sortByMode == option\">&#10004;</span>\n              {{option}}\n            </a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"btn-group\" dropdown>\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" aria-label=\"SortDesc\" dropdownToggle>\n          <span class=\"glyphicon glyphicon-sort-by-attributes-alt\" aria-hidden=\"true\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"SortDesc\">\n          <li *ngFor=\"let option of options; let i = index\" role=\"menuitem\" (click)=\"onClick('-'+option)\">\n            <a class=\"dropdown-item\" href=\"#\">\n             <span *ngIf=\"sortByMode == '-'+option\">&#10004;</span>\n             {{option}}\n            </a>\n          </li>\n        </ul>\n      </div>\n    ",
            directives: [dropdown_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SortToolbar);
    return SortToolbar;
}());
exports.SortToolbar = SortToolbar;
var FilterToolbar = (function () {
    function FilterToolbar() {
        this.applied = new core_1.EventEmitter();
    }
    FilterToolbar.prototype.ngOnInit = function () {
        if (this.options && (this.options.length > 0))
            this.mode = this.options[0];
    };
    FilterToolbar.prototype.updateMode = function (option) {
        this.mode = option;
        this.applied.emit({ filter: this.filter, mode: this.mode });
    };
    FilterToolbar.prototype.updateValue = function (event) {
        this.filter = event.target.value;
        //Remove filter if search string is empty
        if (this.filter.trim().length == 0)
            this.applied.emit({ filter: this.filter, mode: this.mode });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FilterToolbar.prototype, "applied", void 0);
    FilterToolbar = __decorate([
        core_1.Component({
            selector: 'filter-toolbar',
            inputs: ['filter', 'options'],
            template: "\n      <div class=\"input-group input-group-sm\" style=\"width: 250px;\">\n        <input type=\"text\" class=\"form-control\" \n        [value]=\"filter\" (input)=\"updateValue($event)\" (keyup.enter)=\"applied.emit({filter: filter, mode: mode});\"/>\n        <div class=\"input-group-btn\" dropdown>\n          <button type=\"button\" class=\"btn btn-secondary dropdown-toggle\" aria-label=\"Filter\" dropdownToggle\n            aria-haspopup=\"true\" aria-expanded=\"false\">\n             <span class=\"glyphicon glyphicon-filter\" aria-hidden=\"true\"></span>\n          </button>\n          <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" aria-labelledby=\"Filter\">\n            <li *ngFor=\"let option of options; let i = index\" (click)=\"updateMode(option)\">\n              <a class=\"dropdown-item\" href=\"#\"> <span *ngIf=\"mode == option\">&#10004;</span>{{option}}</a>\n            </li>            \n          </ul>\n        </div>\n      </div>\n    ",
            styles: [':host {float: right;}'],
            directives: [dropdown_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], FilterToolbar);
    return FilterToolbar;
}());
exports.FilterToolbar = FilterToolbar;
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
var FormToolbar = (function () {
    function FormToolbar() {
        this.removed = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.saved = new core_1.EventEmitter();
    }
    ;
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormToolbar.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormToolbar.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormToolbar.prototype, "saved", void 0);
    FormToolbar = __decorate([
        core_1.Component({
            selector: 'form-toolbar',
            template: "\n    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Remove\" (click)=\"removed.emit()\">\n      <span class=\"glyphicon glyphicon-remove\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Save\" (click)=\"saved.emit()\">\n      <span class=\"glyphicon glyphicon-check\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Restore\" (click)=\"canceled.emit()\">\n      <span class=\"glyphicon glyphicon-refresh\"></span>\n    </button>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], FormToolbar);
    return FormToolbar;
}());
exports.FormToolbar = FormToolbar;
//# sourceMappingURL=component.toolbars.js.map