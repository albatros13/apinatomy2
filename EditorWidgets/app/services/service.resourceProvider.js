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
var service_apinatomy2_1 = require("./service.apinatomy2");
var model = require("open-physiology-model");
var ResourceProvider = (function () {
    function ResourceProvider(eResourceP, typeP, materialP, lyphP, cLyphP, measurableP, processP, borderP, groupP, omegaTreeP) {
        var _this = this;
        this.data = {};
        var allLyphs = lyphP.items.concat(cLyphP.items);
        var allMaterials = materialP.items.concat(allLyphs);
        var allGroups = groupP.items.concat(omegaTreeP.items);
        var allTypes = typeP.items.concat(allMaterials, measurableP.items, allGroups);
        var allLyphTemplates = lyphP.templates.concat(cLyphP.templates);
        var allGroupTemplates = groupP.templates.concat(omegaTreeP.templates);
        var otherTemplates = processP.templates.concat(borderP.templates, measurableP.templates);
        var allTemplates = materialP.templates.concat(allLyphTemplates, allGroupTemplates, otherTemplates);
        this.data = {
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
        var sodiumIonP = model.MaterialType.new({ name: "Sodium ion" });
        sodiumIonP.then(function (w) {
            _this.data.materials.push(w);
            setTimeout(function () {
            }, 0);
        });
    }
    ResourceProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [service_apinatomy2_1.ExternalResourceProvider, service_apinatomy2_1.TypeProvider, service_apinatomy2_1.MaterialTypeProvider, service_apinatomy2_1.LyphTypeProvider, service_apinatomy2_1.CylindricalLyphTypeProvider, service_apinatomy2_1.MeasurableTypeProvider, service_apinatomy2_1.ProcessTypeProvider, service_apinatomy2_1.BorderTypeProvider, service_apinatomy2_1.GroupTypeProvider, service_apinatomy2_1.OmegaTreeTypeProvider])
    ], ResourceProvider);
    return ResourceProvider;
}());
exports.ResourceProvider = ResourceProvider;
//# sourceMappingURL=service.resourceProvider.js.map