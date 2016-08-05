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
var panel_measurableLocationType_1 = require("./panel.measurableLocationType");
var component_select_1 = require('../components/component.select');
var ng2_radio_group_1 = require("ng2-radio-group");
var template_nodeTemplate_1 = require('./template.nodeTemplate');
var pipe_general_1 = require("../transformations/pipe.general");
var open_physiology_model_1 = require("open-physiology-model");
var ProcessTypePanel = (function (_super) {
    __extends(ProcessTypePanel, _super);
    function ProcessTypePanel() {
        _super.apply(this, arguments);
        this.ProcessType = open_physiology_model_1.ProcessType;
        this.MaterialType = open_physiology_model_1.MaterialType;
    }
    ProcessTypePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.item.transportPhenomenon)
            this.item.transportPhenomenon = [];
    };
    ProcessTypePanel = __decorate([
        core_1.Component({
            selector: 'processType-panel',
            inputs: ['item', 'ignore', "options"],
            template: "\n    <measurableLocationType-panel [item]=\"item\" \n      [ignore]  =\"ignore\"\n      [options] =\"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n        \n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"item.species\">\n        </div>\n          \n        <!--TransportPhenomenon-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('transportPhenomenon')\">\n            <fieldset>\n              <legend>Transport phenomenon:</legend>\n              <checkbox-group [(ngModel)]=\"item.transportPhenomenon\" [required]=\"true\">\n                 <input type=\"checkbox\" value=\"diffusion\">diffusion&nbsp;\n                 <input type=\"checkbox\" value=\"advection\">advection<br/>\n               </checkbox-group>\n            </fieldset>\n          </div>\n          \n         <!--Materials-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n          <label for=\"meterials\">Materials: </label>\n          <select-input [items]=\"item.p('materials') | async\" \n          (updated)=\"updateProperty('materials', $event)\" \n           [options]=\"MaterialType.p('all') | async\"></select-input>\n          </div> \n        \n         <relationGroup>\n          <!--Segments-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('segments')\">\n            <repo-template caption='Segments' \n            [items]=\"item.p('segments') | async | setToArray\" \n            (updated)=\"updateProperty('segments', $event)\" \n            [types]=\"[templateName.ProcessTemplate]\">\n            </repo-template>\n          </div>\n          \n          <!--Channels-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('channels')\">\n            <repo-template caption='Channels' \n            [items]=\"item.p('channels') | async | setToArray\" \n            (updated)=\"updateProperty('channels', $event)\"           \n            [types]=\"[templateName.ProcessTemplate]\"></repo-template>\n          </div>\n        \n          <ng-content select=\"relationGroup\"></ng-content>\n        </relationGroup>\n\n        <providerGroup>\n           <!--MaterialProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('materialProviders')\">\n            <label for=\"materialProviders\">Material providers: </label>\n            <select-input [items]=\"item.p('materialProviders') | async\" \n            (updated)=\"updateProperty('materialProviders', $event)\" \n            [options]=\"ProcessType.p('all') | async\"></select-input>\n          </div>\n          \n           <!--SegmentProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('segmentProviders')\">\n            <label for=\"segmentProviders\">Segment providers: </label>\n            <select-input [items]=\"item.p('segmentProviders') | async\" \n            (updated)=\"updateProperty('segmentProviders', $event)\" \n            [options]=\"ProcessType.p('all') | async\"></select-input>\n          </div>\n          \n          <!--ChannelProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('channelProviders')\">\n            <label for=\"channelProviders\">Channel providers: </label>\n            <select-input [items]=\"item.p('channelProviders') | async\" \n            (updated)=\"updateProperty('channelProviders', $event)\"           \n            [options]=\"ProcessType.p('all') | async\"></select-input>\n          </div>     \n          \n           <ng-content select=\"providerGroup\"></ng-content>\n        </providerGroup>\n       \n        <ng-content></ng-content>  \n   \n    </measurableLocationType-panel>\n  ",
            directives: [panel_measurableLocationType_1.MeasurableLocationTypePanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, template_nodeTemplate_1.NodeTemplatePanel],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], ProcessTypePanel);
    return ProcessTypePanel;
}(panel_measurableLocationType_1.MeasurableLocationTypePanel));
exports.ProcessTypePanel = ProcessTypePanel;
//# sourceMappingURL=panel.processType.js.map