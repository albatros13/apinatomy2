"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var editor_resourcesAndTemplates_1 = require('./editors/editor.resourcesAndTemplates');
var service_apinatomy2_1 = require('./services/service.apinatomy2');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
platform_browser_dynamic_1.bootstrap(editor_resourcesAndTemplates_1.ResourceAndTemplateEditor, [ng2_dnd_1.DND_PROVIDERS,
    service_apinatomy2_1.ExternalResourceProvider,
    service_apinatomy2_1.MeasurableTypeProvider,
    service_apinatomy2_1.ProcessTypeProvider,
    service_apinatomy2_1.BorderTypeProvider,
    service_apinatomy2_1.TypeProvider,
    service_apinatomy2_1.MaterialTypeProvider,
    service_apinatomy2_1.LyphTypeProvider,
    service_apinatomy2_1.CylindricalLyphTypeProvider,
    service_apinatomy2_1.GroupTypeProvider,
    service_apinatomy2_1.OmegaTreeTypeProvider
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.resourcesAndTemplates.js.map