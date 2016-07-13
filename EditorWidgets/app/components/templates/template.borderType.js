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
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var BorderTemplatePanel = (function (_super) {
    __extends(BorderTemplatePanel, _super);
    function BorderTemplatePanel() {
        _super.call(this);
        this.formType = service_apinatomy2_1.FormType;
        if (!this.item) {
            this.item = new service_apinatomy2_1.BorderTemplate({});
        }
    }
    BorderTemplatePanel = __decorate([
        core_1.Component({
            selector: 'borderTemplate-panel',
            inputs: ['item', 'dependencies'],
            template: "\n    <template-panel [item]=\"item\" \n      [dependencies] = \"dependencies\"  \n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n\n      <!--Position: Template-->\n      <!--<template-value caption=\"Position:\" [item]=\"item.position\"-->\n      <!--(updated)=\"updateProperty('position', $event)\"></template-value>-->\n      \n      <!--Form: {open, closed}-->\n<!--      <div class=\"input-control\" *ngIf=\"includeProperty('form')\">\n        <fieldset>\n          <legend>Form:</legend>\n          <radio-group [(ngModel)]=\"item.form\" [required]=\"true\">\n             <input type=\"radio\" [value]=\"form.open\">{{formType.open}}&nbsp;\n             <input type=\"radio\" [value]=\"form.closed\">{{formType.closed}}<br/>\n          </radio-group>\n        </fieldset>\n      </div>-->\n      \n      <ng-content></ng-content>   \n         \n    </template-panel>\n  ",
            directives: [component_template_1.TemplateValue, component_general_1.SingleSelectInput, template_type_1.TemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], BorderTemplatePanel);
    return BorderTemplatePanel;
}(template_type_1.TemplatePanel));
exports.BorderTemplatePanel = BorderTemplatePanel;
//# sourceMappingURL=template.borderType.js.map