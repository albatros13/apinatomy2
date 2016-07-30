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
var service_apinatomy2_1 = require("../services/service.apinatomy2");
var panel_measurableLocation_1 = require("./panel.measurableLocation");
var component_select_1 = require('../components/component.select');
var ng2_radio_group_1 = require("ng2-radio-group");
var template_nodeTemplate_1 = require('../templates/template.nodeTemplate');
var pipe_general_1 = require("../transformations/pipe.general");
var ProcessTypePanel = (function (_super) {
    __extends(ProcessTypePanel, _super);
    function ProcessTypePanel() {
        _super.apply(this, arguments);
        this.transportPhenomenon = service_apinatomy2_1.TransportPhenomenon;
    }
    ProcessTypePanel.prototype.ngOnInit = function () {
        if (!this.item.transportPhenomenon)
            this.item.transportPhenomenon = [];
    };
    ProcessTypePanel = __decorate([
        core_1.Component({
            selector: 'processType-panel',
            inputs: ['item', 'ignore', 'dependencies', "options"],
            template: "\n    <measurableLocation-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]  =\"ignore\"\n      [options] =\"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n        <!--TransportPhenomenon-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('transportPhenomenon')\">\n          <fieldset>\n            <legend>Transport phenomenon:</legend>\n            <checkbox-group [(ngModel)]=\"item.transportPhenomenon\" [required]=\"true\">\n               <input type=\"checkbox\" [value]=\"transportPhenomenon.diffusion\">{{transportPhenomenon.diffusion}}&nbsp;\n               <input type=\"checkbox\" [value]=\"transportPhenomenon.advection\">{{transportPhenomenon.advection}}<br/>\n             </checkbox-group>\n          </fieldset>\n        </div>\n        \n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"item.species\">\n        </div>\n        \n        <!--Measurables-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-template caption='Measurables' [items]=\"item.measurables\" \n          (updated)=\"updateProperty('measurables', $event)\" \n          [dependencies]=\"dependencies\" [types]=\"[templateName.MeasurableTemplate]\"></repo-template>\n        </div>\n        \n        <!--MeasurableProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurableProviders')\">\n          <label for=\"measurableProviders\">Inherits measurables from: </label>\n          <select-input [items]=\"item.measurableProviders\" \n          (updated)=\"updateProperty('measurableProviders', $event)\" \n          [options]=\"dependencies.processes\"></select-input>\n        </div>\n        \n        <!--Materials-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n          <label for=\"meterials\">Materials: </label>\n          <select-input [items]=\"item.materials\" \n          (updated)=\"updateProperty('materials', $event)\" \n          [options]=\"dependencies.materials\"></select-input>\n        </div>        \n        \n         <!--MaterialProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materialProviders')\">\n          <label for=\"materialProviders\">Inherits materials from: </label>\n          <select-input [items]=\"item.materialProviders\" \n          (updated)=\"updateProperty('materialProviders', $event)\" \n          [options]=\"dependencies.processes\"></select-input>\n        </div>\n        \n        <!--Segments-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('segments')\">\n          <repo-template caption='Segments' [items]=\"item.segments\" \n          (updated)=\"updateProperty('segments', $event)\" \n          [dependencies]=\"dependencies\" [types]=\"[templateName.ProcessTemplate]\">\n          </repo-template>\n        </div>\n        \n        <!--SegmentProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('segmentProviders')\">\n          <label for=\"segmentProviders\">Inherits segments from: </label>\n          <select-input [items]=\"item.segmentProviders\" \n          (updated)=\"updateProperty('segmentProviders', $event)\" \n          [options]=\"dependencies.processes\"></select-input>\n        </div>\n        \n        <!--Channels-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('channels')\">\n          <repo-template caption='Channels' [items]=\"item.channels\" \n          (updated)=\"updateProperty('channels', $event)\"           \n          [dependencies]=\"dependencies\" [types]=\"[templateName.ProcessTemplate]\"></repo-template>\n        </div>\n        \n        <!--ChannelProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('channelProviders')\">\n          <label for=\"channelProviders\">Inherits channels from: </label>\n          <select-input [items]=\"item.channelProviders\" \n          (updated)=\"updateProperty('channelProviders', $event)\"           \n          [options]=\"dependencies.channels\"></select-input>\n        </div>      \n       \n    <ng-content></ng-content>      \n    </measurableLocation-panel>\n  ",
            directives: [panel_measurableLocation_1.MeasurableLocationPanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, template_nodeTemplate_1.NodeTemplatePanel],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [])
    ], ProcessTypePanel);
    return ProcessTypePanel;
}(panel_measurableLocation_1.MeasurableLocationPanel));
exports.ProcessTypePanel = ProcessTypePanel;
//# sourceMappingURL=panel.processType.js.map