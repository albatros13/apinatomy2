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
var service_restore_1 = require("../services/service.restore");
var service_apinatomy2_1 = require("../services/service.apinatomy2");
var template_template_1 = require('./template.template');
var template_measurableTemplate_1 = require('./template.measurableTemplate');
var template_nodeTemplate_1 = require('./template.nodeTemplate');
var template_borderTemplate_1 = require('./template.borderTemplate');
var template_processTemplate_1 = require('./template.processTemplate');
var template_causalityTemplate_1 = require('./template.causalityTemplate');
var template_groupTemplate_1 = require('./template.groupTemplate');
var template_omegaTreeTemplate_1 = require('./template.omegaTreeTemplate');
var template_lyphTemplate_1 = require('./template.lyphTemplate');
var template_cylindricalLyphTemplate_1 = require('./template.cylindricalLyphTemplate');
var PanelDispatchTemplates = (function () {
    function PanelDispatchTemplates(restoreService) {
        this.restoreService = restoreService;
        this.templateName = service_apinatomy2_1.TemplateName;
        this.saved = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
    }
    Object.defineProperty(PanelDispatchTemplates.prototype, "item", {
        get: function () {
            return this.restoreService.getItem();
        },
        set: function (item) {
            this.restoreService.setItem(item);
        },
        enumerable: true,
        configurable: true
    });
    PanelDispatchTemplates.prototype.onSaved = function () {
        this.item = this.restoreService.getItem();
        this.saved.emit(this.item);
    };
    PanelDispatchTemplates.prototype.onCanceled = function () {
        this.item = this.restoreService.restoreItem();
        this.canceled.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelDispatchTemplates.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelDispatchTemplates.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelDispatchTemplates.prototype, "canceled", void 0);
    PanelDispatchTemplates = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'panel-template',
            inputs: ['item', 'dependencies', 'ignore'],
            template: "\n      <!--Generic template-->\n      <template-panel *ngIf=\"item.class==templateName.Template\" [ignore]=\"ignore\"  \n       [item]=\"item\"  [dependencies]=\"dependencies\" [types]=\"dependencies.types\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></template-panel>\n\n      <!--Lyph template-->\n      <lyphTemplate-panel *ngIf=\"item.class==templateName.LyphTemplate\" [ignore]=\"ignore\"\n      [item]=\"item\"  [dependencies]=\"dependencies\" \n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></lyphTemplate-panel>\n    \n      <!--Cylindrical lyphs-->      \n      <cylindricalLyphTemplate-panel *ngIf=\"item.class==templateName.CylindricalLyphTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\"  [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></cylindricalLyphTemplate-panel>\n      \n      <!--Processes-->      \n      <processTemplate-panel *ngIf=\"item.class==templateName.ProcessTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\"  [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></processTemplate-panel>\n      \n      <!--Mesurables-->\n      <measurableTemplate-panel *ngIf=\"item.class==templateName.MeasurableTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\"  [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></measurableTemplate-panel>\n      \n      <!--Causalities-->\n      <causalityTemplate-panel *ngIf=\"item.class==templateName.CausalityTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\"  [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></causalityTemplate-panel>\n      \n      <!--Nodes-->\n      <nodeTemplate-panel *ngIf=\"item.class==templateName.NodeTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\"  [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></nodeTemplate-panel>\n     \n      <!--Borders-->\n      <borderTemplate-panel *ngIf=\"item.class==templateName.BorderTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\" [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></borderTemplate-panel>\n      \n      <!--Groups-->\n      <groupTemplate-panel *ngIf=\"item.class==templateName.GroupTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\" [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></groupTemplate-panel>\n\n      <!--Omega trees-->\n      <omegaTreeTemplate-panel *ngIf=\"item.class==templateName.OmegaTreeTemplate\" [ignore]=\"ignore\"\n       [item]=\"item\"  [dependencies]=\"dependencies\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></omegaTreeTemplate-panel>\n  ",
            directives: [template_template_1.TemplatePanel, template_measurableTemplate_1.MeasurableTemplatePanel, template_nodeTemplate_1.NodeTemplatePanel, template_causalityTemplate_1.CausalityTemplatePanel, template_borderTemplate_1.BorderTemplatePanel,
                template_processTemplate_1.ProcessTemplatePanel,
                template_lyphTemplate_1.LyphTemplatePanel, template_cylindricalLyphTemplate_1.CylindricalLyphTemplatePanel,
                template_groupTemplate_1.GroupTemplatePanel, template_omegaTreeTemplate_1.OmegaTreeTemplatePanel]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], PanelDispatchTemplates);
    return PanelDispatchTemplates;
}());
exports.PanelDispatchTemplates = PanelDispatchTemplates;
//# sourceMappingURL=dispatch.templates.js.map