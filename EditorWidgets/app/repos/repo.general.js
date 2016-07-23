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
 * Created by Natallia on 6/18/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var component_toolbars_1 = require('../components/component.toolbars');
var service_apinatomy2_1 = require("../providers/service.apinatomy2");
var pipe_general_1 = require("../transformations/pipe.general");
var dispatch_resources_1 = require("../panels/dispatch.resources");
var repo_abstract_1 = require("./repo.abstract");
var RepoGeneral = (function (_super) {
    __extends(RepoGeneral, _super);
    function RepoGeneral() {
        _super.apply(this, arguments);
        this.resourceName = service_apinatomy2_1.ResourceName;
    }
    RepoGeneral.prototype.getIcon = function (item) {
        switch (item.class) {
            case this.resourceName.Type: return "images/type.png";
            case this.resourceName.MaterialType: return "images/materialType.png";
            case this.resourceName.LyphType: return "images/lyphType.png";
            case this.resourceName.CylindricalLyphType: return "images/cylindricalLyphType.png";
            case this.resourceName.ProcessType: return "images/processType.png";
            case this.resourceName.MeasurableType: return "images/measurableType.png";
            case this.resourceName.CausalityType: return "images/causalityType.png";
            case this.resourceName.NodeType: return "images/nodeType.png";
            case this.resourceName.BorderType: return "images/borderType.png";
            case this.resourceName.GroupType: return "images/groupType.png";
            case this.resourceName.OmegaTreeType: return "images/omegaTreeType.png";
            case this.resourceName.Publication: return "images/publication.png";
            case this.resourceName.Correlation: return "images/correlation.png";
            case this.resourceName.ClinicalIndex: return "images/clinicalIndex.png";
        }
        return "images/resource.png";
    };
    RepoGeneral.prototype.onAdded = function (resourceType) {
        var newItem;
        switch (resourceType) {
            case this.resourceName.Type:
                newItem = new service_apinatomy2_1.Type({});
                break;
            case this.resourceName.MaterialType:
                newItem = new service_apinatomy2_1.MaterialType({ name: "New material" });
                break;
            case this.resourceName.LyphType:
                newItem = new service_apinatomy2_1.LyphType({ name: "New lyph" });
                break;
            case this.resourceName.CylindricalLyphType:
                newItem = new service_apinatomy2_1.CylindricalLyphType({ name: "New cylindrical lyph" });
                break;
            case this.resourceName.ProcessType:
                newItem = new service_apinatomy2_1.ProcessType({ name: "New process" });
                break;
            case this.resourceName.MeasurableType:
                newItem = new service_apinatomy2_1.MeasurableType({ name: "New measurable" });
                break;
            case this.resourceName.CausalityType:
                newItem = new service_apinatomy2_1.CausalityType({ name: "New casuality" });
                break;
            case this.resourceName.NodeType:
                newItem = new service_apinatomy2_1.NodeType({ name: "New node" });
                break;
            case this.resourceName.BorderType:
                newItem = new service_apinatomy2_1.BorderType({ name: "New border" });
                break;
            case this.resourceName.GroupType:
                newItem = new service_apinatomy2_1.GroupType({ name: "New group" });
                break;
            case this.resourceName.OmegaTreeType:
                newItem = new service_apinatomy2_1.OmegaTreeType({ name: "New omge tree" });
                break;
            case this.resourceName.Publication:
                newItem = new service_apinatomy2_1.Publication({ name: "New publication" });
                break;
            case this.resourceName.Correlation:
                newItem = new service_apinatomy2_1.Correlation({ name: "New correlation" });
                break;
            case this.resourceName.ClinicalIndex:
                newItem = new service_apinatomy2_1.ClinicalIndex({ name: "New clinical index" });
                break;
            default: newItem = new service_apinatomy2_1.Resource();
        }
        this.items.push(newItem);
        this.added.emit(newItem);
        this.updated.emit(this.items);
        this.selectedItem = newItem;
    };
    RepoGeneral = __decorate([
        core_1.Component({
            selector: 'repo-general',
            inputs: ['items', 'caption', 'dependencies', 'types', 'options'],
            template: "\n     <div class=\"panel panel-info repo\">\n        <div class=\"panel-heading\">{{caption}}</div>\n        <div class=\"panel-body\">\n          <sort-toolbar [options]=\"['Name', 'ID']\" (sorted)=\"onSorted($event)\"></sort-toolbar>\n          <edit-toolbar [options]=\"types\" (added)=\"onAdded($event)\"></edit-toolbar>\n          <filter-toolbar [filter]=\"searchString\" [options]=\"['Name', 'ID']\" (applied)=\"onFiltered($event)\"></filter-toolbar>\n          \n          <accordion class=\"list-group\" [closeOthers]=\"true\" \n          dnd-sortable-container [dropZones]=\"zones\" [sortableData]=\"items\">\n          <accordion-group *ngFor=\"let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index\" class=\"list-group-item\" \n            dnd-sortable [sortableIndex]=\"i\" (click)=\"selectedItem = item\">\n            <div accordion-heading><item-header [item]=\"item\" [icon]=\"getIcon(item)\"></item-header></div>\n\n            <div *ngIf=\"!options || !options.headersOnly\">\n              <panel-general *ngIf=\"item == selectedItem\" [item]=\"item\" \n                [(dependencies)]=\"dependencies\" \n                (saved)=\"onSaved(item, $event)\" \n                (canceled)=\"onCanceled($event)\"\n                (removed)=\"onRemoved(item)\">\n               </panel-general>            \n            </div>\n\n          </accordion-group>        \n          </accordion>       \n        </div>\n      </div>\n  ",
            styles: ['.repo{ width: 100%}'],
            directives: [
                component_toolbars_1.SortToolbar, component_toolbars_1.EditToolbar, component_toolbars_1.FilterToolbar,
                repo_abstract_1.ItemHeader,
                dispatch_resources_1.PanelGeneral,
                accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES],
            pipes: [pipe_general_1.OrderBy, pipe_general_1.FilterBy]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoGeneral);
    return RepoGeneral;
}(repo_abstract_1.RepoAbstract));
exports.RepoGeneral = RepoGeneral;
//# sourceMappingURL=repo.general.js.map