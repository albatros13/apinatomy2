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
var panel_resource_1 = require("./panel.resource");
var utils_model_1 = require("../services/utils.model");
var TemplatePanel = (function (_super) {
    __extends(TemplatePanel, _super);
    function TemplatePanel() {
        _super.apply(this, arguments);
        this.templateName = utils_model_1.TemplateName;
        this.myIgnore = new Set();
    }
    TemplatePanel.prototype.getTypes = function () {
        return this.item.constructor.relationships['-->HasType'].other.class.p('all');
    };
    TemplatePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.myIgnore = new Set(this.ignore).add('externals');
    };
    TemplatePanel = __decorate([
        core_1.Component({
            selector: 'template-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <resource-panel [item]=\"item\" \n      [ignore]   = \"myIgnore\"  \n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--Type-->\n      <div  *ngIf=\"includeProperty('type')\" class=\"input-control\">\n        <label for=\"type\">Type: </label>\n        <select-input-1 [item] = \"item.type\"\n         (updated)=\"updateProperty('type', $event)\"    \n         [options] = \"getTypes() | async\"></select-input-1>\n      </div>\n    \n      <!--Template-->\n      <!--Cardinality base-->\n      <template-value *ngIf=\"includeProperty('cardinalityBase')\" caption=\"Cardinality base\" \n        [item]=\"item.cardinalityBase\"\n        (updated)=\"updateProperty('cardinalityBase', $event)\"\n      ></template-value>\n      \n      <!--Cardinality multipliers-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('cardinalityMultipliers')\">\n        <label for=\"cardinalityMultipliers\">Cardinality multipliers: </label>\n          <select-input [items]=\"item.p('cardinalityMultipliers') | async\" \n          (updated)=\"updateProperty('cardinalityMultipliers', $event)\"          \n          [options]=\"item.constructor.p('all') | async\"></select-input>  \n      </div>\n\n      <ng-content></ng-content>            \n\n    </resource-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.SingleSelectInput, component_select_1.MultiSelectInput, panel_resource_1.ResourcePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], TemplatePanel);
    return TemplatePanel;
}(panel_resource_1.ResourcePanel));
exports.TemplatePanel = TemplatePanel;
//# sourceMappingURL=template.template.js.map