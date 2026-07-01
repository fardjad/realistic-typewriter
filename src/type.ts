import {
  type CharacterOperation,
  generateCharacterOperations,
} from "./character-generator.js";
import type { KeyboardLayout } from "./layout.js";
import { qwerty } from "./layouts/qwerty.js";
import { integerInRange } from "./random.js";

export type TypeEvent = { kind: "wait"; ms: number } | CharacterOperation;

export type TypeOptions = {
  accuracy?: number;
  minSpeed?: number;
  maxSpeed?: number;
  layout?: KeyboardLayout;
};

const DEFAULT_ACCURACY = 95;
const DEFAULT_MIN_SPEED = 5;
const DEFAULT_MAX_SPEED = 10;

export async function* type(
  text: string,
  options: TypeOptions = {},
): AsyncGenerator<TypeEvent> {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  const accuracy = options.accuracy ?? DEFAULT_ACCURACY;
  const minSpeed = options.minSpeed ?? DEFAULT_MIN_SPEED;
  const maxSpeed = options.maxSpeed ?? DEFAULT_MAX_SPEED;
  const layout = options.layout ?? qwerty;

  validateOptions(accuracy, minSpeed, maxSpeed, layout);

  const checkInterval = Math.max(1, Math.floor((minSpeed + maxSpeed) / 2));

  for (const operation of generateCharacterOperations(
    layout,
    accuracy,
    checkInterval,
    text,
  )) {
    yield {
      kind: "wait",
      ms: integerInRange(
        Math.floor(1000 / maxSpeed),
        Math.floor(1000 / minSpeed),
      ),
    };
    yield operation;
  }
}

function validateOptions(
  accuracy: number,
  minSpeed: number,
  maxSpeed: number,
  layout: KeyboardLayout,
): void {
  if (typeof accuracy !== "number" || Number.isNaN(accuracy)) {
    throw new TypeError("accuracy must be a number");
  }

  if (accuracy <= 0 || accuracy > 100) {
    throw new RangeError(
      "accuracy must be greater than 0 and less than or equal to 100",
    );
  }

  if (typeof minSpeed !== "number" || Number.isNaN(minSpeed)) {
    throw new TypeError("minSpeed must be a number");
  }

  if (typeof maxSpeed !== "number" || Number.isNaN(maxSpeed)) {
    throw new TypeError("maxSpeed must be a number");
  }

  if (minSpeed <= 0) {
    throw new RangeError("minSpeed must be greater than 0");
  }

  if (maxSpeed <= 0) {
    throw new RangeError("maxSpeed must be greater than 0");
  }

  if (minSpeed > maxSpeed) {
    throw new RangeError("minSpeed must be less than or equal to maxSpeed");
  }

  if (typeof layout.getAdjacentCharacter !== "function") {
    throw new TypeError("layout must provide getAdjacentCharacter(character)");
  }
}
