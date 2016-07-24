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
var panel_resource_1 = require("./panel.resource");
var component_select_1 = require('../components/component.select');
var repo_template_1 = require('../repos/repo.template');
var CoalescencePanel = (function (_super) {
    __extends(CoalescencePanel, _super);
    function CoalescencePanel() {
        _super.apply(this, arguments);
    }
    CoalescencePanel = __decorate([
        core_1.Component({
            selector: 'coalescence-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <resource-panel [item] = \"item\" \n      [(dependencies)] = \"dependencies\" \n      [ignore] = \"ignore\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n      <!--InterfaceLayers-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('interfaceLayers')\">\n          <label for=\"interfaceLayers\">Interface layers: </label>\n          <select-input [items]=\"item.interfaceLayers\" \n          (updated)=\"updateProperty('interfaceLayers', $event)\"          \n          [options]=\"dependencies.lyphs\"></select-input>\n        </div>\n        \n      <!--Lyphs-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('lyphs')\">\n          <repo-template caption='Lyphs' [items]=\"item.lyphs\" \n          (updated)=\"updateProperty('lyphs', $event)\"          \n          [dependencies]=\"dependencies\"\n          [types]=\"[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]\"></repo-template>\n        </div>\n\n        <ng-content></ng-content>      \n\n    </resource-panel>\n  ",
            directives: [panel_resource_1.ResourcePanel, component_select_1.MultiSelectInput, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [])
    ], CoalescencePanel);
    return CoalescencePanel;
}(panel_resource_1.ResourcePanel));
exports.CoalescencePanel = CoalescencePanel;
//# sourceMappingURL=panel.coalescence.js.map