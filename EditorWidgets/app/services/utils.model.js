"use strict";
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
(function (FormType) {
    FormType[FormType["open"] = "open"] = "open";
    FormType[FormType["closed"] = "closed"] = "closed";
})(exports.FormType || (exports.FormType = {}));
var FormType = exports.FormType;
function getLabel(field) {
    //let index = field.indexOf("Provider");
    //if (index > -1) return "Inherits " + field.substring(0, index) + " from";
    if (field == "externals")
        return "Annotations";
    if (field == "locals")
        return "Local resources";
    if (field == "id")
        return "ID";
    return field[0].toUpperCase() + field.substring(1);
}
exports.getLabel = getLabel;
function getIcon(Class) {
    switch (Class) {
        case ResourceName.ExternalResource: return "images/external.png";
        case ResourceName.MaterialType: return "images/materialType.png";
        case ResourceName.LyphType: return "images/lyphType.png";
        case ResourceName.CylindricalLyphType: return "images/cylindricalLyphType.png";
        case ResourceName.ProcessType: return "images/processType.png";
        case ResourceName.MeasurableType: return "images/measurableType.png";
        case ResourceName.CausalityType: return "images/causalityType.png";
        case ResourceName.NodeType: return "images/nodeType.png";
        case ResourceName.BorderType: return "images/borderType.png";
        case ResourceName.Coalescence: return "images/coalescence.png";
        case ResourceName.GroupType: return "images/groupType.png";
        case ResourceName.OmegaTreeType: return "images/omegaTreeType.png";
        case ResourceName.Publication: return "images/publication.png";
        case ResourceName.Correlation: return "images/correlation.png";
        case ResourceName.ClinicalIndex: return "images/clinicalIndex.png";
        case TemplateName.LyphTemplate: return "images/lyphType.png";
        case TemplateName.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";
        case TemplateName.ProcessTemplate: return "images/processType.png";
        case TemplateName.MeasurableTemplate: return "images/measurableType.png";
        case TemplateName.CausalityTemplate: return "images/causalityType.png";
        case TemplateName.NodeTemplate: return "images/nodeType.png";
        case TemplateName.BorderTemplate: return "images/borderType.png";
        case TemplateName.CausalityTemplate: return "images/causality.png";
        case TemplateName.GroupTemplate: return "images/groupType.png";
        case TemplateName.OmegaTreeTemplate: return "images/omegaTreeType.png";
    }
    return "images/resource.png";
}
exports.getIcon = getIcon;
exports.getColor = d3.scale.category20();
//# sourceMappingURL=utils.model.js.map