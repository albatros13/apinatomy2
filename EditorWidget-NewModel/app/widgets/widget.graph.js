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
var lyph_edit_widget_1 = require("lyph-edit-widget");
var combineLatest_1 = require("rxjs/observable/combineLatest");
var GraphWidget = (function () {
    function GraphWidget(renderer, el, resizeService) {
        var _this = this;
        this.renderer = renderer;
        this.el = el;
        this.resizeService = resizeService;
        this.vp = { size: { width: 600, height: 600 },
            margin: { x: 20, y: 20 },
            node: { size: { width: 40, height: 40 } } };
        this.subscription = resizeService.resize$.subscribe(function (event) {
            if (event.target == "graph-widget") {
                _this.setPanelSize(event.size);
            }
        });
    }
    GraphWidget.prototype.setPanelSize = function (size) {
        var delta = 10;
        if ((Math.abs(this.vp.size.width - size.width) > delta) || (Math.abs(this.vp.size.height - size.height) > delta)) {
            this.vp.size = { width: size.width, height: size.height - 40 };
            if (this.svg) {
            }
        }
    };
    GraphWidget.prototype.ngOnInit = function () {
        var _this = this;
        this.svg = $('#graphSvg');
        if (this.svg) {
            this.root = new lyph_edit_widget_1.Canvas({ element: this.svg });
        }
        if (!this.root)
            return;
        new lyph_edit_widget_1.SelectTool(this.root.context);
        new lyph_edit_widget_1.DragDropTool(this.root.context);
        new lyph_edit_widget_1.ResizeTool(this.root.context);
        new lyph_edit_widget_1.ZoomTool(this.root.context);
        new lyph_edit_widget_1.PanTool(this.root.context);
        new lyph_edit_widget_1.BorderToggleTool(this.root.context);
        /* put a test lyph or two in there */ // TODO: remove; use toolbar to add stuff
        var bloodVesselRectangle = new lyph_edit_widget_1.LyphRectangle({
            model: this.bloodVessel,
            x: 100,
            y: 100,
            width: 200,
            height: 150
        });
        bloodVesselRectangle.parent = this.root;
        var brainRectangle = new lyph_edit_widget_1.LyphRectangle({
            model: this.brain,
            x: 300,
            y: 300,
            width: 150,
            height: 150
        });
        brainRectangle.parent = this.root;
        combineLatest_1.combineLatest(bloodVesselRectangle.freeFloatingStuff.e('add').filter(function (c) { return c instanceof lyph_edit_widget_1.NodeGlyph; }), brainRectangle.freeFloatingStuff.e('add').filter(function (c) { return c instanceof lyph_edit_widget_1.NodeGlyph; })).take(1).subscribe(function (_a) {
            var node1 = _a[0], node2 = _a[1];
            var processEdge = new lyph_edit_widget_1.ProcessLine({
                source: node1,
                target: node2
            });
            processEdge.parent = _this.root;
        });
    };
    GraphWidget.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GraphWidget.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GraphWidget.prototype, "bloodVessel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GraphWidget.prototype, "brain", void 0);
    GraphWidget = __decorate([
        core_1.Component({
            selector: 'graph-widget',
            inputs: ['item', 'bloodVessel', 'brain'],
            template: "\n     <div class=\"panel panel-success\">\n     <div class=\"panel-heading\">Graph editor</div>\n       <div class=\"panel-body\">\n          <svg id=\"graphSvg\" class=\"svg-widget\"></svg>\n       </div>\n    </div> \n  "
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, service_resize_1.ResizeService])
    ], GraphWidget);
    return GraphWidget;
}());
exports.GraphWidget = GraphWidget;
//# sourceMappingURL=widget.graph.js.map