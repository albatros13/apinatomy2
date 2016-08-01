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
var component_select_1 = require('../components/component.select');
var repo_template_1 = require('../repos/repo.template');
var pipe_general_1 = require("../transformations/pipe.general");
var template_borderTemplate_1 = require("../templates/template.borderTemplate");
var open_physiology_model_1 = require("open-physiology-model");
var LyphTypePanel = (function (_super) {
    __extends(LyphTypePanel, _super);
    function LyphTypePanel() {
        _super.apply(this, arguments);
        this.LyphType = open_physiology_model_1.LyphType;
        this.borderPanelOptions = { 'hideSave': true, 'hideRestore': true };
        this.layersIgnore = new Set();
        this.patchesIgnore = new Set();
        this.partsIgnore = new Set();
    }
    LyphTypePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.layersIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers']);
        this.patchesIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers']);
        this.partsIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers']);
    };
    LyphTypePanel.prototype.onProcessAdded = function (process) {
        if (process)
            process.conveyingLyph = this.item;
    };
    LyphTypePanel.prototype.onProcessRemoved = function (process) {
        if (process && (process.conveyingLyph == this.item))
            process.conveyingLyph = null;
    };
    LyphTypePanel = __decorate([
        core_1.Component({
            selector: 'lyphType-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <materialType-panel [item]=\"item\" \n        [ignore]=\"ignore\"\n        [options] =\"options\"\n        (saved)    = \"saved.emit($event)\"\n        (canceled) = \"canceled.emit($event)\"\n        (removed)  = \"removed.emit($event)\"\n        (propertyUpdated) = \"propertyUpdated.emit($event)\">\n        \n        <!--Species-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"item.species\">\n        </div>\n         \n           \n        \n        <providerGroup>\n          <!--LayerProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('layerProviders')\">\n            <label for=\"layerProviders\">Inherits layers from: </label>\n            <select-input [items]=\"item.p('layerProviders') | async\" \n            (updated)=\"updateProperty('layerProviders', $event)\" \n            [options]=\"LyphType.p('all') | async\"></select-input>\n          </div>\n            \n          <!--PatchProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('patchProviders')\">\n            <label for=\"patchProviders\">Inherits patches from: </label>\n            <select-input [items]=\"item.p('patchProviders') | async\" \n            (updated)=\"updateProperty('patchProviders', $event)\" \n            [options]=\"LyphType.p('all') | async\"></select-input>\n          </div>\n          \n          <!--PartProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('partProviders')\">\n            <label for=\"partProviders\">Inherits parts from: </label>\n            <select-input [items]=\"item.p('partProviders') | async\"\n            (updated)=\"updateProperty('partProviders', $event)\" \n            [options]=\"LyphType.p('all') | async\"></select-input>\n          </div>\n          <ng-content select=\"providerGroup\"></ng-content>\n        </providerGroup>           \n       \n        <relationGroup>      \n          <!--Layers-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('layers')\">\n            <repo-template caption=\"Layers\" \n            [items]  = \"item.p('layers') | async | setToArray\" \n            [ignore]=\"layersIgnore\"\n            (updated)= \"updateProperty('layers', $event)\" \n            [types]  = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n          </div>          \n  \n          <!--Patches-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('patches')\">\n            <repo-template caption=\"Patches\" \n            [items] = \"item.p('patches') | async | setToArray\" \n            [ignore]=\"patchesIgnore\"\n            (updated)=\"updateProperty('patches', $event)\" \n            [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n          </div>\n                  \n          <!--Parts-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('parts')\">\n            <repo-template caption=\"Parts\" \n            [items] = \"item.p('parts') | async | setToArray\" \n            [ignore]=\"partsIgnore\"\n            (updated)=\"updateProperty('parts', $event)\" \n            [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n          </div>\n          \n          <!--Processes-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('processes')\">\n            <repo-template caption=\"Processes\" \n             [items] = \"item.p('processes') | async | setToArray\" \n             (updated)=\"updateProperty('processes', $event)\"           \n             [types] = \"[templateName.ProcessTemplate]\" \n               (added)  =\"onProcessAdded($event)\" \n               (removed)=\"onProcessRemoved($event)\"></repo-template>\n          </div>\n          \n          <!--Nodes-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('nodes')\">\n            <repo-template caption=\"Nodes\" \n            [items] = \"item.p('nodes') | async | setToArray\" \n            (updated)=\"updateProperty('nodes', $event)\"\n            [types] = \"[templateName.NodeTemplate]\"></repo-template>\n          </div>            \n          <ng-content select=\"relationGroup\"></ng-content>\n        </relationGroup>     \n        \n        <fieldset *ngIf=\"includeProperty('borders')\" >  \n          <legend>Borders</legend>\n          \n          <!--InnerBorder-->\n          <div class=\"input-control\">      \n            <label for=\"innerBorder\">Inner border: </label>\n            <borderTemplate-panel [item]=\"item.innerBorder\" \n              [options]=\"borderPanelOptions\"\n              (added)  =\"addTemplate('innerBorder', templateName.BorderTemplate)\"\n              (saved)  =\"updateProperty('innerBorder', $event)\"    \n              (removed)=\"removeTemplate('innerBorder', $event)\">\n            </borderTemplate-panel>\n          </div>              \n        \n          <!--OuterBorder-->        \n          <div class=\"input-control\">      \n            <label for=\"outerBorder\">Outer border: </label>\n            <borderTemplate-panel [item]=\"item.outerBorder\" \n              [options]=\"borderPanelOptions\"\n              (added)  = \"addTemplate('outerBorder', templateName.BorderTemplate)\"\n              (saved)  = \"updateProperty('outerBorder', $event)\"  \n              (removed)= \"removeTemplate('outerBorder', $event)\">\n            </borderTemplate-panel>\n          </div>\n          \n          <ng-content select=\"borderGroup\"></ng-content>\n        </fieldset>\n        \n       <ng-content></ng-content>   \n        \n    </materialType-panel>\n  ",
            directives: [panel_materialType_1.MaterialTypePanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput,
                repo_template_1.RepoTemplate, template_borderTemplate_1.BorderTemplatePanel],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], LyphTypePanel);
    return LyphTypePanel;
}(panel_materialType_1.MaterialTypePanel));
exports.LyphTypePanel = LyphTypePanel;
//# sourceMappingURL=panel.lyphType.js.map