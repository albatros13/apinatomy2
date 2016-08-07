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
var open_physiology_model_1 = require("open-physiology-model");
var OmegaTreeTypePanel = (function (_super) {
    __extends(OmegaTreeTypePanel, _super);
    function OmegaTreeTypePanel() {
        _super.apply(this, arguments);
        this.NodeTemplate = open_physiology_model_1.NodeTemplate;
    }
    OmegaTreeTypePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore.add('supertypes').add('subtypes'); //.add('elements');
    };
    OmegaTreeTypePanel.prototype.onPropertyUpdate = function (event) {
        this.propertyUpdated.emit(event);
    };
    OmegaTreeTypePanel = __decorate([
        core_1.Component({
            selector: 'omegaTreeType-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <groupType-panel [item]=\"item\" \n      [ignore] = \"ignore\"\n      [options] = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"onPropertyUpdate($event)\">\n      \n      <!--Root-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('root')\">      \n        <label for=\"root\">Root: </label>\n        <select-input [item] = \"item.p('root') | async\" \n          (updated) = \"updateProperty('root', $event)\"   \n          [options] = \"NodeTemplate.p('all') | async\"></select-input>\n      </div>\n      \n      <!-- <relationGroup>\n        &lt;!&ndash;Parts&ndash;&gt;\n        <div class=\"input-control\" *ngIf=\"includeProperty('parts')\">\n           <repo-template caption=\"Parts\" \n           [items] = \"item.p('parts') | async | setToArray\" \n           (updated)=\"updateProperty('parts', $event)\"\n           [options]=\"{linked: true}\"\n           [types]=\"[templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]\"></repo-template>\n        </div>\n         <ng-content select=\"relationGroup\"></ng-content> \n      </relationGroup>-->\n\n      <ng-content></ng-content> \n    \n    </groupType-panel>\n  ",
            directives: [panel_groupType_1.GroupTypePanel, component_select_1.MultiSelectInput, component_select_1.SingleSelectInput, repo_template_1.RepoTemplate],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], OmegaTreeTypePanel);
    return OmegaTreeTypePanel;
}(panel_groupType_1.GroupTypePanel));
exports.OmegaTreeTypePanel = OmegaTreeTypePanel;
//# sourceMappingURL=panel.omegaTreeType.js.map