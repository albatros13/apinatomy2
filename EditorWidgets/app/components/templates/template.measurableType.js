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
 * Created by Natallia on 6/21/2016.
 */
var core_1 = require('@angular/core');
var component_general_1 = require('../component.general');
var component_template_1 = require('../component.template');
var template_type_1 = require("./template.type");
var service_restore_1 = require("../../providers/service.restore");
var MeasurableTemplatePanel = (function (_super) {
    __extends(MeasurableTemplatePanel, _super);
    function MeasurableTemplatePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    MeasurableTemplatePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'measurableTemplate-panel',
            inputs: ['item', 'dependencies'],
            template: "\n    <template-panel [item]=\"item\" [dependencies]=\"dependencies\" \n      (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n      <ng-content></ng-content>      \n    </template-panel>\n  ",
            directives: [component_template_1.TemplateValue, component_general_1.SingleSelectInput, template_type_1.TemplatePanel]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], MeasurableTemplatePanel);
    return MeasurableTemplatePanel;
}(template_type_1.TemplatePanel));
exports.MeasurableTemplatePanel = MeasurableTemplatePanel;
//# sourceMappingURL=template.measurableType.js.map