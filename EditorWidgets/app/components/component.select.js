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
 * Created by Natallia on 7/23/2016.
 */
var core_1 = require('@angular/core');
var ng2_select_1 = require('ng2-select/ng2-select');
var common_1 = require('@angular/common');
var pipe_general_1 = require("../transformations/pipe.general");
var MultiSelectInput = (function () {
    function MultiSelectInput() {
        this.options = [];
        this.updated = new core_1.EventEmitter();
        this.active = true;
        this.externalChange = false;
    }
    MultiSelectInput.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = [];
        if (!this.items)
            this.items = [];
    };
    MultiSelectInput.prototype.ngOnChanges = function (changes) {
        if (this.externalChange)
            this.refresh();
        this.externalChange = true;
    };
    MultiSelectInput.prototype.refresh = function () {
        var _this = this;
        setTimeout(function () { _this.active = false; }, 0);
        setTimeout(function () { _this.active = true; }, 0);
    };
    MultiSelectInput.prototype.refreshValue = function (value) {
        var selected = value.map(function (x) { return x.id; });
        var options = [];
        if (this.options[0] && this.options[0].children) {
            options = [].concat.apply([], this.options.map(function (item) { return item.children; }));
        }
        else
            options = this.options;
        this.externalChange = false;
        this.items = options.filter(function (y) { return (selected.indexOf((y.id) ? y.id : y.name) != -1); });
        this.updated.emit(this.items);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultiSelectInput.prototype, "updated", void 0);
    MultiSelectInput = __decorate([
        core_1.Component({
            selector: 'select-input',
            inputs: ['items', 'options'],
            template: "\n    <div *ngIf=\"active\">\n      <ng-select \n        [items]       = \"options | mapToOptions\"\n        [initData]    = \"items | mapToOptions\"\n        [multiple]    = true\n        (data)        = \"refreshValue($event)\"        \n      ></ng-select>\n    </div>\n    ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            pipes: [pipe_general_1.MapToOptions]
        }), 
        __metadata('design:paramtypes', [])
    ], MultiSelectInput);
    return MultiSelectInput;
}());
exports.MultiSelectInput = MultiSelectInput;
var SingleSelectInput = (function () {
    function SingleSelectInput() {
        this.options = [];
        this.updated = new core_1.EventEmitter();
        this.active = true;
        this.externalChange = false;
    }
    SingleSelectInput.prototype.ngOnInit = function () {
        if (!this.options)
            this.options = [];
        this.items = [];
        if (this.item)
            this.items = [this.item];
    };
    SingleSelectInput.prototype.ngOnChanges = function (changes) {
        this.items = [];
        if (this.item)
            this.items = [this.item];
        if (this.externalChange)
            this.refresh();
        this.externalChange = true;
    };
    SingleSelectInput.prototype.refresh = function () {
        var _this = this;
        setTimeout(function () { _this.active = false; }, 0);
        setTimeout(function () { _this.active = true; }, 0);
    };
    SingleSelectInput.prototype.refreshValue = function (value) {
        var options = [];
        if (this.options[0] && this.options[0].children) {
            //Flatten grouped options
            options = [].concat.apply([], this.options.map(function (item) { return item.children; }));
        }
        else
            options = this.options;
        this.externalChange = false;
        this.item = options.find(function (y) { return (value.id == ((y.id) ? y.id : y.name)); });
        this.updated.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SingleSelectInput.prototype, "updated", void 0);
    SingleSelectInput = __decorate([
        core_1.Component({
            selector: 'select-input-1',
            inputs: ['item', 'options'],
            template: "\n    <div *ngIf=\"active\">\n      <ng-select\n        [items]       = \"options | mapToOptions\"\n        [initData]    = \"items | mapToOptions\"\n        [multiple]    = false\n        (data)        = \"refreshValue($event)\"\n      ></ng-select>\n    </div>\n  ",
            directives: [ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            pipes: [pipe_general_1.MapToOptions]
        }), 
        __metadata('design:paramtypes', [])
    ], SingleSelectInput);
    return SingleSelectInput;
}());
exports.SingleSelectInput = SingleSelectInput;
//# sourceMappingURL=component.select.js.map