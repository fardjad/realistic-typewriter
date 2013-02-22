/*global document*/

/**
 * @project realistic-typewriter.js
 * @timestamp
 * @version 0.1
 * @author Fardjad
 * @description A pure Javascript library for simulating typewriter effect.
 */

/**
 * @class {public} RealisticTypewriter
 * @extends Object
 */
function RealisticTypewriter() {
    "use strict";
    RealisticTypewriter.super_.call(this);
}

(function () {
    "use strict";

    RealisticTypewriter.super_ = Object;
    RealisticTypewriter.prototype = Object.create(Object.prototype, {
        /**
         * @constructor ?
         */
        constructor: {
            value: RealisticTypewriter,
            enumerable: false
        },
        /**
         * Minimum typing speed (characters per second.)
         * @property {read write Integer} ?
         */
        minimumCharactersPerSecond: {
            value: 5,
            enumerable: false
        },
        /**
         * Maximum typing speed (characters per second.)
         * @property {read write Integer} ?
         */
        maximumCharactersPerSecond: {
            value: 15,
            enumerable: false
        },
        /**
         * Minimum delay (in milliseconds) before start typing.
         * @property {read write Integer} ?
         */
        minimumInitialDelay: {
            value: 500,
            enumerable: false
        },
        /**
         * Maximum delay (in milliseconds) before start typing.
         * @property {read write Integer} ?
         */
        maximumInitialDelay: {
            value: 1000,
            enumerable: false
        },
        /**
         * Typing accuracy percentage.
         * @property {read write Integer} ?
         */
        accuracy: {
            value: 95,
            enumerable: false
        },
        /**
         * Keyboard layout (for generating reasonable typos.)
         * @property {read write String[][]} ?
         */
        keyboardLayout: {
            value: [
                ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
                ["", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
                ["", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
                ["", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
            ],
            enumerable: false
        }
    });

    /**
     * Determines whether the specified character value is lowercase.
     * @function {private Boolean} ?
     * @param {String} character
     */
    function isLowerCase(character) {
        return character === character.toLowerCase();
    }

    /**
     * Generates a random integer in specified range.
     * @function {private Integer} ?
     * @param {Float} from
     * @param {Float} to
     */
    function randomInRange(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    /**
     * Finds an adjacent character to the specified one according to the given keyboardLayout.
     * @function {private String} ?
     * @param {String} character
     * @param {String[][]} keyboardLayout
     * @return {String} Returns an adjacent character if it can find the specified character in keyboardLayout. If not, it returns the given character.
     */
    function getAdjacentCharacter(character, keyboardLayout) {
        var row,
            col,
            adjacentCol,
            adjacentRow,
            adjacentCharacter,
            random;

        for (row = 0; row < keyboardLayout.length; row++) {
            for (col = 0; col < keyboardLayout[row].length; col++) {
                if (keyboardLayout[row][col].toLowerCase() === character) {

                    random = randomInRange(-1, 1);

                    adjacentRow = row + random;
                    if (adjacentRow >= keyboardLayout.length || adjacentRow < 0) {
                        adjacentRow += -2 * random;
                    }

                    if (col >= keyboardLayout[adjacentRow].length) {
                        col = keyboardLayout[adjacentRow].length - 1;
                    }

                    if (random === 0) {
                        random = [-1, 1][randomInRange(0, 1)];
                    } else {
                        random = randomInRange(-1, 1);
                    }

                    adjacentCol = col + random;

                    if (adjacentCol >= keyboardLayout[adjacentRow].length || adjacentCol < 0) {
                        adjacentCol += -2 * random;
                    }

                    if (isLowerCase(character)) {
                        adjacentCharacter = keyboardLayout[adjacentRow][adjacentCol].toLowerCase();
                    } else {
                        adjacentCharacter = keyboardLayout[adjacentRow][adjacentCol];
                    }

                    if (adjacentCharacter === "") {
                        return getAdjacentCharacter(character, keyboardLayout);
                    }

                    return adjacentCharacter;
                }
            }
        }

        return null;
    }

    /**
     * Creates a CharacterGenerator object.
     * @function {private CharacterGenerator} ?
     * @param {String} text
     * @param {String[][]} keyboardLayout
     * @param {Integer} accuracy - Typing accuracy percentage
     * @param {Integer} checkInterval - Forces generator to check for typos and start correcting them after generating the specified number of characters.
     */
    function createCharacterGenerator(text, keyboardLayout, accuracy, checkInterval) {
        var i = -1,
            correcting = false,
            typoIndex = -1;

        /**
         * @class {private} CharacterGenerator
         */
        return {
            /**
             * Returns the next character.
             * @function {private String} ?
             * @return Can be one of the following:
             * @... {String} character - a normal character
             * @... {String} character - '\b'
             */
            nextChar: function () {
                if (i >= text.length - 1) {
                    if (typoIndex !== -1) {
                        correcting = true;
                    } else {
                        return null;
                    }
                }

                if (!correcting) {
                    i++;

                    correcting = typoIndex !== -1 && i % checkInterval === 0;

                    if (randomInRange(0, 100) > accuracy) {
                        var output = getAdjacentCharacter(text.charAt(i), keyboardLayout);

                        if (output === null) {
                            return text.charAt(i);
                        }

                        if (typoIndex === -1) {
                            typoIndex = i;
                            correcting = randomInRange(0, 1) === 1;
                        }

                        return output;
                    }

                    return text.charAt(i);
                }

                if (i >= typoIndex) {
                    i--;
                    return "\b";
                }

                correcting = false;
                typoIndex = -1;
                return text.charAt(++i);
            }
        };
    }

    /**
     * @ifunction callback
     */

    /**
     * Starts typing the given text in specified HTML element.
     * @function {public void} ?
     * @param {String} text
     * @param {HTMLElement} htmlElement
     * @param {optional callback} callback - Function to be called when typing finished.
     */
    RealisticTypewriter.prototype.type = function (text, htmlElement, callback) {
        var self = this,
            checkInterval = (this.maximumCharactersPerSecond + this.minimumCharactersPerSecond) / 2,
            nextChar = createCharacterGenerator(text, this.keyboardLayout, this.accuracy, checkInterval).nextChar;

        if (text === undefined || text.length === 0) {
            return;
        }

        if (htmlElement.removeChild === undefined || htmlElement.lastChild === undefined ||
                htmlElement.appendChild === undefined) {
            throw "Invalid DOMElement!";
        }

        if (document === undefined) {
            throw "Can't find document object!";
        }

        function writeAndCallback(internalCallback) {
            var wait = randomInRange(1000 / self.minimumCharactersPerSecond, 1000 / self.maximumCharactersPerSecond),
                ch = nextChar();

            if (ch === null) {
                internalCallback(true);
                return;
            }

            setTimeout(function () {
                if (ch === "\b") {
                    htmlElement.removeChild(htmlElement.lastChild);
                } else {
                    var span = document.createElement("span");
                    if (ch === " ") {
                        // IE workaround!
                        span.innerHTML = "&nbsp;";
                    } else {
                        span.innerHTML = ch;
                    }
                    htmlElement.appendChild(span);
                }
                internalCallback(false);
            }, wait);
        }

        setTimeout(function () {
            (function iterate() {
                writeAndCallback(function (finished) {
                    if (finished) {
                        if (callback !== undefined && typeof callback === "function") {
                            callback();
                        }
                        return;
                    }
                    setTimeout(iterate, 0);
                });
            }());
        }, randomInRange(self.minimumInitialDelay, self.maximumInitialDelay));
    };
}());
