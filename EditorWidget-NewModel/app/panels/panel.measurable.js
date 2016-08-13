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
var panel_template_1 = require("./panel.template");
var component_select_1 = require('../components/component.select');
var utils_model_1 = require("../services/utils.model");
var Material = utils_model_1.model.Material, MeasurableLocation = utils_model_1.model.MeasurableLocation;
var MeasurablePanel = (function (_super) {
    __extends(MeasurablePanel, _super);
    function MeasurablePanel() {
        _super.apply(this, arguments);
        this.Material = Material;
        this.MeasurableLocation = MeasurableLocation;
    }
    MeasurablePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
    };
    MeasurablePanel = __decorate([
        core_1.Component({
            selector: 'measurable-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <template-panel [item]=\"item\" \n      [ignore]=\"ignore\" \n      [options] =\"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n       <!--Quality-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('quality')\">\n        <label for=\"quality\">{{getPropertyLabel('quality')}}: </label>\n        <input type=\"text\" class=\"form-control\" required [(ngModel)]=\"item.quality\">\n      </div>\n      \n      <!--Materials-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n        <label for=\"materials\">{{getPropertyLabel('materials')}}: </label>\n        <select-input [items]=\"item.p('materials') | async\" \n        (updated)=\"updateProperty('materials', $event)\"     \n        [options]=\"item.fields['materials'].p('possibleValues') | async\"></select-input>\n      </div> \n        \n      <!--Location-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('location')\">\n        <label for=\"location\">{{getPropertyLabel('location')}}: </label>\n        <select-input-1 [items]=\"item.p('location') | async\" \n        (updated)=\"updateProperty('location', $event)\"     \n        [options]=\"item.fields['location'].p('possibleValues') | async\"></select-input-1>\n      </div>   \n      \n      <!--Causes-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('causes')\">\n        <label for=\"causes\">{{getPropertyLabel('causes')}}: </label>\n        <select-input [items]=\"item.p('causes') | async\" \n        (updated)=\"updateProperty('causes', $event)\"     \n        [options]=\"item.fields['causes'].p('possibleValues') | async\"></select-input>\n      </div> \n      \n      <!--Effects-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('effects')\">\n        <label for=\"effects\">{{getPropertyLabel('effects')}}: </label>\n        <select-input [items]=\"item.p('effects') | async\" \n        (updated)=\"updateProperty('effects', $event)\"     \n        [options]=\"item.fields['effects'].p('possibleValues') | async\"></select-input>\n      </div> \n       \n      <ng-content></ng-content>   \n         \n    </template-panel>\n  ",
            directives: [panel_template_1.TemplatePanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MeasurablePanel);
    return MeasurablePanel;
}(panel_template_1.TemplatePanel));
exports.MeasurablePanel = MeasurablePanel;
//# sourceMappingURL=panel.measurable.js.map