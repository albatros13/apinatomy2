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
var widget_hierarchy_1 = require('../widgets/widget.hierarchy');
var LyphTypeEditor = (function () {
    function LyphTypeEditor(eResourceP, typeP, materialP, lyphP, cLyphP, measurableP, processP, borderP, groupP, omegaTreeP) {
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
    }
    LyphTypeEditor.prototype.onItemSelect = function (item) {
        this.selectedItem = item;
    };
    LyphTypeEditor = __decorate([
        core_1.Component({
            selector: 'lyphType-editor',
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
            template: "\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n            <repo-general \n              [items]=\"items\" \n              caption=\"All resources\" \n              [dependencies]=\"dependency\" \n              (selected)=\"onItemSelect($event)\">\n            </repo-general>\n        </div>\n        <div class=\"col-sm-6\">\n          <hierarchy [item]=\"selectedItem\" [options]=\"{relation: 'materials'}\"></hierarchy>\n        </div>\n    </div>\n  ",
            directives: [repo_general_1.RepoGeneral, widget_hierarchy_1.HierarchyWidget]
        }),
        __param(0, core_1.Inject(service_apinatomy2_1.ExternalResourceProvider)),
        __param(1, core_1.Inject(service_apinatomy2_1.TypeProvider)),
        __param(2, core_1.Inject(service_apinatomy2_1.MaterialTypeProvider)),
        __param(3, core_1.Inject(service_apinatomy2_1.LyphTypeProvider)),
        __param(4, core_1.Inject(service_apinatomy2_1.CylindricalLyphTypeProvider)),
        __param(5, core_1.Inject(service_apinatomy2_1.MeasurableTypeProvider)),
        __param(6, core_1.Inject(service_apinatomy2_1.ProcessTypeProvider)),
        __param(7, core_1.Inject(service_apinatomy2_1.BorderTypeProvider)),
        __param(8, core_1.Inject(service_apinatomy2_1.GroupTypeProvider)),
        __param(9, core_1.Inject(service_apinatomy2_1.OmegaTreeTypeProvider)), 
        __metadata('design:paramtypes', [service_apinatomy2_1.ExternalResourceProvider, service_apinatomy2_1.TypeProvider, service_apinatomy2_1.MaterialTypeProvider, service_apinatomy2_1.LyphTypeProvider, service_apinatomy2_1.CylindricalLyphTypeProvider, service_apinatomy2_1.MeasurableTypeProvider, service_apinatomy2_1.ProcessTypeProvider, service_apinatomy2_1.BorderTypeProvider, service_apinatomy2_1.GroupTypeProvider, service_apinatomy2_1.OmegaTreeTypeProvider])
    ], LyphTypeEditor);
    return LyphTypeEditor;
}());
exports.LyphTypeEditor = LyphTypeEditor;
//# sourceMappingURL=editor.lyphType.js.map