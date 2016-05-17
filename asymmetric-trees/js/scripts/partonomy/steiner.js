var infinity = Number.MAX_SAFE_INTEGER;

var steiner = function(edges, required){
    var nodes = extractNodes(edges);

    var smt = [];
    for (var i = 0; i < required.length; i++){
        for (var j = 0; j < required.length; j++){
            if (i != j){
                var path = shortestPath(nodes, edges, required[i], required[j]);
                for (var k = 0; k < path.length; k++){
                    var inSolution = smt.find(function(d){
                        return (d== path[k]);
                    });
                    if (!inSolution) smt.push(path[k]);
                }
            }
        }
    }
    return {edges: smt, score: getScore(smt)};
};

var dijkstra = function(edges, source, target){
    var nodes = extractNodes(edges);
    var path = shortestPath(nodes, edges, source, target);

    return {edges: path, score: getScore(path)};
};


function getScore(path){
    var score = 0;
    if (path.length == 0)
        score = infinity;
    else
        for (i = 0; i < path.length; i++){
            score += path[i].weight;
        }
    return score;
}

function extractNodes(edges){
    var nodes = {};
    edges.forEach(function(edge){
        ["from", "to"].forEach(function(prop){
            if (!nodes[edge[prop].id]) nodes[edge[prop].id] = edge[prop];
        });
    });
    return nodes;
}

//Dijkstra
function shortestPath(nodes, edges, start, end){
    //console.dir(start.id + " - " + end.id);

    for (var key in nodes){
        nodes[key].distance = infinity;
        nodes[key].visited = false;
    }
    if (nodes[start.id])
        nodes[start.id].distance = 0;
    else
        return []; //start is disconnected

    function traverse(current){
        var neighbourLinks = edges.filter(function(edge){
            return ((edge.from.id == current.id) && !edge.to.visited);
        });

        var finished = false;
        neighbourLinks.forEach(function(edge){
            edge.to.tmpDistance = current.distance + edge.weight;
            if (edge.to.distance > edge.to.tmpDistance) {
                edge.to.distance = edge.to.tmpDistance;
                edge.to.predecessor = current;
            }
            if (edge.to.id == end.id) finished = true;
        });

        current.visited = true;

        if (!finished){
            var unvisited = d3.values(nodes).filter(function(node){return (node.visited == false);});
            if (unvisited.length > 0) {
                var nextCenter = unvisited[0];
                unvisited.forEach(function (node) {
                    //For equally scored nodes always choose the one with lower index so that we do not include alternative shortest paths
                    if (((nextCenter.distance == node.distance) && (node.id < nextCenter.id))
                        || (nextCenter.distance > node.distance)) nextCenter = node;

                });
                if (nextCenter.distance != infinity)
                    traverse(nextCenter);
            }
        }
    }
    traverse(start);

    var path = [];
    var last = end;
    while (last.predecessor && (last.id != start.id)){
        var link = edges.find(function(edge){
            return (edge.from.id == last.predecessor.id) && (edge.to.id == last.id);});
        path.push(link);
        last = last.predecessor;
    }

    for (var key in nodes){
        delete nodes[key]["tmpDistance"];
        delete nodes[key]["predecessor"];
    }
    return path;
}
