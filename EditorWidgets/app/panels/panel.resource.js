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
var utils_model_1 = require("../services/utils.model");
var utils_model_2 = require("../services/utils.model");
var ResourcePanel = (function () {
    function ResourcePanel() {
        this.ignore = new Set();
        this.saved = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.propertyUpdated = new core_1.EventEmitter();
        this.ExternalResource = utils_model_1.model.ExternalResource;
        this.properties = [];
    }
    ResourcePanel.prototype.getPropertyLabel = function (option) {
        if (this.item)
            if ((this.item.class == utils_model_1.TemplateName.CylindricalLyphTemplate) ||
                (this.item.class == utils_model_1.TemplateName.OmegaTreeTemplate)) {
                if (option == "cardinalityBase")
                    return "Branching factor";
            }
        return utils_model_2.getPropertyLabel(option);
    };
    ResourcePanel.prototype.ngOnInit = function () {
        if (!this.ignore)
            this.ignore = new Set();
        this.ignore = this.ignore.add("id").add("href");
        this.setPropertySettings();
    };
    ResourcePanel.prototype.setPropertySettings = function () {
        var privateProperties = new Set(["class", "themes"]);
        if (this.item && this.item.constructor) {
            var properties = Object.assign({}, this.item.constructor.properties, this.item.constructor.relationshipShortcuts);
            for (var property in properties) {
                //Unsupported fields
                if (privateProperties.has(property))
                    continue;
                //Groups
                if (property.indexOf("Border") > -1) {
                    if (!this.properties.find(function (x) { return (x.value == "borders"); }))
                        this.properties.push({ value: "borders", selected: !this.ignore.has("borders") });
                    continue;
                }
                this.properties.push({ value: property, selected: !this.ignore.has(property) });
            }
        }
    };
    ResourcePanel.prototype.selectionChanged = function (option) {
        if (this.ignore.has(option.value) && option.selected)
            this.ignore.delete(option.value);
        if (!this.ignore.has(option.value) && !option.selected)
            this.ignore.add(option.value);
    };
    ResourcePanel.prototype.includeProperty = function (prop) {
        return !this.ignore.has(prop);
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
        this.item[property] = utils_model_1.model[Class].new({ name: "T: " + property + " " + this.item.name });
    };
    ResourcePanel.prototype.removeTemplate = function (property, item) {
        item.delete();
        this.updateProperty(property, null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResourcePanel.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Set)
    ], ResourcePanel.prototype, "ignore", void 0);
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
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <div class=\"panel\">\n        <div class=\"panel-body\">\n          <form-toolbar  \n            [options]  = \"options\"\n            (saved)    = \"saved.emit(item)\"\n            (canceled) = \"canceled.emit(item)\"\n            (removed)  = \"removed.emit(item)\">\n          </form-toolbar>\n          <property-toolbar  \n            [options] = \"properties\"\n            [transform] = \"getPropertyLabel\"\n            (selectionChanged) = \"selectionChanged($event)\">\n          </property-toolbar>\n          \n          <div class=\"panel-content\">\n              <div class=\"input-control\" *ngIf=\"includeProperty('id')\">\n                <label for=\"id\">{{getPropertyLabel('id')}}: </label>\n                <input type=\"text\" class=\"form-control\" disabled readonly [ngModel]=\"item.id\">\n              </div>\n\n              <div class=\"input-control\" *ngIf=\"includeProperty('href')\">\n                <label for=\"href\">{{getPropertyLabel('href')}}: </label>\n                <input type=\"text\" class=\"form-control\" disabled readonly [ngModel]=\"item.href\">\n              </div>\n\n              <!--Name-->\n              <div class=\"input-control\" *ngIf=\"includeProperty('name')\">\n                <label for=\"name\">{{getPropertyLabel('name')}}: </label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"item.name\">\n              </div>\n              \n              <!--Externals-->\n              <div class=\"input-control\" *ngIf=\"includeProperty('externals')\">\n                <label for=\"externals\">{{getPropertyLabel('externals')}}: </label>\n                <select-input \n                [items]=\"item.p('externals') | async\" \n                (updated)=\"updateProperty('externals', $event)\" \n                [options]=\"ExternalResource.p('all') | async\"></select-input>\n              </div>\n              \n              <ng-content></ng-content>\n              \n          </div>\n        </div>\n    </div>\n  ",
            directives: [toolbar_panelEdit_1.FormToolbar, toolbar_propertySettings_1.PropertyToolbar, component_select_1.MultiSelectInput],
            pipes: [pipe_general_1.MapToCategories]
        }), 
        __metadata('design:paramtypes', [])
    ], ResourcePanel);
    return ResourcePanel;
}());
exports.ResourcePanel = ResourcePanel;
//# sourceMappingURL=panel.resource.js.map