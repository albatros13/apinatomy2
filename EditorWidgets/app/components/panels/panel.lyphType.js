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
var service_restore_1 = require("../../providers/service.restore");
var panel_materialType_1 = require("./panel.materialType");
var component_general_1 = require('../component.general');
var repo_template_1 = require('../repos/repo.template');
var service_apinatomy2_1 = require('../../providers/service.apinatomy2');
var template_borderType_1 = require('../templates/template.borderType');
var pipe_general_1 = require("../../transformations/pipe.general");
var LyphTypePanel = (function (_super) {
    __extends(LyphTypePanel, _super);
    function LyphTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    LyphTypePanel.prototype.onInnerBorderSelected = function (item) {
    };
    LyphTypePanel.prototype.onOuterBorderSelected = function (item) {
    };
    LyphTypePanel.prototype.onInnerBorderSaved = function () {
    };
    LyphTypePanel.prototype.onOuterBorderSaved = function () {
    };
    LyphTypePanel.prototype.onInnerBorderAdded = function () {
        this.item.innerBorder = new service_apinatomy2_1.BorderTemplate({ name: "T: Inner border " + this.item.name });
        if (this.dependencies) {
            if (!this.dependencies.templates)
                this.dependencies.templates = [];
            this.dependencies.templates.push(this.item.innerBorder);
        }
    };
    LyphTypePanel.prototype.onOuterBorderAdded = function () {
        this.item.outerBorder = new service_apinatomy2_1.BorderTemplate({ name: "T: Outer border " + this.item.name });
        if (this.dependencies) {
            if (!this.dependencies.templates)
                this.dependencies.templates = [];
            this.dependencies.templates.push(this.item.outerBorder);
        }
    };
    LyphTypePanel.prototype.onInnerBorderRemoved = function () {
        this.item.innerBorder = null;
    };
    LyphTypePanel.prototype.onOuterBorderRemoved = function () {
        this.item.outerBorder = null;
    };
    LyphTypePanel.prototype.onProcessAdded = function (process) {
        if (process)
            process.conveyingLyph = this.item;
    };
    LyphTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'lyphType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <materialType-panel [item]=\"item\" \n        [dependencies]=\"dependencies\" \n        (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" [(ngModel)]=\"item.species\">\n        </div>\n\n        <!--Layers-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('layers')\">\n          <repo-template caption=\"Layers\" [items] = \"item.layers\" [dependencies] = \"dependencies\" \n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate, templateName.NodeTemplate]\"></repo-template>\n        </div>\n        \n        <!--LayerProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('layerProviders')\">\n          <label for=\"layerProviders\">Inherits layers from: </label>\n          <select-input [item]=\"item.layerProviders\" [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n\n        <!--Patches-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('patches')\">\n          <repo-template caption=\"Patches\" [items] = \"item.patches\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n        \n        <!--PatchProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('patchProviders')\">\n          <label for=\"patchProviders\">Inherits patches from: </label>\n          <select-input [item]=\"item.patchProviders\" [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n\n        <!--Parts-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('parts')\">\n          <repo-template caption=\"Parts\" [items] = \"item.parts\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n        \n        <!--PartProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('partProviders')\">\n          <label for=\"partProviders\">Inherits parts from: </label>\n          <select-input [item]=\"item.partProviders\" [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n\n        <!--Processes-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('processes')\">\n          <repo-template caption=\"Processes\" [items] = \"item.processes\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.ProcessTemplate]\" (added)=\"onProcessAdded($event)\"></repo-template>\n        </div>\n        \n        <!--Nodes-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('nodes')\">\n          <repo-template caption=\"Nodes\" [items] = \"item.nodes\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.NodeTemplate]\"></repo-template>\n        </div>\n        \n        <!--InnerBorder-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('innerBorder')\">      \n          <label for=\"item.innerBorder\">Inner border: </label>\n          <select-input-1 [item] = \"item.innerBorder\" (selected)=\"onInnerBorderSelected($event)\"\n            [options] = \"dependencies.templates | filterByClass: [templateName.BorderTemplate]\"></select-input-1>\n          <edit-toolbar *ngIf=\"!item.innerBorder\" [options]=\"[templateName.BorderTemplate]\" (added)=\"onInnerBorderAdded($event)\"></edit-toolbar>\n          <borderTemplate-panel *ngIf=\"item.innerBorder\" [item]=\"item.innerBorder\" \n            [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n            (saved)=\"onInnerBorderSaved(item, $event)\" (removed)=\"onInnerBorderRemoved(item)\"></borderTemplate-panel>\n        </div>\n        \n        <!--OuterBorder-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('outerBorder')\">      \n          <label for=\"item.outerBorder\">Outer border: </label>\n          <select-input-1 [item] = \"item.outerBorder\" (selected)=\"onOuterBorderSelected($event)\"\n            [options] = \"dependencies.templates | filterByClass: [templateName.BorderTemplate]\">\n          </select-input-1>\n          <edit-toolbar *ngIf=\"!item.outerBorder\" [options]=\"[templateName.BorderTemplate]\" (added)=\"onOuterBorderAdded($event)\"></edit-toolbar>\n          <borderTemplate-panel *ngIf=\"item.outerBorder\" [item]=\"item.outerBorder\" \n            [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n            (saved)=\"onOuterBorderSaved(item, $event)\" (removed)=\"onOuterBorderRemoved(item)\"></borderTemplate-panel>\n        </div>    \n        \n        <ng-content></ng-content>\n    </materialType-panel>\n  ",
            directives: [panel_materialType_1.MaterialTypePanel, component_general_1.MultiSelectInput, component_general_1.SingleSelectInput, repo_template_1.RepoTemplate, template_borderType_1.BorderTemplatePanel, component_general_1.EditToolbar],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], LyphTypePanel);
    return LyphTypePanel;
}(panel_materialType_1.MaterialTypePanel));
exports.LyphTypePanel = LyphTypePanel;
//# sourceMappingURL=panel.lyphType.js.map