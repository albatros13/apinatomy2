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
var core_1 = require('@angular/core');
var component_test_1 = require("../components/component.test");
var component_general_1 = require("../components/component.general");
var PropertyToolbar = (function () {
    function PropertyToolbar() {
        this.layout = "bottom";
        this.layouts = ["top", "bottom", "left", "right", "radial"];
    }
    PropertyToolbar = __decorate([
        core_1.Component({
            selector: 'property-toolbar',
            inputs: ['relation', 'options'],
            template: "\n      <!--Relation to show-->\n      <div class=\"input-control\">\n        <label for=\"relation\">Relation: </label>\n        <select-input-1 [item] = \"relation\"\n           (updated)=\"updateProperty('relation', $event)\"    \n           [options] = \"options\">\n        </select-input-1>\n      </div>\n      <!--Relation to show-->\n      <!--<div class=\"input-control\">-->\n        <!--<label for=\"properties\">Properties: </label>-->\n      <!--</div>-->\n      <!---->\n \n      <!--Tree layout-->\n      <div class=\"input-control\">\n        <label for=\"relation\">Layout: </label>\n         <select-input-1 [item] = \"layout\"\n          (itemChanged)=\"layout = $event.target.value\"    \n          [options] = \"layouts\"></select-input-1>\n      </div>\n  \n    ",
            directives: [component_general_1.SingleSelectInput, component_general_1.MultiSelectInput]
        }), 
        __metadata('design:paramtypes', [])
    ], PropertyToolbar);
    return PropertyToolbar;
}());
exports.PropertyToolbar = PropertyToolbar;
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
var TreeWidget = (function () {
    function TreeWidget(renderer, el, vc, resolver) {
        this.renderer = renderer;
        this.el = el;
        this.vc = vc;
        this.resolver = resolver;
        this.caption = "Hierarchy";
        this.vp = { size: { width: 400, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 20 } } };
        this.setNode = new core_1.EventEmitter();
    }
    TreeWidget.prototype.ngOnInit = function () {
        this.setPanelSize(window.innerWidth, window.innerHeight);
    };
    TreeWidget.prototype.ngOnChanges = function (changes) {
        //console.log('Tree widget - item = ', changes['item'].currentValue);
        this.treeSvg = d3.select(this.el.nativeElement).select('svg');
        if (this.item) {
            this.caption = this.item.id + " - " + this.item.name;
            this.data = this.getTreeData();
            this.drawTree(this.treeSvg, this.vp, this.data);
        }
        else {
            this.data = {};
            this.treeSvg.selectAll("g").remove();
        }
    };
    TreeWidget.prototype.ngAfterViewInit = function () {
        //Use ViewChild
        //let node =  this.renderer.createElement(this.treeSvg.nativeElement, 'h1', null);
        //this.renderer.setText(node, "HELLO");
    };
    TreeWidget.prototype.onResize = function (event) {
        this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
    };
    TreeWidget.prototype.setPanelSize = function (innerWidth, innerHeight) {
        var w = innerWidth / 2 - 2 * this.vp.margin.x;
        var h = innerHeight / 2 - 2 * this.vp.margin.y;
        var delta = 10;
        if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)) {
            this.vp.size = { width: w, height: h };
            if (this.treeSvg) {
                this.drawTree(this.treeSvg, this.vp, this.data);
            }
        }
    };
    TreeWidget.prototype.drawTree = function (svg, vp, data) {
        var tree = this;
        var w = vp.size.width - 2 * vp.margin.x;
        var h = vp.size.height - 2 * vp.margin.y;
        svg.selectAll("g").remove();
        var treeSvg = svg.append("g").attr("class", "tree").attr("width", vp.size.width).attr("height", vp.size.height)
            .attr("transform", "translate(" + vp.margin.x + "," + vp.margin.y + ")");
        var cluster = d3.layout.tree().size([w, h]);
        var diagonal = d3.svg.diagonal().projection(function (d) { return [d.x, d.y]; });
        var nodes = cluster.nodes(data);
        var links = cluster.links(nodes);
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
            var item = new TemplateBox(d.resource);
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
    TreeWidget.prototype.getTreeData = function () {
        var data = {};
        if (!this.item)
            return data;
        if (!this.options || !this.options.property)
            return data;
        var depth = this.options.depth;
        if (!depth)
            depth = -1;
        data = { id: this.item.id, name: this.item.name, resource: this.item.root, children: [] };
        traverse(this.item, this.options.property, depth, data);
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
    TreeWidget.prototype.getListData = function () {
        var data = {};
        if (!this.item)
            return data;
        if (!this.options || !this.options.property)
            return data;
        var depth = this.options.depth;
        if (!depth)
            depth = -1;
        traverse(this.item, this.options.property, depth, data);
        return data;
        function traverse(root, property, depth, data) {
            if (!root)
                return;
            if (!root[property])
                return;
            if (depth == 0)
                return root;
            var children = root[property];
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                data.push(child);
                traverse(child, property, depth - 1, data);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeWidget.prototype, "setNode", void 0);
    TreeWidget = __decorate([
        core_1.Component({
            selector: 'tree',
            inputs: ['item', 'options'],
            template: "\n    <div class=\"panel panel-success\">\n      <div class=\"panel-heading\">{{caption}}</div>\n      <div class=\"panel-body\" (window:resize)=\"onResize($event)\">\n        <svg #treeSvg class=\"svg-widget\"></svg>\n      </div>\n    </div>\n  ",
            directives: [component_test_1.DclWrapperComponent] //, PropertyToolbar
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentResolver])
    ], TreeWidget);
    return TreeWidget;
}());
exports.TreeWidget = TreeWidget;
//# sourceMappingURL=widget.tree.js.map