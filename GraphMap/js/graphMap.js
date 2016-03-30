var ontologyViewer = function () {

    var nodes = {};
    var links = [];
    var nodeMaps = {};
    var partNodes = {};

    var graph;

    function loadLinks(file){
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                for(var i = 0; i < lines.length; i++){
                    var line = lines[i];
                    var terms = line.split(',');
                    if (terms.length >= 2){
                        var sourceName = terms[0].trim();
                        var targetName = terms[1].trim();
                        var sourceID = nodeMaps[sourceName];
                        var targetID = nodeMaps[targetName];
                        if (sourceID && targetID ){
                            var distance1 = (nodes[sourceID].width + nodes[targetID].width) / 2;
                            var distance2 = (nodes[sourceID].height + nodes[targetID].height) / 2;
                            var distance = distance1;
                            var direction = "";
                            if (terms.length >= 3){
                                direction = terms[2].trim();
                                if ((direction == "tb") || (direction == "bt")) {
                                    distance = distance2;
                                    console.dir("vertical relation");
                                    console.dir(sourceID + "," + targetID);
                                }
                            } else {
                                distance = Math.min(distance1, distance2);
                            }
                            var link = {source: nodes[sourceID], target: nodes[targetID],
                                distance: distance, direction: direction};
                            links.push(link);
                        } else {
                            if (!source) console.dir(sourceName);
                            if (!target) console.dir(targetName);
                        }
                    }
                }
                graph = new Graph(links, nodes);
                graph.draw();

                d3.select(window)
                    .on("keydown", function() {
                        if(d3.event.keyCode == 86) {
                            graph.drawVoronoi();
                        }
                        if(d3.event.keyCode == 71) {
                            graph.draw();
                        }
                    });

            }
        });
    }

    function loadNodes(file){
        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                for(var i = 0; i < lines.length; i++){
                    var line = lines[i];
                    var terms = line.split(',');
                    var name = terms[0].trim();
                    var width = parseFloat(terms[1])/2;
                    var height = parseFloat(terms[2])/2;
                    if (!nodeMaps[name]){
                        nodes[i + 1] = {id: i + 1, label: name,
                            width: width,
                            height: height
                            //,center: true
                        };
                        nodeMaps[name] = i + 1;

                        /*
                        //Add rectangle corners
                        nodes[(i + 1) + "_1"] = {id: (i + 1) + "_1", label: ""};
                        nodes[(i + 1) + "_2"] = {id: (i + 1) + "_2", label: ""};
                        nodes[(i + 1) + "_3"] = {id: (i + 1) + "_3", label: ""};
                        nodes[(i + 1) + "_4"] = {id: (i + 1) + "_4", label: ""};

                        var diag = Math.sqrt(width * width / 4 + height * height / 4);
                        links.push({source: nodes[i + 1], target: nodes[(i + 1) + "_1"], distance: diag, direction: "rl"});
                        links.push({source: nodes[i + 1], target: nodes[(i + 1) + "_2"], distance: diag, direction: "lr"});
                        links.push({source: nodes[i + 1], target: nodes[(i + 1) + "_3"], distance: diag, direction: "rl"});
                        links.push({source: nodes[i + 1], target: nodes[(i + 1) + "_4"], distance: diag, direction: "lr"});

                        links.push({source: nodes[(i + 1) + "_1"], target: nodes[(i + 1) + "_2"], distance: width, direction: "lr"});
                        links.push({source: nodes[(i + 1) + "_2"], target: nodes[(i + 1) + "_3"], distance: height, direction: "tb"});
                        links.push({source: nodes[(i + 1) + "_3"], target: nodes[(i + 1) + "_4"], distance: width, direction: "rl"});
                        links.push({source: nodes[(i + 1) + "_4"], target: nodes[(i + 1) + "_1"], distance: height, direction: "bt"});
                        */
                    }
                }
                loadLinks("resources/brainPartLinks.txt");
            }
        });
    }

    /*
    function loadPartBorders(file){
        function exists(sourceID, targetID){
            var found = links.find(function(d){
                if (d.source == sourceID && d.target == targetID || d.source == targetID && d.target == sourceID)
                    return d;
            });
            return found;
        }

        $.ajax({
            url: file,
            success: function(data) {
                var lines = data.split('\n');
                for(var j = 0; j < lines.length; j++){
                    var line = lines[j];
                    var terms = line.split(',');
                    var part = terms[0].trim();
                    if (!partNodes[part]){
                        partNodes[part] = [];
                    }
                    for (var i = 1; i < terms.length; i++){
                        var node = terms[i];
                        if (!nodeMaps[node]){
                            nodes[node] = {id: node};
                            nodeMaps[node] = [part];
                        } else{
                            nodeMaps[node].push(part);
                        }
                        partNodes[part].push(node);
                    }

                    for (i = 1; i < terms.length - 1; i++){
                        sourceID = terms[i];
                        targetID = terms[i+1];
                        if (!exists(sourceID, targetID)){
                            var link = {source: nodes[sourceID], target: nodes[targetID], distance:10};
                            links.push(link);
                        }
                    }
                    var sourceID = terms[terms.length - 1];
                    var targetID = terms[1];
                    if (!exists(sourceID, targetID)){
                        link = {source: nodes[sourceID], target: nodes[targetID], distance:10};
                        links.push(link);
                    }
                }

                //console.dir(nodes);
                //console.dir(links);
                //console.dir(nodeMaps);
                console.dir(partNodes);

                graph = new Graph(links, nodes);
                graph.draw();
            }
        });
    }
    loadPartBorders("resources/brainPartBorders.txt");
    */

    loadNodes("resources/brainParts.txt");

}();
