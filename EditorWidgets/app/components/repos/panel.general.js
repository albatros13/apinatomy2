"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var service_restore_1 = require("../../providers/service.restore");
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var panel_resource_1 = require('../panels/panel.resource');
var panel_type_1 = require('../panels/panel.type');
var panel_materialType_1 = require('../panels/panel.materialType');
var panel_lyphType_1 = require('../panels/panel.lyphType');
var panel_cylindricalLyphType_1 = require('../panels/panel.cylindricalLyphType');
var panel_groupType_1 = require('../panels/panel.groupType');
var panel_omegaTreeType_1 = require('../panels/panel.omegaTreeType');
var panel_measurableType_1 = require('../panels/panel.measurableType');
var panel_correlation_1 = require('../panels/panel.correlation');
var PanelGeneral = (function () {
    function PanelGeneral() {
        this.resourceNames = service_apinatomy2_1.ResourceName;
    }
    PanelGeneral = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'panel-general',
            inputs: ['item', 'dependencies'],
            template: "\n    <!--Resources-->\n    <resource-panel *ngIf=\"!item.class || (item.class == resourceNames.Resource)\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n    \n    <!--Types-->\n    <type-panel *ngIf=\"item.class == resourceNames.Type\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></type-panel>\n    \n    <!--Materials-->\n    <materialType-panel *ngIf=\"item.class==resourceNames.MaterialType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></materialType-panel>\n    \n    <!--Lyphs-->      \n    <lyphType-panel *ngIf=\"item.class==resourceNames.LyphType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></lyphType-panel>\n\n    <!--Cylindrical lyphs-->      \n    <cylindricalLyphType-panel *ngIf=\"item.class==resourceNames.CylindricalLyphType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></cylindricalLyphType-panel>\n    \n    <!--Processes-->      \n    <processType-panel *ngIf=\"item.class==resourceNames.ProcessType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></processType-panel>\n    \n    <!--Mesurables-->\n    <measurableType-panel *ngIf=\"item.class==resourceNames.MeasurableType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></measurableType-panel>\n    \n    <!--Causalities-->\n    <causalityType-panel *ngIf=\"item.class==resourceNames.CausalityType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></causalityType-panel>\n    \n    <!--Nodes: generic panel-->\n    <resource-panel *ngIf=\"item.class==resourceNames.NodeType\" [ignore]=\"['externals']\" \n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n\n    <!--Borders-->\n    <borderType-panel *ngIf=\"item.class==resourceNames.BorderType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></borderType-panel>\n    \n    <!--Groups-->\n    <groupType-panel *ngIf=\"item.class==resourceNames.GroupType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></groupType-panel>\n\n    <!--Omega trees-->\n    <omegaTreeType-panel *ngIf=\"item.class==resourceNames.OmegaTreeType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></omegaTreeType-panel>\n\n     <!--Publications: generic panel-->\n     <resource-panel *ngIf=\"item.class==resourceNames.Publication\" \n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n\n     <!--Correlations-->\n     <correlation-panel *ngIf=\"item.class==resourceNames.Correlation\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></correlation-panel>\n     \n     <!--Clinical indices: generic panel-->\n     <resource-panel *ngIf=\"item.class==resourceNames.ClinicalIndex\" [ignore]=\"['externals']\"  \n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\"></resource-panel>  \n  ",
            directives: [panel_resource_1.ResourcePanel, panel_type_1.TypePanel, panel_materialType_1.MaterialTypePanel, panel_lyphType_1.LyphTypePanel, panel_cylindricalLyphType_1.CylindricalLyphTypePanel,
                panel_groupType_1.GroupTypePanel, panel_omegaTreeType_1.OmegaTreeTypePanel,
                panel_measurableType_1.MeasurableTypePanel,
                panel_correlation_1.CorrelationPanel]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelGeneral);
    return PanelGeneral;
}());
exports.PanelGeneral = PanelGeneral;
//# sourceMappingURL=panel.general.js.map