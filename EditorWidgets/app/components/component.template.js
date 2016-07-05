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
 * Created by Natallia on 6/21/2016.
 */
var core_1 = require('@angular/core');
var service_apinatomy2_1 = require('../providers/service.apinatomy2');
var service_restore_1 = require("../providers/service.restore");
var ng2_radio_group_1 = require("ng2-radio-group");
var component_general_1 = require("./component.general");
var UniformDistributionInput = (function () {
    function UniformDistributionInput() {
        this.updated = new core_1.EventEmitter();
    }
    UniformDistributionInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = new service_apinatomy2_1.UniformDistribution();
    };
    UniformDistributionInput.prototype.updateValue = function (property, item) {
        this.item[property] = item.target.value;
        this.updated.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UniformDistributionInput.prototype, "updated", void 0);
    UniformDistributionInput = __decorate([
        core_1.Component({
            selector: 'uniformDistribution-input',
            inputs: ['item'],
            template: "\n    <fieldset>\n      <div class=\"input-control\">\n        <label for=\"min\">Min: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [value]=\"item.min\" (input)=\"updateValue('min', $event)\">\n      </div>\n      <div class=\"input-control\">\n        <label for=\"max\">Max: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [value]=\"item.max\" (input)=\"updateValue('max', $event)\">\n      </div>\n      <ng-content></ng-content>\n    </fieldset>\n  ",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], UniformDistributionInput);
    return UniformDistributionInput;
}());
exports.UniformDistributionInput = UniformDistributionInput;
var BoundedNormalDistributionInput = (function (_super) {
    __extends(BoundedNormalDistributionInput, _super);
    function BoundedNormalDistributionInput() {
        _super.apply(this, arguments);
    }
    BoundedNormalDistributionInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = new service_apinatomy2_1.BoundedNormalDistribution();
    };
    BoundedNormalDistributionInput = __decorate([
        core_1.Component({
            selector: 'boundedNormalDistribution-input',
            inputs: ['item'],
            template: "\n    <uniformDistribution-input [item]=\"item\" (updated)=\"updated.emit($event)\">\n      <div class=\"input-control\">\n        <label for=\"mean\">Mean: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [value]=\"item.mean\" (input)=\"updateValue('mean', $event)\">\n      </div>\n      <div class=\"input-control\">\n        <label for=\"std\">Std: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [value]=\"item.std\" (input)=\"updateValue('std', $event)\">\n      </div>\n      <ng-content></ng-content>\n    </uniformDistribution-input>\n  ",
            directives: [UniformDistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], BoundedNormalDistributionInput);
    return BoundedNormalDistributionInput;
}(UniformDistributionInput));
exports.BoundedNormalDistributionInput = BoundedNormalDistributionInput;
var DistributionInput = (function () {
    function DistributionInput() {
        this.updated = new core_1.EventEmitter();
        this.distributionType = service_apinatomy2_1.DistributionType;
    }
    DistributionInput.prototype.ngOnInit = function () {
        if (!this.item || !this.item.distribution)
            this.item = new service_apinatomy2_1.ValueDistribution();
    };
    DistributionInput.prototype.toBoundedNormal = function (item) {
        this.item.type = item;
        this.item.distribution = new service_apinatomy2_1.BoundedNormalDistribution({ min: this.item.distribution.min, max: this.item.distribution.max, mean: 0, std: 0 });
        this.updated.emit(this.item);
    };
    DistributionInput.prototype.toUniform = function (item) {
        this.item.type = item;
        this.item.distribution = new service_apinatomy2_1.UniformDistribution({ min: this.item.distribution.min, max: this.item.distribution.max });
        this.updated.emit(this.item);
    };
    DistributionInput.prototype.updateValue = function (item) {
        this.item.distribution = item;
        this.updated.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DistributionInput.prototype, "updated", void 0);
    DistributionInput = __decorate([
        core_1.Component({
            selector: 'distribution-input',
            inputs: ['item'],
            template: "\n    <fieldset>\n      <radio-group [(ngModel)]=\"item.type\" [required]=\"true\">\n        <input type=\"radio\" [value]=\"distributionType.Uniform\" (click)=\"toUniform($event)\">Uniform&nbsp;\n        <input type=\"radio\" [value]=\"distributionType.BoundedNormal\" (click)=\"toBoundedNormal($event)\">Bounded normal<br/>\n      </radio-group>\n      <uniformDistribution-input [item]=\"item.distribution\" (updated)=\"updateValue($event)\"\n        *ngIf=\"item.type == distributionType.Uniform\">\n        </uniformDistribution-input>\n      <boundedNormalDistribution-input [item]=\"item.distribution\" (updated)=\"updateValue($event)\" \n        *ngIf=\"item.type == distributionType.BoundedNormal\">\n        </boundedNormalDistribution-input>\n    </fieldset>\n  ",
            directives: [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], DistributionInput);
    return DistributionInput;
}());
exports.DistributionInput = DistributionInput;
var TemplateValue = (function () {
    function TemplateValue(restoreService) {
        this.restoreService = restoreService;
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
        console.dir(this.item);
        this.updated.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TemplateValue.prototype, "updated", void 0);
    TemplateValue = __decorate([
        core_1.Component({
            "inputs": ["caption", "item"],
            "providers": [service_restore_1.RestoreService],
            "selector": "template-value",
            "template": "\n     <fieldset>\n       <legend>{{caption}}</legend>\n       <radio-group [(ngModel)]=\"valueType\" [required]=\"true\">\n         <input type=\"radio\" value=\"Value\">Value&nbsp;\n         <input type=\"radio\" value=\"Distribution\">Distribution<br/>\n       </radio-group>\n       <input type=\"number\" min=\"0\" max=\"100\" [value]=\"item\" (input)=\"updateValue($event)\" *ngIf=\"valueType == 'Value'\"/>\n       <distribution-input [item]=\"item\" (updated)=\"notifyParent($event)\" *ngIf=\"valueType == 'Distribution'\"></distribution-input>       \n     </fieldset>\n   ",
            "directives": [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, DistributionInput, component_general_1.FormToolbar]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], TemplateValue);
    return TemplateValue;
}());
exports.TemplateValue = TemplateValue;
//# sourceMappingURL=component.template.js.map