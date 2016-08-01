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
//import {HierarchyWidget} from '../widgets/widget.hierarchy';
//import {ResourceWidget} from '../widgets/widget.resource';
var service_resize_1 = require('../services/service.resize');
var pipe_general_1 = require("../transformations/pipe.general");
var model = require("open-physiology-model");
var ResourceEditor = (function () {
    function ResourceEditor(resizeService, el) {
        /*this.subscription = resourceProvider.data$.subscribe(
         (updatedData: any) => {
         this.items = updatedData.resources;
         });
    
         setTimeout(() => {resourceProvider.loadExtra()}, 1000);
         */
        var _this = this;
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
                        }]
                }]
        };
        this.subscription = model.Resource.p('all').subscribe(function (data) { _this.items = data; });
        console.log("V.4");
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                /*Material type*/
                var water = model.MaterialType.new({ name: "Water" });
                yield water.commit();
                var vWater = model.MeasurableType.new({ name: "Concentration of water", quality: "concentration",
                    materials: [water] });
                yield vWater.commit();
                /*Measurable type*/
                var sodiumIon = model.MaterialType.new({ name: "Sodium ion" });
                yield sodiumIon.commit();
                var vSodiumIon = model.MeasurableType.new({ name: "Concentration of sodium ion", quality: "concentration",
                    materials: [sodiumIon] });
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
                service_resize_1.ResizeService
            ],
            template: "\n    <repo-general id=\"repo\"\n      [items]=\"items | setToArray\" \n      [caption]=\"'All resources'\" \n      (selected)=\"onItemSelected($event)\"\n      (added)=\"onItemAdded($event)\"\n      (removed)=\"onItemRemoved($event)\"\n      (updated)=\"onItemUpdated($event)\">\n    </repo-general>\n    <!--<hierarchy-widget id = \"hierarchy\" [item]=\"selectedItem\"></hierarchy-widget>-->\n    <!--<resource-widget id = \"resource\" [item]=\"selectedItem\"></resource-widget>          -->\n    <div id=\"main\"></div>\n  ",
            styles: ["#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}"],
            directives: [repo_general_1.RepoGeneral /*, HierarchyWidget, ResourceWidget*/],
            pipes: [pipe_general_1.SetToArray]
        }), 
        __metadata('design:paramtypes', [service_resize_1.ResizeService, core_1.ElementRef])
    ], ResourceEditor);
    return ResourceEditor;
}());
exports.ResourceEditor = ResourceEditor;
//# sourceMappingURL=editor.resources.js.map