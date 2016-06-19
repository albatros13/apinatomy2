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
var Status;
(function (Status) {
    Status[Status["New"] = 0] = "New";
    Status[Status["Updated"] = 1] = "Updated";
    Status[Status["Deleted"] = 2] = "Deleted";
    Status[Status["Valid"] = 3] = "Valid";
})(Status || (Status = {}));
var TransportPhenomenon;
(function (TransportPhenomenon) {
    TransportPhenomenon[TransportPhenomenon["diffusion"] = 0] = "diffusion";
    TransportPhenomenon[TransportPhenomenon["advection"] = 1] = "advection";
})(TransportPhenomenon || (TransportPhenomenon = {}));
///////////////////////////////////////////////////////
var UniformDistribution = (function () {
    function UniformDistribution(obj) {
        if (obj === void 0) { obj = { min: 0, max: 0 }; }
        this.min = obj.min;
        this.max = obj.max;
    }
    return UniformDistribution;
}());
exports.UniformDistribution = UniformDistribution;
var BoundedNormalDistribution = (function () {
    function BoundedNormalDistribution(obj) {
        if (obj === void 0) { obj = { mean: 0, std: 0, min: 0, max: 0 }; }
        this.mean = 0;
        this.std = 0;
        this.min = 0;
        this.max = 0;
        this.min = obj.min;
        this.max = obj.max;
        this.std = obj.std;
        this.mean = obj.mean;
    }
    return BoundedNormalDistribution;
}());
exports.BoundedNormalDistribution = BoundedNormalDistribution;
var ValueDistribution = (function () {
    function ValueDistribution(obj) {
        if (obj === void 0) { obj = { quality: "" }; }
        this.quality = obj.quality;
        this.type = obj.type;
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
var Template = (function (_super) {
    __extends(Template, _super);
    function Template(obj) {
        if (obj === void 0) { obj = { id: 0, name: "New template", valueDistribution: { quality: "" },
            cardinalityBase: 1, type: null }; }
        _super.call(this, obj);
        this.valueDistribution = obj.valueDistribution;
        this.cardinalityBase = obj.cardinalityBase;
    }
    return Template;
}(Resource));
exports.Template = Template;
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
var LyphTypeProvider = (function () {
    function LyphTypeProvider() {
        this.items = [
            { id: 1, name: "Head", equivalence: [{ id: "cocomac1" }, { id: "cocomac2" }] },
            { id: 2, name: "Heart", supertypes: [{ id: 1, name: "Head" }] },
            { id: 3, name: "Arm" }];
    }
    LyphTypeProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LyphTypeProvider);
    return LyphTypeProvider;
}());
exports.LyphTypeProvider = LyphTypeProvider;
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