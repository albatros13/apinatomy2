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
var component_general_1 = require('../component.general');
var component_template_1 = require('../component.template');
var panel_resource_1 = require("../panels/panel.resource");
var TemplatePanel = (function (_super) {
    __extends(TemplatePanel, _super);
    function TemplatePanel() {
        _super.apply(this, arguments);
    }
    TemplatePanel = __decorate([
        core_1.Component({
            selector: 'template-panel',
            inputs: ['item', 'dependencies'],
            template: "\n    <resource-panel [item]=\"item\" \n      [ignore]=\"['externals']\"  \n            (saved)    = \"saved.emit($event)\"\n            (canceled) = \"canceled.emit($event)\"\n            (removed)  = \"removed.emit($event)\">\n      <div class=\"input-control\">\n        <label for=\"type\">Type: </label>\n        <select-input-1 [item] = \"item.type\"\n         (updated)=\"updateProperty('type', $event)\"    \n         [options] = \"dependencies.types\"></select-input-1>\n      </div>\n      <fieldset>\n        <legend>Template:</legend>\n        <template-value caption=\"Cardinality base:\" [item]=\"item.cardinalityBase\"></template-value>\n        <div class=\"input-control\" *ngIf=\"includeProperty('cardinalityMultipliers')\">\n          <label for=\"cardinalityMultipliers\">Cardinality multipliers: </label>\n            <select-input [items]=\"item.cardinalityMultipliers\" \n            (updated)=\"updateProperty('cardinalityMultipliers', $event)\"          \n            [options]=\"dependencies.templates\"></select-input>  \n        </div>\n        <ng-content></ng-content>           \n      </fieldset>\n    </resource-panel>\n  ",
            directives: [component_template_1.TemplateValue, component_general_1.SingleSelectInput, component_general_1.MultiSelectInput, panel_resource_1.ResourcePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], TemplatePanel);
    return TemplatePanel;
}(panel_resource_1.ResourcePanel));
exports.TemplatePanel = TemplatePanel;
//# sourceMappingURL=template.type.js.map