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
var LyphTypePanel = (function (_super) {
    __extends(LyphTypePanel, _super);
    function LyphTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    LyphTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'lyphType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <materialType-panel [item]=\"item\" \n        [dependencies]=\"dependencies\" \n        (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n        <div class=\"input-control\" *ngIf=\"includeProperty('species')\">\n          <label for=\"species\">Species: </label>\n          <input type=\"text\" [(ngModel)]=\"item.species\">\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('layerProviders')\">\n          <label for=\"layerProviders\">Inherits layers from: </label>\n          <select-input [item]=\"item.layerProviders\" [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('patchProviders')\">\n          <label for=\"patchProviders\">Inherits patches from: </label>\n          <select-input [item]=\"item.patchProviders\" [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('partProviders')\">\n          <label for=\"partProviders\">Inherits parts from: </label>\n          <select-input [item]=\"item.partProviders\" [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n        <br/>\n        <div class=\"input-control\" *ngIf=\"includeProperty('layers')\">\n          <repo-template caption=\"Layers\" [items] = \"item.layers\" [dependencies] = \"dependencies\" \n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate, templateName.NodeTemplate]\"></repo-template>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('patches')\">\n          <repo-template caption=\"Patches\" [items] = \"item.patches\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('parts')\">\n          <repo-template caption=\"Parts\" [items] = \"item.parts\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('processes')\">\n          <repo-template caption=\"Processes\" [items] = \"item.processes\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.ProcessTemplate]\"></repo-template>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('nodes')\">\n          <repo-template caption=\"Nodes\" [items] = \"item.nodes\" [dependencies] = \"dependencies\"\n          [types] = \"[templateName.NodeTemplate]\"></repo-template>\n        </div>\n        <!--InnerBorder-->\n        <!--OuterBorder-->\n        <ng-content></ng-content>\n    </materialType-panel>\n  ",
            directives: [panel_materialType_1.MaterialTypePanel, component_general_1.MultiSelectInput, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], LyphTypePanel);
    return LyphTypePanel;
}(panel_materialType_1.MaterialTypePanel));
exports.LyphTypePanel = LyphTypePanel;
//# sourceMappingURL=panel.lyphType.js.map