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
var template_borderTemplate_1 = require("./template.borderTemplate");
//import {OmegaTreePartTemplate} from "open-physiology-model";
var CylindricalLyphTemplatePanel = (function (_super) {
    __extends(CylindricalLyphTemplatePanel, _super);
    function CylindricalLyphTemplatePanel() {
        _super.apply(this, arguments);
    }
    //OmegaTreePartTemplate = OmegaTreePartTemplate;
    CylindricalLyphTemplatePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('cardinalityMultipliers');
    };
    CylindricalLyphTemplatePanel = __decorate([
        core_1.Component({
            selector: 'cylindricalLyphTemplate-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <lyphTemplate-panel [item]=\"item\" \n      [ignore]=\"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--TreeParent-->\n   <!--   <div  *ngIf=\"includeProperty('type')\" class=\"input-control\">\n        <label for=\"type\">Tree parent: </label>\n        <select-input-1 [item] = \"item.p('treeParent') | async\"\n         (updated)=\"updateProperty('treeParent', $event)\"    \n         [options] = \"OmegaTreePartTemplate.p('all') | async\"></select-input-1>\n      </div>-->\n    \n<!--\n      <borderGroup>\n        &lt;!&ndash;MinusBorder&ndash;&gt;\n        <div class=\"input-control\">      \n          <label for=\"minusBorder\">Minus border: </label>\n          <borderTemplate-panel [item]=\"item.minusBorder\" \n            (added)  =\"addTemplate('minusBorder', templateName.BorderTemplate)\"\n            (saved)  =\"updateProperty('minusBorder', $event)\"    \n            (removed)=\"removeTemplate('minusBorder', $event)\">\n          </borderTemplate-panel>\n        </div>\n      \n        &lt;!&ndash;PlusBorder&ndash;&gt;        \n        <div class=\"input-control\">      \n          <label for=\"plusBorder\">Plus border: </label>\n          <borderTemplate-panel [item]=\"item.plusBorder\" \n            (added)  =\"addTemplate('plusBorder', templateName.BorderTemplate)\"\n            (saved)  =\"updateProperty('plusBorder', $event)\"    \n            (removed)=\"removeTemplate('plusBorder', $event)\">\n          </borderTemplate-panel>\n        </div>\n          \n      </borderGroup>\n-->\n    <ng-content></ng-content>      \n    \n    </lyphTemplate-panel>\n  ",
            directives: [component_templateValue_1.TemplateValue, component_select_1.SingleSelectInput, template_lyphTemplate_1.LyphTemplatePanel, template_borderTemplate_1.BorderTemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], CylindricalLyphTemplatePanel);
    return CylindricalLyphTemplatePanel;
}(template_lyphTemplate_1.LyphTemplatePanel));
exports.CylindricalLyphTemplatePanel = CylindricalLyphTemplatePanel;
//# sourceMappingURL=template.cylindricalLyphTemplate.js.map