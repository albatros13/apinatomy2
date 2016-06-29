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
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var panel_type_1 = require("./panel.type");
var component_general_1 = require('../component.general');
var ng2_radio_group_1 = require("ng2-radio-group");
var ProcessTypePanel = (function (_super) {
    __extends(ProcessTypePanel, _super);
    function ProcessTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
        this.transportPhenomenon = service_apinatomy2_1.TransportPhenomenon;
    }
    ProcessTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'processType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [dependencies]=\"dependencies\" \n      [ignore]=\"['equivalence', 'weakEquivalence']\" \n      (saved)=\"saved.emit($event)\" \n      (removed)=\"removed.emit($event)\">\n        <div class=\"input-control\" *ngIf=\"includeProperty('transportPhenomenon')\">\n          <fieldset>\n            <legend>Transport phenomenon:</legend>\n            <radio-group [(ngModel)]=\"item.transportPhenomenon\" [required]=\"true\">\n               <input type=\"radio\" [value]=\"transportPhenomenon.diffusion\">{{transportPhenomenon.diffusion}}&nbsp;\n               <input type=\"radio\" [value]=\"transportPhenomenon.advection\">{{transportPhenomenon.advection}}<br/>\n             </radio-group>\n          </fieldset>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-template caption='Measurables' [items]=\"item.measurables\" [dependencies]=\"dependencies.measurableTypes\"></repo-template>\n        </div>\n        <ng-content></ng-content>      \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, component_general_1.MultiSelectInput, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], ProcessTypePanel);
    return ProcessTypePanel;
}(panel_type_1.TypePanel));
exports.ProcessTypePanel = ProcessTypePanel;
//# sourceMappingURL=panel.processType.js.map