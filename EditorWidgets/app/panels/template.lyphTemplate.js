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
var core_1 = require('@angular/core');
var component_select_1 = require('../components/component.select');
var component_templateValue_1 = require('../components/component.templateValue');
var template_template_1 = require("./template.template");
var template_borderTemplate_1 = require("./template.borderTemplate");
var utils_model_1 = require("../services/utils.model");
var BorderTemplate = utils_model_1.model.BorderTemplate, Coalescence = utils_model_1.model.Coalescence, ProcessTemplate = utils_model_1.model.ProcessTemplate;
var LyphTemplatePanel = (function (_super) {
    __extends(LyphTemplatePanel, _super);
    function LyphTemplatePanel() {
        _super.apply(this, arguments);
        this.BorderTemplate = BorderTemplate;
        this.Coalescence = Coalescence;
        this.ProcessTemplate = ProcessTemplate;
    }
    LyphTemplatePanel = __decorate([
        core_1.Component({
            selector: 'lyphTemplate-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <template-panel [item]=\"item\" \n      [ignore]   = \"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--Thickness-->\n        <template-value *ngIf = \"includeProperty('thickness')\" \n          [caption] = \"getPropertyLabel('thickness')\" \n          [item] = \"item.thickness\"\n          (updated) = \"updateProperty('thickness', $event)\">\n        </template-value>\n        <ng-content select=\"dimensionGroup\"></ng-content> \n              \n        <!--Coalescences-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('coalescences')\">      \n          <label for=\"coalescences\">{{getPropertyLabel('coalescences')}}: </label>\n          <select-input [items] = \"item.coalescences\" \n            (updated) = \"updateProperty('coalescences', $event)\"  \n            [options] = \"Coalescence.p('all') | async\"></select-input>\n        </div>  \n        \n      <!--Incoming processes-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('incomingProcesses')\">      \n          <label for=\"incomingProcesses\">{{getPropertyLabel('incomingProcesses')}}: </label>\n          <select-input [items] = \"item.incomingProcesses\" \n            (updated) = \"updateProperty('incomingProcesses', $event)\"  \n            [options] = \"ProcessTemplate.p('all') | async\"></select-input>\n        </div>\n      \n      <!--Outgoing processes-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('outgoingProcesses')\">      \n          <label for=\"outgoingProcesses\">{{getPropertyLabel('outgoingProcesses')}}: </label>\n          <select-input [items] = \"item.outgoingProcesses\" \n            (updated) = \"updateProperty('outgoingProcesses', $event)\"   \n            [options] = \"ProcessTemplate.p('all') | async\"></select-input>\n        </div>   \n  \n  <!--      <fieldset *ngIf=\"includeProperty('borders')\" >  \n          <legend>Borders</legend>\n          \n          &lt;!&ndash;InnerBorder&ndash;&gt;\n          <div class=\"input-control\">      \n            <label for=\"innerBorder\">{{getPropertyLabel('innerBorder')}}: </label>\n            <borderTemplate-panel [item]=\"item.innerBorder\" \n              (added)  =\"addTemplate('innerBorder', templateName.BorderTemplate)\"\n              (saved)  =\"updateProperty('innerBorder', $event)\"    \n              (removed)=\"removeTemplate('innerBorder', $event)\">\n            </borderTemplate-panel>\n          </div>\n        \n          &lt;!&ndash;OuterBorder&ndash;&gt;        \n          <div class=\"input-control\">      \n            <label for=\"outerBorder\">{{getPropertyLabel('outerBorder')}}: </label>\n            <borderTemplate-panel [item]=\"item.outerBorder\" \n              (added)  =\"addTemplate('outerBorder', templateName.BorderTemplate)\"\n              (saved)  =\"updateProperty('outerBorder', $event)\"    \n              (removed)=\"removeTemplate('outerBorder', $event)\">\n            </borderTemplate-panel>\n          </div>\n          \n          <ng-content select=\"borderGroup\"></ng-content>\n        </fieldset>-->\n        \n      <ng-content></ng-content>      \n  \n    </template-panel>\n  ",
            directives: [component_select_1.MultiSelectInput, component_select_1.SingleSelectInput, component_templateValue_1.TemplateValue, template_template_1.TemplatePanel, template_borderTemplate_1.BorderTemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], LyphTemplatePanel);
    return LyphTemplatePanel;
}(template_template_1.TemplatePanel));
exports.LyphTemplatePanel = LyphTemplatePanel;
//# sourceMappingURL=template.lyphTemplate.js.map