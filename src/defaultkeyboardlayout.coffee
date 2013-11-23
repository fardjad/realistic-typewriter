random = require './random'

layout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['' , 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['' , 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
  ['' , 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
]

isLowerCase = (character) ->
  character == character.toLowerCase()

getAdjacentCharacter = (character) ->
  for row in [0...layout.length] by 1
    for col in [0...layout[row].length] by 1
      if layout[row][col].toLowerCase() != character.toLowerCase()
        continue

      randomNumber = random.integerInRange -1, 1
      adjacentRow = row + randomNumber

      if adjacentRow >= layout.length or adjacentRow < 0
        adjacentRow += -2 * randomNumber

      if col >= layout[adjacentRow].length
        col = layout[adjacentRow].length - 1

      if randomNumber == 0
        # row didn't change
        randomNumber = [-1, 1][random.integerInRange 0, 1] # -1 or 1
      else
        randomNumber = random.integerInRange -1, 1

      adjacentCol = col + randomNumber

      if adjacentCol >= layout[adjacentRow].length or adjacentCol < 0
        adjacentCol += -2 * randomNumber

      adjacentCharacter = layout[adjacentRow][adjacentCol]

      if adjacentCharacter == ''
        return getAdjacentCharacter character

      if isLowerCase character
        return adjacentCharacter.toLowerCase()

      return adjacentCharacter

  return null

module.exports.getAdjacentCharacter = getAdjacentCharacter