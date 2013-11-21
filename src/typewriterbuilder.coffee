assert = require 'assert'

Typewriter = require './typewriter'

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
    assert.ok @accuracy?, 'Accuracy must be set'
    assert.ok @minimumSpeed?, 'MinimumSpeed must be set'
    assert.ok @maximumSpeed?, 'MaximumSpeed must be set'

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