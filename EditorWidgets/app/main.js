"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var editor_lyphType_1 = require('./editors/editor.lyphType');
var service_apinatomy2_1 = require('./providers/service.apinatomy2');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
platform_browser_dynamic_1.bootstrap(editor_lyphType_1.LyphTypeEditor, [service_apinatomy2_1.LyphTypeProvider, service_apinatomy2_1.PublicationProvider, ng2_dnd_1.DND_PROVIDERS])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map