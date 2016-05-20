/**
 * Created by Natallia on 5/16/2016.
 */
var nodes = {};
var links = [];

var lyphRepo = new ApiNATOMY2.LyphTemplateRepo([]);
var clinicalIndexRepo = new ApiNATOMY2.ClinicalIndexRepo([]);
var correlationRepo = new ApiNATOMY2.CorrelationRepo([]);
var publicationRepo = new ApiNATOMY2.PublicationRepo([]);
var locatedMeasureRepo = new ApiNATOMY2.LocatedMeasureRepo([]);

function loadBrainConnectivityLinks(){
    function loadCocomacLinks(){
        console.dir("Loading cocomac connectivity");
        return new RSVP.Promise(function(resolve, reject){
            var file = "resources/upload/cocomac_connectivity_v4.txt";
            $.ajax({
                url: file,
                success: function (data) {
                    var lines = data.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i];
                        var terms = line.split(',');
                        if (terms.length >= 2) {
                            var ccLink = {source: terms[0].trim(), target: terms[1].trim()};
                            var sources = d3.entries(nodes).filter(function (entry) {
                                return (entry.value.cocomacIDs && entry.value.cocomacIDs.indexOf(ccLink.source) > 0);
                            });
                            if (sources && sources.length > 0) {
                                var targets = d3.entries(nodes).filter(function (entry) {
                                    return (entry.value.cocomacIDs && entry.value.cocomacIDs.indexOf(ccLink.target) > 0);
                                });
                                if (targets && targets.length > 0) {
                                    sources.forEach(function (source) {
                                        targets.forEach(function (target) {
                                            var node1 = nodes[source.key];
                                            var node2 = nodes[target.key];
                                            if (node1.id != node2.id){
                                                var link = {
                                                    source: node1, target: node2,
                                                    relation: "CONNECTIVITY",
                                                    count: 1,
                                                    cocomac: 1,
                                                    human: 0
                                                };
                                                var existing = links.find(function(d){
                                                    return ((d.source.id == link.source.id) && (d.target.id == link.target.id));
                                                });
                                                if (existing){
                                                    existing.count += 1;
                                                    existing.cocomac += 1;
                                                } else
                                                    links.push(link);
                                            }
                                        });
                                    })
                                }
                            }
                        }
                    }
                    resolve(data);
                },
                error: function(jqXhr, textStatus, errorThrown){
                    reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
                }
            })
        });
    }

    function loadHumanLinks(){
        console.dir("Loading human connectivity");
        var humanLyphMap = {};

        function loadHumanLyphMap() {
            return new RSVP.Promise(function(resolve, reject) {
                var file = "resources/upload/connectomeRegionIDs.csv";
                $.ajax({
                    url: file,
                    success: function (data) {
                        var lines = data.split('\n');
                        for (var i = 0; i < lines.length; i++) {
                            var line = lines[i];
                            var terms = line.split(',');
                            if (terms.length >= 2) {
                                var humanID = terms[0].trim();
                                var lyphTypeID = terms[2].trim();
                                if (lyphTypeID.length > 0) {
                                    humanLyphMap[humanID] = lyphTypeID;
                                }
                            }
                        }
                        resolve(data);
                    }
                });
            });
        }

        function loadConnectomeData() {
            return new RSVP.Promise(function(resolve, reject) {
                var file = "resources/upload/connectomeColumns.csv";
                $.ajax({
                    url: file,
                    success: function (data) {
                        var lines = data.split('\n');
                        for (var i = 0; i < lines.length; i++) {
                            var line = lines[i];
                            var terms = line.split(',');
                            if (terms.length >= 2) {
                                var k1 = terms[0].trim();
                                var k2 = terms[1].trim();
                                var score = parseInt(terms[2].trim(), 10);
                                var lyphTypeID1 = humanLyphMap[k1];
                                var lyphTypeID2 = humanLyphMap[k2];

                                if (lyphTypeID1 && lyphTypeID2 && (score > 0)) {
                                    var node1 = nodes[lyphTypeID1];
                                    var node2 = nodes[lyphTypeID2];
                                    if (node1.id != node2.id) {
                                        var link = {
                                            source: node1, target: node2,
                                            relation: "CONNECTIVITY",
                                            count: 1,
                                            cocomac: 0,
                                            human: 1
                                        };
                                        var existing = links.find(function (d) {
                                            return ((d.source.id == link.source.id) && (d.target.id == link.target.id));
                                        });
                                        if (existing) {
                                            existing.count += (score / 10);
                                            existing.human += score;
                                        } else
                                            links.push(link);
                                    }
                                }
                            }
                        }
                        resolve(data);
                    }
                });
            });
        }

        return loadHumanLyphMap().then(loadConnectomeData);
    }

    return loadCocomacLinks().then(loadHumanLinks);
}

function loadSelectedIndices(indices) {
    return clinicalIndexRepo.load("http://open-physiology.org:8889")
        .then(function () {
            correlationRepo.load("http://open-physiology.org:8889")
                .then(function () {
                    correlationRepo.clinicalIndexRepo = clinicalIndexRepo;
                    correlationRepo.locatedMeasureRepo = locatedMeasureRepo;
                    clinicalIndexRepo.correlationRepo = correlationRepo;

                    indices.forEach(function (indexID) {
                        var index = clinicalIndexRepo.getItemByID(indexID);
                        var node = {id: "i" + indexID, name: "i" + indexID, type: "INDEX"};
                        nodes[node.id] = node;

                        if (index && index.correlations) {
                            index.correlations.forEach(function(correlationID){
                                var correlation = correlationRepo.getItemByID(correlationID);
                                if (correlation && correlation.locatedMeasures){
                                    correlation.locatedMeasures.forEach(function(locatedMeasureID){
                                        var locatedMeasure = correlationRepo.locatedMeasureRepo.getItemByID(locatedMeasureID);
                                        if (locatedMeasure){
                                            var lyphTypeID = locatedMeasure.lyphTemplate;
                                            if (nodes[lyphTypeID]){
                                                var link = {source: nodes[node.id], target: nodes[lyphTypeID], relation: "CORRELATION"};
                                                var existing = links.filter(function(d){
                                                    return (d.source.id == link.source.id) && (d.target.id == link.target.id);
                                                });
                                                if (existing.length == 0)
                                                    links.push(link);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
        })
}

function generateSampleIndices(){
    var count = 20;
    var maxGroup = 3;
    var keys = d3.keys(nodes);
    for (var i = 0; i < count; i++){
        var node = {id: "i" + (i + 1), name: "i" + (i + 1), fmaID: "", cocomacIDs: [], type: "INDEX"};
        nodes[node.id] = node;
        var numLinks = getRandomInt(1, maxGroup);
        for (var j = 0; j < numLinks; j++){
            var index = getRandomInt(1, keys.length);
            var key = keys[index];
            var link = {source: nodes[node.id], target: nodes[key], relation: "CORRELATION"};
            links.push(link);
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function createPartonomyGraph() {
    console.dir("Creating partonomy graph");
    var visited = [];

    var traverse = function(root){
        if (!root) return;
        if (!root.children && !root.parents) return;
        visited.push(root.id);

        var source = {id: root.id, name: root.name, fmaID: root.fmaID, cocomacIDs: root.cocomacIDs, type: "REGION"};
        if (!nodes[root.id]) nodes[root.id] = source;

        var queue = root.children.map(function(d){return {id: d, relation: "child"};});
        if (root.parents) queue = queue.concat(root.parents.map(function(d){ return {id: d, relation: "parent"};}));
        for (var i = 0; i < queue.length; i++){
            var id = queue[i].id;
            if (visited.indexOf(id) < 0){
                var obj = lyphRepo.getItemByID(id);
                if (obj){
                    var target =  {id: obj.id, name: obj.name, fmaID: obj.fmaID, cocomacIDs: obj.cocomacIDs, type: "REGION"};
                    if (!nodes[id]) nodes[id] = target;
                    if (queue[i].relation == "child")
                        links.push({source: nodes[root.id], target: nodes[id], relation: "PARTONOMY"});
                    else{
                        // var parent = lyphRepo.getItemByID(id);
                        //if (parent && (!parent.parents || (parent.parents.length == 0))){
                        //    nodes[id].dangling = true;
                        //}
                        links.push({source: nodes[id], target: nodes[root.id], relation: "PARTONOMY"});
                    }
                    traverse(obj);
                }
                visited.push(id);
            }
        }
    };
    var root = lyphRepo.getItemByID(4574);
    if (root) traverse(root);
}

function loadIndices() {
    console.dir("Loading indices");
    return new RSVP.Promise(function (resolve, reject) {
        clinicalIndexRepo.load("http://open-physiology.org:8889")
            .then(function () {
                correlationRepo.load("http://open-physiology.org:8889").then(
                    function () {
                        publicationRepo.load("http://open-physiology.org:8889")
                            .then(function () {
                                correlationRepo.clinicalIndexRepo = clinicalIndexRepo;
                                correlationRepo.locatedMeasureRepo = lyphRepo.locatedMeasureRepoFull;
                                clinicalIndexRepo.correlationRepo = correlationRepo;
                                resolve(true);
                            });
                    })
            })
    });
}

function createCorrelationLinks(){
    console.dir("Creating correlation links");
    var selectedIndices = clinicalIndexRepo.items.filter(
        function (index) {
            return (index.title && (index.title.indexOf("NP") > -1) &&  (index.title.indexOf("MDS") > -1));
        });

    selectedIndices.forEach(function(index){
        var node = {id: "i" + index.id, name: index.title, type: "INDEX"};
        nodes[node.id] = node;
        if (index.correlations) {
            index.correlations.forEach(function(correlationID){
                var correlation = correlationRepo.getItemByID(correlationID);
                if (correlation && correlation.locatedMeasures) {
                    var publication = null;
                    if (correlation.publication)
                        publication = publicationRepo.getItemByID(correlation.publication);
                    correlation.locatedMeasures.forEach(function (locatedMeasureID) {
                        var locatedMeasure = correlationRepo.locatedMeasureRepo.getItemByID(locatedMeasureID);
                        if (locatedMeasure) {
                            var lyphTypeID = locatedMeasure.lyphTemplate;
                            var target = nodes[lyphTypeID];
                            if (target) {
                                if (!target.publications) target.publications = {};
                                if (!target.correlations) target.correlations = {};
                                target.publications[index.id] = publication;
                                target.correlations[index.id] = correlation;
                                var link = {
                                    source: node,
                                    target: target,
                                    relation: "CORRELATION"
                                };
                                var existing = links.filter(function (d) {
                                    return (d.source.id == link.source.id) && (d.target.id == link.target.id);
                                });
                                if (existing.length == 0)
                                    links.push(link);
                            }
                        }
                    });
                }
            });
        }
    });
}

function saveTextAsFile(textToWrite, fileNameToSaveAs){
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    if (!fileNameToSaveAs)
        fileNameToSaveAs = "output.txt";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();
}

function printList(array, lineSeparator){
    if (!array) return "";
    if (!lineSeparator) lineSeparator = "\n";
    var str = "";
    for (var i = 0; i < array.length; i++)
        str += array[i] + lineSeparator;
    return str;
}

function sort(array, prop){
    return array.sort(function(a,b){
        return a[prop] - b[prop];
    });
}


