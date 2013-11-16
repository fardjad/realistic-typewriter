# realistic-typewriter.js

A library for simulating typewriter effect in the browser.

v0.2 is a work-in-progress. Current working release is
[v0.1](https://github.com/fardjad/realistic-typewriter.js/tree/v0.1).

## Browser compatibility

The following browsers are tested and supported:

|Chrome|Firefox|IE |Opera|Safari|
|------|-------|---|-----|------|
|TBD   |TBD    |TDB|TDB  |TDB   |

but it might work on others as well.

## Usage

    var tw = typewriter(targetDomElement).withAccuracy(90)
                                         .withMinimumSpeed(5)
                                         .withMaximumSpeed(10);

    typewriter.clear()
              .waitRange(500, 1000)
              .put('$ ')
              .type('whoami')
              .put('<br/>')
              .wait(2000)
              .put('realistic-typewriter.js')
              .then(function () {
                alert('done');
              });

## Examples

TBD

## Building from source-code

### Requirements

Node.js v0.10+

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