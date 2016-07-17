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
var component_general_1 = require("../components/component.general");
var hierarchy_graph_1 = require("./hierarchy.graph");
var hierarchy_tree_1 = require("./hierarchy.tree");
var HierarchyWidget = (function () {
    function HierarchyWidget() {
        //Parameter form
        this.relation = { id: "subtypes", name: "subtypes" };
        this.allRelations = [this.relation];
        this.properties = [];
        this.allProperties = [];
        this.layout = { id: "Bottom", name: "Bottom" };
        this.layouts = [
            { text: "Tree", children: ["Top", "Bottom", "Left", "Right", "Radial"].map(function (item) { return { id: item, name: item }; }) },
            { text: "Graph", children: ["Force-directed"].map(function (item) { return { id: item, name: item }; }) }];
        this.depth = -1;
    }
    HierarchyWidget.prototype.ngOnInit = function () {
        if (this.options) {
            if (this.options.relation)
                this.relation = { id: this.options.relation, name: this.options.relation };
            if (this.options.depth)
                this.depth = this.options.depth;
            if (this.options.layout)
                this.layout = { id: this.options.layout, name: this.options.layout };
        }
        //console.dir(this.item.constructor.name);
    };
    HierarchyWidget.prototype.updateView = function (item) {
        if (item)
            this.layout = item;
    };
    HierarchyWidget.prototype.ngOnChanges = function (changes) {
    };
    HierarchyWidget.prototype.updateProperty = function (prop, item) {
    };
    HierarchyWidget = __decorate([
        core_1.Component({
            selector: 'hierarchy',
            inputs: ['item', 'options'],
            template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Configure relationship view</div>\n       <div class=\"panel-body\">\n          <div>\n            <!--Relation to show-->\n              <div class=\"input-control\">\n                <label for=\"relation\">Relation: </label>\n                <select-input-1 [item] = \"relation\"\n                   (updated)=\"updateProperty('relation', $event)\"    \n                   [options] = \"allRelations\">\n                </select-input-1>\n              </div>\n              \n              <!--Properties of resources to display-->\n              <div class=\"input-control\">\n                <label for=\"properties\">Properties to show: </label>\n                <select-input [item] = \"properties\"\n                   (updated)=\"updateProperty('properties', $event)\"    \n                   [options] = \"allProperties\">\n                </select-input>\n              </div>\n        \n              <!--Depth-->\n               <div class=\"input-control\">\n                 <label for=\"depth\">Depth: </label>\n                 <input type=\"number\" min=\"0\" max=\"100\" [(value)]=\"depth\">\n               </div>\n               \n              <!--Layout-->\n               <div class=\"input-control\">\n                <label for=\"relation\">Layout: </label>\n                 <select-input-1 [item] = \"layout\"\n                  (updated)=\"updateView($event)\"    \n                  [options] = \"layouts\"></select-input-1>\n              </div>\n            </div>\n         <div style=\"float: right; padding: 4px\">\n            <button type=\"submit\" class=\"btn btn-default\">Apply</button>\n         </div>\n       </div>\n    </div>      \n    <hierarchy-tree *ngIf=\"layout.id != 'Force-directed'\" [item]=\"item\" [options]=\"options\"></hierarchy-tree>\n    <hierarchy-graph *ngIf=\"layout.id == 'Force-directed'\" [item]=\"item\" [options]=\"options\"></hierarchy-graph>\n  ",
            directives: [component_general_1.SingleSelectInput, component_general_1.MultiSelectInput, hierarchy_graph_1.HierarchyGraphWidget, hierarchy_tree_1.HierarchyTreeWidget]
        }), 
        __metadata('design:paramtypes', [])
    ], HierarchyWidget);
    return HierarchyWidget;
}());
exports.HierarchyWidget = HierarchyWidget;
//# sourceMappingURL=widget.hierarchy.js.map