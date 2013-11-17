assert = require 'assert'

class Typewriter
  setTargetDomElement: (targetDomElement) ->
    assert.strictEqual targetDomElement instanceof Element, true,
        'TargetDomElement must be an instance of Element'

    @targetDomElement = targetDomElement

  setAccuracy: (accuracy) ->
    assert.strictEqual typeof accuracy, 'number',
        'Accuracy must be a number'
    assert.strictEqual accuracy > 0 && accuracy <= 100, true,
        'Accuracy must be greater than 0 and less than or equal to 100'

    @accuracy = accuracy

  setMinimumSpeed: (minimumSpeed) ->
    assert.strictEqual typeof minimumSpeed, 'number',
        'MinimumSpeed must be a number'
    assert.strictEqual minimumSpeed > 0, true,
        'MinimumSpeed must be greater than 0'

    @minimumSpeed = minimumSpeed

  setMaximumSpeed: (maximumSpeed) ->
    assert.strictEqual typeof maximumSpeed, 'number',
        'MaximumSpeed must be a number'
    assert.strictEqual maximumSpeed > 0, true,
        'MaximumSpeed must be greater than 0'

    if @minimumSpeed? && @minimumSpeed > maximumSpeed
      @maximumSpeed = minimumSpeed
    else
      @maximumSpeed = maximumSpeed

  setKeyboardLayout: (keyboardLayout) ->
    assert.strictEqual keyboardLayout instanceof Array, true,
        'KeyboardLayout must be an Array'

    @keyboardLayout = keyboardLayout



TypewriterBuilder = (targetDomElement) ->
  typewriter = new Typewriter()
  typewriter.setTargetDomElement targetDomElement

  return {
    withAccuracy: (@accuracy) ->
      typewriter.setAccuracy @accuracy
      return @
    withMinimumSpeed: (@minimumSpeed) ->
      typewriter.setMinimumSpeed @minimumSpeed
      return @
    withMaximumSpeed: (@maximumSpeed) ->
      typewriter.setMaximumSpeed @maximumSpeed
      return @
    withKeyboardLayout: (@keyboardLayout) ->
      typewriter.setKeyboardLayout @keyboardLayout
      return @
    build: () ->
      assert.strictEqual @accuracy?, true, 'Accuracy must be set'
      assert.strictEqual @minimumSpeed?, true, 'MinimumSpeed must be set'
      assert.strictEqual @maximumSpeed?, true, 'MaximumSpeed must be set'

      if !@keyboardLayout?
        typewriter.setKeyboardLayout [
          ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
          ['' , 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
          ['' , 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
          ['' , 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
        ]

      return typewriter
  }

module.exports = TypewriterBuilder