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
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var component_general_1 = require('../component.general');
var template_general_1 = require('./template.general');
var panel_resource_1 = require("../panels/panel.resource");
var service_restore_1 = require("../../providers/service.restore");
var LyphTypeTemplate = (function (_super) {
    __extends(LyphTypeTemplate, _super);
    function LyphTypeTemplate(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    LyphTypeTemplate = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'lyphType-template',
            inputs: ['item', 'options'],
            template: "\n    <resource-panel [item]=\"item\" ignore=\"['equivalence', 'weakEquivalence']\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n      <div>\n        <label for=\"type\">Type: </label>\n        <select-input-1 [item] = \"item.type\" [options] = \"options\"></select-input-1>\n      </div>\n      <fieldset>\n        <legend>Template:</legend>\n        <template-value caption=\"Length:\" [item]=\"item.length\"></template-value>\n        <template-value caption=\"Width:\" [item]=\"item.width\"></template-value>\n      </fieldset>\n      <ng-content></ng-content>      \n    </resource-panel>\n  ",
            directives: [template_general_1.TemplateValue, component_general_1.SingleSelectInput, panel_resource_1.ResourcePanel]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], LyphTypeTemplate);
    return LyphTypeTemplate;
}(panel_resource_1.ResourcePanel));
exports.LyphTypeTemplate = LyphTypeTemplate;
var RepoLyphTypeTemplate = (function (_super) {
    __extends(RepoLyphTypeTemplate, _super);
    function RepoLyphTypeTemplate() {
        _super.call(this);
    }
    RepoLyphTypeTemplate = __decorate([
        core_1.Component({
            selector: 'repo-lyphType-template',
            inputs: ['model'],
            template: "\n      <repo-template-wrapper [model]=\"model\">\n        <accordion class=\"list-group\" [closeOthers]=\"true\" dnd-sortable-container [dropZones]=\"['lyphTemplate-zone']\" [sortableData]=\"model.items\">\n          <div *ngFor=\"let item of model.items; let i = index\">\n            <accordion-group class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\n                <div accordion-heading><item-header [item]=\"item\" [icon]=\"'images/lyphType.png'\"></item-header></div>\n                <lyphType-template [item]=\"item\" [options]=\"model.options\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></lyphType-template>\n            </accordion-group>        \n          </div>\n        </accordion>       \n      </repo-template-wrapper>     \n  ",
            directives: [template_general_1.RepoTemplateWrapper, component_general_1.ItemHeader, LyphTypeTemplate, accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoLyphTypeTemplate);
    return RepoLyphTypeTemplate;
}(template_general_1.RepoTemplateWrapper));
exports.RepoLyphTypeTemplate = RepoLyphTypeTemplate;
//# sourceMappingURL=template.lyphType.js.map