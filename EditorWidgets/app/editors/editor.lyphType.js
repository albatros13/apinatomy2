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
var service_apinatomy2_1 = require('../providers/service.apinatomy2');
var widget_hierarchy_1 = require('../widgets/widget.hierarchy');
var widget_resource_1 = require('../widgets/widget.resource');
var model = require("open-physiology-model");
var LyphTypeEditor = (function () {
    function LyphTypeEditor(renderer, el, eResourceP, typeP, materialP, lyphP, cLyphP, measurableP, processP, borderP, groupP, omegaTreeP) {
        var _this = this;
        this.renderer = renderer;
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
                            type: 'column',
                            width: 50,
                            content: [{
                                    type: 'component',
                                    componentName: 'RepoPanel'
                                }]
                        },
                        {
                            type: 'column',
                            width: 50,
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
        var allLyphs = lyphP.items.concat(cLyphP.items);
        var allMaterials = materialP.items.concat(allLyphs);
        var allGroups = groupP.items.concat(omegaTreeP.items);
        var allTypes = typeP.items.concat(allMaterials, measurableP.items, allGroups);
        var allLyphTemplates = lyphP.templates.concat(cLyphP.templates);
        var allGroupTemplates = groupP.templates.concat(omegaTreeP.templates);
        var otherTemplates = processP.templates.concat(borderP.templates, measurableP.templates);
        var allTemplates = materialP.templates.concat(allLyphTemplates, allGroupTemplates, otherTemplates);
        this.dependency = {
            externals: eResourceP.items,
            types: allTypes,
            materials: allMaterials,
            lyphs: allLyphs,
            cylindricalLyphs: cLyphP.items,
            measurables: measurableP.items,
            processes: processP.items,
            borders: borderP.items,
            groups: allGroups,
            omegaTrees: omegaTreeP.items,
            templates: allTemplates
        };
        this.items = allTypes;
        var sodiumIonP = model.MaterialType.new({ name: "Sodium ion" });
        sodiumIonP.then(function (w) {
            _this.items.push(w);
            setTimeout(function () { }, 0);
        });
    }
    LyphTypeEditor.prototype.onItemSelect = function (item) {
        var _this = this;
        setTimeout(function () { _this.selectedItem = null; }, 0);
        setTimeout(function () { _this.selectedItem = item; }, 0);
    };
    LyphTypeEditor.prototype.ngOnInit = function () {
        var main = $('app > #main');
        this.mainLayout = new GoldenLayout(this.layoutConfig, main);
        this.mainLayout.registerComponent('RepoPanel', function (container, componentState) {
            var panel = container.getElement();
            var content = $('app > #repo');
            content.detach().appendTo(panel);
        });
        this.mainLayout.registerComponent('ResourcePanel', function (container, componentState) {
            var panel = container.getElement();
            var component = $('app > #resource');
            component.detach().appendTo(panel);
            container.on('resize', function () {
                //emit event
                //this.emit.resized();
            });
        });
        this.mainLayout.registerComponent('HierarchyPanel', function (container, componentState) {
            var panel = container.getElement();
            var component = $('app > #hierarchy');
            component.detach().appendTo(panel);
            container.on('resize', function () {
                //emit event
            });
        });
        this.mainLayout.init();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LyphTypeEditor.prototype, "resized", void 0);
    LyphTypeEditor = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [
                service_apinatomy2_1.ExternalResourceProvider,
                service_apinatomy2_1.MeasurableTypeProvider,
                service_apinatomy2_1.ProcessTypeProvider,
                service_apinatomy2_1.BorderTypeProvider,
                service_apinatomy2_1.TypeProvider,
                service_apinatomy2_1.MaterialTypeProvider,
                service_apinatomy2_1.LyphTypeProvider,
                service_apinatomy2_1.CylindricalLyphTypeProvider,
                service_apinatomy2_1.GroupTypeProvider,
                service_apinatomy2_1.OmegaTreeTypeProvider
            ],
            template: "\n    <repo-general id=\"repo\"\n      [items]=\"items\" \n      [caption]=\"'All resources'\" \n      [dependencies]=\"dependency\" \n      (selected)=\"onItemSelect($event)\">\n    </repo-general>\n    <hierarchy-widget id = \"hierarchy\" [item]=\"selectedItem\" [relation]=\"materials\"></hierarchy-widget>\n    <resource-widget id = \"resource\" [item]=\"selectedItem\"></resource-widget>          \n    <div id=\"main\"></div>\n  ",
            styles: ["#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}"],
            directives: [repo_general_1.RepoGeneral, widget_hierarchy_1.HierarchyWidget, widget_resource_1.ResourceWidget]
        }),
        __param(2, core_1.Inject(service_apinatomy2_1.ExternalResourceProvider)),
        __param(3, core_1.Inject(service_apinatomy2_1.TypeProvider)),
        __param(4, core_1.Inject(service_apinatomy2_1.MaterialTypeProvider)),
        __param(5, core_1.Inject(service_apinatomy2_1.LyphTypeProvider)),
        __param(6, core_1.Inject(service_apinatomy2_1.CylindricalLyphTypeProvider)),
        __param(7, core_1.Inject(service_apinatomy2_1.MeasurableTypeProvider)),
        __param(8, core_1.Inject(service_apinatomy2_1.ProcessTypeProvider)),
        __param(9, core_1.Inject(service_apinatomy2_1.BorderTypeProvider)),
        __param(10, core_1.Inject(service_apinatomy2_1.GroupTypeProvider)),
        __param(11, core_1.Inject(service_apinatomy2_1.OmegaTreeTypeProvider)), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, service_apinatomy2_1.ExternalResourceProvider, service_apinatomy2_1.TypeProvider, service_apinatomy2_1.MaterialTypeProvider, service_apinatomy2_1.LyphTypeProvider, service_apinatomy2_1.CylindricalLyphTypeProvider, service_apinatomy2_1.MeasurableTypeProvider, service_apinatomy2_1.ProcessTypeProvider, service_apinatomy2_1.BorderTypeProvider, service_apinatomy2_1.GroupTypeProvider, service_apinatomy2_1.OmegaTreeTypeProvider])
    ], LyphTypeEditor);
    return LyphTypeEditor;
}());
exports.LyphTypeEditor = LyphTypeEditor;
//# sourceMappingURL=editor.lyphType.js.map