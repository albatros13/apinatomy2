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
 * Created by Natallia on 6/14/2016.
 */
var core_1 = require('@angular/core');
var service_restore_1 = require("../../providers/service.restore");
var component_general_1 = require('../component.general');
var ResourceToolbar = (function () {
    function ResourceToolbar() {
        this.removed = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.saved = new core_1.EventEmitter();
    }
    ;
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourceToolbar.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourceToolbar.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourceToolbar.prototype, "saved", void 0);
    ResourceToolbar = __decorate([
        core_1.Component({
            selector: 'resource-toolbar',
            template: "\n    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Remove\" (click)=\"removed.emit()\">\n      <span class=\"glyphicon glyphicon-remove\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Save\" (click)=\"saved.emit()\">\n      <span class=\"glyphicon glyphicon-check\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Restore\" (click)=\"canceled.emit()\">\n      <span class=\"glyphicon glyphicon-refresh\"></span>\n    </button>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ResourceToolbar);
    return ResourceToolbar;
}());
exports.ResourceToolbar = ResourceToolbar;
var ResourcePanel = (function () {
    function ResourcePanel(restoreService) {
        this.restoreService = restoreService;
        this.ignore = [];
        this.saved = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
    }
    Object.defineProperty(ResourcePanel.prototype, "item", {
        get: function () {
            return this.restoreService.getItem();
        },
        set: function (item) {
            this.restoreService.setItem(item);
        },
        enumerable: true,
        configurable: true
    });
    ResourcePanel.prototype.onSaved = function () {
        this.item = this.restoreService.getItem();
        this.saved.emit(this.item);
    };
    ResourcePanel.prototype.onCanceled = function () {
        this.item = this.restoreService.restoreItem();
    };
    ResourcePanel.prototype.onRemoved = function () {
        this.removed.emit(this.item);
    };
    ResourcePanel.prototype.includeProperty = function (prop) {
        if (this.ignore && (this.ignore.indexOf(prop) > -1))
            return false;
        return true;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "removed", void 0);
    ResourcePanel = __decorate([
        core_1.Component({
            selector: 'resource-panel',
            providers: [service_restore_1.RestoreService],
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <div class=\"panel\">\n        <div class=\"panel-body\">\n          <resource-toolbar  \n            (saved)=\"onSaved()\"\n            (canceled)=\"onCanceled()\"\n            (removed)=\"onRemoved()\">\n          </resource-toolbar>\n          <div class=\"panel-content\">\n              <div class=\"input-control\" *ngIf=\"includeProperty('id')\">\n                <label for=\"id\">ID: </label>\n                <input type=\"text\" disabled [(ngModel)]=\"item.id\">\n              </div>\n              <div class=\"input-control\" *ngIf=\"includeProperty('name')\">\n                <label for=\"name\">Name: </label>\n                <input type=\"text\" required [(ngModel)]=\"item.name\">\n              </div>\n              <div class=\"input-control\" *ngIf=\"includeProperty('equivalence')\">\n                <label for=\"equivalence\">Equivalence: </label>\n                <select-input [item]=\"item.equivalence\" [options]=\"dependencies.equivalences\"></select-input>\n              </div>\n              <div class=\"input-control\" *ngIf=\"includeProperty('weakEquivalence')\">\n                <label for=\"weakEquivalence\">Weak equivalence: </label>\n                <select-input [item]=\"item.weakEquivalence\" [options]=\"dependencies.weakEquivalences\"></select-input>\n              </div>\n              <ng-content></ng-content>\n          </div>\n        </div>\n    </div>\n  ",
            directives: [ResourceToolbar, component_general_1.MultiSelectInput]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], ResourcePanel);
    return ResourcePanel;
}());
exports.ResourcePanel = ResourcePanel;
//# sourceMappingURL=panel.resource.js.map