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
var SelectInput = (function () {
    function SelectInput() {
        this.options = [];
    }
    SelectInput.prototype.getSelectionSource = function () {
        if (this.options)
            return this.options.map(function (entry) { return ({ id: entry.id, text: entry.name ? entry.name : entry.id }); });
    };
    SelectInput.prototype.getSelected = function () {
        if (this.item)
            return this.item.map(function (entry) { return ({ id: entry.id, text: entry.name ? entry.name : entry.id }); });
        return [];
    };
    SelectInput.prototype.itemSelected = function (value) { };
    SelectInput.prototype.itemRemoved = function (value) { };
    SelectInput.prototype.itemTyped = function (value) { };
    SelectInput.prototype.refreshValue = function (value) {
        this.item = value;
    };
    SelectInput = __decorate([
        core_1.Component({
            selector: 'select-input',
            inputs: ['item', 'options'],
            template: "\n        <ng-select\n          [items]       = \"getSelectionSource()\"\n          [initData]    = \"getSelected()\"\n          [multiple]    = \"true\"\n          (data)=\"refreshValue(prop, $event)\"\n          (selected)=\"itemSelected($event)\"\n          (removed)=\"itemRemoved($event)\"\n          (typed)=\"itemTyped($event)\"\n        ></ng-select>\n  ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SelectInput);
    return SelectInput;
}());
exports.SelectInput = SelectInput;
//# sourceMappingURL=component.general.js.map