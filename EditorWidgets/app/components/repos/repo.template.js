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
/**
 * Created by Natallia on 6/28/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var component_general_1 = require('../component.general');
var service_apinatomy2_1 = require('../../providers/service.apinatomy2');
var panel_template_1 = require("./panel.template");
var RepoTemplate = (function () {
    function RepoTemplate() {
        this.updated = new core_1.EventEmitter();
        this.selected = null;
        this.items = [];
        this.templateNames = service_apinatomy2_1.TemplateName;
        this.types = [];
        this.zones = [];
    }
    RepoTemplate.prototype.ngOnInit = function () {
        if (!this.items)
            this.items = [];
        if (this.items && this.items[0])
            this.selected = this.items[0];
        if (!this.types || (this.types.length == 0))
            this.types = Array.from(new Set(this.items.map(function (item) { return item.class; })));
        this.zones = this.types.map(function (x) { return x + "_zone"; });
    };
    RepoTemplate.prototype.getIcon = function (item) {
        switch (item.class) {
            case this.templateNames.Template: return "images/type.png";
            case this.templateNames.LyphTemplate: return "images/lyphType.png";
            case this.templateNames.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";
            case this.templateNames.ProcessTemplate: return "images/processType.png";
            case this.templateNames.MeasurableTemplate: return "images/measurableType.png";
            case this.templateNames.CausalityTemplate: return "images/causalityType.png";
            case this.templateNames.NodeTemplate: return "images/nodeType.png";
            case this.templateNames.BorderTemplate: return "images/borderType.png";
            case this.templateNames.GroupTemplate: return "images/groupType.png";
            case this.templateNames.OmegaTreeTemplate: return "images/omegaTreeType.png";
        }
        return "images/resource.png";
    };
    RepoTemplate.prototype.onSaved = function (item, updatedItem) {
        for (var key in updatedItem) {
            if (updatedItem.hasOwnProperty(key))
                item[key] = updatedItem[key];
        }
        this.updated.emit(this.items);
    };
    RepoTemplate.prototype.onRemoved = function (item) {
        if (!this.items)
            return;
        var index = this.items.indexOf(item);
        if (index > -1)
            this.items.splice(index, 1);
        this.updated.emit(this.items);
    };
    RepoTemplate.prototype.onAdded = function (resourceType) {
        var newItem;
        switch (resourceType) {
            case this.templateNames.CausalityTemplate:
                newItem =
                    new service_apinatomy2_1.CausalityTemplate({ name: "New causality template" });
                break;
            case this.templateNames.BorderTemplate:
                newItem = new service_apinatomy2_1.BorderTemplate({ name: "New border template" });
                break;
            case this.templateNames.NodeTemplate:
                newItem = new service_apinatomy2_1.NodeTemplate({ name: "New node template" });
                break;
            case this.templateNames.MeasurableTemplate:
                newItem = new service_apinatomy2_1.MeasurableTemplate({ name: "New Measurable template" });
                break;
            case this.templateNames.ProcessTemplate:
                newItem = new service_apinatomy2_1.ProcessTemplate({ name: "New process template" });
                break;
            case this.templateNames.LyphTemplate:
                newItem = new service_apinatomy2_1.LyphTemplate({ name: "New lyph template" });
                break;
            case this.templateNames.CylindricalLyphTemplate:
                newItem = new service_apinatomy2_1.CylindricalLyphTemplate({ name: "New cylindrical lyph template" });
                break;
            case this.templateNames.GroupTemplate:
                newItem = new service_apinatomy2_1.GroupTemplate({ name: "New group template" });
                break;
            case this.templateNames.OmegaTreeTemplate:
                newItem = new service_apinatomy2_1.OmegaTreeTemplate({ name: "New omega tree template" });
                break;
            default: newItem = new service_apinatomy2_1.Template({ name: "New template" });
        }
        this.items.push(newItem);
        this.updated.emit(this.items);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoTemplate.prototype, "updated", void 0);
    RepoTemplate = __decorate([
        core_1.Component({
            selector: 'repo-template',
            inputs: ['items', 'caption', 'dependencies', 'types'],
            template: "\n    <div class=\"panel panel-warning repo-template\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\" >\n        <edit-toolbar [options]=\"types\" (added)=\"onAdded($event)\"></edit-toolbar>\n      \n        <accordion class=\"list-group\" [closeOthers]=\"true\" dnd-sortable-container [dropZones]=\"['lyphTemplate-zone']\" [sortableData]=\"items\">\n          <accordion-group *ngFor=\"let item of items; let i = index\" class=\"list-group-item\" dnd-sortable \n           [sortableIndex]=\"i\" (click)=\"selected = item\">\n            <div accordion-heading><item-header [item]=\"item\" [icon]=\"'images/lyphType.png'\"></item-header></div>\n\n            <panel-template *ngIf=\"item == selected\" [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></panel-template>            \n\n          </accordion-group>        \n        </accordion>       \n      </div>\n    </div>\n  ",
            directives: [component_general_1.ItemHeader, component_general_1.EditToolbar, panel_template_1.PanelTemplate, accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoTemplate);
    return RepoTemplate;
}());
exports.RepoTemplate = RepoTemplate;
//# sourceMappingURL=repo.template.js.map