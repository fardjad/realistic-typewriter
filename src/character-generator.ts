import type { KeyboardLayout } from "./layout.js";
import { integerInRange } from "./random.js";

export type CharacterOperation =
  | { kind: "insert"; value: string }
  | { kind: "delete"; count: number };

export function* generateCharacterOperations(
  layout: KeyboardLayout,
  accuracy: number,
  checkInterval: number,
  text: string,
): Generator<CharacterOperation> {
  let currentIndex = -1;
  let typoIndex = -1;
  let shouldCorrect = false;

  while (true) {
    if (currentIndex >= text.length - 1) {
      if (typoIndex !== -1) {
        shouldCorrect = true;
      } else {
        return;
      }
    }

    if (!shouldCorrect) {
      currentIndex += 1;
      shouldCorrect = typoIndex !== -1 && currentIndex % checkInterval === 0;

      if (integerInRange(0, 100) > accuracy) {
        const typoCharacter = layout.getAdjacentCharacter(
          text.charAt(currentIndex),
        );

        if (typoCharacter === null) {
          yield { kind: "insert", value: text.charAt(currentIndex) };
          continue;
        }

        if (typoIndex === -1) {
          typoIndex = currentIndex;
          shouldCorrect = integerInRange(0, 1) === 1;
        }

        yield { kind: "insert", value: typoCharacter };
        continue;
      }

      yield { kind: "insert", value: text.charAt(currentIndex) };
      continue;
    }

    if (currentIndex >= typoIndex) {
      currentIndex -= 1;
      yield { kind: "delete", count: 1 };
      continue;
    }

    shouldCorrect = false;
    typoIndex = -1;
    currentIndex += 1;
    yield { kind: "insert", value: text.charAt(currentIndex) };
  }
}
