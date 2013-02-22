# realistic-typewriter.js

A pure Javascript library for simulating typewriter effect.

## Browser Compatibility

The following browsers are tested and supported:

|Chrome|Firefox|  IE  |Opera|Safari|
|------|-------|------|-----|------|
|  1+  |  3.6+ | 5.5+ | 10+ |  4+  |

but it might work on others as well.

## Usage

Create an instance of RealisticTypewriter and optionally set it's options:

    var realisticTypewriter = new RealisticTypewriter();
    
    // 10% typo rate
    realisticTypewriter.accuracy = 90; 
    
    // typing speed will be from 5 to 10 characters per second.
    realisticTypewriter.minimumCharactersPerSecond = 5;
    realisticTypewriter.maximumCharactersPerSecond = 10;
    
    // waits at least 0.5 second and at most 1 second before it starts typing
    realisticTypewriter.minimumInitialDelay = 500;
    realisticTypewriter.maximumInitialDelay = 1000;

call type method of the object instance and pass in the required parameters:

    realisticTypewriter.type("Text to type", htmlElement, function () {
        alert("finished");
    });

Take a look at the [documentation](http://fardjad.github.com/realistic-typewriter.js/docs/) and examples for more information.

## Documentation

The documentation is generated with [jGrouseDoc](http://code.google.com/p/jgrousedoc/). It's available [here](http://fardjad.github.com/realistic-typewriter.js/docs/).

## Examples

[Terminal](http://fardjad.github.com/realistic-typewriter.js/examples/terminal/terminal.html)

## Contributing

You are welcome to contribute via pull requests; just fork the repository, make your changes and submit a pull request.

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
