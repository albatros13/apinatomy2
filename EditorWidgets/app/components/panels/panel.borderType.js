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
var service_restore_1 = require("../../providers/service.restore");
var panel_type_1 = require("./panel.type");
var repo_template_1 = require('../repos/repo.template');
var BorderTypePanel = (function (_super) {
    __extends(BorderTypePanel, _super);
    function BorderTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    BorderTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'borderType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"['equivalence', 'weakEquivalence']\" \n      (saved)=\"saved.emit($event)\" \n      (removed)=\"removed.emit($event)\">\n      <!--TODO: replace with slider-->\n      <div class=\"input-control\">\n        <label for=\"position\">Position: </label>\n        <input type=\"number\" min=\"0\" max=\"100\" required [(ngModel)]=\"item.position\">\n      </div>\n      <repo-template caption=\"Elements\" [items] = \"item.elements\" \n        [dependencies] = \"dependencies\" [types]=\"[templateName.NodeTemplate]\"></repo-template>\n      <ng-content></ng-content>      \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], BorderTypePanel);
    return BorderTypePanel;
}(panel_type_1.TypePanel));
exports.BorderTypePanel = BorderTypePanel;
//# sourceMappingURL=panel.borderType.js.map