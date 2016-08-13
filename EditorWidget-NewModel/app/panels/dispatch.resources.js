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
var panel_material_1 = require('./panel.material');
var panel_lyph_1 = require('./panel.lyph');
var panel_cylindricalLyph_1 = require('./panel.cylindricalLyph');
var panel_causality_1 = require('./panel.causality');
var panel_process_1 = require('./panel.process');
var panel_node_1 = require('./panel.node');
var panel_border_1 = require('./panel.border');
var panel_measurable_1 = require('./panel.measurable');
var panel_correlation_1 = require('./panel.correlation');
var panel_coalescence_1 = require('./panel.coalescence');
var panel_group_1 = require('./panel.group');
var panel_omegaTree_1 = require('./panel.omegaTree');
var utils_model_1 = require("../services/utils.model");
var ng2_toasty_1 = require('ng2-toasty/ng2-toasty');
var PanelDispatchResources = (function () {
    function PanelDispatchResources(toastyService) {
        this.toastyService = toastyService;
        this.ResourceName = utils_model_1.ResourceName;
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
            template: "\n    <!--External resources-->\n    <externalResource-panel *ngIf=\"item.class == ResourceName.ExternalResource\"\n     [item]=\"item\" [ignore]=\"ignore\"\n     (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></externalResource-panel>\n\n    <!--Materials-->\n    <material-panel *ngIf=\"item.class==ResourceName.Material\"\n     [item]=\"item\" [ignore]=\"ignore\" \n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\">\n    </material-panel>\n    \n     <!--Lyphs-->      \n    <lyph-panel *ngIf=\"item.class==ResourceName.Lyph\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></lyph-panel>\n\n    <!--Cylindrical lyphs-->      \n    <cylindricalLyph-panel *ngIf=\"item.class==ResourceName.CylindricalLyph\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></cylindricalLyph-panel>\n\n    <!--Processes-->      \n    <process-panel *ngIf=\"item.class==ResourceName.Process\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></process-panel>\n   \n    <!--Mesurables-->\n    <measurable-panel *ngIf=\"item.class==ResourceName.Measurable\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></measurable-panel>\n   \n    <!--Causalities-->\n    <causality-panel *ngIf=\"item.class==ResourceName.Causality\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></causality-panel>\n    \n    <!--Nodes-->\n    <node-panel *ngIf=\"item.class==ResourceName.Node\" [ignore]=\"ignore\" \n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></node-panel>\n\n    <!--Borders-->\n    <border-panel *ngIf=\"item.class==ResourceName.Border\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></border-panel>\n    \n    <!--Groups-->\n    <group-panel *ngIf=\"item.class==ResourceName.Group\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></group-panel>\n\n    <!--Omega trees-->\n    <omegaTree-panel *ngIf=\"item.class==ResourceName.OmegaTree\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></omegaTree-panel>\n\n     <!--Publications: generic panel-->\n     <resource-panel *ngIf=\"item.class==ResourceName.Publication\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>\n\n     <!--Correlations-->\n     <correlation-panel *ngIf=\"item.class==ResourceName.Correlation\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></correlation-panel>\n\n     <!--Clinical indices: generic panel-->\n     <resource-panel *ngIf=\"item.class==ResourceName.ClinicalIndex\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></resource-panel>  \n\n     <!--Coalescence-->\n     <coalescence-panel *ngIf=\"item.class==ResourceName.Coalescence\" [ignore]=\"ignore\"\n     [item]=\"item\" (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></coalescence-panel>\n     \n     <ng2-toasty></ng2-toasty>\n  ",
            directives: [
                panel_resource_1.ResourcePanel, panel_externalResource_1.ExternalResourcePanel,
                panel_material_1.MaterialPanel,
                panel_lyph_1.LyphPanel,
                panel_cylindricalLyph_1.CylindricalLyphPanel,
                panel_measurable_1.MeasurablePanel,
                panel_process_1.ProcessPanel,
                panel_causality_1.CausalityPanel, panel_node_1.NodePanel, panel_border_1.BorderPanel,
                panel_correlation_1.CorrelationPanel, panel_coalescence_1.CoalescencePanel,
                panel_group_1.GroupPanel, panel_omegaTree_1.OmegaTreePanel, ng2_toasty_1.Toasty
            ]
        }), 
        __metadata('design:paramtypes', [ng2_toasty_1.ToastyService])
    ], PanelDispatchResources);
    return PanelDispatchResources;
}());
exports.PanelDispatchResources = PanelDispatchResources;
//# sourceMappingURL=dispatch.resources.js.map