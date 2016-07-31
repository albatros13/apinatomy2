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
//Entities
var Resource = (function () {
    function Resource(obj) {
        if (obj === void 0) { obj = {}; }
        this.id = 0;
        this.name = "";
        this.href = "";
        this.class = ResourceName.Resource;
        this.id = (obj.id) ? obj.id : 0;
        this.name = (obj.name) ? obj.name : "New item";
        this.href = obj.href;
        this.externals = obj.externals;
        this.class = obj.class;
    }
    return Resource;
}());
exports.Resource = Resource;
var ExternalResource = (function (_super) {
    __extends(ExternalResource, _super);
    function ExternalResource(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.uri = "";
        this.type = "";
        this.locals = [];
        this.class = ResourceName.ExternalResource;
        this.type = obj.type;
        this.uri = obj.uri;
        this.locals = obj.locals;
    }
    return ExternalResource;
}(Resource));
exports.ExternalResource = ExternalResource;
var Type = (function (_super) {
    __extends(Type, _super);
    function Type(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.supertypes = [];
        this.subtypes = [];
        this.class = ResourceName.Type;
        this.supertypes = obj.supertypes;
        this.subtypes = obj.subtypes;
    }
    return Type;
}(Resource));
exports.Type = Type;
var MeasurableLocationType = (function (_super) {
    __extends(MeasurableLocationType, _super);
    function MeasurableLocationType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.MeasurableLocationType;
        this.measurables = obj.measurables;
    }
    return MeasurableLocationType;
}(Type));
exports.MeasurableLocationType = MeasurableLocationType;
var MaterialType = (function (_super) {
    __extends(MaterialType, _super);
    function MaterialType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.materialProviders = [];
        this.materials = [];
        this.measurableProviders = [];
        this.class = ResourceName.MaterialType;
        this.materialProviders = obj.materialProviders;
        this.materials = obj.materials;
        this.measurableProviders = obj.measurableProviders;
    }
    return MaterialType;
}(MeasurableLocationType));
exports.MaterialType = MaterialType;
var LyphType = (function (_super) {
    __extends(LyphType, _super);
    function LyphType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.layerProviders = [];
        this.patchProviders = [];
        this.partProviders = [];
        this.layers = [];
        this.patches = [];
        this.parts = [];
        this.processes = [];
        this.nodes = [];
        this.innerBorder = null;
        this.outerBorder = null;
        this.class = ResourceName.LyphType;
        this.species = obj.species;
        this.layerProviders = obj.layerProviders;
        this.patchProviders = obj.patchProviders;
        this.partProviders = obj.partProviders;
        this.layers = obj.layers;
        this.patches = obj.patches;
        this.parts = obj.parts;
        this.processes = obj.processes;
        this.nodes = obj.nodes;
        this.innerBorder = obj.innerBorder;
        this.outerBorder = obj.outerBorder;
        if (!this.innerBorder) {
            this.innerBorder = new BorderTemplate({ name: "T inner: General" });
        }
        if (!this.outerBorder) {
            this.outerBorder = new BorderTemplate({ name: "T outer: General" });
        }
    }
    return LyphType;
}(MaterialType));
exports.LyphType = LyphType;
var CylindricalLyphType = (function (_super) {
    __extends(CylindricalLyphType, _super);
    function CylindricalLyphType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.segmentProviders = [];
        this.segments = [];
        this.minusBorder = null;
        this.plusBorder = null;
        this.class = ResourceName.CylindricalLyphType;
        this.segmentProviders = obj.segmentProviders;
        this.segments = obj.segments;
        this.minusBorder = obj.minusBorder;
        this.plusBorder = obj.plusBorder;
        if (!this.minusBorder) {
            this.minusBorder = new BorderTemplate({ name: "T minus: General" });
        }
        if (!this.plusBorder) {
            this.plusBorder = new BorderTemplate({ name: "T plus: General" });
        }
    }
    return CylindricalLyphType;
}(LyphType));
exports.CylindricalLyphType = CylindricalLyphType;
var ProcessType = (function (_super) {
    __extends(ProcessType, _super);
    function ProcessType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.ProcessType;
        this.transportPhenomenon = (obj.transportPhenomenon) ? obj.transportPhenomenon :
            [TransportPhenomenon.advection, TransportPhenomenon.diffusion];
        this.species = obj.species;
        this.materials = obj.materials;
        this.source = obj.source;
        this.target = obj.target;
    }
    return ProcessType;
}(MeasurableLocationType));
exports.ProcessType = ProcessType;
var MeasurableType = (function (_super) {
    __extends(MeasurableType, _super);
    function MeasurableType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.MeasurableType;
        this.quality = obj.quality;
        this.materials = obj.materials;
    }
    return MeasurableType;
}(Type));
exports.MeasurableType = MeasurableType;
var CausalityType = (function (_super) {
    __extends(CausalityType, _super);
    function CausalityType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.CausalityType;
    }
    return CausalityType;
}(Type));
exports.CausalityType = CausalityType;
var NodeType = (function (_super) {
    __extends(NodeType, _super);
    function NodeType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.NodeType;
        this.channels = obj.channels;
    }
    return NodeType;
}(MeasurableLocationType));
exports.NodeType = NodeType;
var BorderType = (function (_super) {
    __extends(BorderType, _super);
    function BorderType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this._form = [FormType.open, FormType.closed];
        this.class = ResourceName.BorderType;
        this.position = obj.position;
        this.form = obj.form;
    }
    Object.defineProperty(BorderType.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (item) {
            this._form = item;
        },
        enumerable: true,
        configurable: true
    });
    return BorderType;
}(MeasurableLocationType));
exports.BorderType = BorderType;
var GroupType = (function (_super) {
    __extends(GroupType, _super);
    function GroupType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.GroupType;
        this.elements = obj.elements;
    }
    return GroupType;
}(Type));
exports.GroupType = GroupType;
var OmegaTreeType = (function (_super) {
    __extends(OmegaTreeType, _super);
    function OmegaTreeType(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.OmegaTreeType;
        this.parts = obj.parts;
        if (!obj.elements) {
            //If elements are not assigned, this is not a copy constructor, elements have to be generated from parts
            this.elements = [];
        }
        function addNodes(border, nodeSet) {
            if (!border)
                return;
            if (!border.nodes)
                border.nodes = [];
            var _loop_1 = function(node) {
                //? how to identify elements?
                if (border.nodes.find(function (item) { return (item == node); })) {
                    border.nodes.push(node);
                }
            };
            for (var _i = 0, nodeSet_1 = nodeSet; _i < nodeSet_1.length; _i++) {
                var node = nodeSet_1[_i];
                _loop_1(node);
            }
        }
    }
    return OmegaTreeType;
}(GroupType));
exports.OmegaTreeType = OmegaTreeType;
var Publication = (function (_super) {
    __extends(Publication, _super);
    function Publication(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.Publication;
    }
    return Publication;
}(Resource));
exports.Publication = Publication;
var ClinicalIndex = (function (_super) {
    __extends(ClinicalIndex, _super);
    function ClinicalIndex(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.ClinicalIndex;
    }
    return ClinicalIndex;
}(Resource));
exports.ClinicalIndex = ClinicalIndex;
var Correlation = (function (_super) {
    __extends(Correlation, _super);
    function Correlation(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.Correlation;
        this.publication = obj.publication;
        this.measurables = obj.measurables;
        this.clinicalIndices = obj.clinicalIndices;
    }
    return Correlation;
}(Resource));
exports.Correlation = Correlation;
var Coalescence = (function (_super) {
    __extends(Coalescence, _super);
    function Coalescence(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = ResourceName.Coalescence;
        this.lyphs = obj.lyphs;
        this.interfaceLayers = obj.interfaceLayers;
    }
    return Coalescence;
}(Resource));
exports.Coalescence = Coalescence;
//Templates
var Template = (function (_super) {
    __extends(Template, _super);
    function Template(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.Template;
        this.type = obj.type;
        this.cardinalityBase = (obj.cardinalityBase) ? obj.cardinalityBase : 1;
    }
    return Template;
}(Resource));
exports.Template = Template;
var MeasurableTemplate = (function (_super) {
    __extends(MeasurableTemplate, _super);
    function MeasurableTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.MeasurableTemplate;
        this.location = obj.location;
    }
    return MeasurableTemplate;
}(Template));
exports.MeasurableTemplate = MeasurableTemplate;
var ProcessTemplate = (function (_super) {
    __extends(ProcessTemplate, _super);
    function ProcessTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.ProcessTemplate;
        this.transportPhenomenon = (obj.transportPhenomenon) ? obj.transportPhenomenon : TransportPhenomenon.advection;
        this.conveyingLyph = obj.conveyingLyph;
    }
    return ProcessTemplate;
}(Template));
exports.ProcessTemplate = ProcessTemplate;
var CausalityTemplate = (function (_super) {
    __extends(CausalityTemplate, _super);
    function CausalityTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.CausalityTemplate;
        this.cause = obj.cause;
        this.effect = obj.effect;
    }
    return CausalityTemplate;
}(Template));
exports.CausalityTemplate = CausalityTemplate;
var NodeTemplate = (function (_super) {
    __extends(NodeTemplate, _super);
    function NodeTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.NodeTemplate;
        this.incomingProcesses = obj.incomingProcesses;
        this.outgoingProcesses = obj.outgoingProcesses;
    }
    return NodeTemplate;
}(Template));
exports.NodeTemplate = NodeTemplate;
var BorderTemplate = (function (_super) {
    __extends(BorderTemplate, _super);
    function BorderTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.BorderTemplate;
        this.form = (obj.form) ? obj.form : FormType.open;
        this.nodes = obj.nodes;
    }
    return BorderTemplate;
}(Template));
exports.BorderTemplate = BorderTemplate;
var GroupTemplate = (function (_super) {
    __extends(GroupTemplate, _super);
    function GroupTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.GroupTemplate;
    }
    return GroupTemplate;
}(Template));
exports.GroupTemplate = GroupTemplate;
var OmegaTreeTemplate = (function (_super) {
    __extends(OmegaTreeTemplate, _super);
    function OmegaTreeTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.class = TemplateName.OmegaTreeTemplate;
    }
    return OmegaTreeTemplate;
}(GroupTemplate));
exports.OmegaTreeTemplate = OmegaTreeTemplate;
var LyphTemplate = (function (_super) {
    __extends(LyphTemplate, _super);
    function LyphTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.length = 0;
        this.width = 0;
        this.innerBorder = null;
        this.outerBorder = null;
        this.class = TemplateName.LyphTemplate;
        this.length = obj.length;
        this.width = obj.width;
        this.coalescences = obj.coalescences;
        this.innerBorder = obj.innerBorder;
        this.outerBorder = obj.outerBorder;
    }
    return LyphTemplate;
}(Template));
exports.LyphTemplate = LyphTemplate;
var CylindricalLyphTemplate = (function (_super) {
    __extends(CylindricalLyphTemplate, _super);
    function CylindricalLyphTemplate(obj) {
        if (obj === void 0) { obj = {}; }
        _super.call(this, obj);
        this.minusBorder = null;
        this.plusBorder = null;
        this.class = TemplateName.CylindricalLyphTemplate;
        this.minusBorder = obj.minusBorder;
        this.plusBorder = obj.plusBorder;
    }
    return CylindricalLyphTemplate;
}(LyphTemplate));
exports.CylindricalLyphTemplate = CylindricalLyphTemplate;
// @Injectable()
// export class ExternalResourceProvider {
//   public items: Array<ExternalResource> = [
//     new ExternalResource({id: 3000, name: "FMA_44539: Third plantar metatarsal vein", type:  "fma"}),
//     new ExternalResource({id: 4000, name: "cocomac:98: Accessor basal nucleus (amygdala), ventromedial division", type:  "cocomac"})
//   ];
// }
//# sourceMappingURL=service.apinatomy2.js.map