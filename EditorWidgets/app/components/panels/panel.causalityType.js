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
var panel_type_1 = require("./panel.type");
var template_measurableType_1 = require('../templates/template.measurableType');
var component_general_1 = require('../component.general');
var service_apinatomy2_1 = require('../../providers/service.apinatomy2');
var pipe_general_1 = require("../../transformations/pipe.general");
var CausalityTypePanel = (function (_super) {
    __extends(CausalityTypePanel, _super);
    function CausalityTypePanel() {
        _super.apply(this, arguments);
    }
    CausalityTypePanel.prototype.addProperty = function (property) {
        this.item[property] = new service_apinatomy2_1.MeasurableTemplate({ name: "T: " + property + " " + this.item.name });
        if (this.dependencies) {
            if (!this.dependencies.templates)
                this.dependencies.templates = [];
            this.dependencies.templates.push(this.item[property]);
        }
    };
    CausalityTypePanel = __decorate([
        core_1.Component({
            selector: 'causalityType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"['externals']\"  \n            (saved)    = \"saved.emit($event)\"\n            (canceled) = \"canceled.emit($event)\"\n            (removed)  = \"removed.emit($event)\">\n      \n      <!--Cause-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('cause')\">      \n        <label for=\"cause\">Cause: </label>\n        <select-input-1 [item] = \"item.cause\" \n          (updated)=\"updateProperty('cause', $event)\"    \n          [options] = \"dependencies.templates | filterByClass: [templateName.MeasurableTemplate]\"></select-input-1>\n        <edit-toolbar *ngIf=\"!item.cause\" [options]=\"[templateName.MeasurableTemplate]\" \n          (added)=\"addProperty('cause', $event)\"></edit-toolbar>\n        <measurableTemplate-panel [item]=\"item.cause\" \n          [dependencies]=\"{types: dependencies.measurables, templates: dependencies.templates}\" \n          (saved)=\"updateProperty('cause', $event)\"    \n          (removed)=\"updateProperty('cause', null)\">\n        </measurableTemplate-panel>\n      </div>\n      \n      <!--Effect-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('effect')\">      \n        <label for=\"effect\">Effect: </label>\n        <select-input-1 [item] = \"item.effect\" \n          (updated)=\"updateProperty('effect', $event)\"    \n          [options] = \"dependencies.templates | filterByClass: [templateName.MeasurableTemplate]\"></select-input-1>\n        <edit-toolbar *ngIf=\"!item.effect\" [options]=\"[templateName.MeasurableTemplate]\" \n          (added)=\"addProperty('effect', $event)\"></edit-toolbar>\n        <measurableTemplate-panel *ngIf=\"item.effect\" \n          [item]=\"item.effect\" \n          [dependencies]=\"{types: dependencies.measurables, templates: dependencies.templates}\" \n          (saved)=\"updateProperty('effect', $event)\"    \n          (removed)=\"updateProperty('effect',null)\">\n        </measurableTemplate-panel>\n      </div>\n      <ng-content></ng-content>      \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, template_measurableType_1.MeasurableTemplatePanel, component_general_1.EditToolbar, component_general_1.SingleSelectInput],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [])
    ], CausalityTypePanel);
    return CausalityTypePanel;
}(panel_type_1.TypePanel));
exports.CausalityTypePanel = CausalityTypePanel;
//# sourceMappingURL=panel.causalityType.js.map