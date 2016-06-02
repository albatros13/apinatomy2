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
            type: 'row',
            content:[
                {
                    type: 'column',
                    content:[
                        {
                            type: 'component',
                            componentName: 'PublicationRepo',
                            title: "Publications",
                            width: 25,
                            showPopoutIcon: false,
                            componentState: {
                                label: 'Publications',
                                content: '<div id="publicationRepo"></div>'
                            }
                        },
                        {
                            type: 'component',
                            componentName: 'ClinicalIndexRepo',
                            title: "Clinical Indices",
                            width: 25,
                            showPopoutIcon: false,
                            componentState: {
                                content: '<div id="clinicalIndexRepo"></div>'
                            }
                        }
                    ]
                },
                {
                    type: 'component',
                    componentName: 'CorrelationRepo',
                    title: "Correlations",
                    width: 50,
                    showPopoutIcon: false,
                    componentState: {
                        content:
                            '<div id="correlationRepo"></div>'
                    }
                },
                {
                    type: 'column',
                    content:[
                        {
                            type: 'component',
                            componentName: 'LocatedMeasureRepo',
                            title: "Located Measures",
                            width: 25,
                            showPopoutIcon: false,
                            componentState: {
                                content:
                                    '<div id="locatedMeasureRepo"></div>'
                            }
                        },
                        {
                            type: 'component',
                            componentName: 'LyphRepo',
                            title: "Lyph Types",
                            width: 25,
                            showPopoutIcon: false,
                            componentState: {
                                content: '<div id="lyphRepo"></div>'
                            }
                        }
                    ]
                }
            ]
        }]
    };

    var myLayout = new GoldenLayout( config );

    var publicationRepo, clinicalIndexRepo, correlationRepo, locatedMeasureRepo, lyphRepo;

    myLayout.registerComponent( 'PublicationRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            publicationRepo = new ApiNATOMY2.PublicationRepo([], correlationRepo);
            publicationRepo.load("http://open-physiology.org:8889");
            publicationRepo.createHeaders($('#publicationRepo'), null);
        })
    });

    myLayout.registerComponent( 'ClinicalIndexRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            clinicalIndexRepo = new ApiNATOMY2.ClinicalIndexRepo([], correlationRepo);
            clinicalIndexRepo.load("http://open-physiology.org:8889");
            clinicalIndexRepo.createHeaders($('#clinicalIndexRepo'), null);
        })
    });

    myLayout.registerComponent( 'CorrelationRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            correlationRepo = new ApiNATOMY2.CorrelationRepo([], clinicalIndexRepo,locatedMeasureRepo);
            correlationRepo.load("http://open-physiology.org:8889");
            correlationRepo.createEditors($('#correlationRepo'), null);
        })
    });

    myLayout.registerComponent( 'LyphRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
            lyphRepo.load("http://open-physiology.org:8889");
            lyphRepo.createHeaders($('#lyphRepo'), null);
        })
    });

    myLayout.registerComponent( 'LocatedMeasureRepo', function( container, componentState ){
        container.getElement().html(componentState.content);
        container.on( 'open', function() {
            if (lyphRepo){
                locatedMeasureRepo = lyphRepo.locatedMeasureRepoFull;
            } else {
                locatedMeasureRepo = new ApiNATOMY2.LocatedMeasureRepo([]);
                locatedMeasureRepo.load("http://open-physiology.org:8889");
            }
            locatedMeasureRepo.createHeaders($('#locatedMeasureRepo'), null);
        })
    });
    myLayout.init();

})();




