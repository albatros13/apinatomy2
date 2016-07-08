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
 * Created by Natallia on 7/7/2016.
 */
var core_1 = require('@angular/core');
var EditorLayout = (function () {
    function EditorLayout(elementRef) {
        this.elementRef = elementRef;
        //@ViewChild('lyphTypeRepoComponent', {read: ViewContainerRef}) repo: any;
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
                                content: "<div id=\"lyphTypeRepo\" #lyphTypeRepoComponent></div>"
                            },
                            template: ""
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
                                        content: "<div id=\"lyphType\" #lyphTypeWidget></div>"
                                    }
                                },
                                {
                                    type: 'component',
                                    componentName: 'LyphTypePartonomy',
                                    title: "Lyph type partonomy",
                                    showPopoutIcon: false,
                                    width: 40,
                                    componentState: {
                                        content: "<div id=\"lyphTypePartonomy\" #lyphTypePartonomyWidget></div>"
                                    }
                                }
                            ]
                        }]
                }]
        };
        this.myLayout = new GoldenLayout(this.inputConfig || this.config, this.elementRef.nativeElement);
        //let main = d3.select(this.elementRef.nativeElement).select('#main');
        //this.myLayout = new GoldenLayout(this.inputConfig || this.config, main.nativeElement);
        this.myLayout.registerComponent('LyphTypeRepo', function (container, componentState) {
            var el = container.getElement().html(componentState.content);
            container.on('open', function () {
            });
        });
        this.myLayout.registerComponent('LyphType', function (container, componentState) {
            var el = container.getElement().html(componentState.content);
            container.on('open', function () { });
            container.on('resize', function () {
            });
        });
        this.myLayout.registerComponent('LyphTypePartonomy', function (container, componentState) {
            var el = container.getElement().html(componentState.content);
            container.on('open', function () {
            });
            container.on('resize', function () {
            });
        });
        this.myLayout.init();
    }
    EditorLayout.prototype.ngOnInit = function () {
    };
    EditorLayout.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditorLayout.prototype, "inputConfig", void 0);
    EditorLayout = __decorate([
        core_1.Component({
            selector: 'editor-layout',
            template: '<div #main></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], EditorLayout);
    return EditorLayout;
}());
exports.EditorLayout = EditorLayout;
var Node = (function () {
    function Node() {
    }
    Node = __decorate([
        core_1.Component({
            selector: '[node]',
            inputs: ['x', 'y'],
            template: "\n    <svg:circle [attr.r]=\"radius\" [attr.cx]=\"x\" [attr.cy]=\"y\" stroke=\"white\" fill=\"steelblue\"></svg:circle>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Node);
    return Node;
}());
exports.Node = Node;
var List = (function () {
    function List() {
    }
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], List.prototype, "contentTemplate", void 0);
    List = __decorate([
        core_1.Component({
            selector: 'list',
            inputs: ['items'],
            template: "<template ngFor [ngForOf]=\"items\" [ngForTemplate]=\"contentTemplate\"></template>"
        }), 
        __metadata('design:paramtypes', [])
    ], List);
    return List;
}());
exports.List = List;
var DclWrapperComponent = (function () {
    function DclWrapperComponent(resolver) {
        this.resolver = resolver;
        this.isViewInitialized = false;
    }
    DclWrapperComponent.prototype.updateComponent = function () {
        var _this = this;
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        this.resolver.resolveComponent(this.type).then(function (factory) {
            _this.cmpRef = _this.target.createComponent(factory);
            _this.cmpRef.instance.input = _this.input;
        });
    };
    DclWrapperComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    DclWrapperComponent.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
        this.updateComponent();
    };
    DclWrapperComponent.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DclWrapperComponent.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DclWrapperComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DclWrapperComponent.prototype, "input", void 0);
    DclWrapperComponent = __decorate([
        core_1.Directive({
            selector: '[dcl-wrapper]'
        }), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], DclWrapperComponent);
    return DclWrapperComponent;
}());
exports.DclWrapperComponent = DclWrapperComponent;
var DynamicList = (function () {
    function DynamicList(vc) {
        this.target = vc;
    }
    DynamicList = __decorate([
        core_1.Component({
            selector: 'dynamic-list',
            inputs: ['items', 'renderer'],
            template: "\n      <g *ngFor=\"let item of items; let i = index\" dcl-wrapper [target]=\"target\" [type]=\"renderer[i]\" [input]=\"item\"></g>\n ",
            directives: [DclWrapperComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], DynamicList);
    return DynamicList;
}());
exports.DynamicList = DynamicList;
//# sourceMappingURL=component.test.js.map