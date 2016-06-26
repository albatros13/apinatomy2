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
        this.distributionType = ["Uniform", "BoundedNormal"];
    }
    DistributionInput.prototype.ngOnInit = function () {
        if (!this.item)
            this.item = new service_apinatomy2_1.ValueDistribution();
    };
    DistributionInput = __decorate([
        core_1.Component({
            selector: 'distribution-input',
            inputs: ['item'],
            template: "\n    <fieldset>\n      <radio-group [(ngModel)]=\"distributionType\" [required]=\"true\">\n        <input type=\"radio\" value=\"Uniform\" checked = \"item.type == 'Uniform'\">Uniform\n        <input type=\"radio\" value=\"BoundedNormal\" checked = \"item.type == 'BoundedNormal'\">Bounded normal<br/>\n      </radio-group>\n      <uniformDistribution-input [item]=\"item.distribution\" *ngIf=\"distributionType != 'BoundedNormal'\"></uniformDistribution-input>\n      <boundedNormalDistribution-input [item]=\"item.distribution\" *ngIf=\"distributionType == 'BoundedNormal'\"></boundedNormalDistribution-input>\n    </fieldset>\n  ",
            directives: [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], DistributionInput);
    return DistributionInput;
}());
exports.DistributionInput = DistributionInput;
var TemplateValue = (function () {
    function TemplateValue() {
        this.valueType = ["Value", "Distribution"];
    }
    TemplateValue = __decorate([
        core_1.Component({
            "inputs": ["caption", "item"],
            "selector": "template-value",
            "template": "\n     <fieldset>\n       <legend>{{caption}}</legend>\n       <radio-group [(ngModel)]=\"valueType\" [required]=\"true\">\n         <input type=\"radio\" value=\"Value\">Value\n         <input type=\"radio\" value=\"Distribution\">Distribution<br/>\n       </radio-group>\n       <input type=\"number\" min=\"0\" max=\"100\" [(ngModel)]=\"item\" *ngIf=\"valueType != 'Distribution'\"/>\n       <distribution-input [item]=\"item\" *ngIf=\"valueType == 'Distribution'\"></distribution-input>\n     </fieldset>\n   ",
            "directives": [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, DistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], TemplateValue);
    return TemplateValue;
}());
exports.TemplateValue = TemplateValue;
var RepoTemplateWrapper = (function () {
    function RepoTemplateWrapper() {
        this.selected = null;
        this.model = {
            caption: "Templates", items: [], options: [] };
    }
    RepoTemplateWrapper.prototype.ngOnInit = function () {
        if (!this.model.items)
            this.model.items = [];
        if (this.model && this.model.items && this.model.items[0])
            this.selected = this.model.items[0];
    };
    RepoTemplateWrapper.prototype.changeActive = function (item) {
        this.selected = item;
    };
    RepoTemplateWrapper.prototype.onSaved = function (item, updatedItem) {
        for (var key in updatedItem) {
            if (updatedItem.hasOwnProperty(key)) {
                item[key] = updatedItem[key];
            }
        }
    };
    RepoTemplateWrapper.prototype.onRemoved = function (item) {
        var index = this.model.items.indexOf(item);
        if (index > -1)
            this.model.items.splice(index, 1);
    };
    RepoTemplateWrapper = __decorate([
        core_1.Component({
            selector: 'repo-template-wrapper',
            inputs: ['model'],
            template: "\n    <div class=\"panel panel-warning repo-template\">\n      <div class=\"panel-heading\">{{model.caption}}</div>\n      <div class=\"panel-body\" >\n          <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], RepoTemplateWrapper);
    return RepoTemplateWrapper;
}());
exports.RepoTemplateWrapper = RepoTemplateWrapper;
//# sourceMappingURL=template.general.js.map