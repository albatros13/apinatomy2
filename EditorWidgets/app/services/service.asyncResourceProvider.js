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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var service_apinatomy2_1 = require('./service.apinatomy2');
var model = require("open-physiology-model");
var AsyncResourceProvider = (function () {
    function AsyncResourceProvider() {
        this._data$ = new Subject_1.Subject();
        this.dataStore = {};
    }
    Object.defineProperty(AsyncResourceProvider.prototype, "data$", {
        get: function () {
            return this._data$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AsyncResourceProvider.prototype.ngOnInit = function () { };
    AsyncResourceProvider.prototype.loadAll = function (dataStore) {
        this.dataStore = dataStore;
        this._data$.next(this.dataStore);
    };
    AsyncResourceProvider.prototype.updateSubSets = function (Class) {
        if (Class == service_apinatomy2_1.ResourceName.Resource)
            return;
        if (Class && (Class.indexOf("Type") > 0)) {
            this.dataStore.cylindricalLyphs = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.CylindricalLyphType); });
            this.dataStore.lyphs = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.LyphType ||
                x.class == service_apinatomy2_1.ResourceName.CylindricalLyphType); });
            this.dataStore.materials = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.MaterialType ||
                x.class == service_apinatomy2_1.ResourceName.LyphType ||
                x.class == service_apinatomy2_1.ResourceName.CylindricalLyphType); });
            this.dataStore.types = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.MeasurableType ||
                x.class == service_apinatomy2_1.ResourceName.ProcessType ||
                x.class == service_apinatomy2_1.ResourceName.CausalityType ||
                x.class == service_apinatomy2_1.ResourceName.NodeType ||
                x.class == service_apinatomy2_1.ResourceName.BorderType ||
                x.class == service_apinatomy2_1.ResourceName.GroupType ||
                x.class == service_apinatomy2_1.ResourceName.OmegaTreeType ||
                x.class == service_apinatomy2_1.ResourceName.MaterialType ||
                x.class == service_apinatomy2_1.ResourceName.LyphType ||
                x.class == service_apinatomy2_1.ResourceName.CylindricalLyphType); });
        }
        if (Class && (Class.indexOf("Measurable") > 0)) {
            this.dataStore.measuarbles = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.MeasurableType); });
        }
        if (Class && (Class == service_apinatomy2_1.ResourceName.OmegaTreeType || Class == service_apinatomy2_1.ResourceName.GroupType)) {
            this.dataStore.groups = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.GroupType ||
                x.class == service_apinatomy2_1.ResourceName.OmegaTreeType); });
        }
        if (Class && (Class == service_apinatomy2_1.ResourceName.OmegaTreeType)) {
            this.dataStore.omegaTrees = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.OmegaTreeType); });
        }
        this.dataStore.borders = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.BorderType); });
        this.dataStore.processes = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.ProcessType); });
        this.dataStore.nodes = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.NodeType); });
        this.dataStore.causalities = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.CausalityType); });
        if (Class && (Class == service_apinatomy2_1.ResourceName.Coalescence)) {
            this.dataStore.coalescences = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.Coalescence); });
        }
        if (Class && (Class == service_apinatomy2_1.ResourceName.Publication)) {
            this.dataStore.publications = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.Publication); });
        }
        if (Class && (Class == service_apinatomy2_1.ResourceName.ClinicalIndex)) {
            this.dataStore.clinicalIndices = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.ClinicalIndex); });
        }
        if (Class && (Class == service_apinatomy2_1.ResourceName.Correlation)) {
            this.dataStore.correlations = this.dataStore.resources.filter(function (x) { return (x.class == service_apinatomy2_1.ResourceName.Correlation); });
        }
        //All templates
        this.dataStore.templates = this.dataStore.resources.filter(function (x) { return (x.class && (x.class.indexOf("Template") > 0)); });
    };
    AsyncResourceProvider.prototype.addResources = function (dataItems) {
        if (this.dataStore.resources && (dataItems.length > 0)) {
            var _loop_1 = function(dataItem) {
                var index = this_1.dataStore.resources.findIndex(function (item) { return (item == dataItem); });
                if (index >= 0) {
                    this_1.dataStore.resources[index] = dataItem;
                }
                else {
                    this_1.dataStore.resources.push(dataItem);
                }
            };
            var this_1 = this;
            for (var _i = 0, dataItems_1 = dataItems; _i < dataItems_1.length; _i++) {
                var dataItem = dataItems_1[_i];
                _loop_1(dataItem);
            }
            this.updateSubSets(dataItems[0].class);
        }
        else {
            this.dataStore.resources = dataItems;
        }
        this._data$.next(this.dataStore);
    };
    AsyncResourceProvider.prototype.addResource = function (dataItem) {
        if (this.dataStore.resources) {
            var index = this.dataStore.resources.findIndex(function (item) { return (item == dataItem); });
            if (index >= 0) {
                this.dataStore.resources[index] = dataItem;
            }
            else {
                this.dataStore.resources.push(dataItem);
                this.updateSubSets(dataItem.class);
            }
        }
        else {
            this.dataStore.resources = [dataItem];
        }
        this._data$.next(this.dataStore);
    };
    AsyncResourceProvider.prototype.removeResource = function (dataItem) {
        if (this.dataStore.resources) {
            var index = this.dataStore.resources.findIndex(function (item) { return (item == dataItem); });
            if (index >= 0) {
                this.dataStore.resources.slice(index, 1);
                this.updateSubSets(dataItem.class);
            }
        }
        this._data$.next(this.dataStore);
    };
    AsyncResourceProvider.prototype.loadExtra = function () {
        var self = this;
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                /*Material type*/
                var water = model.MaterialType.new({ name: "Water" });
                yield water.commit();
                var vWater = model.MeasurableType.new({ name: "Concentration of water", quality: "concentration",
                    materials: [water] });
                yield vWater.commit();
                /*Measurable type*/
                var sodiumIon = model.MaterialType.new({ name: "Sodium ion" });
                yield sodiumIon.commit();
                var vSodiumIon = model.MeasurableType.new({ name: "Concentration of sodium ion", quality: "concentration",
                    materials: [sodiumIon] });
                yield vSodiumIon.commit();
                /*Process type*/
                var processes = [
                    model.ProcessType.new({ name: "Inflow Right Heart" }),
                    model.ProcessType.new({ name: "Outflow Right Heart" }),
                    model.ProcessType.new({ name: "Inflow Left Heart" }),
                    model.ProcessType.new({ name: "Outflow Left Heart" })];
                yield Promise.all(processes.map(function (p) { return p.commit(); }));
                /*Causality type*/
                var causality = model.CausalityType.new({ name: "Causality relations", supertypes: [], subtypes: [] });
                yield causality.commit();
                console.log("Material", water);
                console.log("Measurable", vWater);
                console.log("Process", processes[0]);
                console.log("Causality", causality);
                self.addResource(water);
                self.addResource(sodiumIon);
                self.addResource(vWater);
                self.addResource(vSodiumIon);
                self.addResources(processes);
                self.addResources(causality);
            });
        })();
    };
    AsyncResourceProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AsyncResourceProvider);
    return AsyncResourceProvider;
}());
exports.AsyncResourceProvider = AsyncResourceProvider;
//# sourceMappingURL=service.asyncResourceProvider.js.map