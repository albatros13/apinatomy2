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
var component_select_1 = require('../components/component.select');
var toolbar_panelEdit_1 = require('../components/toolbar.panelEdit');
var pipe_general_1 = require("../transformations/pipe.general");
var toolbar_propertySettings_1 = require('../components/toolbar.propertySettings');
var ResourcePanel = (function () {
    function ResourcePanel() {
        this.ignore = new Set();
        this.saved = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.propertyUpdated = new core_1.EventEmitter();
        this.properties = [];
    }
    ResourcePanel.prototype.ngOnInit = function () {
        if (!this.ignore)
            this.ignore = new Set();
        this.ignore = this.ignore.add("id").add("href");
        var i = 1;
        if (this.item && this.item.constructor) {
            var properties = Object.assign({}, this.item.constructor.properties, this.item.constructor.relationshipShortcuts);
            for (var property in properties) {
                var option = { value: property, selected: false };
                if (!this.ignore.has(property)) {
                    option.selected = true;
                }
                this.properties.push(option);
            }
        }
    };
    ResourcePanel.prototype.includeProperty = function (prop, group) {
        // if (this.properties){
        //   let option = this.properties.find((x:any) => (x.value == prop));
        //   if (option && !option.selected) return false;
        // } else {
        if (this.ignore.has(prop))
            return false;
        if (group && this.ignore.has(group))
            return false;
        // }
        return true;
    };
    ResourcePanel.prototype.updateProperty = function (property, item) {
        if (this.item.constructor &&
            this.item.constructor.properties &&
            this.item.constructor.properties[property]
            && this.item.constructor.properties[property].readonly)
            return;
        this.item[property] = item;
        this.propertyUpdated.emit({ property: property, values: item });
    };
    ResourcePanel.prototype.addTemplate = function (property, Class) {
        //TODO: rewrite using client library!
        //TODO: replace with Class.new();
        this.item[property] = new Class({ name: "T: " + property + " " + this.item.name });
        if (this.dependencies) {
            if (!this.dependencies.templates)
                this.dependencies.templates = [];
            this.dependencies.templates.push(this.item[property]);
        }
    };
    ResourcePanel.prototype.removeTemplate = function (property, item) {
        //TODO: rewrite using client library!
        if (this.dependencies && this.dependencies.templates) {
            var index = this.dependencies.templates.indexOf(item);
            if (index >= 0) {
                this.dependencies.templates.splice(index, 1);
            }
        }
        this.updateProperty(property, null);
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
            inputs: ['item', 'ignore', 'dependencies', 'options'],
            template: "\n    <div class=\"panel\">\n        <div class=\"panel-body\">\n          <form-toolbar  \n            [options]  = \"options\"\n            (saved)    = \"saved.emit(item)\"\n            (canceled) = \"canceled.emit(item)\"\n            (removed)  = \"removed.emit(item)\">\n          </form-toolbar>\n          <property-toolbar  \n            [options] = \"properties\">\n          </property-toolbar>\n          \n          <div class=\"panel-content\">\n              <div class=\"input-control\" *ngIf=\"includeProperty('id')\">\n                <label for=\"id\">ID: </label>\n                <input type=\"text\" class=\"form-control\" disabled readonly [ngModel]=\"item.id\">\n              </div>\n\n              <div class=\"input-control\" *ngIf=\"includeProperty('href')\">\n                <label for=\"href\">Reference: </label>\n                <input type=\"text\" class=\"form-control\" disabled readonly [ngModel]=\"item.href\">\n              </div>\n\n              <!--Name-->\n              <div class=\"input-control\" *ngIf=\"includeProperty('name')\">\n                <label for=\"name\">Name: </label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"item.name\">\n              </div>\n              \n              <!--Externals-->\n              <div class=\"input-control\" *ngIf=\"includeProperty('externals')\">\n                <label for=\"externals\">Annotations: </label>\n                <select-input \n                [items]=\"item.externals\" \n                (updated)=\"updateProperty('externals', $event)\" \n                [options]=\"dependencies.externals | mapToCategories\"></select-input>\n              </div>\n              <ng-content></ng-content>\n          </div>\n        </div>\n    </div>\n  ",
            directives: [toolbar_panelEdit_1.FormToolbar, toolbar_propertySettings_1.PropertyToolbar, component_select_1.MultiSelectInput],
            pipes: [pipe_general_1.MapToCategories]
        }), 
        __metadata('design:paramtypes', [])
    ], ResourcePanel);
    return ResourcePanel;
}());
exports.ResourcePanel = ResourcePanel;
//# sourceMappingURL=panel.resource.js.map