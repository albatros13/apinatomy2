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
 * Created by Natallia on 6/18/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var repo_wrapper_1 = require('./repo.wrapper');
var component_general_1 = require('../component.general');
var service_apinatomy2_1 = require("../../providers/service.apinatomy2");
var panel_resource_1 = require('../panels/panel.resource');
var panel_type_1 = require('../panels/panel.type');
var panel_materialType_1 = require('../panels/panel.materialType');
var panel_lyphType_1 = require('../panels/panel.lyphType');
var panel_cylindricalLyphType_1 = require('../panels/panel.cylindricalLyphType');
var panel_groupType_1 = require('../panels/panel.groupType');
var panel_omegaTreeType_1 = require('../panels/panel.omegaTreeType');
var panel_measurableType_1 = require('../panels/panel.measurableType');
var panel_publication_1 = require('../panels/panel.publication');
var panel_correlation_1 = require('../panels/panel.correlation');
var panel_clinicalIndex_1 = require('../panels/panel.clinicalIndex');
var RepoGeneral = (function (_super) {
    __extends(RepoGeneral, _super);
    function RepoGeneral() {
        _super.apply(this, arguments);
        this.className = service_apinatomy2_1.ResourceName;
        this.itemTypes = new Set(service_apinatomy2_1.ResourceName.Resource);
    }
    RepoGeneral.prototype.ngOnInit = function () {
        this.itemTypes = new Set(this.items.map(function (item) { return item.class; }));
    };
    RepoGeneral.prototype.getZones = function () {
        return Array.from(this.itemTypes).map(function (x) { return x + "_zone"; });
    };
    RepoGeneral.prototype.getIcon = function (item) {
        switch (item.class) {
            case this.className.Type: return "images/type.png";
            case this.className.MaterialType: return "images/materialType.png";
            case this.className.LyphType: return "images/lyphType.png";
            case this.className.CylindricalLyphType: return "images/cylindricalLyphType.png";
            case this.className.MeasurableType: return "images/measurableType.png";
            case this.className.GroupType: return "images/groupType.png";
            case this.className.OmegaTreeType: return "images/omegaTreeType.png";
            case this.className.Publication: return "images/publication.png";
            case this.className.Correlation: return "images/correlation.png";
            case this.className.ClinicalIndex: return "images/clinicalIndex.png";
        }
        return "images/resource.png";
    };
    RepoGeneral = __decorate([
        core_1.Component({
            selector: 'repo-general',
            inputs: ['items', 'caption', 'dependencies'],
            template: "\n       <repo-wrapper [items]=\"items\" caption=\"{{caption}}\">\n        <accordion class=\"list-group\" [closeOthers]=\"true\" \n          dnd-sortable-container [dropZones]=\"getZones()\" [sortableData]=\"items\">\n          <accordion-group *ngFor=\"let item of items; let i = index\" class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\n              <div accordion-heading><item-header [item]=\"item\" [icon]=\"getIcon(item)\"></item-header></div>\n              <resource-panel *ngIf=\"!item.class || (item.class == className.Resource)\"\n               [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></resource-panel>\n              <type-panel *ngIf=\"item.class == className.Type\"\n               [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></type-panel>\n              <materialType-panel *ngIf=\"item.class==className.MaterialType\"\n               [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></materialType-panel>\n              <lyphType-panel *ngIf=\"item.class==className.LyphType\"\n               [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></lyphType-panel>\n              <cylindricalLyphType-panel *ngIf=\"item.class==className.CylindricalLyphType\"\n               [item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></cylindricalLyphType-panel>\n              \n              <!--<measurableType-panel *ngIf=\"item.class==className.MeasurableType\"-->\n               <!--[item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></measurableType-panel>-->\n              <!---->\n              <!--<groupType-panel *ngIf=\"item.class==className.GroupType\"-->\n               <!--[item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></groupType-panel>-->\n              <!--<omegaTreeType-panel *ngIf=\"item.class==className.OmegaTreeType\"-->\n               <!--[item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></omegaTreeType-panel>-->\n\n               <!--<publication-panel *ngIf=\"item.class==className.Publication\"-->\n               <!--[item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></publication-panel>-->\n               <!--<correlation-panel *ngIf=\"item.class==className.Correlation\"-->\n               <!--[item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></correlation-panel>-->\n               <!--<clinicalIndex-panel *ngIf=\"item.class==className.ClinicalIndex\"-->\n               <!--[item]=\"item\" [dependencies]=\"dependencies\" (saved)=\"onSaved(item, $event)\" (removed)=\"onRemoved(item, items)\"></clinicalIndex-panel>-->\n          </accordion-group>        \n        </accordion>       \n      </repo-wrapper>\n  ",
            directives: [repo_wrapper_1.RepoWrapper, component_general_1.ItemHeader,
                panel_resource_1.ResourcePanel, panel_type_1.TypePanel, panel_materialType_1.MaterialTypePanel, panel_lyphType_1.LyphTypePanel, panel_cylindricalLyphType_1.CylindricalLyphTypePanel,
                panel_groupType_1.GroupTypePanel, panel_omegaTreeType_1.OmegaTreeTypePanel,
                panel_measurableType_1.MeasurableTypePanel,
                panel_publication_1.PublicationPanel, panel_correlation_1.CorrelationPanel, panel_clinicalIndex_1.ClinicalIndexPanel,
                accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RepoGeneral);
    return RepoGeneral;
}(repo_wrapper_1.RepoWrapper));
exports.RepoGeneral = RepoGeneral;
//# sourceMappingURL=repo.general.js.map