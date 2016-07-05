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
var GroupTemplatePanel = (function (_super) {
    __extends(GroupTemplatePanel, _super);
    function GroupTemplatePanel() {
        _super.apply(this, arguments);
    }
    GroupTemplatePanel = __decorate([
        core_1.Component({
            selector: 'groupTemplate-panel',
            inputs: ['item', 'dependencies'],
            template: "\n    <template-panel [item]=\"item\" [dependencies]=\"dependencies\" \n            (saved)    = \"saved.emit($event)\"\n            (canceled) = \"canceled.emit($event)\"\n            (removed)  = \"removed.emit($event)\">\n\n      <ng-content></ng-content>      \n    </template-panel>\n  ",
            directives: [component_template_1.TemplateValue, component_general_1.SingleSelectInput, template_type_1.TemplatePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], GroupTemplatePanel);
    return GroupTemplatePanel;
}(template_type_1.TemplatePanel));
exports.GroupTemplatePanel = GroupTemplatePanel;
//# sourceMappingURL=template.groupType.js.map