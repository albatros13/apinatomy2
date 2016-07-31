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
var repo_general_1 = require('../repos/repo.general');
//import {HierarchyWidget} from '../widgets/widget.hierarchy';
//import {ResourceWidget} from '../widgets/widget.resource';
var service_resize_1 = require('../services/service.resize');
var service_asyncResourceProvider_1 = require('../services/service.asyncResourceProvider');
var ResourceEditor = (function () {
    function ResourceEditor(resizeService, el, resourceProvider) {
        var _this = this;
        this.resizeService = resizeService;
        this.el = el;
        this.resourceProvider = resourceProvider;
        this.dependencies = {};
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
                        }]
                }]
        };
        this.subscription = resourceProvider.data$.subscribe(function (updatedData) {
            _this.dependencies = updatedData;
            _this.items = updatedData.types;
        });
        setTimeout(function () { resourceProvider.loadExtra(); }, 1000);
    }
    ResourceEditor.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ResourceEditor.prototype.onItemSelected = function (item) {
        var _this = this;
        setTimeout(function () {
            _this.selectedItem = null;
        }, 0);
        setTimeout(function () {
            _this.selectedItem = item;
        }, 0);
    };
    ResourceEditor.prototype.onItemAdded = function (item) {
        //this.resourceProvider.addResource(item);
        //item.commit();
    };
    ResourceEditor.prototype.onItemRemoved = function (item) {
        //this.resourceProvider.removeResource(item);
    };
    ResourceEditor.prototype.onItemUpdated = function (item) {
        //maybe not needed
        //this.resourceProvider.addResource(item);
    };
    ResourceEditor.prototype.ngOnInit = function () {
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
        this.mainLayout.init();
    };
    ResourceEditor = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [
                service_resize_1.ResizeService,
                service_asyncResourceProvider_1.AsyncResourceProvider
            ],
            template: "\n    <repo-general id=\"repo\"\n      [items]=\"items\" \n      [caption]=\"'All resources'\" \n      [dependencies]=\"dependencies\" \n      (selected)=\"onItemSelected($event)\"\n      (added)=\"onItemAdded($event)\"\n      (removed)=\"onItemRemoved($event)\"\n      (updated)=\"onItemUpdated($event)\">\n    </repo-general>\n    <!--<hierarchy-widget id = \"hierarchy\" [item]=\"selectedItem\"></hierarchy-widget>-->\n    <!--<resource-widget id = \"resource\" [item]=\"selectedItem\"></resource-widget>          -->\n    <div id=\"main\"></div>\n  ",
            styles: ["#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}"],
            directives: [repo_general_1.RepoGeneral /*, HierarchyWidget, ResourceWidget*/]
        }), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService, core_1.ElementRef, service_asyncResourceProvider_1.AsyncResourceProvider])
    ], ResourceEditor);
    return ResourceEditor;
}());
exports.ResourceEditor = ResourceEditor;
//# sourceMappingURL=editor.resources.js.map