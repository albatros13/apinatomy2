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
 * Created by Natallia on 6/21/2016.
 */
var core_1 = require('@angular/core');
var component_distribution_1 = require('./component.distribution');
var toolbar_panelEdit_1 = require("./toolbar.panelEdit");
var TemplateValue = (function () {
    function TemplateValue() {
        this.valueType = "Value";
        this.updated = new core_1.EventEmitter();
    }
    TemplateValue.prototype.ngOnInit = function () {
        if (this.item && this.item['distribution'])
            this.valueType = "Distribution";
    };
    TemplateValue.prototype.updateValue = function (item) {
        this.item = item.target.value;
        this.updated.emit(this.item);
    };
    TemplateValue.prototype.notifyParent = function (item) {
        this.item = item;
        this.updated.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TemplateValue.prototype, "updated", void 0);
    TemplateValue = __decorate([
        core_1.Component({
            "inputs": ["caption", "item"],
            "selector": "template-value",
            "template": "\n      <div class=\"input-control\">\n        <label for=\"caption\">{{caption}}:</label>\n        <div class=\"btn-group\" style=\"float: left;\">\n          <button type=\"button\" class=\"btn btn-default\" \n            [ngClass]=\"{'active': valueType == 'Value'}\" (click)=\"valueType = 'Value'\">\n            <img class=\"icon\" src=\"images/numbers.png\"/>\n          </button>\n          <button type=\"button\" class=\"btn btn-default\" \n            [ngClass]=\"{'active': valueType == 'Distribution'}\" (click)=\"valueType = 'Distribution'\">\n            <img class=\"icon\" src=\"images/distribution.png\"/>\n          </button>\n        </div>\n        <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" [value]=\"item\" (input)=\"updateValue($event)\" *ngIf=\"valueType == 'Value'\"/>\n        <distribution-input [item]=\"item\" (updated)=\"notifyParent($event)\" *ngIf=\"valueType == 'Distribution'\"></distribution-input>       \n     </div>\n   ",
            "styles": ["input {width: 80px;}"],
            "directives": [component_distribution_1.DistributionInput, toolbar_panelEdit_1.FormToolbar]
        }), 
        __metadata('design:paramtypes', [])
    ], TemplateValue);
    return TemplateValue;
}());
exports.TemplateValue = TemplateValue;
//# sourceMappingURL=component.templateValue.js.map