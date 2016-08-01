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
var ng2_nvd3_1 = require('ng2-nvd3/lib/ng2-nvd3');
var service_resize_1 = require('../services/service.resize');
var color = d3.scale.category20();
var HierarchyGraphWidget = (function () {
    function HierarchyGraphWidget(renderer, el, resizeService) {
        this.renderer = renderer;
        this.el = el;
        this.resizeService = resizeService;
        this.relations = [];
        this.properties = [];
        this.depth = -1;
        this.active = true;
        this.vp = { size: { width: 600, height: 400 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 20 } } };
        this.setNode = new core_1.EventEmitter();
        var self = this;
        this.subscription = resizeService.resize$.subscribe(function (event) {
            if (event.target == "hierarchy-graph") {
                self.setPanelSize(event.size);
            }
        });
    }
    HierarchyGraphWidget.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HierarchyGraphWidget.prototype.ngOnInit = function () {
        if (!this.relations)
            this.relations = [];
        this.setGraphOptions();
    };
    HierarchyGraphWidget.prototype.ngOnChanges = function (changes) {
        if (this.item) {
            this.data = this.getGraphData(this.item, this.relations, this.depth);
        }
        else {
            this.data = {};
        }
    };
    HierarchyGraphWidget.prototype.setPanelSize = function (size) {
        var _this = this;
        var delta = 10;
        if ((Math.abs(this.vp.size.width - size.width) > delta) || (Math.abs(this.vp.size.height - size.height) > delta)) {
            this.vp.size = size;
            if (this.graphOptions) {
                this.graphOptions.width = this.vp.size.width;
                this.graphOptions.height = this.vp.size.height;
                setTimeout(function () { _this.active = false; }, 0);
                setTimeout(function () { _this.active = true; }, 0);
            }
        }
    };
    HierarchyGraphWidget.prototype.setGraphOptions = function () {
        var visibleProperties = [];
        if (this.properties)
            visibleProperties = this.properties.filter(function (x) { return x.selected; }).map(function (x) { return x.value; });
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
    HierarchyGraphWidget.prototype.getGraphData = function (item, relations, depth) {
        var data = { nodes: [], links: [] };
        if (!item)
            return data;
        data.nodes.push(item);
        if (!relations || (relations.length == 0))
            return data;
        if (!depth)
            depth = -1;
        var fields = this.relations.filter(function (x) { return x.selected; }).map(function (x) { return x.value; });
        if (!depth)
            depth = -1;
        traverse(item, depth, data);
        return data;
        function traverse(root, depth, data) {
            if (!root)
                return;
            if (depth == 0)
                return root;
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var fieldName = fields_1[_i];
                if (!root[fieldName])
                    return;
                var children = root[fieldName];
                //TODO: test
                for (var child in children) {
                    data.links.push({ source: root, target: child });
                    if (data.nodes.indexOf(child) == -1) {
                        data.nodes.push(child);
                        traverse(child, depth - 1, data);
                    }
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
            inputs: ['item', 'relations', 'properties', 'depth'],
            template: "\n    <div class=\"panel-body\">\n      <nvd3 *ngIf=\"active\" [options]=\"graphOptions\" [data]=\"data\"></nvd3>\n    </div>\n  ",
            directives: [ng2_nvd3_1.nvD3],
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, service_resize_1.ResizeService])
    ], HierarchyGraphWidget);
    return HierarchyGraphWidget;
}());
exports.HierarchyGraphWidget = HierarchyGraphWidget;
//# sourceMappingURL=view.hierarchyGraph.js.map