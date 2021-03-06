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
var template_groupTemplate_1 = require("./template.groupTemplate");
var utils_model_1 = require("../services/utils.model");
var OmegaTreePartTemplate = utils_model_1.model.OmegaTreePartTemplate;
var OmegaTreeTemplatePanel = (function (_super) {
    __extends(OmegaTreeTemplatePanel, _super);
    function OmegaTreeTemplatePanel() {
        _super.apply(this, arguments);
        this.OmegaTreePartTemplate = OmegaTreePartTemplate;
    }
    OmegaTreeTemplatePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('cardinalityMultipliers').add('treeParent').add('treeChildren');
    };
    OmegaTreeTemplatePanel = __decorate([
        core_1.Component({
            selector: 'omegaTreeTemplate-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <groupTemplate-panel [item]=\"item\" \n      [ignore]=\"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--TreeParent-->\n      <div  *ngIf=\"includeProperty('type')\" class=\"input-control\">\n        <label for=\"treeParent\">{{getPropertyLabel('treeParent')}}: </label>\n        <select-input-1 [item] = \"item.p('treeParent') | async\"\n         (updated) = \"updateProperty('treeParent', $event)\"    \n         [options] = \"OmegaTreePartTemplate.p('all') | async\"></select-input-1>\n      </div>\n      \n      <!--TreeChildren-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('treeChildren')\">\n        <label for=\"treeChildren\">{{getPropertyLabel('treeChildren')}}: </label>\n        <select-input \n          [items]=\"item.p('treeChildren') | async\" \n          (updated)=\"updateProperty('treeChildren', $event)\" \n          [options]=\"OmegaTreePartTemplate.p('all') | async\"></select-input>\n      </div>  \n      \n      <ng-content></ng-content>      \n    \n    </groupTemplate-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput, template_groupTemplate_1.GroupTemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], OmegaTreeTemplatePanel);
    return OmegaTreeTemplatePanel;
}(template_groupTemplate_1.GroupTemplatePanel));
exports.OmegaTreeTemplatePanel = OmegaTreeTemplatePanel;
//# sourceMappingURL=template.omegaTreeTemplate.js.map