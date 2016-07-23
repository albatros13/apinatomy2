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
//import {DclWrapperComponent} from "../components/component.test";
var ng2_nvd3_1 = require('ng2-nvd3/lib/ng2-nvd3');
var color = d3.scale.category20();
var HierarchyGraphWidget = (function () {
    function HierarchyGraphWidget(renderer, el, vc, resolver) {
        this.renderer = renderer;
        this.el = el;
        this.vc = vc;
        this.resolver = resolver;
        this.properties = [];
        this.depth = -1;
        this.active = true;
        this.vp = { size: { width: 400, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 20 } } };
        this.setNode = new core_1.EventEmitter();
    }
    HierarchyGraphWidget.prototype.ngOnInit = function () {
        this.setPanelSize(window.innerWidth, window.innerHeight);
        this.setGraphOptions();
    };
    HierarchyGraphWidget.prototype.onResize = function (event) {
        this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
    };
    //TODO: replace
    HierarchyGraphWidget.prototype.setPanelSize = function (innerWidth, innerHeight) {
        var w = innerWidth / 2 - 2 * this.vp.margin.x;
        var h = innerHeight / 2 - 2 * this.vp.margin.y;
        var delta = 10;
        if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)) {
            this.vp.size = { width: w, height: h };
            if (this.graphOptions) {
                this.graphOptions.width = w;
                this.graphOptions.height = h;
                this.refresh();
            }
        }
    };
    HierarchyGraphWidget.prototype.refresh = function () {
        var _this = this;
        setTimeout(function () { _this.active = false; }, 0);
        setTimeout(function () { _this.active = true; }, 0);
    };
    HierarchyGraphWidget.prototype.setGraphOptions = function () {
        var visibleProperties = this.properties;
        function formatValue(value) {
            var res = "[";
            for (var i = 0; i < value.length; i++) {
                res += "{" + ((value[i].id) ? value[i].id : "?") + ": " + value[i].name + "}" + ",";
            }
            res = res.replace(/,\s*$/, "");
            res += "]";
            return res;
        }
        this.graphOptions = {
            chart: {
                type: 'forceDirectedGraph',
                width: this.vp.size.width,
                height: this.vp.size.height,
                margin: { top: 20, right: 20, bottom: 20, left: 20 },
                color: function (d) {
                    return color(d.class);
                },
                tooltip: {
                    contentGenerator: function (d) {
                        var html = "<b>" + ((d.id) ? d.id : "?") + ": " + d.name + "</b> <ul>";
                        if (visibleProperties) {
                            d.series.forEach(function (elem) {
                                if (visibleProperties.indexOf(elem.key) > -1) {
                                    html += "<li><style='color:" + elem.color + "'>" + elem.key + ": " +
                                        "<b>" + formatValue(elem.value) + "</b></li>";
                                }
                            });
                        }
                        html += "</ul>";
                        return html;
                    }
                },
                nodeExtras: function (node) {
                    node && node
                        .append("text")
                        .attr("dx", 8)
                        .attr("dy", ".35em")
                        .text(function (d) { return d.name; })
                        .attr("class", "nodeLabel");
                }
            }
        };
    };
    HierarchyGraphWidget.prototype.ngOnChanges = function (changes) {
        if (this.item) {
            this.data = this.getGraphData(this.item, this.relation, this.depth);
        }
        else {
            this.data = {};
        }
    };
    HierarchyGraphWidget.prototype.draw = function () { };
    HierarchyGraphWidget.prototype.getGraphData = function (item, property, depth) {
        var data = { nodes: [], links: [] };
        if (!item)
            return data;
        data.nodes.push(item);
        if (!property)
            return data;
        if (!depth)
            depth = -1;
        traverse(item, property, depth, data);
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
                data.links.push({ source: root, target: child });
                if (data.nodes.indexOf(child) == -1) {
                    data.nodes.push(child);
                    traverse(child, property, depth - 1, data);
                }
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HierarchyGraphWidget.prototype, "setNode", void 0);
    HierarchyGraphWidget = __decorate([
        core_1.Component({
            selector: 'hierarchy-graph',
            inputs: ['item', 'relation', 'depth', 'properties'],
            template: "\n    <div class=\"panel-body\" (window:resize)=\"onResize($event)\">\n      <!--<svg #graphSvg class=\"svg-widget\"></svg>-->\n      <nvd3 *ngIf=\"active\" [options]=\"graphOptions\" [data]=\"data\"></nvd3>\n    </div>\n  ",
            directives: [ng2_nvd3_1.nvD3],
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentResolver])
    ], HierarchyGraphWidget);
    return HierarchyGraphWidget;
}());
exports.HierarchyGraphWidget = HierarchyGraphWidget;
//# sourceMappingURL=view.hierarchyGraph.js.map