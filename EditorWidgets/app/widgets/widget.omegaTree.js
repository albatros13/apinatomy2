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
 * Created by Natallia on 7/14/2016.
 */
var core_1 = require('@angular/core');
var hierarchy_general_1 = require("./hierarchy.general");
var OmegaTreeWidget = (function (_super) {
    __extends(OmegaTreeWidget, _super);
    function OmegaTreeWidget(renderer, el, vc, resolver) {
        _super.call(this);
        this.renderer = renderer;
        this.el = el;
        this.vc = vc;
        this.resolver = resolver;
        this.caption = "Omega function ";
        this.setNode = new core_1.EventEmitter();
    }
    OmegaTreeWidget.prototype.ngOnChanges = function (changes) {
        //changes['item'].currentValue;
        this.svg = d3.select(this.el.nativeElement).select('svg');
        if (this.item) {
            this.caption = "Omega function: " + this.item.id + " - " + this.item.name;
            if (this.options) {
                this.data = this.getOmegaTreeData(this.item);
                this.draw(this.svg, this.vp, this.data);
            }
        }
        else {
            this.data = {};
            this.svg.selectAll("g").remove();
        }
    };
    OmegaTreeWidget.prototype.draw = function (svg, vp, data) {
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
            .attr("dx", 0).style("text-anchor", "middle")
            .attr("dy", 2)
            .attr("transform", transform)
            .text(function (d) { return d.id; });
        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
    };
    OmegaTreeWidget.prototype.getOmegaTreeData = function (item) {
        var data = {};
        if (!item)
            return data;
        if (!item.elements || !item.elements[0])
            return data;
        var obj = item.elements[0];
        var parent = { id: obj.id, name: obj.name, resource: obj };
        for (var i = 1; i < item.elements.length; i++) {
            var obj_1 = item.elements[i];
            var child = { id: obj_1.id, name: obj_1.name, resource: obj_1 };
            parent.children = [child];
            parent = child;
        }
        return data;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OmegaTreeWidget.prototype, "setNode", void 0);
    OmegaTreeWidget = __decorate([
        core_1.Component({
            selector: 'omega-tree',
            inputs: ['item', 'options'],
            template: "\n    <div class=\"panel panel-success\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\" (window:resize)=\"onResize($event)\">\n        <svg #treeSvg class=\"svg-widget\"></svg>\n      </div>\n    </div>\n  ",
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentResolver])
    ], OmegaTreeWidget);
    return OmegaTreeWidget;
}(hierarchy_general_1.AbstractHierarchyWidget));
exports.OmegaTreeWidget = OmegaTreeWidget;
//# sourceMappingURL=widget.omegaTree.js.map