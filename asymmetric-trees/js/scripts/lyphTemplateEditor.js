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
                    title: "Lyph templates",
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
                            title: "Lyph template",
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

    var lyphRepo, divLyphTemplate, selectedLyph, selectedLayer;

    var svgLyphTemplateVP = new ApiNATOMY2.VisualParameters({
         scale: {width: 200, height: 30},
          size: {width: 500, height: 500},
        margin: {x: 20, y: 20}});

    myLayout.registerComponent('LyphTemplateRepo', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
            lyphRepo.load("http://open-physiology.org:8889");
            lyphRepo.createEditors($('#lyphRepo'), onSelectLyph);
            if (lyphRepo.items) {
                selectedLyph = lyphRepo.items[0];
                syncSelectedLyph();
            }
        })
    });

    myLayout.registerComponent('LyphTemplate', function (container, componentState) {
        container.getElement().html(componentState.content);
        var dx = 20, dy = 20;
        container.on( 'open', function(){
            divLyphTemplate  = d3.select('.lyphTreemap');
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
        });
        container.on( 'resize', function(){
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
            syncSelectedLyph();
        });
    });

    myLayout.init();

    function onSelectLyph(d){
        selectedLyph = d;
        syncSelectedLyph();
    }

    function onSelectLayer(d){
        selectedLayer = d;
    }

    function syncSelectedLyph(){
        if (selectedLyph){
            selectedLyph.drawAsTreemap(divLyphTemplate, svgLyphTemplateVP, onSelectLayer);
        }
    }
})();




