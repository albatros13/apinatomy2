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
        dimensions: {
            borderWidth: 2
        },
        content: [{
            type: 'stack',
            content: [
                {
                    type: 'row',
                    title: "Lyph template editor",
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
                            type: 'component',
                            componentName: 'LyphTemplate',
                            title: "Lyph template",
                            showPopoutIcon: false,
                            width: 40,
                            componentState: {
                                content: '<div id="lyphTreemap" class="lyphTreemap"></div>' +
                                '<svg class="lyph" style="width: 300px; height: 300px;"></svg>',
                                label: 'LyphTemplate viewer'
                            }
                        }
                    ]
                },
                {
                    type: 'row',
                    title: "OntologyManager",
                    content: [
                        {
                            type: 'component',
                            componentName: 'OntologyParameters',
                            showPopoutIcon: true,
                            width: 30,
                            componentState: {
                                content: '<div id="ontologyParameters" class="ontologyParameters">' +
                                '<div>' +
                                '   <fieldset>' +
                                '       <legend>Ontologies</legend>' +
                                '       <input type="checkbox" name="ontology" value="fma" checked/>FMA' +
                                '       <input type="checkbox" name="ontology" value="cl"/>CellType' +
                                '   </fieldset>' +
                                '</div>' +
                                '<div style="padding: 4px;">' +
                                '   <button class="parameterButton" id="btnLoad" disabled>Load</button>' +
                                '</div>' +
                                '<br/><br/>' +
                                '<div class="group">' +
                                '   <label id="graphInfo" class="graphInfo"></label>' +
                                '</div>' +
                                '<h4>Input parameters:</h4>' +
                                '<div class="group">' +
                                '   <div>' +
                                '       <label for="name" class="parameterLabel">Name:</label>' +
                                '       <input type="text" id="name" size="200" style="width: 130px;"  value ="Brain"/>' +
                                '   </div>' +
                                '   <div>' +
                                '       <label for="ontid" class="parameterLabel">ID:</label>' +
                                '       <input type="text" id="ontid" size="200" style="width: 130px;"  value ="FMA_50801"/>' +
                                '   </div>' +
                                '   <div>' +
                                '       <label for="radius" class="parameterLabel">Initial radius:</label>' +
                                '       <input type="number" id="radius" size="200" style="width: 50px;" min="0" value ="2"/>' +
                                '   </div>' +
                                '   <div>' +
                                '       <label for="step" class="parameterLabel">Increment step:</label>' +
                                '       <input type="number" id="step" size="200" style="width: 50px;" min="0" value ="1"/>' +
                                '   </div>' +
                                '</div>' +
                                '<div style="padding: 4px;">' +
                                '   <button class="parameterButton" id="btnClean">Clean</button>' +
                                '   <button class="parameterButton" id="btnUpdate">Update</button>' +
                                '   <button class="parameterButton" id="btnExtend">Extend</button>' +
                                '</div>' +
                                '<br/>' +
                                '<h4>Selected node:</h4>' +
                                '<div class="group">' +
                                '   <label id="nodeInfo" class="infoLabel"></label>' +
                                '</div>' +
                                '<h4>Selected link:</h4>' +
                                '<div class="group">' +
                                '   <label id="linkInfo" class="infoLabel"></label>' +
                                '</div>' +
                                '</div>',
                                label: 'Ontology parameters'
                            }
                        },
                        {
                            type: 'component',
                            componentName: 'OntologyGraph',
                            showPopoutIcon: true,
                            width: 70,
                            componentState: {
                                content: '<svg id="ontologyGraph"></svg>',
                                label: 'Ontology graph'
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

    myLayout.registerComponent('OntologyParameters', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
           OntologyManager.initParameters();
        });
    });

    myLayout.registerComponent('OntologyGraph', function (container, componentState) {
        container.getElement().html(componentState.content);
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
        } else {
            if (divLyphTemplate) divLyphTemplate.selectAll("div").remove();
        }
    }
})();




