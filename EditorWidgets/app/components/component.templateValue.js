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
var toolbar_panelEdit_1 = require("./toolbar.panelEdit");
var TemplateValue = (function () {
    function TemplateValue() {
        this.value = 0;
        this.distribution = { min: 0, max: 0, std: 0, mean: 0 };
        this.valueType = "Value";
        this.updated = new core_1.EventEmitter();
    }
    TemplateValue.prototype.ngOnInit = function () {
        if (this.item) {
            if (this.item instanceof Object) {
                this.valueType = "Distribution";
                this.distribution = this.item;
            }
            else {
                this.value = this.item;
            }
        }
    };
    TemplateValue.prototype.updateType = function (type) {
        this.valueType = type;
        if (type == "Value") {
            this.item = this.value;
        }
        else {
            this.item = this.distribution;
        }
        this.updated.emit(this.item);
    };
    TemplateValue.prototype.updateValue = function (event) {
        this.value = event.target.value;
        this.item = this.value;
        this.updated.emit(this.item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateValue.prototype, "item", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TemplateValue.prototype, "updated", void 0);
    TemplateValue = __decorate([
        core_1.Component({
            "inputs": ["caption", "item", "mode"],
            "selector": "template-value",
            "template": "\n      <div class=\"input-control\">\n        <label for=\"caption\">{{caption}}:</label>\n        \n        <div class=\"btn-group\" style=\"float: left;\">\n          <button type=\"button\" class=\"btn btn-default\" \n            [ngClass]=\"{'active': valueType == 'Value'}\" (click)=\"updateType('Value')\">\n            <span class=\"glyphicon glyphicon-th\"></span>\n          </button>\n          <button type=\"button\" class=\"btn btn-default\" \n            [ngClass]=\"{'active': valueType == 'Distribution'}\" (click)=\"updateType('Distribution')\">\n            <span class=\"glyphicon glyphicon-transfer\"></span>\n          </button>\n        </div>\n        \n        <input *ngIf=\"valueType == 'Value'\" \n          type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" [value]=\"value\" (input)=\"updateValue($event)\"/>\n        \n        <fieldset *ngIf=\"valueType == 'Distribution'\">\n          <div class=\"input-control\">\n            <label for=\"min\">Min: </label>\n            <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [(ngModel)]=\"distribution.min\">\n         \n            <label for=\"max\">Max: </label>\n            <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [(ngModel)]=\"distribution.max\">\n          </div>\n          <div *ngIf=\"mode == 'distribution'\">\n            <div class=\"input-control\">\n              <label for=\"mean\">Mean: </label>\n              <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [(ngModel)]=\"distribution.mean\">\n         \n              <label for=\"std\">Std: </label>\n              <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [(ngModel)]=\"distribution.std\">\n            </div>\n          </div>\n        </fieldset>\n        \n       </div>\n   ",
            "styles": ["input {width: 80px;}"],
            "directives": [toolbar_panelEdit_1.FormToolbar]
        }), 
        __metadata('design:paramtypes', [])
    ], TemplateValue);
    return TemplateValue;
}());
exports.TemplateValue = TemplateValue;
//# sourceMappingURL=component.templateValue.js.map