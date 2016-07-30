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
 * Created by Natallia on 6/28/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var service_apinatomy2_1 = require('../services/service.apinatomy2');
var toolbar_repoEdit_1 = require('../components/toolbar.repoEdit');
var toolbar_filter_1 = require('../components/toolbar.filter');
var toolbar_sort_1 = require('../components/toolbar.sort');
var dispatch_templates_1 = require("../templates/dispatch.templates");
var repo_abstract_1 = require("./repo.abstract");
var pipe_general_1 = require("../transformations/pipe.general");
var RepoTemplate = (function (_super) {
    __extends(RepoTemplate, _super);
    function RepoTemplate() {
        _super.apply(this, arguments);
        this.templateName = service_apinatomy2_1.TemplateName;
    }
    RepoTemplate.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.types.length == 0) {
            for (var x in service_apinatomy2_1.TemplateName)
                this.types.push(x);
        }
        this.zones = this.types.map(function (x) { return x + "_zone"; });
    };
    RepoTemplate.prototype.getIcon = function (item) {
        switch (item.class) {
            case this.templateName.Template: return "images/type.png";
            case this.templateName.LyphTemplate: return "images/lyphType.png";
            case this.templateName.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";
            case this.templateName.ProcessTemplate: return "images/processType.png";
            case this.templateName.MeasurableTemplate: return "images/measurableType.png";
            case this.templateName.CausalityTemplate: return "images/causalityType.png";
            case this.templateName.NodeTemplate: return "images/nodeType.png";
            case this.templateName.BorderTemplate: return "images/borderType.png";
            case this.templateName.CausalityTemplate: return "images/causality.png";
            case this.templateName.GroupTemplate: return "images/groupType.png";
            case this.templateName.OmegaTreeTemplate: return "images/omegaTreeType.png";
        }
        return "images/resource.png";
    };
    RepoTemplate.prototype.onAdded = function (resourceType) {
        var newItem;
        switch (resourceType) {
            case this.templateName.CausalityTemplate:
                newItem = new service_apinatomy2_1.CausalityTemplate({ name: "(New) T: causality" });
                break;
            case this.templateName.BorderTemplate:
                newItem = new service_apinatomy2_1.BorderTemplate({ name: "(New) T: border" });
                break;
            case this.templateName.NodeTemplate:
                newItem = new service_apinatomy2_1.NodeTemplate({ name: "(New) T: node" });
                break;
            case this.templateName.MeasurableTemplate:
                newItem = new service_apinatomy2_1.MeasurableTemplate({ name: "(New) T: measurable" });
                break;
            case this.templateName.ProcessTemplate:
                newItem = new service_apinatomy2_1.ProcessTemplate({ name: "(New) T: process" });
                break;
            case this.templateName.LyphTemplate:
                newItem = new service_apinatomy2_1.LyphTemplate({ name: "(New) T: type" });
                break;
            case this.templateName.CylindricalLyphTemplate:
                newItem = new service_apinatomy2_1.CylindricalLyphTemplate({ name: "(New) T: cylindrical lyph" });
                break;
            case this.templateName.GroupTemplate:
                newItem = new service_apinatomy2_1.GroupTemplate({ name: "(New) T: group" });
                break;
            case this.templateName.OmegaTreeTemplate:
                newItem = new service_apinatomy2_1.OmegaTreeTemplate({ name: "(New) T: omega tree" });
                break;
            default: newItem = new service_apinatomy2_1.Template({ name: "(New) T" });
        }
        this.items.push(newItem);
        this.added.emit(newItem);
        this.updated.emit(this.items);
        this.selectedItem = newItem;
    };
    RepoTemplate = __decorate([
        core_1.Component({
            selector: 'repo-template',
            inputs: ['items', 'caption', 'dependencies', 'ignore', 'types', 'selectedItem', 'options'],
            template: "\n    <div class=\"panel panel-warning repo-template\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\" >\n        <sort-toolbar *ngIf= \"options && options.showSortToolbar\" [options]=\"['Name', 'ID']\" (sorted)=\"onSorted($event)\"></sort-toolbar>\n        <edit-toolbar *ngIf= \"!(options && options.headersOnly)\" [options]=\"types\" (added)=\"onAdded($event)\"></edit-toolbar>\n        <filter-toolbar *ngIf= \"options && options.showFilterToolbar\" [filter]=\"searchString\" [options]=\"['Name', 'ID', 'Class']\" (applied)=\"onFiltered($event)\"></filter-toolbar>\n          \n        <accordion class=\"list-group\" [closeOthers]=\"true\" \n          dnd-sortable-container [dropZones]=\"zones\" [sortableData]=\"items\">\n          <accordion-group *ngFor=\"let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index\" \n            class=\"list-group-item\" dnd-sortable \n           [sortableIndex]=\"i\" (click)=\"onHeaderClick(item)\">\n            <div accordion-heading><item-header [item]=\"item\" [selectedItem]=\"selectedItem\" [isSelectedOpen]=\"isSelectedOpen\" [icon]=\"getIcon(item)\"></item-header></div>\n\n            <div *ngIf=\"!options || !options.headersOnly\">\n              <panel-template *ngIf=\"item == selectedItem\" \n                [item]=\"item\" \n                [ignore]=\"ignore\"\n                [dependencies]=\"dependencies\" \n                (saved)=\"onSaved(item, $event)\" \n                (removed)=\"onRemoved(item)\"></panel-template>            \n            </div>\n          </accordion-group>        \n        </accordion>       \n      </div>\n    </div>\n  ",
            directives: [repo_abstract_1.ItemHeader, toolbar_sort_1.SortToolbar, toolbar_repoEdit_1.EditToolbar, toolbar_filter_1.FilterToolbar,
                dispatch_templates_1.PanelDispatchTemplates, accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES],
            pipes: [pipe_general_1.OrderBy, pipe_general_1.FilterBy]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoTemplate);
    return RepoTemplate;
}(repo_abstract_1.RepoAbstract));
exports.RepoTemplate = RepoTemplate;
//# sourceMappingURL=repo.template.js.map