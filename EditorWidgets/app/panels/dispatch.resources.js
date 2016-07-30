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
var panel_resource_1 = require('./panel.resource');
var panel_externalResource_1 = require('./panel.externalResource');
var service_apinatomy2_1 = require("../services/service.apinatomy2");
var panel_type_1 = require('./panel.type');
var panel_measurableLocation_1 = require('./panel.measurableLocation');
var panel_materialType_1 = require('./panel.materialType');
var panel_lyphType_1 = require('./panel.lyphType');
var panel_cylindricalLyphType_1 = require('./panel.cylindricalLyphType');
var panel_causalityType_1 = require('./panel.causalityType');
var panel_processType_1 = require('./panel.processType');
var panel_nodeType_1 = require('./panel.nodeType');
var panel_borderType_1 = require('./panel.borderType');
var panel_groupType_1 = require('./panel.groupType');
var panel_omegaTreeType_1 = require('./panel.omegaTreeType');
var panel_measurableType_1 = require('./panel.measurableType');
var panel_correlation_1 = require('./panel.correlation');
var panel_coalescence_1 = require('./panel.coalescence');
var PanelDispatchResources = (function () {
    function PanelDispatchResources() {
        this.resourceName = service_apinatomy2_1.ResourceName;
        this.saved = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
    }
    /* protected set item (item: any) {
     this.restoreService.setItem(item);
     }
  
     protected get item () {
       return this.restoreService.getItem();
     }*/
    PanelDispatchResources.prototype.onSaved = function () {
        //this.item = this.restoreService.getItem();
        this.item.commit();
        this.saved.emit(this.item);
    };
    PanelDispatchResources.prototype.onCanceled = function () {
        //this.item = this.restoreService.restoreItem();
        this.item.rollback();
        this.canceled.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelDispatchResources.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelDispatchResources.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelDispatchResources.prototype, "canceled", void 0);
    PanelDispatchResources = __decorate([
        core_1.Component({
            selector: 'panel-general',
            inputs: ['item', 'dependencies', 'ignore'],
            template: "\n    <!--Resources-->\n    <resource-panel *ngIf=\"item.class == resourceName.Resource\"\n     [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"ignore\"\n     (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n    \n    <!--External resources-->\n     <externalResource-panel *ngIf=\"item.class == resourceName.ExternalResource\"\n     [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"ignore\"\n     (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></externalResource-panel>\n\n     <!--Types-->\n    <type-panel *ngIf=\"item.class == resourceName.Type\"\n     [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"ignore\"\n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\">\n    </type-panel>\n    \n    <!--MeasurableLocations-->\n    <measurableLocation-panel *ngIf=\"item.class == resourceName.MeasurableLocation\"\n     [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"ignore\"\n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\">\n    </measurableLocation-panel>\n    \n    <!--Materials-->\n    <materialType-panel *ngIf=\"item.class==resourceName.MaterialType\"\n     [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"ignore\" \n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\">\n    </materialType-panel>\n    \n     <!--Lyphs-->      \n    <lyphType-panel *ngIf=\"item.class==resourceName.LyphType\" [ignore]=\"ignore\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></lyphType-panel>\n\n    <!--Cylindrical lyphs-->      \n    <cylindricalLyphType-panel *ngIf=\"item.class==resourceName.CylindricalLyphType\" [ignore]=\"ignore\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></cylindricalLyphType-panel>\n    \n    <!--Processes-->      \n    <processType-panel *ngIf=\"item.class==resourceName.ProcessType\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></processType-panel>\n   \n    <!--Mesurables-->\n    <measurableType-panel *ngIf=\"item.class==resourceName.MeasurableType\" [ignore]=\"ignore\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></measurableType-panel>\n   \n    <!--Causalities-->\n    <causalityType-panel *ngIf=\"item.class==resourceName.CausalityType\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></causalityType-panel>\n    \n    <!--Nodes-->\n    <nodeType-panel *ngIf=\"item.class==resourceName.NodeType\" [ignore]=\"ignore.add('externals')\" \n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></nodeType-panel>\n\n    <!--Borders-->\n    <borderType-panel *ngIf=\"item.class==resourceName.BorderType\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></borderType-panel>\n    \n    <!--Groups-->\n    <groupType-panel *ngIf=\"item.class==resourceName.GroupType\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></groupType-panel>\n\n    <!--Omega trees-->\n    <omegaTreeType-panel *ngIf=\"item.class==resourceName.OmegaTreeType\" [ignore]=\"ignore\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></omegaTreeType-panel>\n\n     <!--Publications: generic panel-->\n     <resource-panel *ngIf=\"item.class==resourceName.Publication\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n\n     <!--Correlations-->\n     <correlation-panel *ngIf=\"item.class==resourceName.Correlation\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></correlation-panel>\n\n     <!--Clinical indices: generic panel-->\n     <resource-panel *ngIf=\"item.class==resourceName.ClinicalIndex\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>  \n\n     <!--Coalescence-->\n     <coalescence-panel *ngIf=\"item.class==resourceName.Coalescence\" [ignore]=\"ignore.add('externals')\"\n     [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></coalescence-panel>\n\n  ",
            directives: [panel_resource_1.ResourcePanel, panel_externalResource_1.ExternalResourcePanel, panel_type_1.TypePanel,
                panel_measurableLocation_1.MeasurableLocationPanel, panel_materialType_1.MaterialTypePanel, panel_lyphType_1.LyphTypePanel, panel_cylindricalLyphType_1.CylindricalLyphTypePanel,
                panel_measurableType_1.MeasurableTypePanel,
                panel_processType_1.ProcessTypePanel,
                panel_causalityType_1.CausalityTypePanel, panel_nodeType_1.NodeTypePanel, panel_borderType_1.BorderTypePanel,
                panel_correlation_1.CorrelationPanel, panel_coalescence_1.CoalescencePanel,
                panel_groupType_1.GroupTypePanel, panel_omegaTreeType_1.OmegaTreeTypePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelDispatchResources);
    return PanelDispatchResources;
}());
exports.PanelDispatchResources = PanelDispatchResources;
//# sourceMappingURL=dispatch.resources.js.map