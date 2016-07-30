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
var panel_type_1 = require("./panel.type");
var repo_template_1 = require('../repos/repo.template');
var GroupTypePanel = (function (_super) {
    __extends(GroupTypePanel, _super);
    function GroupTypePanel() {
        _super.apply(this, arguments);
    }
    GroupTypePanel = __decorate([
        core_1.Component({
            selector: 'groupType-panel',
            inputs: ['item', 'ignore', 'dependencies', 'options'],
            template: "\n    <type-panel [item]=\"item\" \n      [ignore]=\"ignore\"\n      [options] =\"options\"\n      [dependencies]=\"dependencies\" \n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n      <!--Elements-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('elements')\">\n         <repo-template caption=\"Elements\" [items] = \"item.elements\" \n         (updated)=\"updateProperty('elements', $event)\"\n         [dependencies] = \"dependencies\" [types]=\"[\n           templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]\"></repo-template>\n      </div>\n      \n      <ng-content></ng-content>      \n    \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [])
    ], GroupTypePanel);
    return GroupTypePanel;
}(panel_type_1.TypePanel));
exports.GroupTypePanel = GroupTypePanel;
//# sourceMappingURL=panel.groupType.js.map