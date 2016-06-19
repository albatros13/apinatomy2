"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
 * Created by Natallia on 6/19/2016.
 */
var core_1 = require('@angular/core');
var service_restore_1 = require("../providers/service.restore");
var panel_resource_1 = require("./panel.resource");
var component_general_1 = require('./component.general');
var PublicationPanel = (function (_super) {
    __extends(PublicationPanel, _super);
    function PublicationPanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
    }
    PublicationPanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'publication-panel',
            inputs: ['item', 'ignore'],
            template: "\n    <resource-panel [item]=\"item\" [ignore]=\"['equivalence', 'weakEquivalence']\" (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n      <inputs>\n        <ng-content select=\"inputs\"></ng-content>      \n      </inputs>\n    </resource-panel>\n  ",
            directives: [panel_resource_1.ResourcePanel, component_general_1.SelectInput]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], PublicationPanel);
    return PublicationPanel;
}(panel_resource_1.ResourcePanel));
exports.PublicationPanel = PublicationPanel;
//# sourceMappingURL=panel.publication.js.map