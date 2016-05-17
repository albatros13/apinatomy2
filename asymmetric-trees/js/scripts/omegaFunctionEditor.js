/**
 * Created by Natallia on 04/10/2015.
 */

(function (){

    var config = {
        settings:{
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
            type: 'row', //'column',
            content:[
                {
                    type: 'component',
                    componentName: 'CanonicalTreeRepo',
                    title: "Canonical trees",
                    width: 60,
                    showPopoutIcon: false,
                    componentState: {
                        label: 'Trees',
                        content:
                            '<div id="treeRepo"></div>'
                    }
                },
                {
                    type: 'row',
                    content: [
                        {
                            type: 'column',
                            content: [
                                {
                                    type: 'stack',
                                    content: [
                                        {
                                            type: 'component',
                                            componentName: 'Tree',
                                            height: 50,
                                            componentState: {
                                                label: 'Tree definition',
                                                content: '<div id="treeDefinition"><svg id = "tree"></svg></div>'
                                            }
                                        },
                                        {
                                            type: 'component',
                                            componentName: 'Parameters',
                                            height: 50,
                                            componentState: {
                                                label: 'Tree statistics',
                                                content: '<div id="treePlots"><svg id = "plots"></svg></div>'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'stack',
                                    content: [
                                        {
                                            type: 'component',
                                            componentName: 'TreeSample',
                                            title: "Tree sample",
                                            componentState: {
                                                label: 'Tree sample',
                                                content: '<svg id="treeSample"></svg>'
                                            }
                                        },
                                        {
                                            type: 'component',
                                            componentName: 'LyphTemplate',
                                            title: "Lyph template",
                                            showPopoutIcon: false,
                                            width: 25,
                                            componentState: {
                                                label: 'LyphTemplate viewer',
                                                content: '<div id="lyphTreemap"></div>'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
    };

    var myLayout = new GoldenLayout( config );

    var lyphRepo, treeRepo;
    var selectedTree, selectedLyph, selectedTreeLevel;
    var svgTree, svgTreePlots, divLyphTemplate, svgSampleTree;

    var treeVP = {
        scale: {width: 20, height: 20},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 40}};

    var treePlotsVP = {
        scale: {width: 20, height: 20},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 60}};

    var svgLyphTemplateVP = {
        scale: {width: 200, height: 30},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 20}};

    var svgTreeSampleVP = {
        scale: {width: 20, height: 30},
        size: {width: 500, height: 300},
        margin: {x: 20, y: 20}};

    var dx = 20, dy = 20, minWidth = 300, minHeight = 300;

    myLayout.registerComponent( 'CanonicalTreeRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
            treeRepo = new ApiNATOMY2.CanonicalTreeRepo([], lyphRepo);
            lyphRepo.load("http://open-physiology.org:8889")
                .then(function(){
                    return treeRepo.load("http://open-physiology.org:8889");
                });
            treeRepo.createEditors($('#treeRepo'), onSelectTree);
            if (treeRepo.items){
                selectedTree = treeRepo.items[0];
                syncSelectedTree(true);
            }
        })
    });

    myLayout.registerComponent( 'Tree', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            treeVP.size = {width: container.width - dx, height: container.height - dy};
            svgTree = d3.select('#treeDefinition');
            if (selectedTree)
                selectedTree.draw(svgTree, treeVP, onSelectTreeLevel);
        });
        container.on( 'resize', function(){
            if (container.width < minWidth || container.height < minHeight) return;
            treeVP.size = {width: container.width - dx, height: container.height - dy};
            if (selectedTree)
                selectedTree.draw(svgTree, treeVP, onSelectTreeLevel);
        });
    });

    myLayout.registerComponent( 'Parameters', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            treePlotsVP.size = {width: container.width - dx, height: container.height - dy};
            svgTreePlots = d3.select('#treePlots');
            if (selectedTree){
                selectedTree.drawPlots(svgTreePlots, treePlotsVP, null);
            }
        });
    });

    myLayout.registerComponent( 'TreeSample', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            svgTreeSampleVP.size = {width: container.width - dx, height: container.height - dy};
            svgSampleTree = d3.select('#treeSample');
            if (selectedTree) {
                var treeSample = selectedTree.getSample();
                if (treeSample)
                    treeSample.draw(svgSampleTree, svgTreeSampleVP, null);
            }
        });
        container.on( 'resize', function(){
            if (container.width < minWidth || container.height < minHeight) return;
            svgTreeSampleVP.size = {width: container.width - dx, height: container.height - dy};
            svgSampleTree = d3.select('#treeSample');
            if (selectedTree) {
                var treeSample = selectedTree.getSample();
                if (treeSample)
                    treeSample.draw(svgSampleTree, svgTreeSampleVP, null);
            }
        });
    });

    myLayout.registerComponent( 'LyphTemplate', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            divLyphTemplate = d3.select('#lyphTreemap');
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
        });
        container.on( 'resize', function(){
            if (container.width < minWidth || container.height < minHeight) return;
            svgLyphTemplateVP.size = {width: container.width - dx, height: container.height - dy};
            syncSelectedLyph();
        });
    });

    myLayout.init();

    function onSelectTree(d){
        selectedTree = d;
        syncSelectedTree(true);
    }

    function onSelectTreeLevel(d){
        if (!d) return;
        if (d.layerRepo){
            if (selectedLyph != d){
                selectedLyph = d;
                syncSelectedLyph();
            }
        } else {
            //node selected
            if (selectedTreeLevel != d){
                if (selectedTreeLevel && selectedTreeLevel.isActive()){
                    selectedTreeLevel.header.removeClass("active");
                    if (selectedTreeLevel.editor) selectedTreeLevel.editor.hide();
                }
                if (d.header) {
                    d.header.addClass("active");
                    if (!d.editor)
                        d.createEditor(d.header);
                    else
                        d.editor.show();
                }
                selectedTreeLevel = d;
            }
        }
    }


    function syncSelectedLyph(){
        if (selectedLyph){
            selectedLyph.drawAsTreemap(divLyphTemplate, svgLyphTemplateVP, null);
        } else {
            if (divLyphTemplate) divLyphTemplate.selectAll("div").remove();
        }
    }

    function syncSelectedTree(isGenerateSample){
        if (selectedTree){
            selectedTree.draw(svgTree, treeVP, onSelectTreeLevel);
            selectedTree.drawPlots(svgTreePlots, treePlotsVP, null);
            var treeSample;
            if (isGenerateSample)
                treeSample = selectedTree.generate();
            else
                treeSample = selectedTree.getSample();
            if (treeSample){
                treeSample.draw(svgSampleTree, svgTreeSampleVP, null);
            } else {
                if (svgSampleTree) svgSampleTree.selectAll("g").remove();
            }
        } else {
            if (svgTree){
                svgTree.select(".treeTitle").remove();
                svgTree.select("#tree").selectAll('g').remove();
            }
            if (svgTreePlots){
                svgTreePlots.select(".treeTitle").remove();
                svgTreePlots.select("#plots").selectAll('g').remove();
            }
            if (svgSampleTree)
                svgSampleTree.selectAll("g").remove();
        }
    }
})();




