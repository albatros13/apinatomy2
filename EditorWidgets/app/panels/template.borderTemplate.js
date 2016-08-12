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
var ng2_radio_group_1 = require("ng2-radio-group");
var pipe_general_1 = require("../transformations/pipe.general");
var utils_model_1 = require("../services/utils.model");
var NodeTemplate = utils_model_1.model.NodeTemplate;
var BorderTemplatePanel = (function (_super) {
    __extends(BorderTemplatePanel, _super);
    function BorderTemplatePanel() {
        _super.apply(this, arguments);
        this.NodeTemplate = NodeTemplate;
        this.added = new core_1.EventEmitter();
        this.saved = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.propertyUpdated = new core_1.EventEmitter();
    }
    BorderTemplatePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('name').add('cardinalityBase').add('cardinalityMultipliers').add('type');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BorderTemplatePanel.prototype, "added", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BorderTemplatePanel.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BorderTemplatePanel.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BorderTemplatePanel.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BorderTemplatePanel.prototype, "propertyUpdated", void 0);
    BorderTemplatePanel = __decorate([
        core_1.Component({
            selector: 'borderTemplate-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n   <!-- <button *ngIf=\"!item\"  type=\"button\" class=\"btn btn-default\" aria-label=\"Add\"\n      (click)  = \"added.emit($event)\"><span class=\"glyphicon glyphicon-plus\"></span>\n    </button>-->\n    \n    <template-panel *ngIf=\"item\" [item]=\"item\" \n      [ignore]=\"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n      <!--Nature: {open, closed}-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('nature')\">\n        <fieldset>\n          <legend>{{getPropertyLabel('nature')}}:</legend>\n          <radio-group [(ngModel)]=\"item.nature\" [required]=\"true\">\n             <input type=\"radio\" value=\"open\">open&nbsp;\n             <input type=\"radio\" value=\"closed\">closed<br/>\n          </radio-group>\n        </fieldset>\n      </div>\n      \n      <!--Nodes-->\n<!--      <div class=\"input-control\" *ngIf=\"includeProperty('nodes')\">\n        <label for=\"nodes\">Nodes: </label>\n          <select-input [items]=\"item.p('nodes') | async\" \n          (updated)=\"updateProperty('nodes', $event)\"          \n          [options]=\"NodeTemplate.p('all') | async\"></select-input>  \n      </div>-->\n      \n      <ng-content></ng-content>   \n         \n    </template-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.SingleSelectInput, component_select_1.MultiSelectInput, template_template_1.TemplatePanel, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [])
    ], BorderTemplatePanel);
    return BorderTemplatePanel;
}(template_template_1.TemplatePanel));
exports.BorderTemplatePanel = BorderTemplatePanel;
//# sourceMappingURL=template.borderTemplate.js.map