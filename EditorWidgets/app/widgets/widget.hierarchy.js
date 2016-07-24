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
 * Created by Natallia on 7/15/2016.
 */
var core_1 = require('@angular/core');
var component_select_1 = require("../components/component.select");
var view_hierarchyGraph_1 = require("./view.hierarchyGraph");
var view_hierarchyTree_1 = require("./view.hierarchyTree");
var common_1 = require('@angular/common');
var dropdown_1 = require('ng2-bootstrap/components/dropdown');
var service_resize_1 = require('../services/service.resize');
var HierarchyWidget = (function () {
    function HierarchyWidget(resizeService) {
        var _this = this;
        this.resizeService = resizeService;
        this.relation = "subtrees";
        this.layout = "tree";
        //Parameter form
        this.relations = [this.relation];
        this.allProperties = [];
        this.depth = 2;
        this.subscription = resizeService.resize$.subscribe(function (event) {
            if (event.target == "hierarchy-widget") {
                _this.onSetPanelSize(event);
            }
        });
    }
    HierarchyWidget.prototype.onSetPanelSize = function (event) {
        this.resizeService.announceResize({ target: "hierarchy-tree", size: event.size });
        this.resizeService.announceResize({ target: "hierarchy-graph", size: event.size });
    };
    HierarchyWidget.prototype.ngOnInit = function () {
        this.updateRelations();
    };
    HierarchyWidget.prototype.ngOnChanges = function (changes) {
        this.updateRelations();
    };
    HierarchyWidget.prototype.onRelationChanged = function (item) {
        this.relation = item;
        this.updateProperties();
    };
    HierarchyWidget.prototype.updateRelations = function () {
        this.relations = [];
        if (this.item) {
            for (var relation in this.item) {
                if (this.item[relation] instanceof Array) {
                    this.relations.push(relation);
                }
            }
        }
    };
    HierarchyWidget.prototype.updateProperties = function () {
        this.allProperties = [];
        var propertyNames = [];
        if (this.relation) {
            var obj = this.item[this.relation];
            for (var i = 0; i < obj.length; i++) {
                for (var property in obj[i])
                    if (obj[i][property] instanceof Array)
                        if (propertyNames.indexOf(property) == -1)
                            propertyNames.push(property);
            }
        }
        this.allProperties = propertyNames.map(function (item) { return { id: item, name: item }; });
        if (this.allProperties.length > 0)
            this.properties = [this.allProperties[0]];
    };
    HierarchyWidget.prototype.firstToCapital = function (str) {
        if (!str || (str.length == 0))
            return str;
        return str[0].toUpperCase() + str.substring(1);
    };
    HierarchyWidget.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HierarchyWidget = __decorate([
        core_1.Component({
            selector: 'hierarchy-widget',
            inputs: ['item', 'relation'],
            template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <em>{{firstToCapital(relation)}}</em>{{(relation)? ' of ': ''}}<strong>{{(item)? item.id: ''}}{{(item)? ': ' + item.name : ''}}</strong>\n      </div>\n      <div class=\"controls-group\">\n          <!--Relation to show-->\n          <div class=\"btn-group\" style=\"float: left;\" dropdown>\n            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\" aria-label=\"Relation\" dropdownToggle>\n              Relation <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"Relation\">\n              <li *ngFor=\"let option of relations; let i = index\" role=\"menuitem\" (click)=\"onRelationChanged(option)\">\n                <a class=\"dropdown-item\" href=\"#\"> \n                  <span *ngIf=\"relation == option\">&#10004;</span>{{option}}</a>\n              </li>\n            </ul>\n          </div>\n\n          <!--Properties of resources to display-->\n          <!--<div class=\"input-control\">-->\n            <!--<label for=\"properties\">Property: </label>-->\n            <!--<select-input [item] = \"properties\"-->\n               <!--(updated)=\"properties = $event\"    -->\n               <!--[options] = \"allProperties\">-->\n            <!--</select-input>-->\n          <!--</div>-->\n        \n          <!--Depth-->\n          <div class=\"input-group input-group-sm\" style=\"width: 150px; float: left;\">\n            <span class=\"input-group-addon\" id=\"basic-addon1\">Depth</span>\n            <input type=\"number\" class=\"form-control\" aria-describedby=\"basic-addon1\"\n              min=\"0\" max=\"50\" [(value)]=\"depth\" >\n          </div>\n          \n          <!--Layout-->\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-default\" \n              [ngClass]=\"{'active': layout == 'tree'}\" (click)=\"layout = 'tree'\">\n              <img class=\"icon\" src=\"images/tree.png\"/>\n            </button>\n            <button type=\"button\" class=\"btn btn-default\" \n              [ngClass]=\"{'active': layout == 'graph'}\" (click)=\"layout = 'graph'\">\n              <img class=\"icon\" src=\"images/graph.png\"/>\n            </button>\n          </div>\n              \n        </div>\n      <hierarchy-tree *ngIf=\"layout == 'tree'\" \n        [item]=\"item\" [relation]=\"relation\" [depth]=\"depth\" [properties]=\"properties\" ></hierarchy-tree>\n      <hierarchy-graph *ngIf=\"layout == 'graph'\" \n        [item]=\"item\" [relation]=\"relation\" [depth]=\"depth\" [properties]=\"properties\"></hierarchy-graph>\n    </div>      \n  ",
            directives: [component_select_1.SingleSelectInput, component_select_1.MultiSelectInput, view_hierarchyGraph_1.HierarchyGraphWidget, view_hierarchyTree_1.HierarchyTreeWidget,
                dropdown_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService])
    ], HierarchyWidget);
    return HierarchyWidget;
}());
exports.HierarchyWidget = HierarchyWidget;
//# sourceMappingURL=widget.hierarchy.js.map