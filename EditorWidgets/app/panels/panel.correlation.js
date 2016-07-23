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
var panel_resource_1 = require("./panel.resource");
var component_select_1 = require('../components/component.select');
var repo_template_1 = require('../repos/repo.template');
var CorrelationPanel = (function (_super) {
    __extends(CorrelationPanel, _super);
    function CorrelationPanel() {
        _super.apply(this, arguments);
    }
    CorrelationPanel = __decorate([
        core_1.Component({
            selector: 'correlation-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <resource-panel [item]=\"item\" \n      [(dependencies)]=\"dependencies\" \n      [ignore]=\"ignore\" \n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n        <!--Comment-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('comment')\">\n          <label for=\"comment\">Comment: </label>\n          <input type=\"text\" [(ngModel)]=\"item.comment\">\n        </div>\n        \n        <!--Publication-->\n        <div>\n          <label for=\"publication\">Publication: </label>\n          <select-input-1 [item] = \"item.publication\" \n            (updated)=\"updateProperty('publication', $event)\"  \n            [options] = \"dependencies.publications\"></select-input-1>\n        </div>\n        \n        <!--ClinicalIndex-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('clinicalIndices')\">\n          <label for=\"clinicalIndices\">Clinical indices: </label>\n          <select-input [items]=\"item.clinicalIndices\" \n          (updated)=\"updateProperty('clinicalIndices', $event)\"\n          [options]=\"dependencies.clinicalIndices\"></select-input>\n        </div>\n        \n        <!--Measurables-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-template caption='Measurables' [items]=\"item.measurables\" \n          (updated)=\"updateProperty('measurables', $event)\"          \n          [dependencies]=\"dependencies\"\n          [types]=\"[templateName.MeasurableTemplate]\"></repo-template>\n        </div>\n        \n        <ng-content></ng-content>      \n    \n    </resource-panel>\n  ",
            directives: [panel_resource_1.ResourcePanel, component_select_1.SingleSelectInput, component_select_1.MultiSelectInput, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [])
    ], CorrelationPanel);
    return CorrelationPanel;
}(panel_resource_1.ResourcePanel));
exports.CorrelationPanel = CorrelationPanel;
//# sourceMappingURL=panel.correlation.js.map