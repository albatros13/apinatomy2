"use strict";
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
var AbstractHierarchyWidget = (function () {
    function AbstractHierarchyWidget() {
        this.vp = { size: { width: 400, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 20 } } };
    }
    AbstractHierarchyWidget.prototype.ngOnInit = function () {
        this.setPanelSize(window.innerWidth, window.innerHeight);
    };
    AbstractHierarchyWidget.prototype.onResize = function (event) {
        this.setPanelSize(event.target.innerWidth, event.target.innerHeight);
    };
    AbstractHierarchyWidget.prototype.setPanelSize = function (innerWidth, innerHeight) {
        var w = innerWidth / 2 - 2 * this.vp.margin.x;
        var h = innerHeight / 2 - 2 * this.vp.margin.y;
        var delta = 10;
        if ((Math.abs(this.vp.size.width - w) > delta) || (Math.abs(this.vp.size.height - h) > delta)) {
            this.vp.size = { width: w, height: h };
            if (this.svg) {
                this.draw(this.svg, this.vp, this.data);
            }
        }
    };
    AbstractHierarchyWidget.prototype.getListData = function (item, property, depth) {
        var data = {};
        if (!item)
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
                if (data.indexOf(child) == -1)
                    data.push(child);
                traverse(child, property, depth - 1, data);
            }
        }
    };
    return AbstractHierarchyWidget;
}());
exports.AbstractHierarchyWidget = AbstractHierarchyWidget;
//# sourceMappingURL=hierarchy.general.js.map