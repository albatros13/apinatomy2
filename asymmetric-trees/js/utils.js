/**
 * Created by Natallia on 3/7/2016.
 */

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function isArray(obj) {
    return (typeof obj !== 'undefined' && obj && obj.constructor === Array);
}

function logError(obj){
    console.dir(obj);
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

//Checks if second object does not modify properties of the first
//Not the same as equal (e.g., unassigned properties in obj2 are fine)
Object.preserves = function( obj1, obj2 ) {
    if ( obj1 === obj2 ) return true;
    if ( ! ( obj1 instanceof Object ) || ! ( obj2 instanceof Object ) ) return false;
    if (isArray(obj1) || isArray(obj2)) return obj1.equals(obj2);

    if ( obj1.constructor !== obj2.constructor ) return false;

    for ( var p in obj2 ) {
        if (!obj2.hasOwnProperty( p )) continue;
        if (!obj1.hasOwnProperty( p )) return false; //new property set
        if ( obj1[ p ] === obj2[ p ] ) continue;
        if ( ! Object.preserves( obj1[ p ],  obj2[ p ] ) ) return false;
    }
    return true;
};

Object.removeProp = function(obj, prop){
    delete obj[prop];
    for ( var p in obj ) {
        if ( typeof( obj[ p ] ) == "object" ) Object.removeProp(obj[p], prop);
    }
};

Object.removeFunctions = function(obj){
    for ( var p in obj ) {
        if (typeof obj[p] === "function")
            delete obj[p];
        if ( typeof( obj[ p ] ) == "object" ) Object.removeFunctions(obj[p]);
    }
}

var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure",
    "Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood",
    "CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan",
    "DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta",
    "DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue",
    "DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue",
    "DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia",
    "Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow",
    "HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush",
    "LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow",
    "LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue",
    "LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen",
    "Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen",
    "MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream",
    "MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid",
    "PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum",
    "PowderBlue","Purple","Red","RosyBrown","RoyalBlue",
    "SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray",
    "SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White",
    "WhiteSmoke","Yellow","YellowGreen"];

var colorStep = 1 + Math.round(10* Math.random());

var rowColor = function(i){
    return CSS_COLOR_NAMES [colorStep * i % CSS_COLOR_NAMES.length];
};


