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
///////////////////////////////////////////////////////
(function (ResourceName) {
    ResourceName[ResourceName["Resource"] = "Resource"] = "Resource";
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
(function (Status) {
    Status[Status["New"] = "New"] = "New";
    Status[Status["Updated"] = "Updated"] = "Updated";
    Status[Status["Deleted"] = "Deleted"] = "Deleted";
    Status[Status["Valid"] = "Valid"] = "Valid";
})(exports.Status || (exports.Status = {}));
var Status = exports.Status;
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
(function (SideType) {
    SideType[SideType["open"] = "open"] = "open";
    SideType[SideType["closed"] = "closed"] = "closed";
})(exports.SideType || (exports.SideType = {}));
var SideType = exports.SideType;
///////////////////////////////////////////////////////
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
        this.quality = obj.quality;
        this.type = obj.type;
        this.distribution = obj.distribution;
    }
    return ValueDistribution;
}());
exports.ValueDistribution = ValueDistribution;
var Resource = (function () {
    function Resource(obj) {
        if (obj === void 0) { obj = {}; }
        this.id = 0;
        this.name = "";
        this.class = ResourceName.Resource;
        this.id = (obj.id) ? obj.id : 0;
        this.name = (obj.name) ? obj.name : "New item";
        this.equivalence = obj.equivalence;
        this.weakEquivalence = obj.weakEquivalence;
        this.class = obj.class;
        this.status = Status.New;
    }
    return Resource;
}());
exports.Resource = Resource;
var Type = (function (_super) {
    __extends(Type, _super);
    function Type(obj) {
        _super.call(this, obj);
        this.supertypes = [];
        this.class = ResourceName.Type;
        this.supertypes = obj.supertypes;
    }
    return Type;
}(Resource));
exports.Type = Type;
var MaterialType = (function (_super) {
    __extends(MaterialType, _super);
    function MaterialType(obj) {
        _super.call(this, obj);
        this.inheritsMaterials = [];
        this.materials = [];
        this.inheritsMeasurables = [];
        this.measurables = [];
        this.class = ResourceName.MaterialType;
        this.inheritsMaterials = obj.inheritsMaterials;
        this.materials = obj.materials;
        this.inheritsMeasurables = obj.inheritsMeasurables;
        this.measurables = obj.measurables;
    }
    return MaterialType;
}(Type));
exports.MaterialType = MaterialType;
var LyphType = (function (_super) {
    __extends(LyphType, _super);
    function LyphType(obj) {
        _super.call(this, obj);
        this.inheritsLayers = [];
        this.inheritsPatches = [];
        this.inheritsParts = [];
        this.layers = [];
        this.patches = [];
        this.parts = [];
        this.processes = [];
        this.nodes = [];
        this.innerBorder = null;
        this.outerBorder = null;
        this.class = ResourceName.LyphType;
        this.inheritsLayers = obj.inheritsLayers;
        this.inheritsPatches = obj.inheritsPatches;
        this.inheritsParts = obj.inheritsParts;
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
        this.plusSide = SideType.closed;
        this.minusSide = SideType.closed;
        this.inheritsSegments = [];
        this.segments = [];
        this.minusBorder = null;
        this.plusBorder = null;
        this.class = ResourceName.CylindricalLyphType;
        this.plusSide = (obj.plusSide) ? obj.plusSide : SideType.closed;
        this.minusSide = (obj.minusSide) ? obj.minusSide : SideType.closed;
        this.inheritsSegments = obj.inheritsSegments;
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
        this.transportPhenomenon = (obj.transportPhenomenon) ? obj.transportPhenomenon : TransportPhenomenon.advection;
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
        this.references = obj.references;
    }
    return MeasurableType;
}(Type));
exports.MeasurableType = MeasurableType;
var CausalityType = (function (_super) {
    __extends(CausalityType, _super);
    function CausalityType(obj) {
        _super.call(this, obj);
        this.class = ResourceName.CausalityType;
        this.cause = obj.cause;
        this.effect = obj.effect;
    }
    return CausalityType;
}(Type));
exports.CausalityType = CausalityType;
var NodeType = (function (_super) {
    __extends(NodeType, _super);
    function NodeType(obj) {
        _super.call(this, obj);
        this.class = ResourceName.NodeType;
    }
    return NodeType;
}(Type));
exports.NodeType = NodeType;
var BorderType = (function (_super) {
    __extends(BorderType, _super);
    function BorderType(obj) {
        _super.call(this, obj);
        this.class = ResourceName.BorderType;
        this.position = obj.position;
        this.nodes = obj.nodes;
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
        this.root = obj.root;
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
        this.locatedMeasurables = obj.locatedMeasurables;
        this.clinicalIndices = obj.clinicalIndices;
    }
    return Correlation;
}(Resource));
exports.Correlation = Correlation;
///////
var LyphTemplate = (function (_super) {
    __extends(LyphTemplate, _super);
    function LyphTemplate(obj) {
        _super.call(this, obj);
        this.length = 0;
        this.width = 0;
        this.class = TemplateName.LyphTemplate;
        this.type = obj.type;
        this.length = obj.length;
        this.width = obj.width;
    }
    return LyphTemplate;
}(Resource));
exports.LyphTemplate = LyphTemplate;
var MeasurableTemplate = (function (_super) {
    __extends(MeasurableTemplate, _super);
    function MeasurableTemplate(obj) {
        _super.call(this, obj);
        this.class = TemplateName.MeasurableTemplate;
        this.type = obj.type;
    }
    return MeasurableTemplate;
}(Resource));
exports.MeasurableTemplate = MeasurableTemplate;
///////////////////////////////////////////////////////////////////////////////////////////////////////
var PublicationProvider = (function () {
    function PublicationProvider() {
        this.items = [];
    }
    PublicationProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PublicationProvider);
    return PublicationProvider;
}());
exports.PublicationProvider = PublicationProvider;
////
var MeasurableTypeProvider = (function () {
    function MeasurableTypeProvider() {
        this.items = [];
        this.items.push(new MeasurableType({ id: 100, name: "Concentration", quality: "concentration", references: [] }));
    }
    MeasurableTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MeasurableTypeProvider);
    return MeasurableTypeProvider;
}());
exports.MeasurableTypeProvider = MeasurableTypeProvider;
////
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
        var _this = this;
        this.items = [];
        this.templates = [];
        var mtp = new MeasurableTypeProvider();
        this.items = [
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
        var blMaterials = this.items.slice(0, 9);
        var concentration = mtp.items.find(function (x) { return x.name == "concentration"; });
        if (concentration)
            concentration.references = blMaterials;
        for (var i = 0; i < this.items.length; i++) {
            var material = this.items[i];
            this.templates.push(new MeasurableTemplate({ id: material.id + 100, name: material.name, type: concentration }));
        }
        var blMeasurables = this.templates.slice(0, 9);
        var ef = new MaterialType({ id: 20, name: "Extracellular fluid" });
        var bl = new MaterialType({ id: 21, name: "Biological liquid", materials: blMaterials, measurables: blMeasurables });
        this.items.push(ef);
        this.items.push(bl);
        var el = new MaterialType({ id: 22, name: "Extracellular liquid", supertypes: [ef, bl], inheritsMaterials: [ef, bl], inheritsMeasurables: [ef, bl] });
        this.items.push(el);
        var ifl = new MaterialType({ id: 23, name: "Intracellular fluid", supertypes: [el], inheritsMaterials: [el], inheritsMeasurables: [el] });
        this.items.push(ifl);
        var plasma = new MaterialType({ id: 24, name: "Plasma", supertypes: [ifl], inheritsMaterials: [ifl], inheritsMeasurables: [ifl] });
        this.items.push(plasma);
        var urine = new MaterialType({ id: 25, name: "Urine", supertypes: [ifl], inheritsMaterials: [ifl], inheritsMeasurables: [ifl] });
        this.items.push(urine);
        var tfl = new MaterialType({ id: 26, name: "Tissue fluid", supertypes: [ifl], inheritsMaterials: [ifl], inheritsMeasurables: [ifl] });
        this.items.push(tfl);
        var lyphs = new LyphTypeProvider(this);
        lyphs.items.forEach(function (x) { return _this.items.push(x); });
        var cLyphs = new CylindricalLyphTypeProvider(this);
        cLyphs.items.forEach(function (x) { return _this.items.push(x); });
    }
    MaterialTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MaterialTypeProvider);
    return MaterialTypeProvider;
}());
exports.MaterialTypeProvider = MaterialTypeProvider;
var LyphTypeProvider = (function () {
    function LyphTypeProvider(mtp) {
        this.items = [];
    }
    LyphTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [MaterialTypeProvider])
    ], LyphTypeProvider);
    return LyphTypeProvider;
}());
exports.LyphTypeProvider = LyphTypeProvider;
var CylindricalLyphTypeProvider = (function () {
    function CylindricalLyphTypeProvider(mtp) {
        var _this = this;
        this.items = [];
        this.templates = [];
        var ifl = mtp.items.find(function (x) { return x.name == "Intracellular fluid"; });
        //let border = new BorderType();
        var cytosol = new CylindricalLyphType({ id: 1000, name: "Cytosol", materials: [ifl],
            plusSide: SideType.closed, minusSide: SideType.closed });
        var pm = new CylindricalLyphType({ id: 1001, name: "Plasma membrain",
            plusSide: SideType.closed, minusSide: SideType.closed });
        this.items = [cytosol, pm];
        this.items.forEach(function (x) {
            return _this.templates.push(new LyphTemplate({ id: x.id + 100, name: x.name, type: x }));
        });
    }
    CylindricalLyphTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [MaterialTypeProvider])
    ], CylindricalLyphTypeProvider);
    return CylindricalLyphTypeProvider;
}());
exports.CylindricalLyphTypeProvider = CylindricalLyphTypeProvider;
//# sourceMappingURL=service.apinatomy2.js.map