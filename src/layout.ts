export type KeyboardLayout = {
  getAdjacentCharacter(character: string): string | null;
};

export function createKeyboardLayout(
  rows: readonly (readonly string[])[],
): KeyboardLayout {
  return {
    getAdjacentCharacter(character: string): string | null {
      const normalizedCharacter = character.toLowerCase();

      for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
        const row = rows[rowIndex];

        for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
          if (row[columnIndex].toLowerCase() !== normalizedCharacter) {
            continue;
          }

          const adjacent = pickAdjacentCharacter(rows, rowIndex, columnIndex);

          if (adjacent === null) {
            return null;
          }

          return character === normalizedCharacter
            ? adjacent.toLowerCase()
            : adjacent;
        }
      }

      return null;
    },
  };
}

function pickAdjacentCharacter(
  rows: readonly (readonly string[])[],
  rowIndex: number,
  columnIndex: number,
): string | null {
  const rowOffset = integerInRange(-1, 1);
  let adjacentRowIndex = rowIndex + rowOffset;

  if (adjacentRowIndex >= rows.length || adjacentRowIndex < 0) {
    adjacentRowIndex += -2 * rowOffset;
  }

  const adjacentRow = rows[adjacentRowIndex];
  let safeColumnIndex = columnIndex;

  if (safeColumnIndex >= adjacentRow.length) {
    safeColumnIndex = adjacentRow.length - 1;
  }

  const columnOffset =
    rowOffset === 0 ? [-1, 1][integerInRange(0, 1)] : integerInRange(-1, 1);
  let adjacentColumnIndex = safeColumnIndex + columnOffset;

  if (adjacentColumnIndex >= adjacentRow.length || adjacentColumnIndex < 0) {
    adjacentColumnIndex += -2 * columnOffset;
  }

  const adjacentCharacter = adjacentRow[adjacentColumnIndex];

  if (adjacentCharacter === "") {
    return pickAdjacentCharacter(rows, rowIndex, columnIndex);
  }

  return adjacentCharacter;
}

function integerInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
