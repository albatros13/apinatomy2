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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var toolbar_repoEdit_1 = require('../components/toolbar.repoEdit');
var toolbar_filter_1 = require('../components/toolbar.filter');
var toolbar_sort_1 = require('../components/toolbar.sort');
var utils_model_1 = require("../services/utils.model");
var pipe_general_1 = require("../transformations/pipe.general");
var dispatch_resources_1 = require("../panels/dispatch.resources");
var dispatch_templates_1 = require("../panels/dispatch.templates");
var repo_abstract_1 = require("./repo.abstract");
var utils_model_2 = require("../services/utils.model");
var RepoGeneral = (function (_super) {
    __extends(RepoGeneral, _super);
    function RepoGeneral() {
        _super.apply(this, arguments);
        this.getIcon = utils_model_2.getIcon;
    }
    RepoGeneral.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.types.length == 0) {
            //Resources
            for (var x in utils_model_1.ResourceName) {
                if ((x == utils_model_1.ResourceName.Resource) || (x == utils_model_1.ResourceName.Type) || (x == utils_model_1.ResourceName.MeasurableLocationType))
                    continue;
                this.types.push(x);
            }
            //Templates
            for (var x in utils_model_1.TemplateName) {
                if (x == utils_model_1.TemplateName.Template)
                    continue;
                this.types.push(x);
            }
        }
        this.zones = this.types.map(function (x) { return x + "_zone"; });
    };
    RepoGeneral = __decorate([
        core_1.Component({
            selector: 'repo-general',
            inputs: ['items', 'caption', 'ignore', 'types', 'selectedItem', 'options'],
            template: "\n     <div class=\"panel panel-info repo\">\n        <div class=\"panel-heading\">{{caption}}</div>\n        <div class=\"panel-body\">\n          <sort-toolbar [options]=\"['Name', 'ID', 'Class']\" (sorted)=\"onSorted($event)\"></sort-toolbar>\n          <edit-toolbar [options]=\"types\" [transform]=\"getClassLabel\" (added)=\"onAdded($event)\"></edit-toolbar>\n          <filter-toolbar [filter]=\"searchString\" [options]=\"['Name', 'ID', 'Class']\" (applied)=\"onFiltered($event)\"></filter-toolbar>\n          \n          <accordion class=\"list-group\" [closeOthers]=\"true\"> \n            <!--dnd-sortable-container [dropZones]=\"zones\" [sortableData]=\"items\">-->\n          <accordion-group *ngFor=\"let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index\">\n            <!--class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\"> -->\n            <div accordion-heading (click)=\"onHeaderClick(item)\"><item-header [item]=\"item\" [selectedItem]=\"selectedItem\" [isSelectedOpen]=\"isSelectedOpen\" [icon]=\"getIcon(item.class)\"></item-header></div>\n\n            <div *ngIf=\"!options || !options.headersOnly\">\n              <panel-general *ngIf=\"item == selectedItem\" [item]=\"item\"\n                [ignore]=\"ignore\"\n                (saved)=\"onSaved(item, $event)\" \n                (canceled)=\"onCanceled($event)\"\n                (removed)=\"onRemoved(item)\">\n               </panel-general>   \n               <panel-template *ngIf=\"item == selectedItem\" [item]=\"item\"\n                [ignore]=\"ignore\"\n                (saved)=\"onSaved(item, $event)\" \n                (canceled)=\"onCanceled($event)\"\n                (removed)=\"onRemoved(item)\">\n               </panel-template> \n            </div>\n                \n          </accordion-group>        \n          </accordion>       \n        </div>\n      </div>\n  ",
            styles: ['.repo{ width: 100%}'],
            directives: [
                toolbar_sort_1.SortToolbar, toolbar_repoEdit_1.EditToolbar, toolbar_filter_1.FilterToolbar,
                repo_abstract_1.ItemHeader,
                dispatch_resources_1.PanelDispatchResources, dispatch_templates_1.PanelDispatchTemplates,
                accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES],
            pipes: [pipe_general_1.OrderBy, pipe_general_1.FilterBy]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoGeneral);
    return RepoGeneral;
}(repo_abstract_1.RepoAbstract));
exports.RepoGeneral = RepoGeneral;
//# sourceMappingURL=repo.general.js.map