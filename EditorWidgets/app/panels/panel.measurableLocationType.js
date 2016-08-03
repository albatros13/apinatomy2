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
var component_select_1 = require('../components/component.select');
var repo_template_1 = require('../repos/repo.template');
var open_physiology_model_1 = require("open-physiology-model");
var pipe_general_1 = require("../transformations/pipe.general");
var MeasurableLocationTypePanel = (function (_super) {
    __extends(MeasurableLocationTypePanel, _super);
    function MeasurableLocationTypePanel() {
        _super.apply(this, arguments);
        this.MaterialType = open_physiology_model_1.MaterialType;
        this.MeasurableTemplate = open_physiology_model_1.MeasurableTemplate;
    }
    MeasurableLocationTypePanel = __decorate([
        core_1.Component({
            selector: 'measurableLocationType-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <type-panel [item]=\"item\" \n      [ignore]   = \"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n      \n       <providerGroup>\n          <!--MeasurableProviders-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('measurableProviders')\">\n            <label for=\"measurableProviders\">Measurable providers: </label>\n            <select-input [items]=\"item.p('measurableProviders') | async\" \n            (updated)=\"updateProperty('measurableProviders', $event)\" \n            [options]=\"item.constructor.p('all') | async\"></select-input>\n          </div>\n          <ng-content select=\"providerGroup\"></ng-content>\n       </providerGroup>\n        \n       <relationGroup>\n          <!--Measurables-->\n          <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n            <repo-template caption='Measurables' \n            [items]=\"item.p('measurables') | async | setToArray\" \n            (updated)=\"updateProperty('measurables', $event)\" \n            [types]=\"[templateName.MeasurableTemplate]\"></repo-template>\n          </div>\n           <ng-content select=\"relationGroup\"></ng-content>\n       </relationGroup>      \n      \n       <ng-content></ng-content>      \n\n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, component_select_1.MultiSelectInput, repo_template_1.RepoTemplate],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [])
    ], MeasurableLocationTypePanel);
    return MeasurableLocationTypePanel;
}(panel_type_1.TypePanel));
exports.MeasurableLocationTypePanel = MeasurableLocationTypePanel;
//# sourceMappingURL=panel.measurableLocationType.js.map