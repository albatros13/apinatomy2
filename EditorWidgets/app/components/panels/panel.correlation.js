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
var panel_resource_1 = require("./panel.resource");
var component_general_1 = require('../component.general');
var CorrelationPanel = (function (_super) {
    __extends(CorrelationPanel, _super);
    function CorrelationPanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    CorrelationPanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'correlation-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <resource-panel [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"['equivalence', 'weakEquivalence']\" \n      (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n        <div>\n          <label for=\"publication\">Publication: </label>\n          <select-input-1 [item] = \"item.publication\" [options] = \"dependencies.publications\"></select-input-1>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('clinicalIndices')\">\n          <label for=\"clinicalIndices\">Clinical indices: </label>\n          <select-input [item]=\"item.clinicalIndices\" [options]=\"dependencies.clinicalIndices\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('locatedMeasurables')\">\n          <label for=\"locatedMeasurables\">Located measurables: </label>\n          <select-input [item]=\"item.locatedMeasurables\" [options]=\"dependencies.locatedMeasurables\"></select-input>\n        </div>\n        <ng-content></ng-content>      \n    </resource-panel>\n  ",
            directives: [panel_resource_1.ResourcePanel, component_general_1.SingleSelectInput, component_general_1.MultiSelectInput]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], CorrelationPanel);
    return CorrelationPanel;
}(panel_resource_1.ResourcePanel));
exports.CorrelationPanel = CorrelationPanel;
//# sourceMappingURL=panel.correlation.js.map