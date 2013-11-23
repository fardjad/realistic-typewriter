random = require './random'

characterGenerator = (keyboardLayout, accuracy, checkInterval, text) ->
  currentIndex = -1
  typoIndex = -1
  shouldCorrect = false

  return {
    next: () ->
      if currentIndex >= text.length - 1
        # finished typing
        if typoIndex != -1
          # typos exist
          shouldCorrect = true
        else
          # all done
          return null

      if !shouldCorrect
        currentIndex++
        shouldCorrect = typoIndex != -1 and currentIndex % checkInterval == 0

        if random.integerInRange(0, 100) > accuracy
          # should make a typo
          result = keyboardLayout.getAdjacentCharacter text.charAt(currentIndex)

          if !result?
            # the character doesn't exist in keyboard layout
            return text.charAt currentIndex

          if typoIndex == -1
            typoIndex = currentIndex
            # The probability that Typewriter realize the just made typo is 1/2
            shouldCorrect = random.integerInRange(0, 1) == 1

          return result
        else
          # no typos should be made
          return text.charAt currentIndex

      if currentIndex >= typoIndex
        # delete the last character
        currentIndex--
        return '\b'

      # typos are fixed
      shouldCorrect = false
      typoIndex = -1

      return text.charAt ++currentIndex
  }

module.exports = characterGenerator