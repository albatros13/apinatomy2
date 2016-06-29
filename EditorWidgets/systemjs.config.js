/**
 * System configuration for Angular 2 apps
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',

    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ng2-select':                 'node_modules/ng2-select',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap',
    'ng2-nvd3':                   'node_modules/ng2-nvd3',
    'ng2-dnd':                    'node_modules/ng2-dnd',
    'ng2-radio-group':            'node_modules/ng2-radio-group',
    'ng2-slider':                 'node_modules/ng2-slider-component'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-select':                 { defaultExtension: 'js' },
    'ng2-bootstrap':              { defaultExtension: 'js' },
    'ng2-nvd3':                   { defaultExtension: 'js' },
    'ng2-dnd':                    { defaultExtension:  'js'},
    'ng2-radio-group':            { main: 'index.js', defaultExtension: 'js'},
    'ng2-slider':                 { main: 'ng2-slider.component.min.js', defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  }

  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})();
