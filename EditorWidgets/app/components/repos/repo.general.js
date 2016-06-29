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
var widget_transform_1 = require("../../transformations/widget.transform");
var panel_resource_1 = require('../panels/panel.resource');
var panel_type_1 = require('../panels/panel.type');
var panel_materialType_1 = require('../panels/panel.materialType');
var panel_lyphType_1 = require('../panels/panel.lyphType');
var panel_cylindricalLyphType_1 = require('../panels/panel.cylindricalLyphType');
var panel_groupType_1 = require('../panels/panel.groupType');
var panel_omegaTreeType_1 = require('../panels/panel.omegaTreeType');
var panel_measurableType_1 = require('../panels/panel.measurableType');
var panel_correlation_1 = require('../panels/panel.correlation');
var RepoGeneral = (function () {
    function RepoGeneral() {
        this.items = [];
        this.selected = null;
        this.resourceNames = service_apinatomy2_1.ResourceName;
        this.itemTypes = [];
        this.zones = [];
        this.sortByMode = "id";
    }
    RepoGeneral.prototype.ngOnInit = function () {
        if (!this.items)
            this.items = [];
        if (this.items[0])
            this.selected = this.items[0];
        var types = new Set(this.items.map(function (item) { return item.class; }));
        this.itemTypes = Array.from(types);
        this.zones = this.itemTypes.map(function (x) { return x + "_zone"; });
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
    RepoGeneral.prototype.changeActive = function (item) {
        this.selected = item;
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
        return "images/resource.png";
    };
    RepoGeneral = __decorate([
        core_1.Component({
            selector: 'repo-general',
            inputs: ['items', 'caption', 'dependencies'],
            template: "\n     <div class=\"panel panel-info repo\">\n        <div class=\"panel-heading\">{{caption}}</div>\n        <div class=\"panel-body\" >\n          <sort-toolbar [options]=\"['ID', 'Name']\" (sorted)=\"onSorted($event)\"></sort-toolbar>\n          <edit-toolbar [options]=\"itemTypes\" (added)=\"onAdded($event)\"></edit-toolbar>\n          \n          <accordion class=\"list-group\" [closeOthers]=\"true\" \n          dnd-sortable-container [dropZones]=\"zones\" [sortableData]=\"items\">\n          <accordion-group *ngFor=\"let item of items | orderBy : sortByMode; let i = index\" class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\n            <div accordion-heading><item-header [item]=\"item\" [icon]=\"getIcon(item)\"></item-header></div>\n            <resource-panel *ngIf=\"!item.class || (item.class == resourceNames.Resource)\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></resource-panel>\n            <type-panel *ngIf=\"item.class == resourceNames.Type\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></type-panel>\n            <materialType-panel *ngIf=\"item.class==resourceNames.MaterialType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></materialType-panel>\n            <lyphType-panel *ngIf=\"item.class==resourceNames.LyphType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></lyphType-panel>\n            <cylindricalLyphType-panel *ngIf=\"item.class==resourceNames.CylindricalLyphType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></cylindricalLyphType-panel>\n            \n            <processType-panel *ngIf=\"item.class==resourceNames.ProcessType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></processType-panel>\n            <measurableType-panel *ngIf=\"item.class==resourceNames.MeasurableType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></measurableType-panel>\n            <causalityType-panel *ngIf=\"item.class==resourceNames.CausalityType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></causalityType-panel>\n            <!--Resource panel is used to show nodes-->\n            <resource-panel *ngIf=\"item.class==resourceNames.NodeType\"  [ignore]=\"['equivalence', 'weakEquivalence']\" \n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></resource-panel>\n            <borderType-panel *ngIf=\"item.class==resourceNames.BorderType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></borderType-panel>\n            \n            <groupType-panel *ngIf=\"item.class==resourceNames.GroupType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></groupType-panel>\n            <omegaTreeType-panel *ngIf=\"item.class==resourceNames.OmegaTreeType\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></omegaTreeType-panel>\n\n             <!--Resource panel is used to show publications-->\n             <resource-panel *ngIf=\"item.class==resourceNames.Publication\"  [ignore]=\"['equivalence', 'weakEquivalence']\" \n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></resource-panel>\n             <correlation-panel *ngIf=\"item.class==resourceNames.Correlation\"\n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></correlation-panel>\n             <!--Resource panel is used to show clinical indices-->\n             <resource-panel *ngIf=\"item.class==resourceNames.ClinicalIndex\"  [ignore]=\"['equivalence', 'weakEquivalence']\" \n             [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item)\"></resource-panel>\n          </accordion-group>        \n          </accordion>       \n        </div>\n      </div>\n  ",
            directives: [
                component_general_1.SortToolbar, component_general_1.EditToolbar,
                component_general_1.ItemHeader,
                panel_resource_1.ResourcePanel, panel_type_1.TypePanel, panel_materialType_1.MaterialTypePanel, panel_lyphType_1.LyphTypePanel, panel_cylindricalLyphType_1.CylindricalLyphTypePanel,
                panel_groupType_1.GroupTypePanel, panel_omegaTreeType_1.OmegaTreeTypePanel,
                panel_measurableType_1.MeasurableTypePanel,
                panel_correlation_1.CorrelationPanel,
                accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES],
            pipes: [widget_transform_1.OrderBy]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoGeneral);
    return RepoGeneral;
}());
exports.RepoGeneral = RepoGeneral;
//# sourceMappingURL=repo.general.js.map