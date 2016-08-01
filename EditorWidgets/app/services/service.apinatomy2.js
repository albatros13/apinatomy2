"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*ENUMERATIONS*/
(function (ResourceName) {
    ResourceName[ResourceName["Resource"] = "Resource"] = "Resource";
    ResourceName[ResourceName["ExternalResource"] = "ExternalResource"] = "ExternalResource";
    ResourceName[ResourceName["Type"] = "Type"] = "Type";
    ResourceName[ResourceName["MeasurableLocationType"] = "MeasurableLocationType"] = "MeasurableLocationType";
    ResourceName[ResourceName["MaterialType"] = "MaterialType"] = "MaterialType";
    ResourceName[ResourceName["LyphType"] = "LyphType"] = "LyphType";
    ResourceName[ResourceName["CylindricalLyphType"] = "CylindricalLyphType"] = "CylindricalLyphType";
    ResourceName[ResourceName["ProcessType"] = "ProcessType"] = "ProcessType";
    ResourceName[ResourceName["MeasurableType"] = "MeasurableType"] = "MeasurableType";
    ResourceName[ResourceName["CausalityType"] = "CausalityType"] = "CausalityType";
    ResourceName[ResourceName["NodeType"] = "NodeType"] = "NodeType";
    ResourceName[ResourceName["BorderType"] = "BorderType"] = "BorderType";
    ResourceName[ResourceName["GroupType"] = "GroupType"] = "GroupType";
    ResourceName[ResourceName["OmegaTreeType"] = "OmegaTreeType"] = "OmegaTreeType";
    ResourceName[ResourceName["Publication"] = "Publication"] = "Publication";
    ResourceName[ResourceName["Correlation"] = "Correlation"] = "Correlation";
    ResourceName[ResourceName["ClinicalIndex"] = "ClinicalIndex"] = "ClinicalIndex";
    ResourceName[ResourceName["Coalescence"] = "Coalescence"] = "Coalescence";
})(exports.ResourceName || (exports.ResourceName = {}));
var ResourceName = exports.ResourceName;
(function (TemplateName) {
    TemplateName[TemplateName["Template"] = "Template"] = "Template";
    TemplateName[TemplateName["LyphTemplate"] = "LyphTemplate"] = "LyphTemplate";
    TemplateName[TemplateName["CylindricalLyphTemplate"] = "CylindricalLyphTemplate"] = "CylindricalLyphTemplate";
    TemplateName[TemplateName["ProcessTemplate"] = "ProcessTemplate"] = "ProcessTemplate";
    TemplateName[TemplateName["MeasurableTemplate"] = "MeasurableTemplate"] = "MeasurableTemplate";
    TemplateName[TemplateName["CausalityTemplate"] = "CausalityTemplate"] = "CausalityTemplate";
    TemplateName[TemplateName["NodeTemplate"] = "NodeTemplate"] = "NodeTemplate";
    TemplateName[TemplateName["BorderTemplate"] = "BorderTemplate"] = "BorderTemplate";
    TemplateName[TemplateName["GroupTemplate"] = "GroupTemplate"] = "GroupTemplate";
    TemplateName[TemplateName["OmegaTreeTemplate"] = "OmegaTreeTemplate"] = "OmegaTreeTemplate";
})(exports.TemplateName || (exports.TemplateName = {}));
var TemplateName = exports.TemplateName;
(function (TransportPhenomenon) {
    TransportPhenomenon[TransportPhenomenon["diffusion"] = "diffusion"] = "diffusion";
    TransportPhenomenon[TransportPhenomenon["advection"] = "advection"] = "advection";
})(exports.TransportPhenomenon || (exports.TransportPhenomenon = {}));
var TransportPhenomenon = exports.TransportPhenomenon;
(function (DistributionType) {
    DistributionType[DistributionType["Uniform"] = "Uniform"] = "Uniform";
    DistributionType[DistributionType["BoundedNormal"] = "BoundedNormal"] = "BoundedNormal";
})(exports.DistributionType || (exports.DistributionType = {}));
var DistributionType = exports.DistributionType;
(function (FormType) {
    FormType[FormType["open"] = "open"] = "open";
    FormType[FormType["closed"] = "closed"] = "closed";
})(exports.FormType || (exports.FormType = {}));
var FormType = exports.FormType;
/*CLASSES*/
//Components
var Distribution = (function () {
    function Distribution(obj) {
        if (obj === void 0) { obj = {}; }
    }
    return Distribution;
}());
exports.Distribution = Distribution;
var UniformDistribution = (function (_super) {
    __extends(UniformDistribution, _super);
    function UniformDistribution(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.min = obj.min;
        this.max = obj.max;
    }
    return UniformDistribution;
}(Distribution));
exports.UniformDistribution = UniformDistribution;
var BoundedNormalDistribution = (function (_super) {
    __extends(BoundedNormalDistribution, _super);
    function BoundedNormalDistribution(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.mean = 0;
        this.std = 0;
        this.max = obj.max;
        this.std = obj.std;
    }
    return BoundedNormalDistribution;
}(UniformDistribution));
exports.BoundedNormalDistribution = BoundedNormalDistribution;
var ValueDistribution = (function () {
    function ValueDistribution(obj) {
        if (obj === void 0) { obj = {}; }
        //this.unit = obj.unit;
        this.type = obj.type;
        this.distribution = obj.distribution;
    }
    return ValueDistribution;
}());
exports.ValueDistribution = ValueDistribution;
// @Injectable()
// export class ExternalResourceProvider {
//   public items: Array<ExternalResource> = [
//     new ExternalResource({id: 3000, name: "FMA_44539: Third plantar metatarsal vein", type:  "fma"}),
//     new ExternalResource({id: 4000, name: "cocomac:98: Accessor basal nucleus (amygdala), ventromedial division", type:  "cocomac"})
//   ];
// }
//# sourceMappingURL=service.apinatomy2.js.map