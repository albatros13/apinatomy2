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
        return items.filter(function (item) { return item.id.indexOf(args[0]) !== -1; });
    };
    FilterBy = __decorate([
        core_1.Pipe({
            name: 'filterBy'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterBy);
    return FilterBy;
}());
exports.FilterBy = FilterBy;
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (item, orderField) {
        var orderType = 'ask';
        var currentField = orderField;
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
//# sourceMappingURL=widget.transform.js.map