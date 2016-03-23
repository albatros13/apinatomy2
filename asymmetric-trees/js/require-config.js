requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        goldenlayout: 'goldenlayout/js/goldenlayout',
        select2     : 'select2/js/select2',
        'jquery-ui' : 'jquery-ui/jquery-ui',
        'metro-ui'  : 'metro-ui/js/metro-ui',

        apinatomy2    : '../scripts/apinatomy2',
        omegaFunctionEditor : '../scripts/omegaFunctionEditor'
    }
});

requirejs(['jquery', 'goldenlayout', 'd3', 'rsvp', 'apinatomy2', 'omegaFunctionEditor'],
    function   ($, gl, d3, RSVP, apinatomy2, editor) {
        var myLayout = configureEditor($, gl);
        initEditor(myLayout);
    });