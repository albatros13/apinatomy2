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
 * Created by Natallia on 6/15/2016.
 */
var core_1 = require('@angular/core');
var RestoreService = (function () {
    function RestoreService() {
    }
    RestoreService.prototype.setItem = function (item) {
        this.originalItem = item;
        this.currentItem = this.clone(item);
    };
    RestoreService.prototype.getItem = function () {
        return this.currentItem;
    };
    RestoreService.prototype.restoreItem = function () {
        this.currentItem = this.originalItem;
        return this.getItem();
    };
    RestoreService.prototype.clone = function (obj) {
        if (!obj)
            return obj;
        if (obj.constructor === Array) {
            var out = [];
            for (var i = 0; i < obj.length; i++)
                out[i] = this.clone(obj[i]);
            return out;
        }
        else if (typeof obj === 'object') {
            var out = {};
            for (var i in obj)
                out[i] = this.clone(obj[i]);
            return out;
        }
        return obj;
        //return Object.assign({}, obj);
    };
    RestoreService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RestoreService);
    return RestoreService;
}());
exports.RestoreService = RestoreService;
//# sourceMappingURL=service.restore.js.map