assert = require 'assert'

PrioritySequence = require './prioritysequence'
random = require './random'
charactergenerator = require './charactergenerator'

class Typewriter
  constructor: () ->
    @_prioritySequence = new PrioritySequence () =>
      @_sequenceLevel = 0

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
    assert.strictEqual typeof keyboardLayout.getAdjacentCharacter, 'function',
        'KeyboardLayout must have an exported getAdjacentCharacter method'

    @keyboardLayout = keyboardLayout

  _makeChainable: (cb, fn) ->
    shadow = Object.create @
    shadow._sequenceLevel = @._sequenceLevel

    @_prioritySequence.then @_sequenceLevel, (next) ->
      process.nextTick () ->
        fn () ->
          cb?.call shadow
          next()

    @_sequenceLevel++ if cb?
    return @ if !cb? or @hasOwnProperty '_prioritySequence'

  clear: (cb) ->
    return @_makeChainable cb, (done) =>
      while (child = @targetDomElement.lastChild)?
        @targetDomElement.removeChild child
      done()

  waitRange: (millisMin, millisMax, cb) ->
    return @_makeChainable cb, (done) =>
      setTimeout done, random.integerInRange millisMin, millisMax

  wait: (millis, cb) ->
    @waitRange millis, millis, cb

  put: (text, cb) ->
    return @_makeChainable cb, (done) =>
      element = document.createElement 'div'
      element.innerHTML = text
      while (child = element.firstChild)?
        @targetDomElement.appendChild child
      done()

  delete: (cb) ->
    return @_makeChainable cb, (done) =>
      @targetDomElement.removeChild @targetDomElement.lastChild
      done()

  type: (text, cb) ->
    checkInterval = (@minimumSpeed + @maximumSpeed) / 2
    gen = charactergenerator @keyboardLayout, @accuracy, checkInterval,
        text

    while (char = gen.next()) != null
      if char != '\b'
        @put char
      else
        @delete()
      @waitRange ~~(1000 / @maximumSpeed), ~~(1000 / @minimumSpeed)

    return @wait 0, cb

module.exports = Typewriter