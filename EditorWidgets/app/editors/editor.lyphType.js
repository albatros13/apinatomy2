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
 * Created by Natallia on 6/8/2016.
 */
var core_1 = require('@angular/core');
var repo_lyphType_1 = require('../components/repos/repo.lyphType');
var repo_publication_1 = require('../components/repos/repo.publication');
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
    function LyphTypeEditor(typeProvider, materialTypeProvider, lyphTypeProvider, publicationProvider) {
        this.dependency = {
            equivalences: [],
            weakEquivalences: [],
            types: typeProvider.items,
            materialTypes: materialTypeProvider.items,
            lyphTypes: lyphTypeProvider.items };
        this.items = lyphTypeProvider.items;
        this.publications = publicationProvider.items;
    }
    LyphTypeEditor = __decorate([
        core_1.Component({
            selector: 'lyphType-editor',
            providers: [service_apinatomy2_1.TypeProvider, service_apinatomy2_1.MaterialTypeProvider, service_apinatomy2_1.LyphTypeProvider],
            template: "\n    <repo-lyphType [items]=\"items\" [dependency]=\"dependency\"></repo-lyphType>\n    <repo-publication [items]=\"publications\"></repo-publication>\n  ",
            directives: [LyphTypeWidget, repo_lyphType_1.RepoLyphType, repo_publication_1.RepoPublication]
        }), 
        __metadata('design:paramtypes', [service_apinatomy2_1.TypeProvider, service_apinatomy2_1.MaterialTypeProvider, service_apinatomy2_1.LyphTypeProvider, service_apinatomy2_1.PublicationProvider])
    ], LyphTypeEditor);
    return LyphTypeEditor;
}());
exports.LyphTypeEditor = LyphTypeEditor;
//# sourceMappingURL=editor.lyphType.js.map