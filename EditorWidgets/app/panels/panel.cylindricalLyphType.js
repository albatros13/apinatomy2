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
var component_select_1 = require('../components/component.select');
var repo_template_1 = require('../repos/repo.template');
var template_borderTemplate_1 = require('../templates/template.borderTemplate');
var pipe_general_1 = require("../transformations/pipe.general");
var CylindricalLyphTypePanel = (function (_super) {
    __extends(CylindricalLyphTypePanel, _super);
    function CylindricalLyphTypePanel() {
        _super.apply(this, arguments);
    }
    CylindricalLyphTypePanel = __decorate([
        core_1.Component({
            selector: 'cylindricalLyphType-panel',
            inputs: ['item', 'ignore', 'dependencies', 'options'],
            template: "\n    <lyphType-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"ignore\" \n      [options] =\"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n              \n        <providerGroup>\n          <!--SegmentProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('segmentProviders', 'providers')\">\n            <label for=\"segmentProviders\">Inherits segments from: </label>\n            <select-input [items]=\"item.segmentProviders\" \n            (updated)=\"updateProperty('segmentProviders', $event)\"\n            [options]=\"dependencies.cylindricalLyphs\"></select-input>\n          </div>\n        </providerGroup>     \n        \n        <relationGroup>\n          <!--Segments-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('segments', 'relations')\">\n            <repo-template caption=\"Segments\" [items] = \"item.segments\" \n            [ignore]=\"ignore.add('cardinality')\"\n            (updated)=\"updateProperty('segments', $event)\"\n            [dependencies] = \"dependencies\"\n              [types]=\"[templateName.LyphTemplate]\"></repo-template>\n          </div>\n        </relationGroup>\n        \n        <borderGroup>\n          <!--MinusBorder-->\n          <div class=\"input-control\">      \n            <label for=\"minusBorder\">Minus border: </label>\n            <borderTemplate-panel [item]=\"item.minusBorder\" \n              [dependencies]=\"dependencies\" \n              [options]=\"borderPanelOptions\"\n              (added)  =\"addTemplate('minusBorder', borderTemplate)\"\n              (saved)  =\"updateProperty('minusBorder', $event)\"    \n              (removed)=\"removeTemplate('minusBorder', $event)\">\n            </borderTemplate-panel>\n          </div>\n        \n          <!--PlusBorder-->        \n          <div class=\"input-control\">      \n            <label for=\"plusBorder\">Plus border: </label>\n            <borderTemplate-panel [item]=\"item.plusBorder\" \n              [dependencies]=\"dependencies\" \n              [options]=\"borderPanelOptions\"\n              (added)  =\"addTemplate('plusBorder', borderTemplate)\"\n              (saved)  =\"updateProperty('plusBorder', $event)\"    \n              (removed)=\"removeTemplate('plusBorder', $event)\">\n            </borderTemplate-panel>\n          </div>\n          \n        </borderGroup>\n        \n        <ng-content></ng-content>\n    \n    </lyphType-panel>\n  ",
            directives: [panel_lyphType_1.LyphTypePanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput,
                repo_template_1.RepoTemplate, template_borderTemplate_1.BorderTemplatePanel, template_borderTemplate_1.BorderTemplatePanel],
            pipes: [pipe_general_1.FilterByClass, pipe_general_1.FilterBy]
        }), 
        __metadata('design:paramtypes', [])
    ], CylindricalLyphTypePanel);
    return CylindricalLyphTypePanel;
}(panel_lyphType_1.LyphTypePanel));
exports.CylindricalLyphTypePanel = CylindricalLyphTypePanel;
//# sourceMappingURL=panel.cylindricalLyphType.js.map