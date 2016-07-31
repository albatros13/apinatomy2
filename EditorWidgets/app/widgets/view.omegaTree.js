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
var service_resize_1 = require('../services/service.resize');
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
    function OmegaTreeWidget(renderer, el, resizeService) {
        var _this = this;
        this.renderer = renderer;
        this.el = el;
        this.resizeService = resizeService;
        this.caption = "Omega function ";
        this.vp = { size: { width: 400, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 40 } } };
        this.subscription = resizeService.resize$.subscribe(function (event) {
            if (event.target == "omega-tree") {
                _this.setPanelSize(event.size);
            }
        });
    }
    OmegaTreeWidget.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    OmegaTreeWidget.prototype.setPanelSize = function (size) {
        var delta = 10;
        if ((Math.abs(this.vp.size.width - size.width) > delta) || (Math.abs(this.vp.size.height - size.height) > delta)) {
            this.vp.size = { width: size.width, height: size.height - 40 };
            if (this.svg) {
                this.draw(this.svg, this.vp, this.data);
            }
        }
    };
    OmegaTreeWidget.prototype.ngOnChanges = function (changes) {
        this.svg = d3.select(this.el.nativeElement).select('svg');
        if (this.item) {
            this.caption = "Omega function: " + this.item.id + " - " + this.item.name;
            this.data = this.getOmegaTreeData(this.item, "elements");
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
            .attr("r", function (d) {
            return d.children ? 4.5 : 0;
        })
            .style("fill", function (d) {
            return color(d.class);
        })
            .attr("transform", transform);
        var dx = vp.node.size.width / 2;
        var dy = vp.node.size.height / 2;
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
            .attr("dx", -5)
            .style("text-anchor", "end")
            .attr("x", function (d) { return (d.source.x + d.target.x) / 2 - dx; })
            .attr("y", function (d) { return (d.source.y + d.target.y) / 2; })
            .text(function (d) { return ((d.source.id) ? d.source.id : "?") + ": " + d.source.name; });
        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
    };
    OmegaTreeWidget.prototype.getOmegaTreeData = function (item, property) {
        var data = {};
        if (!item)
            return data;
        if (!property)
            return data;
        if (!item[property] || !item[property][0])
            return data;
        var obj = item[property][0];
        var parent = { id: obj.id, name: obj.name, resource: obj };
        data = parent;
        for (var i = 1; i < item[property].length; i++) {
            var obj_1 = item[property][i];
            var child = { id: obj_1.id, name: obj_1.name, resource: obj_1 };
            parent.children = [child];
            parent = child;
        }
        //fake node
        parent.children = [{ skip: true }];
        return data;
    };
    OmegaTreeWidget = __decorate([
        core_1.Component({
            selector: 'omega-tree',
            inputs: ['item'],
            template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\">\n          <svg #treeSvg class=\"svg-widget\"></svg>\n       </div>\n    </div>\n  ",
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, service_resize_1.ResizeService])
    ], OmegaTreeWidget);
    return OmegaTreeWidget;
}());
exports.OmegaTreeWidget = OmegaTreeWidget;
//# sourceMappingURL=view.omegaTree.js.map