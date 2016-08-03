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
var core_1 = require('@angular/core');
var model = require("open-physiology-model");
var ItemHeader = (function () {
    function ItemHeader() {
    }
    ItemHeader = __decorate([
        core_1.Component({
            selector: 'item-header',
            inputs: ['item', 'selectedItem', 'isSelectedOpen', 'icon'],
            template: "\n      <i class=\"pull-left glyphicon\"\n        [ngClass]=\"{\n          'glyphicon-chevron-down': (item == selectedItem) && isSelectedOpen, \n          'glyphicon-chevron-right': (item != selectedItem) || !isSelectedOpen}\"></i>&nbsp;\n        {{(item.id)? item.id: \"?\"}}: {{item.name}}\n        <img class=\"pull-right icon\" src=\"{{icon}}\"/>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ItemHeader);
    return ItemHeader;
}());
exports.ItemHeader = ItemHeader;
var RepoAbstract = (function () {
    function RepoAbstract() {
        this.added = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.updated = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this.items = [];
        this.types = [];
        this.zones = [];
        this.ignore = new Set();
        this.sortByMode = "unsorted";
        this.filterByMode = "Name";
        this.searchString = "";
        this.isSelectedOpen = false;
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
        if (this.items[0] || !this.selectedItem)
            this.selectedItem = this.items[0];
        if (!this.types || (this.types.length == 0)) {
            this.types = Array.from(new Set(this.items.map(function (item) { return item.class; })));
        }
    };
    RepoAbstract.prototype.onHeaderClick = function (item) {
        this.selectedItem = item;
        this.isSelectedOpen = !this.isSelectedOpen;
    };
    RepoAbstract.prototype.onSorted = function (prop) {
        this.sortByMode = prop.toLowerCase();
    };
    RepoAbstract.prototype.onFiltered = function (config) {
        this.filterByMode = config.mode.toLowerCase();
        this.searchString = config.filter;
    };
    RepoAbstract.prototype.onSaved = function (item, updatedItem) {
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
        if (item == this.selectedItem) {
            if (this.items.length > 0)
                this.selectedItem = this.items[0];
            else
                this.selectedItem = null;
        }
        this.removed.emit(item);
        this.updated.emit(this.items);
    };
    RepoAbstract.prototype.onAdded = function (Class) {
        var proto = { name: "New " + Class };
        if (Class.indexOf("Template") > 0) {
            proto = { name: "T: New " + Class, cardinality: 1 };
        }
        var newItem = model[Class].new(proto);
        this.items.push(newItem);
        this.added.emit(newItem);
        this.updated.emit(this.items);
        this.selectedItem = newItem;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoAbstract.prototype, "added", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoAbstract.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoAbstract.prototype, "updated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RepoAbstract.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RepoAbstract.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RepoAbstract.prototype, "types", void 0);
    return RepoAbstract;
}());
exports.RepoAbstract = RepoAbstract;
//# sourceMappingURL=repo.abstract.js.map