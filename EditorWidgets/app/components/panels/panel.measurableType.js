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
var panel_type_1 = require("./panel.type");
var MeasurableTypePanel = (function (_super) {
    __extends(MeasurableTypePanel, _super);
    function MeasurableTypePanel() {
        _super.apply(this, arguments);
    }
    MeasurableTypePanel = __decorate([
        core_1.Component({
            selector: 'measurableType-panel',
            inputs: ['item', 'ignore', 'dependencies'],
            template: "\n    <type-panel [item]=\"item\" [dependencies]=\"dependencies\" \n      [ignore]=\"['externals']\"  \n            (saved)    = \"saved.emit($event)\"\n            (canceled) = \"canceled.emit($event)\"\n            (removed)  = \"removed.emit($event)\">\n      <div class=\"input-control\">\n       <label for=\"quality\">Quality: </label>\n       <input type=\"text\" required [(ngModel)]=\"item.quality\">\n      </div>\n      <div class=\"input-control\" *ngIf=\"includeProperty('materials')\">\n        <label for=\"materials\">Materials: </label>\n        <select-input [items]=\"item.materials\" \n        (updated)=\"updateProperty('materials', $event)\"     \n        [options]=\"dependencies.materials\"></select-input>\n      </div>   \n      <ng-content></ng-content>      \n    </type-panel>\n  ",
            directives: [panel_type_1.TypePanel]
        }), 
        __metadata('design:paramtypes', [])
    ], MeasurableTypePanel);
    return MeasurableTypePanel;
}(panel_type_1.TypePanel));
exports.MeasurableTypePanel = MeasurableTypePanel;
//# sourceMappingURL=panel.measurableType.js.map