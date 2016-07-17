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
/**
 * Created by Natallia on 7/8/2016.
 */
/**
 * Created by Natallia on 6/18/2016.
 */
var core_1 = require('@angular/core');
var RepoAbstract = (function () {
    function RepoAbstract() {
        this.updated = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this.items = [];
        this.types = [];
        this.zones = [];
        this.sortByMode = "unsorted";
        this.filterByMode = "Name";
        this.searchString = "";
    }
    Object.defineProperty(RepoAbstract.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        set: function (item) {
            if (this._selectedItem != item) {
                this._selectedItem = item;
                this.selected.emit(this._selectedItem);
            }
        },
        enumerable: true,
        configurable: true
    });
    RepoAbstract.prototype.ngOnInit = function () {
        if (!this.items)
            this.items = [];
        if (this.items[0])
            this.selectedItem = this.items[0];
        if (!this.types || (this.types.length == 0))
            this.types = Array.from(new Set(this.items.map(function (item) { return item.class; })));
        this.zones = this.types.map(function (x) { return x + "_zone"; });
    };
    RepoAbstract.prototype.onSorted = function (prop) {
        this.sortByMode = prop.toLowerCase();
    };
    RepoAbstract.prototype.onFiltered = function (config) {
        this.filterByMode = config.mode.toLowerCase();
        this.searchString = config.filter;
    };
    RepoAbstract.prototype.onSaved = function (item, updatedItem) {
        for (var key in updatedItem) {
            if (updatedItem.hasOwnProperty(key)) {
                item[key] = updatedItem[key];
            }
        }
        this.updated.emit(this.items);
        if (item == this.selectedItem) {
            this.selected.emit(this.selectedItem);
        }
    };
    RepoAbstract.prototype.onCanceled = function (updatedItem) { };
    RepoAbstract.prototype.onRemoved = function (item) {
        if (!this.items)
            return;
        var index = this.items.indexOf(item);
        if (index > -1)
            this.items.splice(index, 1);
        this.updated.emit(this.items);
        if (item == this.selectedItem) {
            if (this.items.length > 0)
                this.selectedItem = this.items[0];
            else
                this.selectedItem = 0;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoAbstract.prototype, "updated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoAbstract.prototype, "selected", void 0);
    return RepoAbstract;
}());
exports.RepoAbstract = RepoAbstract;
//# sourceMappingURL=repo.abstract.js.map