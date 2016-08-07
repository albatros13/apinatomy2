"use strict";
exports.getColor = d3.scale.category20();
(function (ResourceName) {
    ResourceName[ResourceName["Resource"] = "Resource"] = "Resource";
    ResourceName[ResourceName["ExternalResource"] = "ExternalResource"] = "ExternalResource";
    ResourceName[ResourceName["Type"] = "Type"] = "Type";
    //OmegaTreePartType   = <any>"OmegaTreePartType",
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
    TemplateName[TemplateName["OmegaTreePartTemplate"] = "OmegaTreePartTemplate"] = "OmegaTreePartTemplate";
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
function getPropertyLabel(option) {
    var label = option;
    label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
    label = label[0].toUpperCase() + label.substring(1).toLowerCase();
    return label;
}
exports.getPropertyLabel = getPropertyLabel;
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
function getTreeData(item, relations, depth) {
    var data = {};
    if (!item)
        return data;
    data = { id: item.id, name: item.name, resource: item, children: [] };
    if (!depth)
        depth = -1;
    var i = 0;
    traverse(item, 0, data);
    return data;
    function traverse(root, level, data) {
        if (!root)
            return;
        for (var _i = 0, _a = Array.from(relations); _i < _a.length; _i++) {
            var fieldName = _a[_i];
            if (!root[fieldName])
                continue;
            if ((depth - level) == 0)
                return;
            if (!data.children)
                data.children = [];
            for (var _b = 0, _c = Array.from(root[fieldName]); _b < _c.length; _b++) {
                var obj = _c[_b];
                var child = { id: "#" + ++i, name: obj.name, resource: obj, depth: level, relation: fieldName };
                data.children.push(child);
                traverse(obj, level + 1, child);
            }
        }
    }
}
exports.getTreeData = getTreeData;
function getGraphData(item, relations, depth) {
    var data = { nodes: [], links: [] };
    if (!item)
        return data;
    data.nodes.push(item);
    if (!depth)
        depth = -1;
    traverse(item, depth, data);
    return data;
    function traverse(root, depth, data) {
        if (!root)
            return;
        if (depth == 0)
            return;
        for (var _i = 0, _a = Array.from(relations); _i < _a.length; _i++) {
            var fieldName = _a[_i];
            if (!root[fieldName])
                continue;
            var children = Array.from(root[fieldName]);
            for (var _b = 0, children_1 = children; _b < children_1.length; _b++) {
                var child = children_1[_b];
                data.links.push({ source: root, target: child, relation: fieldName });
                if (data.nodes.indexOf(child) == -1) {
                    data.nodes.push(child);
                    traverse(child, depth - 1, data);
                }
            }
        }
    }
}
exports.getGraphData = getGraphData;
function setsEqual(S, T) {
    for (var _i = 0, S_1 = S; _i < S_1.length; _i++) {
        var x = S_1[_i];
        if (!T.has(x))
            return false;
    }
    for (var _a = 0, T_1 = T; _a < T_1.length; _a++) {
        var x = T_1[_a];
        if (!T.has(x))
            return false;
    }
    return true;
}
exports.setsEqual = setsEqual;
function compareLinkedElements(a, b) {
    var res = 0;
    if (!a.cardinalityMultipliers) {
        if (!b.cardinalityMultipliers)
            res = 0;
        else
            res = -1;
    }
    if (!b.cardinalityMultipliers)
        res = 1;
    if (b.cardinalityMultipliers && b.cardinalityMultipliers.has(a))
        res = -1;
    if (a.cardinalityMultipliers && a.cardinalityMultipliers.has(b))
        res = 1;
    //let s = (res == -1)? " < ": ((res == 1)? " > ": " == ");
    //console.log(a.name + s + b.name);
    return res;
}
exports.compareLinkedElements = compareLinkedElements;
//# sourceMappingURL=utils.model.js.map