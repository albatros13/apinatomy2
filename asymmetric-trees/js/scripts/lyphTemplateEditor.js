/**
 * Created by Natallia on 04/10/2015.
 */
(function() {
    var config = {
        settings: {
            hasHeaders: true,
            constrainDragToContainer: true,
            reorderEnabled: true,
            selectionEnabled: false,
            popoutWholeStack: false,
            blockedPopoutsThrowError: true,
            closePopoutsOnUnload: true,
            showPopoutIcon: false,
            showMaximiseIcon: true,
            showCloseIcon: true
        },
        content: [{
            type: 'row',
            content: [
                {
                    type: 'component',
                    componentName: 'LyphTemplateRepo',
                    showPopoutIcon: false,
                    width: 60,
                    componentState: {
                        label: 'Lyphs',
                        content: '<div id="lyphRepo" class="lyphRepo"></div>'
                    }
                },
                {
                    type: 'row',
                    content: [
                        {
                            type: 'component',
                            componentName: 'LyphTemplate',
                            showPopoutIcon: false,
                            width: 25,
                            componentState: {
                                content: '<div id="lyphTreemap" class="lyphTreemap"></div>' +
                                '<svg class="lyph" style="width: 300px; height: 300px;"></svg>',
                                label: 'LyphTemplate viewer'
                            }
                        }
                    ]
                }
            ]
        }]
    };

    var myLayout = new GoldenLayout(config);

    myLayout.registerComponent('LyphTemplateRepo', function (container, componentState) {
        container.getElement().html(componentState.content);
    });

    myLayout.registerComponent('LyphTemplate', function (container, componentState) {
        container.getElement().html(componentState.content);
    });

    myLayout.init();

    myLayout.on("initialised", function(){
        var windowSize = {width: myLayout.width * 0.4 - 20, height: myLayout.height - 20};
        initEditor(windowSize);
    });

    function initEditor (windowSize) {

        var lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
        var divLyphTemplate  = d3.select('.lyphTreemap');

        var svgLyphTemplateVP = new ApiNATOMY2.VisualParameters({
            scale: {width: 200, height: 30},
            size: windowSize,
            margin: {x: 20, y: 20}});

        var selectedLyph = null;
        var selectedLayer = null;

        var onSelectLyph = function(d){
            selectedLyph = d;
            syncSelectedLyph();
        };

        var onSelectLayer = function(d){
            selectedLayer = d;
        };

        (function(){
            lyphRepo.load("http://open-physiology.org:8889");
            lyphRepo.createEditors($('#lyphRepo'), onSelectLyph);
            if (lyphRepo.items){
                selectedLyph = lyphRepo.items[0];
                syncSelectedLyph();
            }
        })();

        function syncSelectedLyph(){
            if (selectedLyph){
                selectedLyph.drawAsTreemap(divLyphTemplate, svgLyphTemplateVP, onSelectLayer);
            }
        }
    }
})();




