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
var panel_materialType_1 = require('./panel.materialType');
var panel_lyphType_1 = require('./panel.lyphType');
var panel_cylindricalLyphType_1 = require('./panel.cylindricalLyphType');
var panel_causalityType_1 = require('./panel.causalityType');
var panel_processType_1 = require('./panel.processType');
var panel_nodeType_1 = require('./panel.nodeType');
var panel_borderType_1 = require('./panel.borderType');
var panel_measurableType_1 = require('./panel.measurableType');
var panel_correlation_1 = require('./panel.correlation');
var panel_coalescence_1 = require('./panel.coalescence');
var panel_groupType_1 = require('./panel.groupType');
var panel_omegaTreeType_1 = require('./panel.omegaTreeType');
var utils_model_1 = require("../services/utils.model");
var ng2_toasty_1 = require('ng2-toasty/ng2-toasty');
var PanelDispatchResources = (function () {
    function PanelDispatchResources(toastyService) {
        this.toastyService = toastyService;
        this.resourceName = utils_model_1.ResourceName;
        this.saved = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
    }
    PanelDispatchResources.prototype.onSaved = function () {
        var _this = this;
        this.item.commit()
            .catch(function (reason) {
            var errorMsg = "Failed to commit resource: Relationship constraints violated! \n" +
                "See browser console (Ctrl+Shift+J) for technical details.";
            console.error(reason);
            _this.toastyService.error(errorMsg);
        });
        this.saved.emit(this.item);
    };
    PanelDispatchResources.prototype.onCanceled = function () {
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
            inputs: ['item', 'ignore'],
            providers: [ng2_toasty_1.ToastyService],
            template: "\n    <!--Resources-->\n    <resource-panel *ngIf=\"item.class == resourceName.Resource\"\n     [item]=\"item\" [ignore]=\"ignore\"\n     (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n    \n    <!--External resources-->\n     <externalResource-panel *ngIf=\"item.class == resourceName.ExternalResource\"\n     [item]=\"item\" [ignore]=\"ignore\"\n     (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></externalResource-panel>\n\n    <!--Materials-->\n    <materialType-panel *ngIf=\"item.class==resourceName.MaterialType\"\n     [item]=\"item\" [ignore]=\"ignore\" \n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\">\n    </materialType-panel>\n    \n     <!--Lyphs-->      \n    <lyphType-panel *ngIf=\"item.class==resourceName.LyphType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></lyphType-panel>\n\n    <!--Cylindrical lyphs-->      \n    <cylindricalLyphType-panel *ngIf=\"item.class==resourceName.CylindricalLyphType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></cylindricalLyphType-panel>\n    \n    <!--Processes-->      \n    <processType-panel *ngIf=\"item.class==resourceName.ProcessType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></processType-panel>\n   \n    <!--Mesurables-->\n    <measurableType-panel *ngIf=\"item.class==resourceName.MeasurableType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></measurableType-panel>\n   \n    <!--Causalities-->\n    <causalityType-panel *ngIf=\"item.class==resourceName.CausalityType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></causalityType-panel>\n    \n    <!--Nodes-->\n    <nodeType-panel *ngIf=\"item.class==resourceName.NodeType\" [ignore]=\"ignore\" \n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></nodeType-panel>\n\n    <!--Borders-->\n    <borderType-panel *ngIf=\"item.class==resourceName.BorderType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></borderType-panel>\n    \n    <!--Groups-->\n    <groupType-panel *ngIf=\"item.class==resourceName.GroupType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></groupType-panel>\n\n    <!--Omega trees-->\n    <omegaTreeType-panel *ngIf=\"item.class==resourceName.OmegaTreeType\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></omegaTreeType-panel>\n\n     <!--Publications: generic panel-->\n     <resource-panel *ngIf=\"item.class==resourceName.Publication\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n\n     <!--Correlations-->\n     <correlation-panel *ngIf=\"item.class==resourceName.Correlation\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></correlation-panel>\n\n     <!--Clinical indices: generic panel-->\n     <resource-panel *ngIf=\"item.class==resourceName.ClinicalIndex\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>  \n\n     <!--Coalescence-->\n     <coalescence-panel *ngIf=\"item.class==resourceName.Coalescence\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></coalescence-panel>\n     \n     <ng2-toasty></ng2-toasty>\n  ",
            directives: [panel_resource_1.ResourcePanel, panel_externalResource_1.ExternalResourcePanel,
                panel_materialType_1.MaterialTypePanel, panel_lyphType_1.LyphTypePanel, panel_cylindricalLyphType_1.CylindricalLyphTypePanel,
                panel_measurableType_1.MeasurableTypePanel,
                panel_processType_1.ProcessTypePanel,
                panel_causalityType_1.CausalityTypePanel, panel_nodeType_1.NodeTypePanel, panel_borderType_1.BorderTypePanel,
                panel_correlation_1.CorrelationPanel, panel_coalescence_1.CoalescencePanel,
                panel_groupType_1.GroupTypePanel, panel_omegaTreeType_1.OmegaTreeTypePanel, ng2_toasty_1.Toasty]
        }), 
        __metadata('design:paramtypes', [ng2_toasty_1.ToastyService])
    ], PanelDispatchResources);
    return PanelDispatchResources;
}());
exports.PanelDispatchResources = PanelDispatchResources;
//# sourceMappingURL=dispatch.resources.js.map