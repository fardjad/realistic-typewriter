/*global RealisticTypewriter, document*/

"use strict";

function prompt(element, text) {
    var span = document.createElement("span");
    span.innerHTML = text;
    element.appendChild(span);
}

function start() {
    var realisticTypewriter = new RealisticTypewriter(),
        typeWriterElement = document.getElementById("typewriter");

    prompt(typeWriterElement, "$ ");

    // OK, I know the code could look better, but this is just a quick example
    setTimeout(function () {
        realisticTypewriter.type("ls realistic-typewriter.js", typeWriterElement, function () {
            prompt(typeWriterElement, "\n");
            setTimeout(function () {
                prompt(typeWriterElement, "ls: realistic-typewriter.js: No such file or directory\n");
                prompt(typeWriterElement, "$ ");
                realisticTypewriter.type("exit", typeWriterElement, function () {
                    prompt(typeWriterElement, "\n");
                    setTimeout(function () {
                        prompt(typeWriterElement, "logout\n\n");
                        prompt(typeWriterElement, "[Process completed]\n");
                    }, 500);
                });
            }, 1000);
        });
    }, 1000);
}

var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        start();
        clearInterval(readyStateCheckInterval);
    }
}, 10);