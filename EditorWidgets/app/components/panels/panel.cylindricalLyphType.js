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
var panel_lyphType_1 = require("./panel.lyphType");
var component_general_1 = require('../component.general');
var repo_template_1 = require('../repos/repo.template');
var template_borderType_1 = require('../templates/template.borderType');
var pipe_general_1 = require("../../transformations/pipe.general");
var CylindricalLyphTypePanel = (function (_super) {
    __extends(CylindricalLyphTypePanel, _super);
    function CylindricalLyphTypePanel() {
        _super.apply(this, arguments);
    }
    CylindricalLyphTypePanel = __decorate([
        core_1.Component({
            selector: 'cylindricalLyphType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <lyphType-panel [item]=\"item\" \n      [(dependencies)]=\"dependencies\" \n      [ignore]=\"ignore\" \n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n        <!--SegmentProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('segmentProviders')\">\n          <label for=\"segmentProviders\">Inherits segments from: </label>\n          <select-input [items]=\"item.segmentProviders\" \n          (updated)=\"updateProperty('segmentProviders', $event)\"\n          [options]=\"dependencies.cylindricalLyphs\"></select-input>\n        </div>\n        \n        <!--Segments-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('segments')\">\n          <repo-template caption=\"Segments\" [items] = \"item.segments\" \n          (updated)=\"updateProperty('segments', $event)\"\n          [dependencies] = \"dependencies\"\n            [types]=\"[templateName.LyphTemplate]\"></repo-template>\n        </div>\n        \n        <!--minusBorder-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('minusBorder')\">      \n          <label for=\"item.minusBorder\">Minus border: </label>\n          <borderTemplate-panel [item]=\"item.minusBorder\" \n            [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n            (saved)=\"updateProperty('minusBorder', $event)\"    \n            (removed)=\"updateProperty('minusBorder', null)\">\n          </borderTemplate-panel>\n        </div>\n        \n        <!--plusBorder-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('plusBorder')\">   \n           <label for=\"item.minusBorder\">Plus border: </label>\n          <borderTemplate-panel [item]=\"item.plusBorder\" \n            [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n            (saved)=\"updateProperty('plusBorder', $event)\"    \n            (removed)=\"updateProperty('plusBorder', null)\">\n          </borderTemplate-panel>\n        </div>\n        \n        <ng-content></ng-content>\n    \n    </lyphType-panel>\n  ",
            directives: [panel_lyphType_1.LyphTypePanel, component_general_1.MultiSelectInput, component_general_1.SingleSelectInput, repo_template_1.RepoTemplate, template_borderType_1.BorderTemplatePanel, component_general_1.EditToolbar],
            pipes: [pipe_general_1.FilterByClass, pipe_general_1.FilterBy]
        }), 
        __metadata('design:paramtypes', [])
    ], CylindricalLyphTypePanel);
    return CylindricalLyphTypePanel;
}(panel_lyphType_1.LyphTypePanel));
exports.CylindricalLyphTypePanel = CylindricalLyphTypePanel;
//# sourceMappingURL=panel.cylindricalLyphType.js.map