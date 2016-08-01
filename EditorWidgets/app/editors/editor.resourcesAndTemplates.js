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
var widget_hierarchy_1 = require('../widgets/widget.hierarchy');
var widget_resource_1 = require('../widgets/widget.resource');
var service_resize_1 = require('../services/service.resize');
var service_apinatomy2_1 = require('../services/service.apinatomy2');
var model = require("open-physiology-model");
var pipe_general_1 = require("../transformations/pipe.general");
var ResourceAndTemplateEditor = (function () {
    function ResourceAndTemplateEditor(resizeService, el) {
        var _this = this;
        this.resizeService = resizeService;
        this.el = el;
        this.resourceName = service_apinatomy2_1.ResourceName;
        this.templateName = service_apinatomy2_1.TemplateName;
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
                            type: 'component',
                            componentName: 'RepoPanel'
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
                        },
                        {
                            type: 'component',
                            componentName: 'Repo2Panel'
                        }
                    ]
                }]
        };
        this.subscription = model.Resource.p('all').subscribe(function (data) {
            _this.items = data;
        });
        console.log("V.2");
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                /*Material type*/
                var water = model.MaterialType.new({ name: "Water" });
                yield water.commit();
                var vWater = model.MeasurableType.new({
                    name: "Concentration of water", quality: "concentration",
                    materials: [water]
                });
                yield vWater.commit();
                /*Measurable type*/
                var sodiumIon = model.MaterialType.new({ name: "Sodium ion" });
                yield sodiumIon.commit();
                var vSodiumIon = model.MeasurableType.new({
                    name: "Concentration of sodium ion", quality: "concentration",
                    materials: [sodiumIon]
                });
                yield vSodiumIon.commit();
                /*Process type*/
                var processes = [
                    model.ProcessType.new({ name: "Inflow Right Heart" }),
                    model.ProcessType.new({ name: "Outflow Right Heart" }),
                    model.ProcessType.new({ name: "Inflow Left Heart" }),
                    model.ProcessType.new({ name: "Outflow Left Heart" })];
                yield Promise.all(processes.map(function (p) { return p.commit(); }));
            });
        })();
    }
    ResourceAndTemplateEditor.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ResourceAndTemplateEditor.prototype.onItemSelected = function (item) {
        var _this = this;
        setTimeout(function () {
            _this.selectedItem = null;
        }, 0);
        setTimeout(function () {
            _this.selectedItem = item;
        }, 0);
    };
    ResourceAndTemplateEditor.prototype.onItemAdded = function (item) {
    };
    ResourceAndTemplateEditor.prototype.onItemRemoved = function (item) {
    };
    ResourceAndTemplateEditor.prototype.onItemUpdated = function (item) {
    };
    ResourceAndTemplateEditor.prototype.ngOnInit = function () {
        var self = this;
        var main = $('app > #main');
        this.mainLayout = new GoldenLayout(this.layoutConfig, main);
        this.mainLayout.registerComponent('RepoPanel', function (container, componentState) {
            var panel = container.getElement();
            var content = $('app > #repo');
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
    ResourceAndTemplateEditor = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [
                service_resize_1.ResizeService
            ],
            template: "\n    <repo-general id=\"repo\"\n      [items]=\"items | setToArray\" \n      [caption]=\"'All resources'\" \n      (selected)=\"onItemSelected($event)\"\n      (added)=\"onItemAdded($event)\"\n      (removed)=\"onItemRemoved($event)\"\n      (updated)=\"onItemUpdated($event)\"\n      >\n    </repo-general>\n    <hierarchy-widget id = \"hierarchy\" [item]=\"selectedItem\"></hierarchy-widget>\n    <resource-widget id = \"resource\" [item]=\"selectedItem\"></resource-widget>   \n    <repo-template id=\"repo2\"\n      [items]=\"[]\" \n      [caption]=\"'All templates'\" \n      [options]=\"{showSortToolbar: true, showFilterToolbar: true}\"\n      (selected)=\"onItemSelected($event)\"\n      (added)=\"onItemAdded($event)\"\n      (removed)=\"onItemRemoved($event)\"\n      (updated)=\"onItemUpdated($event)\"\n      >\n    </repo-template>         \n    <div id=\"main\"></div>\n  ",
            styles: ["#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}"],
            directives: [repo_general_1.RepoGeneral, repo_template_1.RepoTemplate, widget_hierarchy_1.HierarchyWidget, widget_resource_1.ResourceWidget],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService, core_1.ElementRef])
    ], ResourceAndTemplateEditor);
    return ResourceAndTemplateEditor;
}());
exports.ResourceAndTemplateEditor = ResourceAndTemplateEditor;
//# sourceMappingURL=editor.resourcesAndTemplates.js.map