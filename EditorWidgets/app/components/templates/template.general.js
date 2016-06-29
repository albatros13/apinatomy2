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
var service_apinatomy2_1 = require('../../providers/service.apinatomy2');
var service_restore_1 = require("../../providers/service.restore");
var ng2_radio_group_1 = require("ng2-radio-group");
var UniformDistributionInput = (function () {
    function UniformDistributionInput(restoreService) {
        this.restoreService = restoreService;
        this.saved = new core_1.EventEmitter();
    }
    UniformDistributionInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = new service_apinatomy2_1.UniformDistribution();
    };
    Object.defineProperty(UniformDistributionInput.prototype, "item", {
        get: function () {
            return this.restoreService.getItem();
        },
        set: function (item) {
            this.restoreService.setItem(item);
        },
        enumerable: true,
        configurable: true
    });
    UniformDistributionInput.prototype.onSaved = function () {
        this.item = this.restoreService.getItem();
        this.saved.emit(this.item);
    };
    UniformDistributionInput.prototype.onCanceled = function () {
        this.item = this.restoreService.restoreItem();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UniformDistributionInput.prototype, "saved", void 0);
    UniformDistributionInput = __decorate([
        core_1.Component({
            selector: 'uniformDistribution-input',
            inputs: ['item'],
            providers: [service_restore_1.RestoreService],
            template: "\n    <fieldset>\n      <div class=\"input-control\">\n        <label for=\"min\">Min: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [(ngModel)]=\"item.min\">\n      </div>\n      <div class=\"input-control\">\n        <label for=\"max\">Max: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [(ngModel)]=\"item.max\">\n      </div>\n      <ng-content></ng-content>\n    </fieldset>\n  ",
            directives: []
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], UniformDistributionInput);
    return UniformDistributionInput;
}());
exports.UniformDistributionInput = UniformDistributionInput;
var BoundedNormalDistributionInput = (function (_super) {
    __extends(BoundedNormalDistributionInput, _super);
    function BoundedNormalDistributionInput(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    BoundedNormalDistributionInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = new service_apinatomy2_1.BoundedNormalDistribution();
    };
    BoundedNormalDistributionInput = __decorate([
        core_1.Component({
            selector: 'boundedNormalDistribution-input',
            inputs: ['item'],
            providers: [service_restore_1.RestoreService],
            template: "\n    <uniformDistribution-input [item]=\"item\">\n      <div class=\"input-control\">\n        <label for=\"mean\">Mean: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [(ngModel)]=\"item.mean\">\n      </div>\n      <div class=\"input-control\">\n        <label for=\"std\">Std: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [(ngModel)]=\"item.std\">\n      </div>\n      <ng-content></ng-content>\n    </uniformDistribution-input>\n  ",
            directives: [UniformDistributionInput]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], BoundedNormalDistributionInput);
    return BoundedNormalDistributionInput;
}(UniformDistributionInput));
exports.BoundedNormalDistributionInput = BoundedNormalDistributionInput;
var DistributionInput = (function () {
    function DistributionInput() {
        this.distributionType = service_apinatomy2_1.DistributionType;
    }
    DistributionInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = new service_apinatomy2_1.ValueDistribution();
    };
    DistributionInput = __decorate([
        core_1.Component({
            selector: 'distribution-input',
            inputs: ['item'],
            template: "\n    <fieldset>\n      <radio-group [(ngModel)]=\"item.type\" [required]=\"true\">\n        <input type=\"radio\" [value]=\"distributionType.Uniform\">Uniform&nbsp;\n        <input type=\"radio\" [value]=\"distributionType.BoundedNormal\">Bounded normal<br/>\n      </radio-group>\n      <uniformDistribution-input [item]=\"item.distribution\" *ngIf=\"item.type == distributionType.Uniform\"></uniformDistribution-input>\n      <boundedNormalDistribution-input [item]=\"item.distribution\" *ngIf=\"item.type == distributionType.BoundedNormal\"></boundedNormalDistribution-input>\n    </fieldset>\n  ",
            directives: [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], DistributionInput);
    return DistributionInput;
}());
exports.DistributionInput = DistributionInput;
var TemplateValue = (function () {
    function TemplateValue() {
        this.valueType = "Value";
    }
    TemplateValue.prototype.ngOnInit = function () {
        if (this.item && this.item['distribution'])
            this.valueType = "Distribution";
    };
    TemplateValue = __decorate([
        core_1.Component({
            "inputs": ["caption", "item"],
            "selector": "template-value",
            "template": "\n     <fieldset>\n       <legend>{{caption}}</legend>\n       <radio-group [(ngModel)]=\"valueType\" [required]=\"true\">\n         <input type=\"radio\" value=\"Value\">Value&nbsp;\n         <input type=\"radio\" value=\"Distribution\">Distribution<br/>\n       </radio-group>\n       <input type=\"number\" min=\"0\" max=\"100\" [(ngModel)]=\"item\" *ngIf=\"valueType == 'Value'\"/>\n       <distribution-input [item]=\"item\" *ngIf=\"valueType == 'Distribution'\"></distribution-input>\n     </fieldset>\n   ",
            "directives": [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, DistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], TemplateValue);
    return TemplateValue;
}());
exports.TemplateValue = TemplateValue;
//# sourceMappingURL=template.general.js.map