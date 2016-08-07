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
var ng2_radio_group_1 = require("ng2-radio-group");
var pipe_general_1 = require("../transformations/pipe.general");
var open_physiology_model_1 = require("open-physiology-model");
var ProcessTemplatePanel = (function (_super) {
    __extends(ProcessTemplatePanel, _super);
    function ProcessTemplatePanel() {
        _super.apply(this, arguments);
        this.LyphType = open_physiology_model_1.LyphType;
        this.NodeTemplate = open_physiology_model_1.NodeTemplate;
        this.LyphTemplate = open_physiology_model_1.LyphTemplate;
    }
    ProcessTemplatePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
    };
    ProcessTemplatePanel.prototype.onSourceLyphChanged = function (lyph) {
        _super.prototype.updateProperty.call(this, "sourceLyph", lyph);
    };
    ProcessTemplatePanel.prototype.onTargetLyphChanged = function (lyph) {
        _super.prototype.updateProperty.call(this, "targetLyph", lyph);
    };
    ProcessTemplatePanel.prototype.onSourceChanged = function (node) {
        _super.prototype.updateProperty.call(this, "source", node);
    };
    ProcessTemplatePanel.prototype.onTargetChanged = function (node) {
        _super.prototype.updateProperty.call(this, "target", node);
    };
    ProcessTemplatePanel = __decorate([
        core_1.Component({
            selector: 'processTemplate-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <template-panel [item]=\"item\" \n      [ignore]   = \"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--TransportPhenomenon-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('transportPhenomenon')\">\n        <fieldset>\n          <legend>Transport phenomenon:</legend>\n          <radio-group [(ngModel)]=\"item.transportPhenomenon\" [required]=\"true\">\n             <input type=\"radio\" value=\"diffusion\">diffusion&nbsp;\n             <input type=\"radio\" value=\"advection\">advection<br/>\n           </radio-group>\n        </fieldset>\n      </div>\n      \n      <!--ConveyingLyph-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('conveyingLyph')\">\n        <label for=\"conveyingLyph\">Conveying lyph: </label>\n        <select-input-1 [item] = \"item.p('conveyingLyph') | async\"\n         (updated) = \"updateProperty('conveyingLyph', $event)\"    \n         [options] = \"LyphType.p('all') | async\"></select-input-1>\n      </div>\n      \n      <!--SourceContainer-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('sourceLyph')\">      \n        <label for=\"sourceLyph\">Source lyph: </label>\n        <select-input-1 [item] = \"item.sourceLyph\" \n          (updated) = \"onSourceLyphChanged($event)\"  \n          [options] = \"LyphTemplate.p('all') | async\"></select-input-1>\n      </div>\n      \n      <!--TargetContainer-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('targetLyph')\">      \n        <label for=\"targetLyph\">Target lyph: </label>\n        <select-input-1 [item] = \"item.targetLyph\" \n          (updated) = \"onTargetLyphChanged($event)\"   \n          [options] = \"LyphTemplate.p('all') | async\"></select-input-1>\n      </div>        \n      \n      <!--Source-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('source')\">      \n        <label for=\"source\">Source: </label>\n        <select-input-1 [item] = \"item.source\" \n          (updated) = \"onSourceChanged($event)\"   \n          [options] = \"NodeTemplate.p('all') | async\"></select-input-1>\n      </div>\n      \n      <!--Target-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('target')\">      \n        <label for=\"target\">Target: </label>\n        <select-input-1 [item] = \"item.target\" \n          (updated) = \"onTargetChanged($event)\"  \n          [options] = \"NodeTemplate.p('all') | async\"></select-input-1>\n      </div>        \n      \n      <ng-content></ng-content>      \n    \n    </template-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.SingleSelectInput, template_template_1.TemplatePanel, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [])
    ], ProcessTemplatePanel);
    return ProcessTemplatePanel;
}(template_template_1.TemplatePanel));
exports.ProcessTemplatePanel = ProcessTemplatePanel;
//# sourceMappingURL=template.processTemplate.js.map