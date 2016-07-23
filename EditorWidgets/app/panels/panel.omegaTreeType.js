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
var panel_groupType_1 = require("./panel.groupType");
var component_select_1 = require('../components/component.select');
var pipe_general_1 = require("../transformations/pipe.general");
var repo_template_1 = require('../repos/repo.template');
var OmegaTreeTypePanel = (function (_super) {
    __extends(OmegaTreeTypePanel, _super);
    function OmegaTreeTypePanel() {
        _super.apply(this, arguments);
    }
    OmegaTreeTypePanel = __decorate([
        core_1.Component({
            selector: 'omegaTreeType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <groupType-panel [item]=\"item\" \n      [(dependencies)] = \"dependencies\" \n      [ignore] = \"ignore.concat(['elements'])\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n      <!--Root-->\n      <!--<div class=\"input-control\" *ngIf=\"includeProperty('root')\">      \n        <label for=\"cause\">Root: </label>\n        <select-input-1 [item] = \"item.root\" \n          (updated)=\"updateProperty('root', $event)\"   \n          [options] = \"dependencies.templates | filterByClass: [templateName.NodeTemplate]\"></select-input-1>\n      </div>-->\n      \n      <!--Levels-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('levels')\">\n         <repo-template caption=\"Levels\" [items] = \"item.elements\" \n         (updated)=\"updateProperty('elements', $event)\"\n         [dependencies] = \"dependencies\" [types]=\"[\n           templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]\"></repo-template>\n      </div>\n      \n      <!--Subtrees-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('subtrees')\">\n         <repo-template caption=\"Subtrees\" [items] = \"item.subtrees\" \n         (updated)=\"updateProperty('subtrees', $event)\"\n         [dependencies] = \"dependencies\" [types]=\"[\n           templateName.OmegaTreeTemplate]\"></repo-template>\n      </div>\n      \n      <ng-content></ng-content>      \n    \n    </groupType-panel>\n  ",
            directives: [panel_groupType_1.GroupTypePanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput, repo_template_1.RepoTemplate],
            pipes: [pipe_general_1.FilterByClass]
        }), 
        __metadata('design:paramtypes', [])
    ], OmegaTreeTypePanel);
    return OmegaTreeTypePanel;
}(panel_groupType_1.GroupTypePanel));
exports.OmegaTreeTypePanel = OmegaTreeTypePanel;
//# sourceMappingURL=panel.omegaTreeType.js.map