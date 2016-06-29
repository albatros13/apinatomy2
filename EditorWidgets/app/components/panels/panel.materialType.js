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
var panel_type_1 = require("./panel.type");
var component_general_1 = require('../component.general');
// import {RepoMeasurableTypeTemplate} from '../templates/template.measurableType';
var MaterialTypePanel = (function (_super) {
    __extends(MaterialTypePanel, _super);
    function MaterialTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    MaterialTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'materialType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" \n      [dependencies] = \"dependencies\" \n      (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n        <div class=\"input-control\" *ngIf=\"includeProperty('inheritsMaterials')\">\n          <label for=\"inheritsMaterials\">Inherits materials: </label>\n          <select-input [item]=\"item.inheritsMaterials\" [options]=\"dependencies.materialTypes\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n            <label for=\"meterials\">Materials: </label>\n            <select-input [item]=\"item.materials\" [options]=\"dependencies.materialTypes\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('inheritsMeasurables')\">\n          <label for=\"inheritsMeasurables\">Inherits measurables: </label>\n          <select-input [item]=\"item.inheritsMeasurables\" [options]=\"dependencies.materialTypes\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('measurables')\">\n          <repo-template caption='Measurables' [items]=\"item.measurables\" [dependencies]=\"dependencies.measurableTypes\"></repo-template>\n        </div>\n        <ng-content></ng-content>\n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel, component_general_1.MultiSelectInput] //, RepoMeasurableTypeTemplate]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], MaterialTypePanel);
    return MaterialTypePanel;
}(panel_type_1.TypePanel));
exports.MaterialTypePanel = MaterialTypePanel;
//# sourceMappingURL=panel.materialType.js.map