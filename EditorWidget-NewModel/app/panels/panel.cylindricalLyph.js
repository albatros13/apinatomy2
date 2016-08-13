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
 * Created by Natallia on 6/17/2016.
 */
var core_1 = require('@angular/core');
var panel_lyph_1 = require("./panel.lyph");
var component_select_1 = require('../components/component.select');
var repo_nested_1 = require('../repos/repo.nested');
var panel_border_1 = require('./panel.border');
var pipe_general_1 = require("../transformations/pipe.general");
var component_templateValue_1 = require('../components/component.templateValue');
var utils_model_1 = require("../services/utils.model");
var CylindricalLyph = utils_model_1.model.CylindricalLyph;
var CylindricalLyphPanel = (function (_super) {
    __extends(CylindricalLyphPanel, _super);
    function CylindricalLyphPanel() {
        _super.apply(this, arguments);
        this.CylindricalLyph = CylindricalLyph;
        this.segmentsIgnore = new Set();
    }
    CylindricalLyphPanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.segmentsIgnore = new Set(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
        this.ignore = this.ignore.add('cardinalityMultipliers').add('treeParent').add('treeChildren');
        console.log("PlusBorder", this.item.plusBorder.nature);
        console.log("MinusBorder", this.item.minusBorder.nature);
        console.log("InnerBorder", this.item.innerBorder.nature);
        console.log("OuterBorder", this.item.outerBorder.nature);
    };
    CylindricalLyphPanel = __decorate([
        core_1.Component({
            selector: 'cylindricalLyph-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <lyph-panel [item]=\"item\" \n      [ignore]=\"ignore\" \n      [options] =\"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--Length-->\n      <dimensionGroup>\n        <template-value *ngIf=\"includeProperty('length')\" \n            [caption]=\"getPropertyLabel('length')\" \n            [item]=\"item.length\"\n            (updated)=\"updateProperty('length', $event)\">\n        </template-value>\n      </dimensionGroup>\n        \n      <!--TreeParent-->\n      <div  *ngIf=\"includeProperty('treeParent')\" class=\"input-control\">\n        <label for=\"treeParent\">{{getPropertyLabel('treeParent')}}: </label>\n        <select-input-1 [item] = \"item.p('treeParent') | async\"\n         (updated) = \"updateProperty('treeParent', $event)\"    \n         [options] = \"item.fields['treeParent'].p('possibleValues') | async\"></select-input-1>\n      </div>\n      \n      <!--TreeChildren-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('treeChildren')\">\n        <label for=\"treeChildren\">{{getPropertyLabel('treeChildren')}}: </label>\n        <select-input \n          [items]=\"item.p('treeChildren') | async\" \n          (updated)=\"updateProperty('treeChildren', $event)\" \n          [options]=\"item.fields['treeChildren'].p('possibleValues') | async\"></select-input>\n      </div> \n        \n        <ng-content></ng-content>   \n              \n        <relationGroup>\n          <!--Segments-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('segments', 'relations')\">\n            <repo-nested [caption]=\"getPropertyLabel('segments')\" \n            [items] = \"item.p('segments') | async | setToArray\" \n            [ignore]=\"segmentsIgnore\"\n            (updated)=\"updateProperty('segments', $event)\"\n            [types]=\"[ResourceName.CylindricalLyph]\"></repo-nested>\n          </div>\n        </relationGroup>\n        \n        <borderGroup>\n          <!--MinusBorder-->\n          <div class=\"input-control\">      \n            <label for=\"minusBorder\">{{getPropertyLabel('minusBorder')}}: </label>\n            <border-panel [item]=\"item.p('minusBorder') | async\" \n              [options]=\"borderPanelOptions\"\n              (saved)  =\"updateProperty('minusBorder', $event)\"    \n              (removed)=\"removeTemplate('minusBorder', $event)\">\n            </border-panel>\n          </div>\n        \n          <!--PlusBorder-->        \n          <div class=\"input-control\">      \n            <label for=\"plusBorder\">{{getPropertyLabel('plusBorder')}}: </label>\n            <border-panel [item]=\"item.p('plusBorder') | async\" \n              [options]=\"borderPanelOptions\"\n              (saved)  =\"updateProperty('plusBorder', $event)\"    \n              (removed)=\"removeTemplate('plusBorder', $event)\">\n            </border-panel>\n          </div>\n          \n        </borderGroup>        \n    \n    </lyph-panel>\n  ",
            directives: [panel_lyph_1.LyphPanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput,
                repo_nested_1.RepoNested, panel_border_1.BorderPanel, panel_border_1.BorderPanel, component_templateValue_1.TemplateValue],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], CylindricalLyphPanel);
    return CylindricalLyphPanel;
}(panel_lyph_1.LyphPanel));
exports.CylindricalLyphPanel = CylindricalLyphPanel;
//# sourceMappingURL=panel.cylindricalLyph.js.map