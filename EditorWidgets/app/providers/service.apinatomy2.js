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
        if (obj === void 0) { obj = { id: 0, name: "New resource" }; }
        this.id = 0;
        this.name = "";
        this.id = obj.id;
        this.name = obj.name;
        this.equivalence = obj.equivalence;
        this.weakEquivalence = obj.weakEquivalence;
        this.status = Status.New;
    }
    return Resource;
}());
exports.Resource = Resource;
var LyphTemplate = (function (_super) {
    __extends(LyphTemplate, _super);
    function LyphTemplate(obj) {
        if (obj === void 0) { obj = { id: 0, name: "New template", type: null, length: 0 }; }
        _super.call(this, obj);
        this.length = 0;
        this.type = obj.type;
        this.length = obj.length;
    }
    return LyphTemplate;
}(Resource));
exports.LyphTemplate = LyphTemplate;
var Type = (function (_super) {
    __extends(Type, _super);
    function Type(obj) {
        if (obj === void 0) { obj = { id: 0, name: "New type", supertypes: [] }; }
        _super.call(this, obj);
        this.supertypes = [];
        this.supertypes = obj.supertypes;
    }
    return Type;
}(Resource));
exports.Type = Type;
var MaterialType = (function (_super) {
    __extends(MaterialType, _super);
    function MaterialType(obj) {
        if (obj === void 0) { obj = { id: 0, name: "New material", materials: [] }; }
        _super.call(this, obj);
        this.materials = [];
        this.materials = obj.materials;
    }
    return MaterialType;
}(Type));
exports.MaterialType = MaterialType;
var MeasurableType = (function (_super) {
    __extends(MeasurableType, _super);
    function MeasurableType(obj) {
        if (obj === void 0) { obj = { id: 0, name: "New measurement", quality: "" }; }
        _super.call(this, obj);
        this.quality = obj.quality;
    }
    return MeasurableType;
}(Type));
exports.MeasurableType = MeasurableType;
var LyphType = (function (_super) {
    __extends(LyphType, _super);
    function LyphType(obj) {
        if (obj === void 0) { obj = { id: 0, name: "New lyph type" }; }
        _super.call(this, obj);
        this.inheritsLayers = [];
        this.inheritsPatches = [];
        this.inheritsParts = [];
        this.inheritsMeasurables = [];
        this.layers = [];
        this.patches = [];
        this.parts = [];
        this.measurables = [];
        this.processes = [];
        this.nodes = [];
        this.innerBorder = null;
        this.outerBorder = null;
        this.inheritsLayers = obj.inheritsLayers;
        this.inheritsPatches = obj.inheritsPatches;
        this.inheritsParts = obj.inheritsParts;
        this.inheritsMeasurables = obj.inheritsMeasurables;
        this.layers = obj.layers;
        this.patches = obj.patches;
        this.parts = obj.parts;
        this.measurables = obj.measurables;
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
        if (obj === void 0) { obj = { id: 0, name: "New cylindrical lyph type" }; }
        _super.call(this, obj);
        this.inheritsSegments = [];
        this.segments = [];
        this.minusBorder = null;
        this.plusBorder = null;
        this.inheritsSegments = obj.inheritsSegments;
        this.segments = obj.segments;
        this.minusBorder = obj.minusBorder;
        this.plusBorder = obj.plusBorder;
    }
    return CylindricalLyphType;
}(LyphType));
exports.CylindricalLyphType = CylindricalLyphType;
///////////////////////////////////////////////////////
//TODO: Replace data for testing with user story
var LyphTypeProvider = (function () {
    function LyphTypeProvider() {
        this.head = new LyphType({ id: 1, name: "Head", equivalence: [{ id: "cocomac1" }, { id: "cocomac2" }] });
        this.testLayer = new LyphTemplate({ id: 10, name: "Head", type: this.head, length: 5 });
        this.items = [this.head,
            { id: 2, name: "Heart", supertypes: [{ id: 1, name: "Head" }], layers: [this.testLayer] },
            { id: 3, name: "Arm" }];
    }
    LyphTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LyphTypeProvider);
    return LyphTypeProvider;
}());
exports.LyphTypeProvider = LyphTypeProvider;
var MaterialTypeProvider = (function () {
    function MaterialTypeProvider() {
        this.items = new LyphTypeProvider().items;
        this.glucose = new MaterialType({ id: 4, name: "Glucose" });
        this.items.push(this.glucose);
    }
    MaterialTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MaterialTypeProvider);
    return MaterialTypeProvider;
}());
exports.MaterialTypeProvider = MaterialTypeProvider;
var TypeProvider = (function () {
    function TypeProvider() {
        this.items = new MaterialTypeProvider().items;
    }
    TypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TypeProvider);
    return TypeProvider;
}());
exports.TypeProvider = TypeProvider;
var PublicationProvider = (function () {
    function PublicationProvider() {
        this.items = [
            { id: 1, name: "Paper 1" },
            { id: 2, name: "Paper 2" },
            { id: 3, name: "Paper 3" }];
    }
    PublicationProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PublicationProvider);
    return PublicationProvider;
}());
exports.PublicationProvider = PublicationProvider;
//# sourceMappingURL=service.apinatomy2.js.map