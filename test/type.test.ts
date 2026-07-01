import { describe, expect, test } from "bun:test";

import { type TypeEvent, type } from "../src/index.js";
import { qwerty } from "../src/layouts/index.js";

describe("type", () => {
  test("emits wait and insert events and reconstructs text", async () => {
    const events = await collect(
      type("hello", { accuracy: 100, minSpeed: 5, maxSpeed: 10 }),
    );
    const output = applyEvents(events);

    expect(output).toBe("hello");
    expect(events.filter((event) => event.kind === "insert")).toHaveLength(5);
    expect(events.filter((event) => event.kind === "delete")).toHaveLength(0);
    expect(events.filter((event) => event.kind === "wait")).toHaveLength(5);
  });

  test("eventually converges to the original text", async () => {
    const events = await collect(
      type("This is a test", { accuracy: 1, minSpeed: 5, maxSpeed: 10 }),
    );

    expect(applyEvents(events)).toBe("This is a test");
  });

  test("wait durations stay within the configured speed range", async () => {
    const events = await collect(
      type("abc", { accuracy: 100, minSpeed: 4, maxSpeed: 8 }),
    );
    const waits = events.filter(
      (event): event is Extract<TypeEvent, { kind: "wait" }> =>
        event.kind === "wait",
    );

    expect(waits.length).toBeGreaterThan(0);

    for (const event of waits) {
      expect(event.ms).toBeGreaterThanOrEqual(Math.floor(1000 / 8));
      expect(event.ms).toBeLessThanOrEqual(Math.floor(1000 / 4));
    }
  });

  test("validates its options", async () => {
    await expectRejects(
      () => collect(type("hello", { accuracy: 0 })),
      /accuracy must be greater than 0/,
    );
    await expectRejects(
      () => collect(type("hello", { minSpeed: 0 })),
      /minSpeed must be greater than 0/,
    );
    await expectRejects(
      () => collect(type("hello", { minSpeed: 10, maxSpeed: 5 })),
      /minSpeed must be less than or equal to maxSpeed/,
    );
  });
});

describe("qwerty", () => {
  test("preserves case for adjacent characters", () => {
    const upper = qwerty.getAdjacentCharacter("A");
    const lower = qwerty.getAdjacentCharacter("a");

    expect(upper).not.toBeNull();
    expect(lower).not.toBeNull();

    if (upper === null || lower === null) {
      throw new Error("expected adjacent qwerty characters");
    }

    expect(upper).toBe(upper.toUpperCase());
    expect(lower).toBe(lower.toLowerCase());
  });

  test("returns null for unsupported characters", () => {
    expect(qwerty.getAdjacentCharacter("🙂")).toBeNull();
  });
});

async function collect(
  iterable: AsyncIterable<TypeEvent>,
): Promise<TypeEvent[]> {
  const events: TypeEvent[] = [];

  for await (const event of iterable) {
    events.push(event);
  }

  return events;
}

async function expectRejects(
  run: () => Promise<unknown>,
  pattern: RegExp,
): Promise<void> {
  try {
    await run();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);

    if (error instanceof Error) {
      expect(error.message).toMatch(pattern);
      return;
    }
  }

  throw new Error(`expected rejection matching ${pattern}`);
}

function applyEvents(events: TypeEvent[]): string {
  let output = "";

  for (const event of events) {
    if (event.kind === "insert") {
      output += event.value;
      continue;
    }

    if (event.kind === "delete") {
      output = output.slice(0, -event.count);
    }
  }

  return output;
}
