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
var panel_measurableLocation_1 = require("./panel.measurableLocation");
var ng2_radio_group_1 = require("ng2-radio-group");
var BorderPanel = (function (_super) {
    __extends(BorderPanel, _super);
    function BorderPanel() {
        _super.apply(this, arguments);
    }
    BorderPanel.prototype.onSelectChange = function (value) {
        this.propertyUpdated.emit({ property: 'nature', values: value });
    };
    BorderPanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.ignore = this.ignore
            .add('externals').add('measurables')
            .add('name').add('cardinalityBase').add('cardinalityMultipliers').add('type');
    };
    BorderPanel = __decorate([
        core_1.Component({
            selector: 'border-panel',
            inputs: ['item', 'ignore', 'options'],
            template: "\n    <measurableLocation-panel [item] = \"item\" \n      [ignore] = \"ignore\"\n      [options]  = \"options\"\n      (saved)    = \"saved.emit($event)\"\n      (canceled) = \"canceled.emit($event)\"\n      (removed)  = \"removed.emit($event)\"\n      (propertyUpdated) = \"propertyUpdated.emit($event)\">\n            \n      <!--Nature-->\n      <div class=\"input-control\" *ngIf=\"includeProperty('nature')\">\n        <fieldset>\n          <legend>{{getPropertyLabel('nature')}}:</legend>\n           <checkbox-group [(ngModel)]=\"item.nature\" (ngModelChange)=\"onSelectChange(item.nature)\">\n             <input type=\"checkbox\" value=\"open\">open&nbsp;\n             <input type=\"checkbox\" value=\"closed\">closed<br/>\n           </checkbox-group>\n        </fieldset>\n      </div>\n      \n     <ng-content></ng-content>  \n            \n    </measurableLocation-panel>\n  ",
            directives: [panel_measurableLocation_1.MeasurableLocationPanel, ng2_radio_group_1.RADIO_GROUP_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], BorderPanel);
    return BorderPanel;
}(panel_measurableLocation_1.MeasurableLocationPanel));
exports.BorderPanel = BorderPanel;
//# sourceMappingURL=panel.border.js.map