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
 * Created by Natallia on 6/17/2016.
 */
var core_1 = require('@angular/core');
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var panel_lyphType_1 = require("./panel.lyphType");
var ng2_radio_group_1 = require("ng2-radio-group");
var component_general_1 = require('../component.general');
var repo_template_1 = require('../repos/repo.template');
var CylindricalLyphTypePanel = (function (_super) {
    __extends(CylindricalLyphTypePanel, _super);
    function CylindricalLyphTypePanel() {
        _super.apply(this, arguments);
        this.sideType = service_apinatomy2_1.SideType;
    }
    CylindricalLyphTypePanel = __decorate([
        core_1.Component({
            selector: 'cylindricalLyphType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <lyphType-panel \n      [item]=\"item\" [dependencies]=\"dependencies\" [ignore]=\"ignore\" \n            (saved)    = \"saved.emit($event)\"\n            (canceled) = \"canceled.emit($event)\"\n            (removed)  = \"removed.emit($event)\">\n        <div class=\"input-control\" *ngIf=\"includeProperty('minusSide')\">\n          <fieldset>\n            <legend>Minus side:</legend>\n            <checkbox-group [(ngModel)]=\"item.plusSide\" [required]=\"true\">\n             <input type=\"checkbox\" [value]=\"sideType.open\">{{sideType.open}}&nbsp;\n             <input type=\"checkbox\" [value]=\"sideType.closed\">{{sideType.closed}}<br/>\n            </checkbox-group>\n          </fieldset>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('plusSide')\">\n          <fieldset>\n            <legend>Plus side:</legend>\n             <checkbox-group [(ngModel)]=\"item.minusSide\" [required]=\"true\">\n               <input type=\"checkbox\" [value]=\"sideType.open\">{{sideType.open}}&nbsp;\n               <input type=\"checkbox\" [value]=\"sideType.closed\">{{sideType.closed}}<br/>\n             </checkbox-group>\n          </fieldset>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('segmentProviders')\">\n          <label for=\"segmentProviders\">Inherits segments from: </label>\n          <select-input [items]=\"item.segmentProviders\" \n          (updated)=\"updateProperty('segmentProviders', $event)\"\n          [options]=\"dependencies.cylindricalLyphs\"></select-input>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('segments')\">\n          <repo-template caption=\"Segments\" [items] = \"item.segments\" \n          (updated)=\"updateProperty('segments', $event)\"\n          [dependencies] = \"dependencies\"\n            [types]=\"[templateName.LyphTemplate]\"></repo-template>\n        </div>\n        <ng-content></ng-content>\n    </lyphType-panel>\n  ",
            directives: [panel_lyphType_1.LyphTypePanel, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES, component_general_1.MultiSelectInput, repo_template_1.RepoTemplate]
        }), 
        __metadata('design:paramtypes', [])
    ], CylindricalLyphTypePanel);
    return CylindricalLyphTypePanel;
}(panel_lyphType_1.LyphTypePanel));
exports.CylindricalLyphTypePanel = CylindricalLyphTypePanel;
//# sourceMappingURL=panel.cylindricalLyphType.js.map