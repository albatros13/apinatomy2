"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/*ENUMERATIONS*/
(function (ResourceName) {
    ResourceName[ResourceName["Resource"] = "Resource"] = "Resource";
    ResourceName[ResourceName["ExternalResource"] = "ExternalResource"] = "ExternalResource";
    ResourceName[ResourceName["Type"] = "Type"] = "Type";
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
        if (obj === void 0) { obj = { min: 0, max: 0 }; }
        _super.call(this);
        this.min = obj.min;
        this.max = obj.max;
    }
    return UniformDistribution;
}(Distribution));
exports.UniformDistribution = UniformDistribution;
var BoundedNormalDistribution = (function (_super) {
    __extends(BoundedNormalDistribution, _super);
    function BoundedNormalDistribution(obj) {
        if (obj === void 0) { obj = { mean: 0, std: 0, min: 0, max: 0 }; }
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
        if (obj === void 0) { obj = { type: DistributionType.Uniform, distribution: new UniformDistribution() }; }
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
var MaterialType = (function (_super) {
    __extends(MaterialType, _super);
    function MaterialType(obj) {
        _super.call(this, obj);
        this.materialProviders = [];
        this.materials = [];
        this.measurableProviders = [];
        this.measurables = [];
        this.class = ResourceName.MaterialType;
        this.materialProviders = obj.materialProviders;
        this.materials = obj.materials;
        this.measurableProviders = obj.measurableProviders;
        this.measurables = obj.measurables;
    }
    return MaterialType;
}(Type));
exports.MaterialType = MaterialType;
var LyphType = (function (_super) {
    __extends(LyphType, _super);
    function LyphType(obj) {
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
    }
    return LyphType;
}(MaterialType));
exports.LyphType = LyphType;
var CylindricalLyphType = (function (_super) {
    __extends(CylindricalLyphType, _super);
    function CylindricalLyphType(obj) {
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
    }
    return CylindricalLyphType;
}(LyphType));
exports.CylindricalLyphType = CylindricalLyphType;
var ProcessType = (function (_super) {
    __extends(ProcessType, _super);
    function ProcessType(obj) {
        _super.call(this, obj);
        this.class = ResourceName.ProcessType;
        this.transportPhenomenon = (obj.transportPhenomenon) ? obj.transportPhenomenon :
            [TransportPhenomenon.advection, TransportPhenomenon.diffusion];
        this.species = obj.species;
        this.materials = obj.materials;
        this.measurables = obj.measurables;
        this.source = obj.source;
        this.target = obj.target;
    }
    return ProcessType;
}(Type));
exports.ProcessType = ProcessType;
var MeasurableType = (function (_super) {
    __extends(MeasurableType, _super);
    function MeasurableType(obj) {
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
        _super.call(this, obj);
        this.class = ResourceName.CausalityType;
    }
    return CausalityType;
}(Type));
exports.CausalityType = CausalityType;
var NodeType = (function (_super) {
    __extends(NodeType, _super);
    function NodeType(obj) {
        _super.call(this, obj);
        this.class = ResourceName.NodeType;
        this.channels = obj.channels;
    }
    return NodeType;
}(Type));
exports.NodeType = NodeType;
var BorderType = (function (_super) {
    __extends(BorderType, _super);
    function BorderType(obj) {
        _super.call(this, obj);
        this.form = [FormType.open, FormType.closed];
        this.class = ResourceName.BorderType;
        this.position = obj.position;
        this.nodes = obj.nodes;
        this.form = obj.form;
    }
    return BorderType;
}(Type));
exports.BorderType = BorderType;
var GroupType = (function (_super) {
    __extends(GroupType, _super);
    function GroupType(obj) {
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
        _super.call(this, obj);
        this.class = ResourceName.OmegaTreeType;
        //this.levels = obj.levels;
        this.subtrees = obj.subtrees; //first (or any?) element of omega tree in a subtree must be among parent tree levels
        //this.root = obj.root;
    }
    return OmegaTreeType;
}(GroupType));
exports.OmegaTreeType = OmegaTreeType;
var Publication = (function (_super) {
    __extends(Publication, _super);
    function Publication(obj) {
        _super.call(this, obj);
        this.class = ResourceName.Publication;
    }
    return Publication;
}(Resource));
exports.Publication = Publication;
var ClinicalIndex = (function (_super) {
    __extends(ClinicalIndex, _super);
    function ClinicalIndex(obj) {
        _super.call(this, obj);
        this.class = ResourceName.ClinicalIndex;
    }
    return ClinicalIndex;
}(Resource));
exports.ClinicalIndex = ClinicalIndex;
var Correlation = (function (_super) {
    __extends(Correlation, _super);
    function Correlation(obj) {
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
        _super.call(this, obj);
        this.class = TemplateName.MeasurableTemplate;
    }
    return MeasurableTemplate;
}(Template));
exports.MeasurableTemplate = MeasurableTemplate;
var ProcessTemplate = (function (_super) {
    __extends(ProcessTemplate, _super);
    function ProcessTemplate(obj) {
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
        _super.call(this, obj);
        this.class = TemplateName.BorderTemplate;
        this.form = (obj.form) ? obj.form : FormType.open;
    }
    return BorderTemplate;
}(Template));
exports.BorderTemplate = BorderTemplate;
var GroupTemplate = (function (_super) {
    __extends(GroupTemplate, _super);
    function GroupTemplate(obj) {
        _super.call(this, obj);
        this.class = TemplateName.GroupTemplate;
    }
    return GroupTemplate;
}(Template));
exports.GroupTemplate = GroupTemplate;
var OmegaTreeTemplate = (function (_super) {
    __extends(OmegaTreeTemplate, _super);
    function OmegaTreeTemplate(obj) {
        _super.call(this, obj);
        this.class = TemplateName.OmegaTreeTemplate;
    }
    return OmegaTreeTemplate;
}(GroupTemplate));
exports.OmegaTreeTemplate = OmegaTreeTemplate;
var LyphTemplate = (function (_super) {
    __extends(LyphTemplate, _super);
    function LyphTemplate(obj) {
        _super.call(this, obj);
        this.length = 0;
        this.width = 0;
        this.class = TemplateName.LyphTemplate;
        this.length = obj.length;
        this.width = obj.width;
        this.coalescences = obj.coalescences;
    }
    return LyphTemplate;
}(Template));
exports.LyphTemplate = LyphTemplate;
var CylindricalLyphTemplate = (function (_super) {
    __extends(CylindricalLyphTemplate, _super);
    function CylindricalLyphTemplate(obj) {
        _super.call(this, obj);
        this.class = TemplateName.CylindricalLyphTemplate;
    }
    return CylindricalLyphTemplate;
}(LyphTemplate));
exports.CylindricalLyphTemplate = CylindricalLyphTemplate;
/*TEST PROVIDERS*/
var basicMaterials = [
    new MaterialType({ id: 10, name: "Water" }),
    new MaterialType({ id: 11, name: "Sodium ion" }),
    new MaterialType({ id: 12, name: "Pottasium ion" }),
    new MaterialType({ id: 13, name: "Hydrogen ion" }),
    new MaterialType({ id: 14, name: "Chloride ion" }),
    new MaterialType({ id: 15, name: "Bicarbonate ion" }),
    new MaterialType({ id: 16, name: "Calcium ion" }),
    new MaterialType({ id: 17, name: "Phosphate ion" }),
    new MaterialType({ id: 18, name: "Glucose" })
];
var basicMeasurables = [
    new MeasurableType({ id: 100, name: "Concentration of " + basicMaterials[0].name, quality: "concentration", materials: [basicMaterials[0]] }),
    new MeasurableType({ id: 101, name: "Concentration of " + basicMaterials[1].name, quality: "concentration", materials: [basicMaterials[1]] }),
    new MeasurableType({ id: 102, name: "Concentration of " + basicMaterials[2].name, quality: "concentration", materials: [basicMaterials[2]] }),
    new MeasurableType({ id: 103, name: "Concentration of " + basicMaterials[3].name, quality: "concentration", materials: [basicMaterials[3]] }),
    new MeasurableType({ id: 104, name: "Concentration of " + basicMaterials[4].name, quality: "concentration", materials: [basicMaterials[4]] }),
    new MeasurableType({ id: 105, name: "Concentration of " + basicMaterials[5].name, quality: "concentration", materials: [basicMaterials[5]] }),
    new MeasurableType({ id: 106, name: "Concentration of " + basicMaterials[6].name, quality: "concentration", materials: [basicMaterials[6]] }),
    new MeasurableType({ id: 107, name: "Concentration of " + basicMaterials[7].name, quality: "concentration", materials: [basicMaterials[7]] }),
    new MeasurableType({ id: 108, name: "Concentration of " + basicMaterials[8].name, quality: "concentration", materials: [basicMaterials[8]] })
];
var testProcesses = [
    new ProcessType({ id: 50, name: "Sample process" })
];
var testBorders = [
    new BorderType({ id: 80, name: "General border", form: [FormType.open, FormType.closed] }),
    new BorderType({ id: 81, name: "Open border", form: [FormType.open] }),
    new BorderType({ id: 82, name: "Closed border", form: [FormType.closed] })
];
var ExternalResourceProvider = (function () {
    function ExternalResourceProvider() {
        this.items = [
            new ExternalResource({ id: 3000, name: "FMA_44539: Third plantar metatarsal vein", type: "fma" }),
            new ExternalResource({ id: 4000, name: "cocomac:98: Accessor basal nucleus (amygdala), ventromedial division", type: "cocomac" })
        ];
    }
    ExternalResourceProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ExternalResourceProvider);
    return ExternalResourceProvider;
}());
exports.ExternalResourceProvider = ExternalResourceProvider;
var BorderTypeProvider = (function () {
    function BorderTypeProvider() {
        this.items = [];
        this.templates = [];
        this.items = testBorders;
        this.templates = this.items.map(function (item) {
            return new BorderTemplate({ id: item.id + 300, name: "T: " + item.name, type: item });
        });
    }
    BorderTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BorderTypeProvider);
    return BorderTypeProvider;
}());
exports.BorderTypeProvider = BorderTypeProvider;
var TypeProvider = (function () {
    function TypeProvider() {
        this.items = [];
    }
    TypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TypeProvider);
    return TypeProvider;
}());
exports.TypeProvider = TypeProvider;
var MaterialTypeProvider = (function () {
    function MaterialTypeProvider() {
        this.items = [];
        this.templates = [];
        this.items = basicMaterials;
        var blMaterials = this.items.slice(0, 9);
        for (var i = 0; i < this.items.length; i++) {
            var material = this.items[i];
            this.templates.push(new MeasurableTemplate({ id: material.id + 200, name: "T: concentration of " + material.name, type: basicMeasurables[i] }));
        }
        var blMeasurables = this.templates.slice(0, 9);
        var ef = new MaterialType({ id: 20, name: "Extracellular fluid" });
        var bl = new MaterialType({ id: 21, name: "Biological liquid", materials: blMaterials, measurables: blMeasurables });
        this.items.push(ef);
        this.items.push(bl);
        var el = new MaterialType({ id: 22, name: "Extracellular liquid", supertypes: [ef, bl], materialProviders: [ef, bl], measurableProviders: [ef, bl] });
        this.items.push(el);
        var ifl = new MaterialType({ id: 23, name: "Intracellular fluid", supertypes: [el], materialProviders: [el], measurableProviders: [el] });
        this.items.push(ifl);
        var plasma = new MaterialType({ id: 24, name: "Plasma", supertypes: [ifl], materialProviders: [ifl], measurableProviders: [ifl] });
        this.items.push(plasma);
        var urine = new MaterialType({ id: 25, name: "Urine", supertypes: [ifl], materialProviders: [ifl], measurableProviders: [ifl] });
        this.items.push(urine);
        var tfl = new MaterialType({ id: 26, name: "Tissue fluid", supertypes: [ifl], materialProviders: [ifl], measurableProviders: [ifl] });
        this.items.push(tfl);
    }
    MaterialTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MaterialTypeProvider);
    return MaterialTypeProvider;
}());
exports.MaterialTypeProvider = MaterialTypeProvider;
var LyphTypeProvider = (function () {
    function LyphTypeProvider() {
        this.items = [];
        this.templates = [];
    }
    LyphTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LyphTypeProvider);
    return LyphTypeProvider;
}());
exports.LyphTypeProvider = LyphTypeProvider;
var CylindricalLyphTypeProvider = (function () {
    function CylindricalLyphTypeProvider(mtp, btp) {
        var _this = this;
        this.items = [];
        this.templates = [];
        var ifl = mtp.items.find(function (x) { return (x.name == "Intracellular fluid"); });
        var border = btp.templates.find(function (x) { return x.name.indexOf("General") > -1; });
        var cytosol = new CylindricalLyphType({ id: 1000, name: "Cytosol", materials: [ifl], innerBorder: border });
        var pm = new CylindricalLyphType({ id: 1001, name: "Plasma membrain", outerBorder: border });
        this.items = [cytosol, pm];
        this.items.forEach(function (x) {
            return _this.templates.push(new CylindricalLyphTemplate({ id: x.id + 100, name: "T: " + x.name, type: x }));
        });
        var cellLayers = this.templates.slice(0, 2);
        var cell = new CylindricalLyphType({ id: 1002, name: "Cell", layers: cellLayers });
        this.items.push(cell);
        var openBorder = btp.templates.find(function (x) { return (x.name.indexOf("Open") > -1); });
        var sec_a = new CylindricalLyphType({ id: 1006, name: "Apical region of the surface epithelial cell", plusBorder: openBorder });
        var sec_b = new CylindricalLyphType({ id: 1007, name: "Basolateral region of the epithelial cell", minusBorder: openBorder });
        this.items.concat([sec_a, sec_b]);
        var sec_at = new CylindricalLyphTemplate({ id: sec_a.id + 100, name: "T: " + sec_a.name, type: sec_a });
        var sec_bt = new CylindricalLyphTemplate({ id: sec_b.id + 100, name: "T: " + sec_b.name, type: sec_b });
        this.templates.concat([sec_at, sec_bt]);
        var sec = new CylindricalLyphType({ id: 1004, name: "Surface epithelial cell", supertypes: [cell], layerProviders: [cell], measurableProviders: [cell], segments: [sec_at, sec_bt] });
        var rbc = new CylindricalLyphType({ id: 1003, name: "Red blood cell", supertypes: [cell], layerProviders: [cell], measurableProviders: [cell] });
        var rsec = new CylindricalLyphType({ id: 1005, name: "Renal surface epithelial cell", supertypes: [sec], layerProviders: [sec], measurableProviders: [sec], segmentProviders: [sec] });
        this.items.concat([rbc, sec, rsec]);
        var closedBorder = btp.templates.find(function (x) { return x.name.indexOf("Closed") > -1; });
        var sec_lum = new CylindricalLyphType({ id: 1008, name: "Luminal region of the Surface Endothelial Cell", plusBorder: closedBorder });
        var sec_ablum = new CylindricalLyphType({ id: 1009, name: "Abluminal region of the Surface Endothelial Cell", minusBorder: closedBorder });
        this.items.concat([sec_lum, sec_ablum]);
        var sec_lumt = new CylindricalLyphTemplate({ id: sec_lum.id + 100, name: "T: " + sec_lum.name, type: sec_lum });
        var sec_ablumt = new CylindricalLyphTemplate({ id: sec_ablum.id + 100, name: "T: " + sec_ablum.name, type: sec_ablum });
        this.templates.concat([sec_lumt, sec_ablumt]);
        var ec = new CylindricalLyphType({ id: 1010, name: "Endothelial Cell", supertypes: [cell], layerProviders: [cell], measurableProviders: [cell], segments: [sec_lumt, sec_ablumt] });
        var smc = new CylindricalLyphType({ id: 1011, name: "Smooth Muscle Cell",
            supertypes: [cell], layerProviders: [cell], measurableProviders: [cell] });
        var cmc = new CylindricalLyphType({ id: 1012, name: "Cardiac Muscle Cell", supertypes: [sec], layerProviders: [sec], measurableProviders: [sec], segmentProviders: [sec] });
        this.items.concat([ec, smc, cmc]);
        //Lyphs for omega trees
        var cnt = new CylindricalLyphType({ id: 1050, name: "CNT", minusBorder: openBorder, plusBorder: openBorder });
        var dnt = new CylindricalLyphType({ id: 1051, name: "DNT", minusBorder: openBorder, plusBorder: openBorder });
        var ctkal = new CylindricalLyphType({ id: 1052, name: "CTkAL", minusBorder: openBorder, plusBorder: openBorder });
        this.items.concat([cnt, dnt, ctkal]);
    }
    CylindricalLyphTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [MaterialTypeProvider, BorderTypeProvider])
    ], CylindricalLyphTypeProvider);
    return CylindricalLyphTypeProvider;
}());
exports.CylindricalLyphTypeProvider = CylindricalLyphTypeProvider;
var MeasurableTypeProvider = (function () {
    function MeasurableTypeProvider() {
        this.items = [];
        this.templates = [];
        this.items = basicMeasurables;
    }
    MeasurableTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MeasurableTypeProvider);
    return MeasurableTypeProvider;
}());
exports.MeasurableTypeProvider = MeasurableTypeProvider;
var ProcessTypeProvider = (function () {
    function ProcessTypeProvider() {
        this.items = [];
        this.templates = [];
        this.items = testProcesses;
        this.templates = this.items.map(function (item) {
            return new ProcessTemplate({ id: item.id + 300, name: "T: " + item.name, type: item });
        });
    }
    ProcessTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ProcessTypeProvider);
    return ProcessTypeProvider;
}());
exports.ProcessTypeProvider = ProcessTypeProvider;
var GroupTypeProvider = (function () {
    function GroupTypeProvider() {
        this.items = [];
        this.templates = [];
    }
    GroupTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GroupTypeProvider);
    return GroupTypeProvider;
}());
exports.GroupTypeProvider = GroupTypeProvider;
var OmegaTreeTypeProvider = (function () {
    function OmegaTreeTypeProvider(cltp) {
        this.items = [];
        this.templates = [];
        function getLyph(id) {
            return cltp.items.find(function (x) { return (x.id == id); });
        }
        var elements = [
            new CylindricalLyphTemplate({ id: 2050, name: "T: CNT", type: getLyph(1050) }),
            new CylindricalLyphTemplate({ id: 2051, name: "T: DNT", type: getLyph(1051) }),
            new CylindricalLyphTemplate({ id: 2052, name: "T: CTkAL", type: getLyph(1052) })
        ];
        var sln = new OmegaTreeType({ id: 10000, name: "Short Looped Nephron", elements: elements });
        this.items.push(sln);
    }
    OmegaTreeTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [CylindricalLyphTypeProvider])
    ], OmegaTreeTypeProvider);
    return OmegaTreeTypeProvider;
}());
exports.OmegaTreeTypeProvider = OmegaTreeTypeProvider;
//# sourceMappingURL=service.apinatomy2.js.map