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
var template_measurableType_1 = require('../templates/template.measurableType');
var CausalityTypePanel = (function (_super) {
    __extends(CausalityTypePanel, _super);
    function CausalityTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    CausalityTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'causalityType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"['equivalence', 'weakEquivalence']\" \n      (saved)=\"saved.emit($event)\" \n      (removed)=\"removed.emit($event)\">\n      <div class=\"input-control\" *ngIf=\"includeProperty('cause')\">      \n        <label for=\"cause\">Cause: </label>\n        <measurableTemplate-panel [item]=\"item.cause\" \n          [dependencies]=\"dependencies.measurables\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></measurableTemplate-panel>\n      </div>\n      <div class=\"input-control\" *ngIf=\"includeProperty('effect')\">      \n        <label for=\"effect\">Effect: </label>\n        <measurableTemplate-panel [item]=\"item.effect\" \n          [dependencies]=\"dependencies.measurables\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></measurableTemplate-panel>\n      </div>\n      <ng-content></ng-content>      \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, template_measurableType_1.MeasurableTemplatePanel]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], CausalityTypePanel);
    return CausalityTypePanel;
}(panel_type_1.TypePanel));
exports.CausalityTypePanel = CausalityTypePanel;
//# sourceMappingURL=panel.causalityType.js.map