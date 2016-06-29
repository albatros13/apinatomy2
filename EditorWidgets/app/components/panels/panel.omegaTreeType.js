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
var service_restore_1 = require("../../providers/service.restore");
var panel_groupType_1 = require("./panel.groupType");
var component_general_1 = require('../component.general');
var OmegaTreeTypePanel = (function (_super) {
    __extends(OmegaTreeTypePanel, _super);
    function OmegaTreeTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    OmegaTreeTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'omegaTreeType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <groupType-panel \n      [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n      <ng-content></ng-content>      \n    </groupType-panel>\n  ",
            directives: [panel_groupType_1.GroupTypePanel, component_general_1.MultiSelectInput]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], OmegaTreeTypePanel);
    return OmegaTreeTypePanel;
}(panel_groupType_1.GroupTypePanel));
exports.OmegaTreeTypePanel = OmegaTreeTypePanel;
//# sourceMappingURL=panel.omegaTreeType.js.map