/**
 * Created by Natallia on 1/22/2016.
 */

var Entities = (function(){
    var my = {};

    my.distribution = {
        min  : 0,
        max  : 0,
        mean : 0,
        stDev: 0,
        type : "Uniform"
    };

    my.layerTemplate = {
        id           : 0,
        name         : "",
        thickness    : {min: 1, max: 1},
        materials    : null,
        lyphTemplate : 0,   //parent id
        position     : 0
        //lyphIdentity (Array[integer], optional),
        //instantiations (Array[integer], optional)
    };

    my.locatedMeasure = {
        id     : 0,
        quality: "", //string,
        lyphTemplate: 0, //integer
        correlations: null, //Array[integer], optional
        bagsOfPathologies: null //Array[integer], optional
    };

    my.lyphTemplate = {
        id              : 0,
        name            : "",
        fmaID           : "",
        //length          : 0,
        //thickness       : 0,
        layers          : null,
        //materialInLyphs : null,
        //children        : null,
        //instantiations  : null,
        //layerIdentity   : null, //Pointer to a layer
        //materials       : null, //Any lyph template
        //parents         : null, //Any lyph template
        //materialIn      : null, //Array
        locatedMeasures : null,
        length: null,
        radius : null,

    };

    my.canonicalTreeLevel = {
        id                : 0,
        name              : "",
        branchingFactor   : 1,
        skipProbability   : 0,
        template          : 0, //lyph template ID
        tree              : 0, //parent tree id
        materials         : null, //Experimental - branching trees
        position          : 0
    };

    my.canonicalTree = {
        id : 0,
        name : "",
        levels : null
    };

    return my;
}());

var Action = {
    type: "unknown" //"add", "delete", "modify", "swap"
};

function ActionLog() {
    this.items = [];

    this.addAt = function(item, index){
        this.items.splice(index, 0, item);
    };

    this.removeAt = function(index){
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    };

    this.replaceAt = function(item, index){
        this.items.splice(index, 1, item);
    };

    this.swapItems = function(index1, index2){
        var tmp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = tmp;
    };

    this.push = function(item){
        this.addAt(item, this.items.length);
    };

    this.pop = function(){
        return this.items.splice(this.items.length - 1, 1);
    }
}