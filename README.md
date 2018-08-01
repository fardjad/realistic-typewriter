# realistic-typewriter.js
[![Build Status](https://travis-ci.org/fardjad/realistic-typewriter.js.png?branch=master)](https://travis-ci.org/fardjad/realistic-typewriter.js)

A library for simulating typewriter effect in the browser.

![Demo](https://github.com/fardjad/realistic-typewriter.js/raw/master/gfx/demo.gif)

Current version is **0.2**. It is a complete rewrite of the previous version.
The Documentation is still incomplete (look at the examples for now.)

**v0.1** is available
[here](https://github.com/fardjad/realistic-typewriter.js/tree/v0.1).

## Usage

    var tw = typewriter(targetDomElement).withAccuracy(90) // an integer between 0 and 100 (100 means no typos)
                                         .withMinimumSpeed(5) // minimum typing speed (characters per second)
                                         .withMaximumSpeed(10) // maximum typing speed
                                         .build();

    tw.clear() // clear targetDomElement
      .put('$ ') // instantly put '$ ' in targetDomElement
      .waitRange(1000, 2000) // wait randomly between 1000ms and 2000ms
      .type('whoami') // type 'whoami'
      .put('<br/>') // yes, you can put html tags in targetDomElement
      .wait(2000) // wait for 2000ms
      .put('realistic-typewriter.js', function () {
        console.log('yeah'); // 1
      })
      .put('<br/>') // will be executed after 1
      .waitRange(500, 1000)
      .put('$ ')
      .waitRange(1000, 2000)
      .type('exit', function () {
        console.log('finished');
      });

## Installation

You can use this library with [browserify](http://browserify.org/) or download
a pre-compiled version (see below) from the project's
[releases page](https://github.com/fardjad/realistic-typewriter.js/releases).

<blockquote>
<strong>build/typewriter-bundle.js</strong> is the browserify bundle.<br/>
<strong>build/typewriter-bundle.min.js</strong> is the minified version of the browserify bundle.<br/>
<strong>build/typewriter-bundle-sa.js</strong> is the UMD browserify bundle.<br/>
<strong>build/typewriter-bundle-sa.min.js</strong> is the minified version of the UMD browserify bundle.<br/>
</blockquote>

## Building from source-code

### Requirements

Node.js v6.9.0+

### Instructions

1. Clone the repository
2. run `npm install`

### Cake tasks

Install CoffeeScript globally and run `cake` to see available tasks.

## Contributing

You are welcome to contribute via pull requests; fork the repository,
make your changes and submit a pull request.

## License

Copyright (c) 2013 Fardjad Davari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
