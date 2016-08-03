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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var core_1 = require('@angular/core');
var repo_general_1 = require('../repos/repo.general');
var repo_template_1 = require('../repos/repo.template');
var widget_relations_1 = require('../widgets/widget.relations');
var widget_resource_1 = require('../widgets/widget.resource');
var service_resize_1 = require('../services/service.resize');
var utils_model_1 = require('../services/utils.model');
var model = require("open-physiology-model");
var pipe_general_1 = require("../transformations/pipe.general");
var OmegaTreeEditor = (function () {
    function OmegaTreeEditor(resizeService, el) {
        var _this = this;
        this.resizeService = resizeService;
        this.el = el;
        this.resourceName = utils_model_1.ResourceName;
        this.templateName = utils_model_1.TemplateName;
        this.items = [];
        this.selectedItem = {};
        this.layoutConfig = {
            settings: {
                hasHeaders: false,
                constrainDragToContainer: true,
                reorderEnabled: true,
                showMaximiseIcon: true,
                showCloseIcon: true,
                selectionEnabled: false,
                popoutWholeStack: false,
                showPopoutIcon: false
            },
            dimensions: {
                borderWidth: 2
            },
            content: [{
                    type: 'row',
                    content: [
                        {
                            type: 'column',
                            content: [
                                {
                                    type: 'component',
                                    componentName: 'OmegaTreePanel'
                                },
                                {
                                    type: 'component',
                                    componentName: 'LyphPanel'
                                }
                            ]
                        },
                        {
                            type: 'column',
                            content: [
                                {
                                    type: 'component',
                                    componentName: 'HierarchyPanel'
                                },
                                {
                                    type: 'component',
                                    componentName: 'ResourcePanel'
                                }
                            ]
                        }
                    ]
                }]
        };
        this.sLyphs = model.LyphType.p('all').subscribe(function (data) { _this.items = data; });
        this.sOmegaTrees = model.OmegaTreeType.p('all').subscribe(function (data) { _this.items = data; });
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                /*External resources*/
                var fma7203 = model.ExternalResource.new({ name: "FMA:7203", uri: "" });
                var fma15610 = model.ExternalResource.new({ name: "FMA:15610", uri: "" });
                var fma66610 = model.ExternalResource.new({ name: "FMA:66610", uri: "" });
                var fma17881 = model.ExternalResource.new({ name: "FMA:17881", uri: "" });
                var externals = [fma7203, fma15610, fma66610, fma17881];
                yield Promise.all(externals.map(function (p) { return p.commit(); }));
                var borderType = model.BorderType.new({ name: "GeneralBorder" });
                yield borderType.commit();
                var minusBorder = model.BorderTemplate.new({ name: "T: MinusBorder", type: borderType, cardinalityBase: 1 });
                var plusBorder = model.BorderTemplate.new({ name: "T: PlusBorder", type: borderType, cardinalityBase: 1 });
                var innerBorder = model.BorderTemplate.new({ name: "T: InnerBorder", type: borderType, cardinalityBase: 1 });
                var outerBorder = model.BorderTemplate.new({ name: "T: OuterBorder", type: borderType, cardinalityBase: 1 });
                var borders = [minusBorder, plusBorder, innerBorder, outerBorder];
                yield Promise.all(borders.map(function (p) { return p.commit(); }));
                /*Cylindrical lyphs*/
                var renalH = model.CylindricalLyphType.new({ name: "Renal hilum", externals: [fma15610],
                    minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder });
                var renalP = model.CylindricalLyphType.new({ name: "Renal parenchyma",
                    minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder });
                var renalC = model.CylindricalLyphType.new({ name: "Renal capsule", externals: [fma66610],
                    minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder });
                var cLyphs1 = [renalH, renalP, renalC];
                yield Promise.all(cLyphs1.map(function (p) { return p.commit(); }));
                var kidney = model.CylindricalLyphType.new({ name: "Kidney", externals: [fma7203],
                    minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder });
                yield kidney.commit();
                var kidneyLobus = model.CylindricalLyphType.new({ name: "Kidney lobus", externals: [fma17881],
                    minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder });
                yield kidneyLobus.commit();
            });
        })();
    }
    OmegaTreeEditor.prototype.ngOnDestroy = function () {
        this.sLyphs.unsubscribe();
        this.sOmegaTrees.unsubscribe();
    };
    OmegaTreeEditor.prototype.onItemSelected = function (item) {
        var _this = this;
        setTimeout(function () {
            _this.selectedItem = null;
        }, 0);
        setTimeout(function () {
            _this.selectedItem = item;
        }, 0);
    };
    OmegaTreeEditor.prototype.onItemAdded = function (item) {
    };
    OmegaTreeEditor.prototype.onItemRemoved = function (item) {
    };
    OmegaTreeEditor.prototype.onItemUpdated = function (item) {
    };
    OmegaTreeEditor.prototype.ngOnInit = function () {
        var self = this;
        var main = $('app > #main');
        this.mainLayout = new GoldenLayout(this.layoutConfig, main);
        this.mainLayout.registerComponent('OmegaTreePanel', function (container, componentState) {
            var panel = container.getElement();
            var content = $('app > #omegaTreeRepo');
            content.detach().appendTo(panel);
        });
        this.mainLayout.registerComponent('LyphPanel', function (container, componentState) {
            var panel = container.getElement();
            var content = $('app > #lyphRepo');
            content.detach().appendTo(panel);
        });
        this.mainLayout.registerComponent('HierarchyPanel', function (container, componentState) {
            var panel = container.getElement();
            var component = $('app > #hierarchy');
            component.detach().appendTo(panel);
            //Notify components about window resize
            container.on('open', function () {
                var size = { width: container.width, height: container.height };
                self.resizeService.announceResize({ target: "hierarchy-widget", size: size });
            });
            container.on('resize', function () {
                var size = { width: container.width, height: container.height };
                self.resizeService.announceResize({ target: "hierarchy-widget", size: size });
            });
        });
        this.mainLayout.registerComponent('ResourcePanel', function (container, componentState) {
            var panel = container.getElement();
            var component = $('app > #resource');
            component.detach().appendTo(panel);
            //Notify components about window resize
            container.on('open', function () {
                var size = { width: container.width, height: container.height };
                self.resizeService.announceResize({ target: "resource-widget", size: size });
            });
            container.on('resize', function () {
                var size = { width: container.width, height: container.height };
                self.resizeService.announceResize({ target: "resource-widget", size: size });
            });
        });
        this.mainLayout.registerComponent('Repo2Panel', function (container, componentState) {
            var panel = container.getElement();
            var component = $('app > #repo2');
            component.detach().appendTo(panel);
        });
        this.mainLayout.init();
    };
    OmegaTreeEditor = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [
                service_resize_1.ResizeService
            ],
            template: "\n    <repo-general id=\"omegaTreeRepo\"\n      [items]=\"[]\" \n      [caption]=\"'Omega trees'\"\n      [types]=\"[resourceName.OmegaTreeType]\"\n      >\n    </repo-general>         \n    \n    <repo-general id=\"lyphRepo\"\n      [items]=\"items | setToArray\" \n      [caption]=\"'Lyphs'\" \n      [types]=\"[resourceName.LyphType, resourceName.CylindricalLyphType]\">\n    </repo-general>\n    \n    <hierarchy-widget id = \"hierarchy\" [item]=\"selectedItem\"></hierarchy-widget>\n    <resource-widget id = \"resource\" [item]=\"selectedItem\"></resource-widget>   \n    \n    <div id=\"main\"></div>\n  ",
            styles: ["#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}"],
            directives: [repo_general_1.RepoGeneral, repo_template_1.RepoTemplate, widget_relations_1.HierarchyWidget, widget_resource_1.ResourceWidget],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService, core_1.ElementRef])
    ], OmegaTreeEditor);
    return OmegaTreeEditor;
}());
exports.OmegaTreeEditor = OmegaTreeEditor;
//# sourceMappingURL=editor.omegaTrees.js.map