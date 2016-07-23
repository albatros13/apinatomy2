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
var service_restore_1 = require("../providers/service.restore");
var service_apinatomy2_1 = require("../providers/service.apinatomy2");
var template_type_1 = require('./template.type');
var template_measurableType_1 = require('./template.measurableType');
var template_nodeType_1 = require('./template.nodeType');
var template_borderType_1 = require('./template.borderType');
var template_processType_1 = require('./template.processType');
var template_causalityType_1 = require('./template.causalityType');
var template_groupType_1 = require('./template.groupType');
var template_omegaTreeType_1 = require('./template.omegaTreeType');
var template_lyphType_1 = require('./template.lyphType');
var template_cylindricalLyphType_1 = require('./template.cylindricalLyphType');
var PanelTemplate = (function () {
    function PanelTemplate(restoreService) {
        this.restoreService = restoreService;
        this.templateName = service_apinatomy2_1.TemplateName;
        this.saved = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
    }
    Object.defineProperty(PanelTemplate.prototype, "item", {
        get: function () {
            return this.restoreService.getItem();
        },
        set: function (item) {
            this.restoreService.setItem(item);
        },
        enumerable: true,
        configurable: true
    });
    PanelTemplate.prototype.onSaved = function () {
        this.item = this.restoreService.getItem();
        this.saved.emit(this.item);
    };
    PanelTemplate.prototype.onCanceled = function () {
        this.item = this.restoreService.restoreItem();
        this.canceled.emit(this.item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelTemplate.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelTemplate.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelTemplate.prototype, "canceled", void 0);
    PanelTemplate = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'panel-template',
            inputs: ['item', 'dependencies'],
            template: "\n      <!--Generic template-->\n      <template-panel *ngIf=\"item.class==templateName.Template\" [ignore]=\"['externals']\"  \n       [item]=\"item\"  [dependencies]=\"{types: dependencies.types, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></template-panel>\n\n      <!--Lyph template-->\n      <lyphTemplate-panel *ngIf=\"item.class==templateName.LyphTemplate\"\n      [item]=\"item\"  [dependencies]=\"{types: dependencies.lyphs, templates: dependencies.templates}\" \n      (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></lyphTemplate-panel>\n    \n      <!--Cylindrical lyphs-->      \n      <cylindricalLyphTemplate-panel *ngIf=\"item.class==templateName.CylindricalLyphTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.cylindricalLyphs, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></cylindricalLyphTemplate-panel>\n      \n      <!--Processes-->      \n      <processTemplate-panel *ngIf=\"item.class==templateName.ProcessTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.processes, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></processTemplate-panel>\n      \n      <!--Mesurables-->\n      <measurableTemplate-panel *ngIf=\"item.class==templateName.MeasurableTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.measurables, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></measurableTemplate-panel>\n      \n      <!--Causalities-->\n      <causalityTemplate-panel *ngIf=\"item.class==templateName.CausalityTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.causalities, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></causalityTemplate-panel>\n      \n      <!--Nodes-->\n      <nodeTemplate-panel *ngIf=\"item.class==templateName.NodeTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.nodes, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></nodeTemplate-panel>\n     \n      <!--Borders-->\n      <borderTemplate-panel *ngIf=\"item.class==templateName.BorderTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.borders, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></borderTemplate-panel>\n      \n      <!--Groups-->\n      <groupTemplate-panel *ngIf=\"item.class==templateName.GroupTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.groups, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></groupTemplate-panel>\n\n      <!--Omega trees-->\n      <omegaTreeTemplate-panel *ngIf=\"item.class==templateName.OmegaTreeTemplate\"\n       [item]=\"item\"  [dependencies]=\"{types: dependencies.omegaTrees, templates: dependencies.templates}\" \n       (saved)=\"onSaved($event)\" (canceled)=\"onCanceled($event)\" (removed)=\"removed.emit($event)\"></omegaTreeTemplate-panel>\n  ",
            directives: [template_type_1.TemplatePanel, template_measurableType_1.MeasurableTemplatePanel, template_nodeType_1.NodeTemplatePanel, template_causalityType_1.CausalityTemplatePanel, template_borderType_1.BorderTemplatePanel,
                template_processType_1.ProcessTemplatePanel,
                template_lyphType_1.LyphTemplatePanel, template_cylindricalLyphType_1.CylindricalLyphTemplatePanel,
                template_groupType_1.GroupTemplatePanel, template_omegaTreeType_1.OmegaTreeTemplatePanel]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], PanelTemplate);
    return PanelTemplate;
}());
exports.PanelTemplate = PanelTemplate;
//# sourceMappingURL=dispatch.templates.js.map