# realistic-typewriter

A small library for generating realistic typing event streams.

`realistic-typewriter` simulates human typing by yielding a stream of operations
you can render using the method of your choice, such as DOM text or terminal
output.

## Installation

```bash
bun add realistic-typewriter
```

```bash
npm install realistic-typewriter
```

## API

```ts
type KeyboardLayout = {
  getAdjacentCharacter(character: string): string | null;
};

type TypeOptions = {
  accuracy?: number;
  minSpeed?: number;
  maxSpeed?: number;
  layout?: KeyboardLayout;
};

type TypeEvent =
  | { kind: "wait"; ms: number }
  | { kind: "insert"; value: string }
  | { kind: "delete"; count: number };

declare function type(text: string, options?: TypeOptions): AsyncIterable<TypeEvent>;
```

### `TypeOptions`

```ts
type TypeOptions = {
  accuracy?: number;
  minSpeed?: number;
  maxSpeed?: number;
  layout?: KeyboardLayout;
};
```

- `accuracy`: typing accuracy from `0` to `100`, where higher values produce fewer typos
- `minSpeed`: minimum typing speed in characters per second
- `maxSpeed`: maximum typing speed in characters per second
- `layout`: keyboard layout used to generate adjacent-key typos

## Events

```ts
type TypeEvent = WaitEvent | InsertEvent | DeleteEvent;

type WaitEvent = {
  kind: "wait";
  ms: number;
};

type InsertEvent = {
  kind: "insert";
  value: string;
};

type DeleteEvent = {
  kind: "delete";
  count: number;
};
```

### `WaitEvent`

```ts
type WaitEvent = {
  kind: "wait";
  ms: number;
};
```

- emitted before the next visible typing action
- `ms` is the suggested delay in milliseconds

### `InsertEvent`

```ts
type InsertEvent = {
  kind: "insert";
  value: string;
};
```

- appends visible text
- `value` is the string to insert

### `DeleteEvent`

```ts
type DeleteEvent = {
  kind: "delete";
  count: number;
};
```

- removes previously rendered characters
- `count` is the number of characters to remove, usually `1`

## Usage

```ts
import { type } from "realistic-typewriter";

let output = "";

for await (const event of type("whoami", { accuracy: 95, minSpeed: 5, maxSpeed: 10 })) {
  if (event.kind === "wait") {
    await new Promise((resolve) => setTimeout(resolve, event.ms));
    continue;
  }

  if (event.kind === "insert") {
    output += event.value;
    continue;
  }

  output = output.slice(0, -event.count);
}
```

## Built-in Layouts

`qwerty` is built in and used by default.

```ts
import { type } from "realistic-typewriter";
import { qwerty } from "realistic-typewriter/layouts";

for await (const event of type("hello", { layout: qwerty })) {
  // render events however you like
}
```

## Custom Layouts

```ts
import { createKeyboardLayout } from "realistic-typewriter";

const layout = createKeyboardLayout([
  ["1", "2", "3"],
  ["Q", "W", "E"],
  ["A", "S", "D"],
]);
```

## Development

The package ships dual ESM/CJS builds with Bun and uses Biome for linting and formatting.

```bash
bun install
bun run typecheck
bun run test
bun run build
```

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
