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
/**
 * Created by Natallia on 6/8/2016.
 */
var core_1 = require('@angular/core');
var repo_general_1 = require('../components/repos/repo.general');
var service_apinatomy2_1 = require('../providers/service.apinatomy2');
var LyphTypeWidget = (function () {
    function LyphTypeWidget(elementRef) {
        this.elementRef = elementRef;
        this.config = {
            content: [{
                    type: 'row',
                    content: [{
                            type: 'component',
                            componentName: 'LyphTypeRepo',
                            title: "Lyph types",
                            showPopoutIcon: false,
                            width: 60,
                            componentState: {
                                content: '<div id="lyphTypeRepo"><ng-content select="lyphTypeRepoComponent"></ng-content></div>'
                            }
                        },
                        {
                            type: 'stack',
                            content: [
                                {
                                    type: 'component',
                                    componentName: 'LyphType',
                                    title: "Lyph type",
                                    showPopoutIcon: false,
                                    width: 40,
                                    componentState: {
                                        content: '<div id="lyphType"><ng-content select="lyphTypeWidget"></ng-content></div>'
                                    }
                                },
                                {
                                    type: 'component',
                                    componentName: 'LyphTypePartonomy',
                                    title: "Lyph type partonomy",
                                    showPopoutIcon: false,
                                    width: 40,
                                    componentState: {
                                        content: '<div id="lyphTypePartonomy"><ng-content select="lyphTypePartonomyWidget"></ng-content></div>'
                                    }
                                }
                            ]
                        }]
                }]
        };
        this.myLayout = new GoldenLayout(this.inputConfig || this.config, this.elementRef.nativeElement);
        this.myLayout.registerComponent('LyphTypeRepo', function (container, componentState) {
            container.getElement().html(componentState.content);
            container.on('open', function () {
            });
        });
        this.myLayout.registerComponent('LyphType', function (container, componentState) {
            container.getElement().html(componentState.content);
            container.on('open', function () { });
            container.on('resize', function () {
            });
        });
        this.myLayout.registerComponent('LyphTypePartonomy', function (container, componentState) {
            container.getElement().html(componentState.content);
            container.on('open', function () { });
            container.on('resize', function () {
            });
        });
        this.myLayout.init();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LyphTypeWidget.prototype, "inputConfig", void 0);
    LyphTypeWidget = __decorate([
        core_1.Directive({
            selector: '[lyphType-widget]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LyphTypeWidget);
    return LyphTypeWidget;
}());
exports.LyphTypeWidget = LyphTypeWidget;
var LyphTypeEditor = (function () {
    function LyphTypeEditor(eResourceP, typeP, materialP, lyphP, cLyphP, measurableP, processP) {
        var allLyphs = lyphP.items.concat(cLyphP.items);
        var allMaterials = materialP.items.concat(allLyphs);
        var allTypes = typeP.items.concat(allMaterials, measurableP.items);
        var allLyphTemplates = lyphP.templates.concat(cLyphP.templates);
        var allTemplates = materialP.templates.concat(allLyphTemplates);
        this.dependency = {
            externals: eResourceP.items,
            types: allTypes,
            materials: allMaterials,
            lyphs: allLyphs,
            cylindricalLyphs: cLyphP.items,
            measurables: measurableP.items,
            processes: processP.items,
            templates: allTemplates
        };
        this.items = allMaterials;
    }
    LyphTypeEditor = __decorate([
        core_1.Component({
            selector: 'lyphType-editor',
            providers: [
                service_apinatomy2_1.MeasurableTypeProvider,
                service_apinatomy2_1.ExternalResourceProvider,
                service_apinatomy2_1.TypeProvider,
                service_apinatomy2_1.MaterialTypeProvider,
                service_apinatomy2_1.LyphTypeProvider,
                service_apinatomy2_1.CylindricalLyphTypeProvider,
                service_apinatomy2_1.ProcessTypeProvider],
            template: "\n    <repo-general [items]=\"items\" caption=\"Materials\" [dependencies]=\"dependency\"></repo-general>\n  ",
            directives: [repo_general_1.RepoGeneral]
        }),
        __param(0, core_1.Inject(service_apinatomy2_1.ExternalResourceProvider)),
        __param(1, core_1.Inject(service_apinatomy2_1.TypeProvider)),
        __param(2, core_1.Inject(service_apinatomy2_1.MaterialTypeProvider)),
        __param(3, core_1.Inject(service_apinatomy2_1.LyphTypeProvider)),
        __param(4, core_1.Inject(service_apinatomy2_1.CylindricalLyphTypeProvider)),
        __param(5, core_1.Inject(service_apinatomy2_1.MeasurableTypeProvider)),
        __param(6, core_1.Inject(service_apinatomy2_1.ProcessTypeProvider)), 
        __metadata('design:paramtypes', [service_apinatomy2_1.ExternalResourceProvider, service_apinatomy2_1.TypeProvider, service_apinatomy2_1.MaterialTypeProvider, service_apinatomy2_1.LyphTypeProvider, service_apinatomy2_1.CylindricalLyphTypeProvider, service_apinatomy2_1.MeasurableTypeProvider, service_apinatomy2_1.ProcessTypeProvider])
    ], LyphTypeEditor);
    return LyphTypeEditor;
}());
exports.LyphTypeEditor = LyphTypeEditor;
var EditItem = (function () {
    function EditItem(item) {
        this.item = item;
    }
    return EditItem;
}());
//# sourceMappingURL=editor.lyphType.js.map