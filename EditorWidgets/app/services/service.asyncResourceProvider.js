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
    AsyncResourceProvider.prototype.loadAll = function (dataStore) {
        this.dataStore = dataStore;
        this._data$.next(this.dataStore);
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
                // var causality = model.CausalityType.new({name: "Causality relations", supertypes: [], subtypes: []});
                // await causality.commit();
                self.addResource(water);
                self.addResource(sodiumIon);
                self.addResource(vWater);
                self.addResource(vSodiumIon);
                self.addResources(processes);
                //self.addResources(causality);
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