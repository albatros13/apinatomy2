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
var service_restore_1 = require("../services/service.restore");
var panel_type_1 = require("./panel.type");
var component_select_1 = require('../components/component.select');
var repo_template_1 = require('../repos/repo.template');
var service_apinatomy2_1 = require("../services/service.apinatomy2");
var MaterialTypePanel = (function (_super) {
    __extends(MaterialTypePanel, _super);
    function MaterialTypePanel() {
        _super.apply(this, arguments);
        this.measurablesToReplicate = [];
        this.supertypeMeasurables = [];
    }
    MaterialTypePanel.prototype.onPropertyUpdated = function (event) {
        var property = event.properties;
        if (property == "supertypes") {
            var supertypes = event.values;
            this.supertypeMeasurables = [];
            for (var _i = 0, supertypes_1 = supertypes; _i < supertypes_1.length; _i++) {
                var supertype = supertypes_1[_i];
                if (supertype.measurables) {
                    var supertypeMeasurables = Array.from(new Set(supertype.measurables.map(function (item) { return item.type; })));
                    for (var _a = 0, supertypeMeasurables_1 = supertypeMeasurables; _a < supertypeMeasurables_1.length; _a++) {
                        var supertypeMeasurable = supertypeMeasurables_1[_a];
                        if (this.supertypeMeasurables.indexOf(supertypeMeasurable) < 0)
                            this.supertypeMeasurables.push(supertypeMeasurable);
                    }
                }
            }
            this.measurablesToReplicate = Array.from(this.supertypeMeasurables);
        }
        this.propertyUpdated.emit(event);
    };
    MaterialTypePanel.prototype.onSaved = function (event) {
        for (var _i = 0, _a = this.measurablesToReplicate; _i < _a.length; _i++) {
            var measurable = _a[_i];
            var newMeasurable = new service_apinatomy2_1.MeasurableType(measurable);
            delete newMeasurable["id"];
            //newMeasurable.materials = [this.item];
            if (this.dependencies && this.dependencies.measurables) {
                this.dependencies.measurables.push(newMeasurable);
            }
        }
        this.saved.emit(event);
    };
    MaterialTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'materialType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [(dependencies)] = \"dependencies\" [ignore]=\"ignore\"\n      (saved)    = \"onSaved($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"onPropertyUpdated($event)\">\n        \n        <!--Materials-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n            <label for=\"materials\">Materials: </label>\n            <select-input \n              [items]=\"item.materials\" \n              (updated)=\"updateProperty('materials', $event)\" \n              [options]=\"dependencies.materials\"></select-input>\n        </div>\n        \n        <!--MaterialProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('materialProviders')\">\n          <label for=\"materialProviders\">Inherits materials from: </label>\n          <select-input \n            [items]=\"item.materialProviders\" \n            (updated)=\"updateProperty('materialProviders', $event)\" \n            [options]=\"dependencies.materials\"></select-input>\n        </div>\n        \n        <!--Measurables-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-template caption='Measurables' \n          [items]=\"item.measurables\" \n          (updated)=\"updateProperty('measurables', $event)\" \n          [dependencies]=\"dependencies\"\n          [types]=\"[templateName.MeasurableTemplate]\"></repo-template>\n        </div>\n\n        <!--MeasurableProviders-->\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurableProviders')\">\n          <label for=\"measurableProviders\">Inherits measurables from: </label>\n          <select-input [items]=\"item.measurableProviders\" \n          (updated)=\"updateProperty('measurableProviders', $event)\" \n          [options]=\"dependencies.materials\"></select-input>\n        </div>\n\n        <!--Auxilliary field: measurables to generate-->\n        <div class=\"generate-control\">\n          <label for=\"measurablesToReplicate\"><img class=\"icon\" src=\"images/measurableType.png\"/> Measurables to generate </label>\n          <select-input [items]=\"measurablesToReplicate\" \n            (updated)=\"measurablesToReplicate = $event\"\n            [options]=\"supertypeMeasurables\">\n          </select-input>\n        </div>\n\n        <ng-content></ng-content>\n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, component_select_1.MultiSelectInput, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [])
    ], MaterialTypePanel);
    return MaterialTypePanel;
}(panel_type_1.TypePanel));
exports.MaterialTypePanel = MaterialTypePanel;
//# sourceMappingURL=panel.materialType.js.map