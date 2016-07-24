"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var editor_resources_1 = require('./editors/editor.resources');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var service_apinatomy2_1 = require('./services/service.apinatomy2');
platform_browser_dynamic_1.bootstrap(editor_resources_1.ResourceEditor, [ng2_dnd_1.DND_PROVIDERS,
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
//# sourceMappingURL=main.resources.js.map