/**
 * Object.create shim for IE (and others, if any!)
 */

if (typeof Object.create !== "function") {
    Object.create = function (object, properties) {
        "use strict";

        var property;

        function O() {}

        O.prototype = object;

        if (properties !== undefined) {
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    O[property] = properties[property].value;
                }
            }
        }
        return new O();
    };
}
