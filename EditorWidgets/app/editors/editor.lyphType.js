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
var widget_tree_1 = require('../widgets/widget.tree');
//declare var Split: any;
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
    LyphTypeEditor.prototype.onItemSelect = function (item) {
        this.selectedItem = item;
    };
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
            template: "\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n            <repo-general \n              [items]=\"items\" \n              caption=\"Materials\" \n              [dependencies]=\"dependency\" \n              (selected)=\"onItemSelect($event)\">\n            </repo-general>\n        </div>\n        <div class=\"col-sm-6\">\n          <tree [item]=\"selectedItem\" [options]=\"{transform: true, property: 'materials', depth: -1}\"></tree>\n        </div>\n    </div>\n  ",
            directives: [repo_general_1.RepoGeneral, widget_tree_1.TreeWidget]
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
//# sourceMappingURL=editor.lyphType.js.map