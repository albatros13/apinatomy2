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
                                content: '<div id="lyphRepo"></div>'
                            }
                        },
                        {
                            type: 'stack',
                            content: [
                                {
                                    type: 'component',
                                    componentName: 'LyphTemplate',
                                    title: "Lyph template",
                                    showPopoutIcon: false,
                                    width: 40,
                                    componentState: {
                                        content: '<div id="lyphTreemap"></div>',
                                        label: 'LyphTemplate viewer'
                                    }
                                },
                                {
                                    type: 'component',
                                    componentName: 'LyphHierarchy',
                                    title: "Lyph template hierarchy",
                                    showPopoutIcon: false,
                                    width: 40,
                                    componentState: {
                                        content: '<svg id="lyphHierarchy"></svg>',
                                        label: 'LyphTemplate hierarchy'
                                    }
                                },
                                {
                                    type: 'component',
                                    componentName: 'LyphPartonomy',
                                    title: "Lyph template partonomy",
                                    showPopoutIcon: false,
                                    width: 40,
                                    componentState: {
                                        content: '<svg id="lyphPartonomy"></svg>',
                                        label: 'LyphTemplate partonomy'
                                    }
                                }

                            ]
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
                                '       <legend>Ontologies:</legend>' +
                                '       <input type="checkbox" name="ontology" value="fma" checked>FMA </input>' +
                                '       <input type="checkbox" name="ontology" value="cl">CellType </input>' +
                                '       <input type="checkbox" name="ontology" value="brain"/>Brain FMA</input>' +
                                '   </fieldset>' +
                                '</div>' +
                                '<div style="padding: 4px;">' +
                                '   <button id="btnLoad" class="image-button small-button icon-right parameterButton">' +
                                '   Load <span class="icon mif-download"></span>' +
                                '</div>' +
                                '</br></br>' +
                                '<div class="group">' +
                                '   <label id="graphInfo"></label>' +
                                '   <fieldset id="linkTypes">' +
                                '       <legend>Link types</legend>' +
                                '   </fieldset>' +
                                '</div>' +
                                '<div>' +
                                '   <fieldset>' +
                                '   <legend>Input parameters:</legend>' +
                                '   <div>' +
                                '       <label for="name" class="parameterLabel">Name:</label>' +
                                '       <input type="text" id="ontname" size="200" style="width: 130px;"  value ="Brain"/>' +
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
                                '   </fieldset>' +
                                '</div>' +
                                '<div style="padding: 4px;">' +
                                '   <button class="image-button small-button icon-right parameterButton" id="btnClean">Clear <img src="images/removeAll.png" class="icon"></span> </button>' +
                                '   <button class="image-button small-button icon-right parameterButton" id="btnUpdate">Update <span class="icon mif-redo"></button>' +
                                '   <button class="image-button small-button icon-right parameterButton" id="btnExtend">Extend  <span class="icon mif-enlarge"></button>' +
                                '</div>' +
                                '<br/><br/>' +
                                '<div>' +
                                '   <fieldset>' +
                                '       <legend>Selected node:</legend>' +
                                '       <label id="nodeInfo" class="infoLabel"></label>' +
                                '   </fieldset>' +
                                '</div>' +
                                '<div style="padding: 4px;">' +
                                '   <button id="btnAddLyph" class="image-button small-button icon-right parameterButton">' +
                                '       Add <img src="images/add.png" class="icon"/>' +
                                '</div>' +
                                '<br/><br/>' +
                                '<div>' +
                                '   <fieldset>' +
                                '       <legend>Selected lyph template:</legend>' +
                                '       <label id="lyphInfo" class="infoLabel"></label>' +
                                '   </fieldset>' +
                                '</div>' +
                                '<div style="padding: 4px;">' +
                                '   <button id="btnRemoveLyph" class="image-button small-button icon-right parameterButton" disabled>' +
                                '       Remove <img src="images/remove.png" class="icon"/>' +
                                '   <button id="btnShowLyph" class="image-button small-button icon-right parameterButton" disabled>' +
                                '       Show <img src="images/lyph.png" class="icon"/>' +
                                '</div>' +
                                '<br/><br/>' +
                                '<div>' +
                                '   <fieldset>' +
                                '       <legend>Selected link:</legend>' +
                                '       <label id="linkInfo" class="infoLabel"></label>' +
                                '   </fieldset>' +
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

    var lyphRepo, divLyphTemplate, selectedLyph, selectedLayer,
        svgLyphHierarchy, svgLyphPartonomy;

    var dx = 20, dy = 20;

    var svgLyphTemplateVP = {
         scale: {width: 200, height: 30},
          size: {width: 500, height: 500},
        margin: {x: dx, y: dy}};

    var lyphHierarchyVP = {
        size: {width: 500, height: 500},
        margin: {x: dx, y: dy}};

    var lyphPartonomyVP = {
        size: {width: 500, height: 500},
        margin: {x: dx, y: dy}};

    myLayout.registerComponent('LyphTemplateRepo', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
            lyphRepo.load("http://open-physiology.org:8889");
            lyphRepo.createEditors($('#lyphRepo'), onSelectLyph);
            lyphRepo.showOntology = onShowOntology;
            if (lyphRepo.items) {
                selectedLyph = lyphRepo.items[0];
                syncSelectedLyph();
            }
            OntologyManager.graph.lyphRepo = lyphRepo;
        })
    });

    myLayout.registerComponent('LyphTemplate', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function(){
            divLyphTemplate  = d3.select('#lyphTreemap');
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
        });
        container.on( 'resize', function(){
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
            syncSelectedLyph();
        });
    });

    myLayout.registerComponent('LyphHierarchy', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function(){
            lyphHierarchyVP.size = {width: container.width - dx, height: container.height - dy};
            svgLyphHierarchy  = d3.select('#lyphHierarchy');
            syncSelectedLyphHierarchy();
        });
        container.on( 'resize', function(){
            lyphHierarchyVP.size = {width: container.width - dx, height: container.height - dy};
            svgLyphHierarchy  = d3.select('#lyphHierarchy');
            syncSelectedLyphHierarchy();
        });
    });

    myLayout.registerComponent('LyphPartonomy', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function(){
            lyphPartonomyVP.size = {width: container.width - dx, height: container.height - dy};
            svgLyphPartonomy  = d3.select('#lyphPartonomy');
            syncSelectedLyphPartonomy();
        });
        container.on( 'resize', function(){
            lyphPartonomyVP.size = {width: container.width - dx, height: container.height - dy};
            svgLyphPartonomy  = d3.select('#lyphPartonomy');
            syncSelectedLyphPartonomy();
        });
    });


    myLayout.registerComponent('OntologyParameters', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            OntologyManager.init();
            OntologyManager.graph.showLyph = onShowLyph;
        });
    });

    myLayout.registerComponent('OntologyGraph', function (container, componentState) {
        container.getElement().html(componentState.content);
        container.on( 'resize', function(){
            if (OntologyManager.graph){
                OntologyManager.graph.vp.size = {width: container.width - dx, height: container.height - dy};
                OntologyManager.graph.update();
            }
        });
    });

    myLayout.init();

    function onShowOntology(ontologyID, name){
        if (ontologyID && name){
            OntologyManager.showTerm(ontologyID, name);
            var windowStack = myLayout.root.contentItems[0];
            var ontologyManager = windowStack.contentItems[1];
            windowStack.header.setActiveContentItem(ontologyManager);
        }
    }

    function onShowLyph(lyph){
        if (lyphRepo && lyph){
            lyph.open();
            var windowStack = myLayout.root.contentItems[0];
            var lyphManager = windowStack.contentItems[0];
            windowStack.header.setActiveContentItem(lyphManager);
        }
    }

    function onSelectLyph(d){
        selectedLyph = d;
        syncSelectedLyph();
        syncSelectedLyphHierarchy();
        syncSelectedLyphPartonomy();
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

    function syncSelectedLyphHierarchy(){
        if (selectedLyph){
            selectedLyph.drawHierarchy(svgLyphHierarchy, lyphHierarchyVP, null);
        } else {
            if (svgLyphHierarchy ) svgLyphHierarchy .selectAll("g").remove();
        }
    }

    function syncSelectedLyphPartonomy(){
        if (selectedLyph){
            selectedLyph.drawPartonomy(svgLyphPartonomy, lyphPartonomyVP, null);
        } else {
            if (svgLyphPartonomy) svgLyphPartonomy.selectAll("g").remove();
        }
    }

})();




