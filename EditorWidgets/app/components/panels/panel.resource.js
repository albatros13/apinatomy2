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
var component_general_1 = require('../component.general');
var ResourcePanel = (function () {
    function ResourcePanel() {
        this.ignore = [];
        this.saved = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.propertyUpdated = new core_1.EventEmitter();
    }
    ResourcePanel.prototype.includeProperty = function (prop) {
        if (this.ignore && (this.ignore.indexOf(prop) > -1))
            return false;
        return true;
    };
    ResourcePanel.prototype.updateProperty = function (property, selectedItems) {
        this.item[property] = selectedItems;
        this.propertyUpdated.emit({ property: property, values: selectedItems });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "canceled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "propertyUpdated", void 0);
    ResourcePanel = __decorate([
        core_1.Component({
            selector: 'resource-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <div class=\"panel\">\n        <div class=\"panel-body\">\n          <form-toolbar  \n            (saved)    = \"saved.emit(item)\"\n            (canceled) = \"canceled.emit(item)\"\n            (removed)  = \"removed.emit(item)\">\n          </form-toolbar>\n          <div class=\"panel-content\">\n              <!--<div class=\"input-control\" *ngIf=\"includeProperty('id')\">-->\n                <!--<label for=\"id\">ID: </label>-->\n                <!--<input type=\"text\" disabled [(ngModel)]=\"item.id\">-->\n              <!--</div>-->\n              \n              <!--Name-->\n              <div class=\"input-control\" *ngIf=\"includeProperty('name')\">\n                <label for=\"name\">Name: </label>\n                <input type=\"text\" [(ngModel)]=\"item.name\">\n              </div>\n              \n              <!--Externals-->\n              <div class=\"input-control\" *ngIf=\"includeProperty('externals')\">\n                <label for=\"externals\">Annotations: </label>\n                <select-input \n                [items]=\"item.externals\" \n                (updated)=\"updateProperty('externals', $event)\" \n                [options]=\"dependencies.externals\"></select-input>\n              </div>\n              <ng-content></ng-content>\n          </div>\n        </div>\n    </div>\n  ",
            directives: [component_general_1.FormToolbar, component_general_1.MultiSelectInput]
        }), 
        __metadata('design:paramtypes', [])
    ], ResourcePanel);
    return ResourcePanel;
}());
exports.ResourcePanel = ResourcePanel;
//# sourceMappingURL=panel.resource.js.map