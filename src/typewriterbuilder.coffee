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
      typewriter.setKeyboardLayout require './defaultkeyboardlayout'

    return typewriter
  }

module.exports = TypewriterBuilder