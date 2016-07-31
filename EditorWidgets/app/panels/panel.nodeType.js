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
 * Created by Natallia on 6/19/2016.
 */
var core_1 = require('@angular/core');
var panel_measurableLocationType_1 = require("./panel.measurableLocationType");
var repo_template_1 = require('../repos/repo.template');
var NodeTypePanel = (function (_super) {
    __extends(NodeTypePanel, _super);
    function NodeTypePanel() {
        _super.apply(this, arguments);
    }
    NodeTypePanel = __decorate([
        core_1.Component({
            selector: 'nodeType-panel',
            inputs: ['item', 'ignore', 'dependencies', 'options'],
            template: "\n    <measurableLocationType-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"ignore\"\n      [options] =\"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n      <ng-content></ng-content>   \n      \n      <relationGroup>\n      <!--Channels-->\n      <repo-template caption=\"Channels\" [items] = \"item.channels\" \n        (updated)=\"updateProperty('channels', $event)\"     \n        [dependencies] = \"dependencies\" [types]=\"[templateName.NodeTemplate]\"></repo-template>\n  \n        <ng-content select=\"relationGroup\"></ng-content>\n      </relationGroup>\n    \n    </measurableLocationType-panel>\n  ",
            directives: [panel_measurableLocationType_1.MeasurableLocationTypePanel, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [])
    ], NodeTypePanel);
    return NodeTypePanel;
}(panel_measurableLocationType_1.MeasurableLocationTypePanel));
exports.NodeTypePanel = NodeTypePanel;
//# sourceMappingURL=panel.nodeType.js.map