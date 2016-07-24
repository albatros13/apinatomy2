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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var repo_general_1 = require('../repos/repo.general');
var repo_template_1 = require('../repos/repo.template');
var service_resourceProvider_1 = require('../services/service.resourceProvider');
var widget_hierarchy_1 = require('../widgets/widget.hierarchy');
var widget_resource_1 = require('../widgets/widget.resource');
var service_resize_1 = require('../services/service.resize');
var ResourceAndTemplateEditor = (function () {
    function ResourceAndTemplateEditor(resizeService, el, resourceP) {
        this.resizeService = resizeService;
        this.el = el;
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
        this.dependency = resourceP.data;
        this.items = this.dependency.types;
    }
    ResourceAndTemplateEditor.prototype.onItemSelect = function (item) {
        var _this = this;
        setTimeout(function () {
            _this.selectedItem = null;
        }, 0);
        setTimeout(function () {
            _this.selectedItem = item;
        }, 0);
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
                service_resize_1.ResizeService,
                service_resourceProvider_1.ResourceProvider
            ],
            template: "\n    <repo-general id=\"repo\"\n      [items]=\"items\" \n      [caption]=\"'All resources'\" \n      [dependencies]=\"dependency\" \n      (selected)=\"onItemSelect($event)\">\n    </repo-general>\n    <hierarchy-widget id = \"hierarchy\" [item]=\"selectedItem\" [relation]=\"materials\"></hierarchy-widget>\n    <resource-widget id = \"resource\" [item]=\"selectedItem\"></resource-widget>   \n    <repo-template id=\"repo2\"\n      [items]=\"dependency.templates\" \n      [caption]=\"'All templates'\" \n      [dependencies]=\"dependency\" \n      (selected)=\"onItemSelect($event)\">\n    </repo-template>         \n    <div id=\"main\"></div>\n  ",
            styles: ["#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}"],
            directives: [repo_general_1.RepoGeneral, repo_template_1.RepoTemplate, widget_hierarchy_1.HierarchyWidget, widget_resource_1.ResourceWidget]
        }),
        __param(2, core_1.Inject(service_resourceProvider_1.ResourceProvider)), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService, core_1.ElementRef, service_resourceProvider_1.ResourceProvider])
    ], ResourceAndTemplateEditor);
    return ResourceAndTemplateEditor;
}());
exports.ResourceAndTemplateEditor = ResourceAndTemplateEditor;
//# sourceMappingURL=editor.resourcesAndTemplates.js.map