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
 * Created by Natallia on 7/23/2016.
 */
var core_1 = require('@angular/core');
var view_omegaTree_1 = require('./view.omegaTree');
var service_apinatomy2_1 = require('../providers/service.apinatomy2');
//Component visualization widget stub
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
var ResourceWidget = (function () {
    function ResourceWidget() {
        this.resourceName = service_apinatomy2_1.ResourceName;
    }
    ResourceWidget = __decorate([
        core_1.Component({
            selector: 'resource-widget',
            inputs: ['item'],
            template: "\n    <omega-tree *ngIf=\"item && (item.class == resourceName.OmegaTreeType)\" [item]=\"item\" [template]=\"TemplateBox\"></omega-tree>   \n  ",
            directives: [view_omegaTree_1.OmegaTreeWidget]
        }), 
        __metadata('design:paramtypes', [])
    ], ResourceWidget);
    return ResourceWidget;
}());
exports.ResourceWidget = ResourceWidget;
//# sourceMappingURL=widget.resource.js.map