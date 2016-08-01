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
var view_hierarchyGraph_1 = require("./view.hierarchyGraph");
var view_hierarchyTree_1 = require("./view.hierarchyTree");
var common_1 = require('@angular/common');
var dropdown_1 = require('ng2-bootstrap/components/dropdown');
var service_resize_1 = require('../services/service.resize');
var toolbar_propertySettings_1 = require('../components/toolbar.propertySettings');
var HierarchyWidget = (function () {
    function HierarchyWidget(resizeService) {
        var _this = this;
        this.resizeService = resizeService;
        this.relations = [];
        this.layout = "tree";
        this.depth = 2;
        this.subscription = resizeService.resize$.subscribe(function (event) {
            if (event.target == "hierarchy-widget") {
                _this.onSetPanelSize(event);
            }
        });
    }
    HierarchyWidget.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
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
    HierarchyWidget.prototype.updateRelations = function () {
        this.relations = [];
        if (this.item) {
            var relations = Object.assign({}, this.item.constructor.relationshipShortcuts);
            for (var relation in relations) {
                this.relations.push({ value: relation, selected: false });
            }
            if (this.relations.length > 0)
                this.relations[0].selected = true;
        }
    };
    HierarchyWidget.prototype.updateProperties = function () {
        this.properties = [];
        if (this.relations) {
            for (var relation in this.relations) {
                var target = this.item[relation];
                if (target.constructor) {
                    var properties = Object.assign({}, target.constructor.relationshipShortcuts);
                    var _loop_1 = function(property) {
                        if (this_1.properties.find(function (x) { return (x.value == property); })) {
                            this_1.properties.push({ value: property, selected: false });
                        }
                    };
                    var this_1 = this;
                    for (var property in properties) {
                        _loop_1(property);
                    }
                }
            }
            if (this.properties.length > 0)
                this.properties[0].selected = true;
        }
    };
    HierarchyWidget.prototype.relationsChanged = function () { };
    HierarchyWidget.prototype.propertiesChanged = function () { };
    HierarchyWidget = __decorate([
        core_1.Component({
            selector: 'hierarchy-widget',
            inputs: ['item', 'relations', 'properties'],
            template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        Relations of <strong>{{(item)? item.id: ''}}{{(item)? ': ' + item.name : ''}}</strong>\n      </div>\n      <div class=\"panel-body\">\n          <!--Relations-->\n          <custom-property-toolbar  \n            [options] = \"relations\"\n            (change) = \"relationsChanged()\"\n            caption = 'Relations'>\n          </custom-property-toolbar>\n          \n          <!--Properties-->\n          <custom-property-toolbar  \n            [options] = \"properties\"\n            (change) = \"propertiesChanged()\"\n            caption = 'Properties'\n            >\n          </custom-property-toolbar>\n\n          <!--Depth-->\n          <div class=\"input-group input-group-sm\" style=\"width: 150px; float: left;\">\n            <span class=\"input-group-addon\" id=\"basic-addon1\">Depth</span>\n            <input type=\"number\" class=\"form-control\" aria-describedby=\"basic-addon1\"\n              min=\"0\" max=\"50\" [(ngModel)]=\"depth\" >\n          </div>\n          \n          <!--Layout-->\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-default\" \n              [ngClass]=\"{'active': layout == 'tree'}\" (click)=\"layout = 'tree'\">\n              <img class=\"icon\" src=\"images/tree.png\"/>\n            </button>\n            <button type=\"button\" class=\"btn btn-default\" \n              [ngClass]=\"{'active': layout == 'graph'}\" (click)=\"layout = 'graph'\">\n              <img class=\"icon\" src=\"images/graph.png\"/>\n            </button>\n          </div>\n\n        <hierarchy-tree *ngIf=\"layout == 'tree'\" \n          [item]=\"item\" [relations]=\"relations\" [properties]=\"properties\" [depth]=\"depth\"></hierarchy-tree>\n        <hierarchy-graph *ngIf=\"layout == 'graph'\" \n          [item]=\"item\" [relations]=\"relations\" [properties]=\"properties\" [depth]=\"depth\"></hierarchy-graph>\n      </div>     \n    </div>\n  ",
            directives: [view_hierarchyGraph_1.HierarchyGraphWidget, view_hierarchyTree_1.HierarchyTreeWidget,
                dropdown_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES, toolbar_propertySettings_1.CustomPropertyToolbar]
        }), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService])
    ], HierarchyWidget);
    return HierarchyWidget;
}());
exports.HierarchyWidget = HierarchyWidget;
//# sourceMappingURL=widget.hierarchy.js.map