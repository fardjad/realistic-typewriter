assert = require 'assert'

random = require './random'

class Typewriter
  constructor: () ->
    @_sequence = sequence.create()

  setTargetDomElement: (targetDomElement) ->
    assert.ok targetDomElement instanceof Element,
        'TargetDomElement must be an instance of Element'

    @targetDomElement = targetDomElement

  setAccuracy: (accuracy) ->
    assert.strictEqual typeof accuracy, 'number',
        'Accuracy must be a number'
    assert.ok accuracy > 0 && accuracy <= 100,
        'Accuracy must be greater than 0 and less than or equal to 100'

    @accuracy = accuracy

  setMinimumSpeed: (minimumSpeed) ->
    assert.strictEqual typeof minimumSpeed, 'number',
        'MinimumSpeed must be a number'
    assert.ok minimumSpeed > 0, 'MinimumSpeed must be greater than 0'

    if @maximumSpeed? && minimumSpeed > @maximumSpeed
      @minimumSpeed = @maximumSpeed
    else
      @minimumSpeed = minimumSpeed

  setMaximumSpeed: (maximumSpeed) ->
    assert.strictEqual typeof maximumSpeed, 'number',
        'MaximumSpeed must be a number'
    assert.ok maximumSpeed > 0, 'MaximumSpeed must be greater than 0'

    if @minimumSpeed? && @minimumSpeed > maximumSpeed
      @maximumSpeed = minimumSpeed
    else
      @maximumSpeed = maximumSpeed

  setKeyboardLayout: (keyboardLayout) ->
    assert.ok keyboardLayout instanceof Array, 'KeyboardLayout must be an Array'

    @keyboardLayout = keyboardLayout

  clear: (cb) ->
    return @

  waitRange: (millisMin, millisMax, cb) ->
    return @

  wait: (millis, cb) ->
    @waitRange millis, millis, cb

  put: (text, cb) ->
    return @

  type: (text) ->
    throw new Error 'Not Implemented!'

module.exports = Typewriter