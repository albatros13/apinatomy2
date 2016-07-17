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
var component_test_1 = require("../components/component.test");
var hierarchy_general_1 = require("./hierarchy.general");
var HierarchyTreeWidget = (function (_super) {
    __extends(HierarchyTreeWidget, _super);
    function HierarchyTreeWidget(renderer, el, vc, resolver) {
        _super.call(this);
        this.renderer = renderer;
        this.el = el;
        this.vc = vc;
        this.resolver = resolver;
        this.caption = "Hierarchy";
        this.selected = new core_1.EventEmitter();
    }
    HierarchyTreeWidget.prototype.ngOnChanges = function (changes) {
        //changes['item'].currentValue;
        this.svg = d3.select(this.el.nativeElement).select('svg');
        if (this.item) {
            this.caption = "Hierarchy: " + this.item.id + ": " + this.item.name;
            if (this.options) {
                this.data = this.getTreeData(this.item, this.options.relation, this.options.depth);
                this.draw(this.svg, this.vp, this.data);
            }
        }
        else {
            this.data = {};
            this.svg.selectAll(".tree").remove();
        }
    };
    HierarchyTreeWidget.prototype.draw = function (svg, vp, data) {
        var w = vp.size.width - 2 * vp.margin.x;
        var h = vp.size.height - 2 * vp.margin.y;
        svg.selectAll("g").remove();
        var treeSvg = svg.append("g").attr("class", "tree").attr("width", vp.size.width).attr("height", vp.size.height)
            .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");
        var tree = d3.layout.tree().size([w, h]);
        var diagonal = d3.svg.diagonal().projection(function (d) { return [d.x, d.y]; });
        var nodes = tree.nodes(data);
        var links = tree.links(nodes);
        var dx = vp.node.size.width / 2;
        var dy = vp.node.size.height / 2;
        var link = treeSvg.selectAll(".treeLink")
            .data(links)
            .enter().append("path")
            .attr("class", "treeLink")
            .attr("d", diagonal);
        var node = treeSvg.selectAll(".treeNode")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "treeNode")
            .attr("transform", transform)
            .each(function (d) {
            var item = new hierarchy_general_1.TemplateBox(d.resource);
            item.render(treeSvg, { center: { x: d.x - dx, y: d.y - dy }, size: vp.node.size });
        });
        var text = treeSvg.selectAll("treeLabel").data(nodes)
            .enter()
            .append("g")
            .attr("class", "treeLabel")
            .append("text")
            .attr("dx", -dx - 4).style("text-anchor", "end")
            .attr("dy", 2)
            .attr("transform", transform)
            .text(function (d) { return ((d.id) ? d.id : "?") + ": " + d.name; });
        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
    };
    HierarchyTreeWidget.prototype.getTreeData = function (item, property, depth) {
        var data = {};
        if (!item)
            return data;
        if (!property)
            return data;
        if (!depth)
            depth = -1;
        data = { id: item.id, name: item.name, resource: item.root, children: [] };
        traverse(item, property, depth, data);
        return data;
        function traverse(root, property, depth, data) {
            if (!root)
                return;
            if (!root[property])
                return;
            if (depth == 0)
                return;
            if (!data.children)
                data.children = [];
            for (var _i = 0, _a = root[property]; _i < _a.length; _i++) {
                var obj = _a[_i];
                var child = { id: obj.id, name: obj.name, resource: obj };
                data.children.push(child);
                traverse(obj, property, depth - 1, child);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HierarchyTreeWidget.prototype, "selected", void 0);
    HierarchyTreeWidget = __decorate([
        core_1.Component({
            selector: 'hierarchy-tree',
            inputs: ['item', 'options'],
            template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\" (window:resize)=\"onResize($event)\">\n        <svg #treeSvg class=\"svg-widget\"></svg>\n      </div>\n    </div>\n  ",
            directives: [component_test_1.DclWrapperComponent] //, PropertyToolbar
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentResolver])
    ], HierarchyTreeWidget);
    return HierarchyTreeWidget;
}(hierarchy_general_1.AbstractHierarchyWidget));
exports.HierarchyTreeWidget = HierarchyTreeWidget;
//# sourceMappingURL=hierarchy.tree.js.map