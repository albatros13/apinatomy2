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
 * Created by Natallia on 7/14/2016.
 */
var core_1 = require('@angular/core');
require("d3");
var color = d3.scale.category20();
//Resource visualization widget stub
var TemplateBox = (function () {
    function TemplateBox(model) {
        this.model = model;
    }
    TemplateBox.prototype.render = function (svg, options) {
        return svg.append("rect")
            .attr("x", options.center.x).attr("y", options.center.y)
            .attr("width", options.size.width).attr("height", options.size.height)
            .style("stroke", "black").style("fill", "white");
    };
    return TemplateBox;
}());
exports.TemplateBox = TemplateBox;
var OmegaTreeWidget = (function () {
    function OmegaTreeWidget(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.caption = "Omega function ";
        this.vp = { size: { width: 400, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 20 } } };
    }
    OmegaTreeWidget.prototype.ngOnInit = function () {
        this.setPanelSize(window.innerWidth, window.innerHeight);
    };
    OmegaTreeWidget.prototype.onResize = function (event) {
        this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
    };
    OmegaTreeWidget.prototype.setPanelSize = function (innerWidth, innerHeight) {
        var w = innerWidth / 2 - 2 * this.vp.margin.x;
        var h = innerHeight / 2 - 2 * this.vp.margin.y;
        var delta = 10;
        if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)) {
            this.vp.size = { width: w, height: h };
            this.draw(this.svg, this.vp, this.data);
        }
    };
    OmegaTreeWidget.prototype.ngOnChanges = function (changes) {
        this.svg = d3.select(this.el.nativeElement).select('svg');
        if (this.item) {
            this.caption = "Omega function: " + this.item.id + " - " + this.item.name;
            this.data = this.getOmegaTreeData(this.item);
            this.draw(this.svg, this.vp, this.data);
        }
        else {
            this.data = {};
            this.svg.selectAll("g").remove();
        }
    };
    OmegaTreeWidget.prototype.draw = function (svg, vp, data) {
        var w = vp.size.width - 2 * vp.margin.x;
        var h = vp.size.height - 2 * vp.margin.y;
        var dx = vp.node.size.width / 2;
        var dy = vp.node.size.height / 2;
        svg.selectAll(".tree").remove();
        var diagonal = d3.svg.diagonal().projection(function (d) { return [d.x, d.y]; });
        var tree = d3.layout.tree().size([w, h]);
        var treeSvg = svg.append("g").attr("class", "tree").attr("width", vp.size.width).attr("height", vp.size.height)
            .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");
        var nodes = tree.nodes(data);
        var links = tree.links(nodes);
        var link = treeSvg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);
        var node = treeSvg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", "4.5")
            .attr("transform", transform);
        var icon = treeSvg.selectAll(".icon")
            .data(links)
            .enter()
            .append("g")
            .attr("class", "icon")
            .attr("transform", transform)
            .each(function (d) {
            if (d.source) {
                var item = new TemplateBox(d.source.resource);
                item.render(treeSvg, { center: { x: (d.source.x + d.target.x) / 2 - dx, y: (d.source.y + d.target.y) / 2 - dy }, size: vp.node.size });
            }
        });
        var text = treeSvg.selectAll("nodeLabel")
            .data(links)
            .enter()
            .append("g")
            .attr("class", "nodeLabel")
            .append("text")
            .attr("dx", -dx - 4).style("text-anchor", "end")
            .attr("dy", 2)
            .attr("transform", transform)
            .text(function (d) { return ((d.id) ? d.id : "?") + ": " + d.name; });
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
        data = parent;
        for (var i = 1; i < item.elements.length; i++) {
            var obj_1 = item.elements[i];
            var child = { id: obj_1.id, name: obj_1.name, resource: obj_1 };
            parent.children = [child];
            parent = child;
        }
        return data;
    };
    OmegaTreeWidget = __decorate([
        core_1.Component({
            selector: 'omega-tree',
            inputs: ['item'],
            template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\" (window:resize)=\"onResize($event)\">\n          <svg #treeSvg class=\"svg-widget\"></svg>\n       </div>\n    </div>\n  ",
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], OmegaTreeWidget);
    return OmegaTreeWidget;
}());
exports.OmegaTreeWidget = OmegaTreeWidget;
//# sourceMappingURL=view.omegaTree.js.map