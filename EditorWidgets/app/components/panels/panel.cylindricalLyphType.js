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
var service_restore_1 = require("../../providers/service.restore");
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var panel_lyphType_1 = require("./panel.lyphType");
var ng2_radio_group_1 = require("ng2-radio-group");
var CylindricalLyphTypePanel = (function (_super) {
    __extends(CylindricalLyphTypePanel, _super);
    function CylindricalLyphTypePanel(restoreService) {
        _super.call(this, restoreService);
        this.restoreService = restoreService;
        this.sideType = service_apinatomy2_1.SideType;
    }
    CylindricalLyphTypePanel.prototype.ngOnInit = function () {
        if (!this.item.plusSide)
            this.item.plusSide = this.sideType.closed;
        if (!this.item.minusSide)
            this.item.minusSide = this.sideType.closed;
    };
    CylindricalLyphTypePanel = __decorate([
        core_1.Component({
            providers: [service_restore_1.RestoreService],
            selector: 'cylindricalLyphType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <lyphType-panel \n      [item]=\"item\" [dependencies]=\"dependencies\" \n      (saved)=\"saved.emit($event)\" (removed)=\"removed.emit($event)\">\n        <div class=\"input-control\" *ngIf=\"includeProperty('minusSide')\">\n          <label for=\"minusSide\">Minus side: </label>\n           <radio-group [(ngModel)]=\"item.plusSide\" [required]=\"true\">\n             <input type=\"radio\" [value]=\"sideType.open\">{{sideType.open}}&nbsp\n             <input type=\"radio\" [value]=\"sideType.closed\">{{sideType.closed}}<br/>\n           </radio-group>\n        </div>\n        <div class=\"input-control\" *ngIf=\"includeProperty('plusSide')\">\n          <label for=\"plusSide\">Plus side: </label>\n          <radio-group [(ngModel)]=\"item.minusSide\" [required]=\"true\">\n             <input type=\"radio\" [value]=\"sideType.open\">{{sideType.open}}&nbsp\n             <input type=\"radio\" [value]=\"sideType.closed\">{{sideType.closed}}<br/>\n           </radio-group>\n        </div>\n        <ng-content></ng-content>\n    </lyphType-panel>\n  ",
            directives: [panel_lyphType_1.LyphTypePanel, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [service_restore_1.RestoreService])
    ], CylindricalLyphTypePanel);
    return CylindricalLyphTypePanel;
}(panel_lyphType_1.LyphTypePanel));
exports.CylindricalLyphTypePanel = CylindricalLyphTypePanel;
//# sourceMappingURL=panel.cylindricalLyphType.js.map