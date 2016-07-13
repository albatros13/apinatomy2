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
 * Created by Natallia on 6/9/2016.
 */
var core_1 = require('@angular/core');
var FilterBy = (function () {
    function FilterBy() {
    }
    FilterBy.prototype.transform = function (items, args) {
        if (!items)
            return items;
        if (!args || args.length < 2)
            return items;
        if (args[0].length == 0)
            return items;
        var filter = args[0];
        var property = args[1];
        return items.filter(function (item) {
            return (typeof (item[property]) === 'string') ?
                item[property].toLowerCase().indexOf(filter.toLowerCase()) !== -1 :
                item[property] == filter;
        });
    };
    FilterBy = __decorate([
        core_1.Pipe({
            name: 'filterBy'
        }), 
        __metadata('design:paramtypes', [])
    ], FilterBy);
    return FilterBy;
}());
exports.FilterBy = FilterBy;
var FilterByClass = (function () {
    function FilterByClass() {
    }
    FilterByClass.prototype.transform = function (items, classNames) {
        return items.filter(function (item) { return (classNames.indexOf(item.class) !== -1); });
    };
    FilterByClass = __decorate([
        core_1.Pipe({
            name: 'filterByClass'
        }), 
        __metadata('design:paramtypes', [])
    ], FilterByClass);
    return FilterByClass;
}());
exports.FilterByClass = FilterByClass;
var MapToOptions = (function () {
    function MapToOptions() {
    }
    MapToOptions.prototype.transform = function (items) {
        if (!items)
            return [];
        return items.map(function (entry) { return ({ id: entry.id + "-" + entry.name, text: entry.name ? entry.name : entry.id }); });
    };
    MapToOptions = __decorate([
        core_1.Pipe({
            name: 'mapToOptions'
        }), 
        __metadata('design:paramtypes', [])
    ], MapToOptions);
    return MapToOptions;
}());
exports.MapToOptions = MapToOptions;
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (item, property) {
        var orderType = 'ask';
        var currentField = property;
        if (currentField[0] === '-') {
            currentField = currentField.substring(1);
            orderType = 'desc';
        }
        item.sort(function (a, b) {
            if (orderType === 'desc') {
                if (a[currentField] > b[currentField])
                    return -1;
                if (a[currentField] < b[currentField])
                    return 1;
                return 0;
            }
            else {
                if (a[currentField] > b[currentField])
                    return 1;
                if (a[currentField] < b[currentField])
                    return -1;
                return 0;
            }
        });
        return item;
    };
    OrderBy = __decorate([
        core_1.Pipe({ name: 'orderBy', pure: false }), 
        __metadata('design:paramtypes', [])
    ], OrderBy);
    return OrderBy;
}());
exports.OrderBy = OrderBy;
//# sourceMappingURL=pipe.general.js.map