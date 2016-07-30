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
var service_apinatomy2_1 = require('../services/service.apinatomy2');
var ng2_radio_group_1 = require("ng2-radio-group");
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
            template: "\n    <fieldset>\n      <div class=\"input-control\">\n        <label for=\"min\">Min: </label>\n        <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [value]=\"item.min\" (input)=\"updateValue('min', $event)\">\n      </div>\n      <div class=\"input-control\">\n        <label for=\"max\">Max: </label>\n        <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [value]=\"item.max\" (input)=\"updateValue('max', $event)\">\n      </div>\n      <ng-content></ng-content>\n    </fieldset>\n  ",
            styles: [".form-control {width: 80px;}"]
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
            template: "\n    <uniformDistribution-input [item]=\"item\" (updated)=\"updated.emit($event)\">\n      <div class=\"input-control\">\n        <label for=\"mean\">Mean: </label>\n        <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [value]=\"item.mean\" (input)=\"updateValue('mean', $event)\">\n      </div>\n      <div class=\"input-control\">\n        <label for=\"std\">Std: </label>\n        <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" step=\"0.1\" required [value]=\"item.std\" (input)=\"updateValue('std', $event)\">\n      </div>\n      <ng-content></ng-content>\n    </uniformDistribution-input>\n  ",
            styles: [".form-control {width: 80px;}"],
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
        var min = (this.item.distribution) ? this.item.distribution.min : 0;
        var max = (this.item.distribution) ? this.item.distribution.max : 0;
        this.item.distribution = new service_apinatomy2_1.BoundedNormalDistribution({ min: min, max: max, mean: 0, std: 0 });
        this.updated.emit(this.item);
    };
    DistributionInput.prototype.toUniform = function (item) {
        this.item.type = item;
        var min = (this.item.distribution) ? this.item.distribution.min : 0;
        var max = (this.item.distribution) ? this.item.distribution.max : 0;
        this.item.distribution = new service_apinatomy2_1.UniformDistribution({ min: min, max: max });
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
            template: "\n    <fieldset>\n      <radio-group [(ngModel)]=\"item.type\" [required]=\"true\">\n        <input type=\"radio\" [value]=\"distributionType.Uniform\" (click)=\"toUniform($event)\">Uniform&nbsp;\n        <input type=\"radio\" [value]=\"distributionType.BoundedNormal\" (click)=\"toBoundedNormal($event)\">Normal\n      </radio-group>\n      <uniformDistribution-input [item]=\"item.distribution\" (updated)=\"updateValue($event)\"\n        *ngIf=\"item.type == distributionType.Uniform\">\n        </uniformDistribution-input>\n      <boundedNormalDistribution-input [item]=\"item.distribution\" (updated)=\"updateValue($event)\" \n        *ngIf=\"item.type == distributionType.BoundedNormal\">\n        </boundedNormalDistribution-input>\n    </fieldset>\n  ",
            styles: [":host {min-width: 200px;}"],
            directives: [ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
        }), 
        __metadata('design:paramtypes', [])
    ], DistributionInput);
    return DistributionInput;
}());
exports.DistributionInput = DistributionInput;
//# sourceMappingURL=component.distribution.js.map