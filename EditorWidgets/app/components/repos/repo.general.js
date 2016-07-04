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
 * Created by Natallia on 6/18/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var component_general_1 = require('../component.general');
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var pipe_general_1 = require("../../transformations/pipe.general");
var panel_general_1 = require("./panel.general");
var RepoGeneral = (function () {
    function RepoGeneral() {
        this.items = [];
        this.selected = null;
        this.resourceNames = service_apinatomy2_1.ResourceName;
        this.types = [];
        this.zones = [];
        this.sortByMode = "id";
    }
    RepoGeneral.prototype.ngOnInit = function () {
        if (!this.items)
            this.items = [];
        if (this.items[0])
            this.selected = this.items[0];
        if (!this.types || (this.types.length == 0))
            this.types = Array.from(new Set(this.items.map(function (item) { return item.class; })));
        this.zones = this.types.map(function (x) { return x + "_zone"; });
    };
    RepoGeneral.prototype.getIcon = function (item) {
        switch (item.class) {
            case this.resourceNames.Type: return "images/type.png";
            case this.resourceNames.MaterialType: return "images/materialType.png";
            case this.resourceNames.LyphType: return "images/lyphType.png";
            case this.resourceNames.CylindricalLyphType: return "images/cylindricalLyphType.png";
            case this.resourceNames.ProcessType: return "images/processType.png";
            case this.resourceNames.MeasurableType: return "images/measurableType.png";
            case this.resourceNames.CausalityType: return "images/causalityType.png";
            case this.resourceNames.NodeType: return "images/nodeType.png";
            case this.resourceNames.BorderType: return "images/borderType.png";
            case this.resourceNames.GroupType: return "images/groupType.png";
            case this.resourceNames.OmegaTreeType: return "images/omegaTreeType.png";
            case this.resourceNames.Publication: return "images/publication.png";
            case this.resourceNames.Correlation: return "images/correlation.png";
            case this.resourceNames.ClinicalIndex: return "images/clinicalIndex.png";
        }
        return "images/resource.png";
    };
    RepoGeneral.prototype.onSaved = function (item, updatedItem) {
        for (var key in updatedItem) {
            if (updatedItem.hasOwnProperty(key))
                item[key] = updatedItem[key];
        }
    };
    RepoGeneral.prototype.onRemoved = function (item) {
        if (!this.items)
            return;
        var index = this.items.indexOf(item);
        if (index > -1)
            this.items.splice(index, 1);
    };
    RepoGeneral.prototype.onSorted = function (prop) {
        this.sortByMode = prop.toLowerCase();
    };
    RepoGeneral.prototype.onAdded = function (resourceType) {
        var newItem;
        switch (resourceType) {
            case this.resourceNames.Type:
                newItem = new service_apinatomy2_1.Type({});
                break;
            case this.resourceNames.MaterialType:
                newItem = new service_apinatomy2_1.MaterialType({ name: "New material" });
                break;
            case this.resourceNames.LyphType:
                newItem = new service_apinatomy2_1.LyphType({ name: "New lyph" });
                break;
            case this.resourceNames.CylindricalLyphType:
                newItem = new service_apinatomy2_1.CylindricalLyphType({ name: "New cylindrical lyph" });
                break;
            case this.resourceNames.ProcessType:
                newItem = new service_apinatomy2_1.ProcessType({ name: "New process" });
                break;
            case this.resourceNames.MeasurableType:
                newItem = new service_apinatomy2_1.MeasurableType({ name: "New measurable" });
                break;
            case this.resourceNames.CausalityType:
                newItem = new service_apinatomy2_1.CausalityType({ name: "New casuality" });
                break;
            case this.resourceNames.NodeType:
                newItem = new service_apinatomy2_1.NodeType({ name: "New node" });
                break;
            case this.resourceNames.BorderType:
                newItem = new service_apinatomy2_1.BorderType({ name: "New border" });
                break;
            case this.resourceNames.GroupType:
                newItem = new service_apinatomy2_1.GroupType({ name: "New group" });
                break;
            case this.resourceNames.OmegaTreeType:
                newItem = new service_apinatomy2_1.OmegaTreeType({ name: "New omge tree" });
                break;
            case this.resourceNames.Publication:
                newItem = new service_apinatomy2_1.Publication({ name: "New publication" });
                break;
            case this.resourceNames.Correlation:
                newItem = new service_apinatomy2_1.Correlation({ name: "New correlation" });
                break;
            case this.resourceNames.ClinicalIndex:
                newItem = new service_apinatomy2_1.ClinicalIndex({ name: "New clinical index" });
                break;
            default: newItem = new service_apinatomy2_1.Resource();
        }
        this.items.push(newItem);
    };
    RepoGeneral = __decorate([
        core_1.Component({
            selector: 'repo-general',
            inputs: ['items', 'caption', 'dependencies', 'types'],
            template: "\n     <div class=\"panel panel-info repo\">\n        <div class=\"panel-heading\">{{caption}}</div>\n        <div class=\"panel-body\" >\n          <sort-toolbar [options]=\"['ID', 'Name']\" (sorted)=\"onSorted($event)\"></sort-toolbar>\n          <edit-toolbar [options]=\"types\" (added)=\"onAdded($event)\"></edit-toolbar>\n          \n          <accordion class=\"list-group\" [closeOthers]=\"true\" \n          dnd-sortable-container [dropZones]=\"zones\" [sortableData]=\"items\">\n          <accordion-group *ngFor=\"let item of items | orderBy : sortByMode; let i = index\" class=\"list-group-item\" \n            dnd-sortable [sortableIndex]=\"i\" (click)=\"selected = item\">\n            <div accordion-heading><item-header [item]=\"item\" [icon]=\"getIcon(item)\"></item-header></div>\n            \n            <panel-general *ngIf=\"item == selected\" [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></panel-general>            \n          \n          </accordion-group>        \n          </accordion>       \n        </div>\n      </div>\n  ",
            directives: [
                component_general_1.SortToolbar, component_general_1.EditToolbar,
                component_general_1.ItemHeader,
                panel_general_1.PanelGeneral,
                accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES],
            pipes: [pipe_general_1.OrderBy]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoGeneral);
    return RepoGeneral;
}());
exports.RepoGeneral = RepoGeneral;
//# sourceMappingURL=repo.general.js.map