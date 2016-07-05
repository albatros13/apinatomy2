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
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var panel_type_1 = require("./panel.type");
var component_general_1 = require('../component.general');
var ng2_radio_group_1 = require("ng2-radio-group");
var template_nodeType_1 = require('../templates/template.nodeType');
var pipe_general_1 = require("../../transformations/pipe.general");
var ProcessTypePanel = (function (_super) {
    __extends(ProcessTypePanel, _super);
    function ProcessTypePanel() {
        _super.apply(this, arguments);
        this.saved = new core_1.EventEmitter();
        this.transportPhenomenon = service_apinatomy2_1.TransportPhenomenon;
    }
    ProcessTypePanel.prototype.addProperty = function (property) {
        this.item[property] = new service_apinatomy2_1.NodeTemplate({ name: "T: " + property + " " + this.item.name });
        if (this.dependencies) {
            if (!this.dependencies.templates)
                this.dependencies.templates = [];
            this.dependencies.templates.push(this.item[property]);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProcessTypePanel.prototype, "saved", void 0);
    ProcessTypePanel = __decorate([
        core_1.Component({
            selector: 'processType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"['externals']\" \n            (saved)    = \"saved.emit($event)\"\n            (canceled) = \"canceled.emit($event)\"\n            (removed)  = \"removed.emit($event)\">\n\n        <!--TransportPhenomenon-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('transportPhenomenon')\">\n          <fieldset>\n            <legend>Transport phenomenon:</legend>\n            <check-group [(ngModel)]=\"item.transportPhenomenon\" [required]=\"true\">\n               <input type=\"checkbox\" [value]=\"transportPhenomenon.diffusion\">{{transportPhenomenon.diffusion}}&nbsp;\n               <input type=\"checkbox\" [value]=\"transportPhenomenon.advection\">{{transportPhenomenon.advection}}<br/>\n             </check-group>\n          </fieldset>\n        </div>\n        \n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" [(ngModel)]=\"item.species\">\n        </div>\n        \n        <!--Measurables-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-template caption='Measurables' [items]=\"item.measurables\" \n          (updated)=\"updateProperty('measurables', $event)\" \n          [dependencies]=\"dependencies\" [types]=\"[templateName.MeasurableTemplate]\"></repo-template>\n        </div>\n        \n        <!--MeasurableProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurableProviders')\">\n          <label for=\"measurableProviders\">Inherits measurables from: </label>\n          <select-input [items]=\"item.measurableProviders\" \n          (updated)=\"updateProperty('measurableProviders', $event)\" \n          [options]=\"dependencies.processes\"></select-input>\n        </div>\n        \n        <!--Materials-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n          <label for=\"meterials\">Materials: </label>\n          <select-input [items]=\"item.materials\" \n          (updated)=\"updateProperty('materials', $event)\" \n          [options]=\"dependencies.materials\"></select-input>\n        </div>        \n        \n         <!--MaterialProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materialProviders')\">\n          <label for=\"materialProviders\">Inherits materials from: </label>\n          <select-input [items]=\"item.materialProviders\" \n          (updated)=\"updateProperty('materialProviders', $event)\" \n          [options]=\"dependencies.processes\"></select-input>\n        </div>\n        \n        <!--Segments-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('segments')\">\n          <repo-template caption='Segments' [items]=\"item.segments\" \n          (updated)=\"updateProperty('segments', $event)\" \n          [dependencies]=\"dependencies\" [types]=\"[templateName.ProcessTemplate]\"></repo-template>\n        </div>\n        \n        <!--SegmentProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('segmentProviders')\">\n          <label for=\"segmentProviders\">Inherits segments from: </label>\n          <select-input [items]=\"item.segmentProviders\" \n          (updated)=\"updateProperty('segmentProviders', $event)\" \n          [options]=\"dependencies.processes\"></select-input>\n        </div>\n        \n        <!--Channels-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('channels')\">\n          <repo-template caption='Channels' [items]=\"item.channels\" \n          (updated)=\"updateProperty('channels', $event)\"           \n          [dependencies]=\"dependencies\" [types]=\"[templateName.ProcessTemplate]\"></repo-template>\n        </div>\n        \n        <!--ChannelProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('channelProviders')\">\n          <label for=\"channelProviders\">Inherits channels from: </label>\n          <select-input [items]=\"item.channelProviders\" \n          (updated)=\"updateProperty('channelProviders', $event)\"           \n          [options]=\"dependencies.channels\"></select-input>\n        </div>\n        \n        <!--Source-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('source')\">      \n          <label for=\"source\">Source: </label>\n          <select-input-1 [item] = \"item.source\" \n            (updated)=\"updateProperty('source', $event)\"   \n            [options] = \"dependencies.templates | filterByClass: [templateName.NodeTemplate]\"></select-input-1>\n          <edit-toolbar *ngIf=\"!item.source\" [options]=\"[templateName.NodeTemplate]\" \n            (added)=\"addProperty('source', $event)\"></edit-toolbar>\n          <nodeTemplate-panel *ngIf=\"item.source\" [item]=\"item.source\" \n            [dependencies]=\"{types: dependencies.nodes, templates: dependencies.templates}\" \n            (saved)=\"updateProperty('source', $event)\"    \n            (removed)=\"updateProperty('source', null)\">            \n          </nodeTemplate-panel>\n        </div>\n        \n        <!--Target-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('target')\">      \n          <label for=\"target\">Target: </label>\n          <select-input-1 [item] = \"item.target\" \n            (updated)=\"updateProperty('target', $event)\"   \n            [options] = \"dependencies.templates | filterByClass: [templateName.NodeTemplate]\"></select-input-1>\n          <edit-toolbar *ngIf=\"!item.target\" [options]=\"[templateName.NodeTemplate]\" \n            (added)=\"addProperty('target', $event)\"></edit-toolbar>\n          <nodeTemplate-panel *ngIf=\"item.target\" [item]=\"item.target\" \n            [dependencies]=\"{types: dependencies.nodes, templates: dependencies.templates}\" \n            (saved)=\"updateProperty('target', $event)\"    \n            (removed)=\"updateProperty('target', null)\">\n          </nodeTemplate-panel>\n        </div>        \n    <ng-content></ng-content>      \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, component_general_1.MultiSelectInput, component_general_1.SingleSelectInput, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, template_nodeType_1.NodeTemplatePanel, component_general_1.EditToolbar],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [])
    ], ProcessTypePanel);
    return ProcessTypePanel;
}(panel_type_1.TypePanel));
exports.ProcessTypePanel = ProcessTypePanel;
//# sourceMappingURL=panel.processType.js.map