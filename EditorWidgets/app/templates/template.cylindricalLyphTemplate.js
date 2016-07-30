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
 * Created by Natallia on 6/21/2016.
 */
var core_1 = require('@angular/core');
var component_select_1 = require('../components/component.select');
var component_templateValue_1 = require('../components/component.templateValue');
var template_lyphTemplate_1 = require("./template.lyphTemplate");
var template_borderTemplate_1 = require("../templates/template.borderTemplate");
var CylindricalLyphTemplatePanel = (function (_super) {
    __extends(CylindricalLyphTemplatePanel, _super);
    function CylindricalLyphTemplatePanel() {
        _super.apply(this, arguments);
    }
    CylindricalLyphTemplatePanel = __decorate([
        core_1.Component({
            selector: 'cylindricalLyphTemplate-panel',
            inputs: ['item', 'dependencies', 'ignore', 'options'],
            template: "\n    <lyphTemplate-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n    \n      <borderGroup>\n        <!--MinusBorder-->\n        <div class=\"input-control\">      \n          <label for=\"minusBorder\">Minus border: </label>\n          <borderTemplate-panel [item]=\"item.minusBorder\" \n            [dependencies]=\"dependencies\" \n            (added)  =\"addTemplate('minusBorder', borderTemplate)\"\n            (saved)  =\"updateProperty('minusBorder', $event)\"    \n            (removed)=\"removeTemplate('minusBorder', $event)\">\n          </borderTemplate-panel>\n        </div>\n      \n        <!--PlusBorder-->        \n        <div class=\"input-control\">      \n          <label for=\"plusBorder\">Plus border: </label>\n          <borderTemplate-panel [item]=\"item.plusBorder\" \n            [dependencies]=\"dependencies\" \n            (added)  =\"addTemplate('plusBorder', borderTemplate)\"\n            (saved)  =\"updateProperty('plusBorder', $event)\"    \n            (removed)=\"removeTemplate('plusBorder', $event)\">\n          </borderTemplate-panel>\n        </div>\n          \n      </borderGroup>\n    <ng-content></ng-content>      \n    \n    </lyphTemplate-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.SingleSelectInput, template_lyphTemplate_1.LyphTemplatePanel, template_borderTemplate_1.BorderTemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], CylindricalLyphTemplatePanel);
    return CylindricalLyphTemplatePanel;
}(template_lyphTemplate_1.LyphTemplatePanel));
exports.CylindricalLyphTemplatePanel = CylindricalLyphTemplatePanel;
//# sourceMappingURL=template.cylindricalLyphTemplate.js.map