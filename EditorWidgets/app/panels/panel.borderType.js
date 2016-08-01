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
var panel_measurableLocationType_1 = require("./panel.measurableLocationType");
var service_apinatomy2_1 = require("../services/service.apinatomy2");
var ng2_radio_group_1 = require("ng2-radio-group");
var BorderTypePanel = (function (_super) {
    __extends(BorderTypePanel, _super);
    function BorderTypePanel() {
        _super.apply(this, arguments);
        this.formType = service_apinatomy2_1.FormType;
    }
    BorderTypePanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.item.form)
            this.item.form = [];
    };
    BorderTypePanel = __decorate([
        core_1.Component({
            selector: 'borderType-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <measurableLocationType-panel [item] = \"item\" \n      [ignore] = \"ignore.add('supertypes').add('subtypes')\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n            \n      <!--Form-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('form')\">\n      <fieldset>\n        <legend>Form:</legend>\n         <checkbox-group [(ngModel)]=\"item.form\" [required]=\"true\">\n           <input type=\"checkbox\" value=\"open\">open&nbsp;\n           <input type=\"checkbox\" value=\"closed\">closed<br/>\n         </checkbox-group>\n      </fieldset>\n      </div>\n      \n     <ng-content></ng-content>  \n            \n    </measurableLocationType-panel>\n  ",
            directives: [panel_measurableLocationType_1.MeasurableLocationTypePanel, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], BorderTypePanel);
    return BorderTypePanel;
}(panel_measurableLocationType_1.MeasurableLocationTypePanel));
exports.BorderTypePanel = BorderTypePanel;
//# sourceMappingURL=panel.borderType.js.map