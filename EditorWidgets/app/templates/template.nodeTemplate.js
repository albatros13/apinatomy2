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
var template_template_1 = require("./template.template");
var NodeTemplatePanel = (function (_super) {
    __extends(NodeTemplatePanel, _super);
    function NodeTemplatePanel() {
        _super.apply(this, arguments);
    }
    NodeTemplatePanel = __decorate([
        core_1.Component({
            selector: 'nodeTemplate-panel',
            inputs: ['item', 'dependencies', 'ignore', 'options'],
            template: "\n    <template-panel [item]=\"item\" \n      [types]=\"dependencies.nodes\"\n      [ignore]=\"ignore.add('cardinality')\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n      <ng-content></ng-content>      \n\n    </template-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.SingleSelectInput, template_template_1.TemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], NodeTemplatePanel);
    return NodeTemplatePanel;
}(template_template_1.TemplatePanel));
exports.NodeTemplatePanel = NodeTemplatePanel;
//# sourceMappingURL=template.nodeTemplate.js.map