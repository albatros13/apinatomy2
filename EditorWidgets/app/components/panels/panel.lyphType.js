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
 * Created by Natallia on 6/17/2016.
 */
var core_1 = require('@angular/core');
var panel_materialType_1 = require("./panel.materialType");
var component_general_1 = require('../component.general');
var repo_template_1 = require('../repos/repo.template');
var service_apinatomy2_1 = require('../../providers/service.apinatomy2');
var template_borderType_1 = require('../templates/template.borderType');
var pipe_general_1 = require("../../transformations/pipe.general");
var LyphTypePanel = (function (_super) {
    __extends(LyphTypePanel, _super);
    function LyphTypePanel() {
        _super.apply(this, arguments);
    }
    LyphTypePanel.prototype.addProperty = function (property) {
        this.item[property] = new service_apinatomy2_1.BorderTemplate({ name: "T: " + property + " " + this.item.name });
        if (this.dependencies) {
            if (!this.dependencies.templates)
                this.dependencies.templates = [];
            this.dependencies.templates.push(this.item[property]);
        }
    };
    LyphTypePanel.prototype.onProcessAdded = function (process) {
        if (process)
            process.conveyingLyph = this.item;
    };
    LyphTypePanel = __decorate([
        core_1.Component({
            selector: 'lyphType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <materialType-panel [item]=\"item\" \n        [(dependencies)]=\"dependencies\" \n        [ignore]=\"ignore\"\n        (saved)    = \"saved.emit($event)\"\n        (canceled) = \"canceled.emit($event)\"\n        (removed)  = \"removed.emit($event)\"\n        (propertyUpdated) = \"propertyUpdated.emit($event)\">\n        \n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" [(ngModel)]=\"item.species\">\n        </div>\n\n        <!--Layers-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('layers')\">\n          <repo-template caption=\"Layers\" \n          [items] = \"item.layers\" \n          (updated)=\"updateProperty('layers', $event)\" \n          [dependencies] = \"dependencies\" \n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate, templateName.NodeTemplate]\"></repo-template>\n        </div>\n        \n        <!--LayerProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('layerProviders')\">\n          <label for=\"layerProviders\">Inherits layers from: </label>\n          <select-input [items]=\"item.layerProviders\" \n          (updated)=\"updateProperty('layerProviders', $event)\" \n          [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n\n        <!--Patches-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('patches')\">\n          <repo-template caption=\"Patches\" [items] = \"item.patches\" \n          (updated)=\"updateProperty('patches', $event)\" \n          [dependencies] = \"dependencies\"\n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n        \n        <!--PatchProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('patchProviders')\">\n          <label for=\"patchProviders\">Inherits patches from: </label>\n          <select-input [items]=\"item.patchProviders\" \n          (updated)=\"updateProperty('patchProviders', $event)\" \n          [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n\n        <!--Parts-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('parts')\">\n          <repo-template caption=\"Parts\" \n          [items] = \"item.parts\" \n          (updated)=\"updateProperty('parts', $event)\" \n          [dependencies] = \"dependencies\"\n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n        \n        <!--PartProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('partProviders')\">\n          <label for=\"partProviders\">Inherits parts from: </label>\n          <select-input [items]=\"item.partProviders\"\n          (updated)=\"updateProperty('partProviders', $event)\" \n          [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n\n        <!--Processes-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('processes')\">\n          <repo-template caption=\"Processes\" \n          [items] = \"item.processes\" [dependencies] = \"dependencies\"\n          (updated)=\"updateProperty('processes', $event)\"           \n          [types] = \"[templateName.ProcessTemplate]\" (added)=\"onProcessAdded($event)\"></repo-template>\n        </div>\n        \n        <!--Nodes-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('nodes')\">\n          <repo-template caption=\"Nodes\" \n          [items] = \"item.nodes\" \n          (updated)=\"updateProperty('nodes', $event)\"\n          [dependencies] = \"dependencies\"\n          [types] = \"[templateName.NodeTemplate]\"></repo-template>\n        </div>\n        \n        <!--InnerBorder-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('innerBorder')\">      \n          <label for=\"item.innerBorder\">Inner border: </label>\n          <borderTemplate-panel [item]=\"item.innerBorder\" \n            [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n            (saved)=\"updateProperty('innerBorder', $event)\"    \n            (removed)=\"updateProperty('innerBorder', null)\">\n          </borderTemplate-panel>\n        </div>\n        \n        <!--OuterBorder-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('outerBorder')\">      \n          <label for=\"item.outerBorder\">Outer border: </label>\n          <borderTemplate-panel [item]=\"item.outerBorder\" \n            [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n            (saved)=\"updateProperty('outerBorder', $event)\"    \n            (removed)=\"updateProperty('outerBorder', null)\">\n          </borderTemplate-panel>\n        </div>            \n        \n        <ng-content></ng-content>\n        \n    </materialType-panel>\n  ",
            directives: [panel_materialType_1.MaterialTypePanel, component_general_1.MultiSelectInput, component_general_1.SingleSelectInput, repo_template_1.RepoTemplate, template_borderType_1.BorderTemplatePanel, component_general_1.EditToolbar],
            pipes: [pipe_general_1.FilterByClass, pipe_general_1.FilterBy]
        }), 
        __metadata('design:paramtypes', [])
    ], LyphTypePanel);
    return LyphTypePanel;
}(panel_materialType_1.MaterialTypePanel));
exports.LyphTypePanel = LyphTypePanel;
//# sourceMappingURL=panel.lyphType.js.map