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
var template_general_1 = require('./template.general');
var panel_resource_1 = require("../panels/panel.resource");
var service_restore_1 = require("../../providers/service.restore");
var GroupTypeTemplate = (function (_super) {
    __extends(GroupTypeTemplate, _super);
    function GroupTypeTemplate(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    GroupTypeTemplate = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'lyphType-template',
            inputs: ['item', 'dependencies'],
            template: "\n    <resource-panel [item]=\"item\" ignore=\"['equivalence', 'weakEquivalence']\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n      <div>\n        <label for=\"type\">Type: </label>\n        <select-input-1 [item] = \"item.type\" [options] = \"dependencies\"></select-input-1>\n      </div>\n      <fieldset>\n        <legend>Template:</legend>\n        <template-value caption=\"Cardinality base:\" [item]=\"item.cardinalityBase\"></template-value>\n      </fieldset>\n      <ng-content></ng-content>      \n    </resource-panel>\n  ",
            directives: [template_general_1.TemplateValue, component_general_1.SingleSelectInput, panel_resource_1.ResourcePanel]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], GroupTypeTemplate);
    return GroupTypeTemplate;
}(panel_resource_1.ResourcePanel));
exports.GroupTypeTemplate = GroupTypeTemplate;
//# sourceMappingURL=template.groupType.js.map