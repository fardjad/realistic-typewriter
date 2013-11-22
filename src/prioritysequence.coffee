assert = require 'assert'
Sequence = require './sequence'

class PrioritySequence
  constructor: (@onWait) ->
    @_sequences = []

    @_waiting = true
    @onWait?()

  _next: () ->
    sequence = null
    for s in @_sequences
      if s?
        continue if s.empty()
        sequence = s
        break

    if sequence?
      sequence.next @_next.bind @
    else
      @_sequences = []
      @_waiting = true
      @onWait?()

  then: (priority, fn) ->
    assert.ok priority?, 'The priority must be specified'
    assert.strictEqual typeof priority, 'number', 'Priority must be a number'
    assert.strictEqual ~~priority, priority, 'Priority must be an integer'
    assert.ok priority >= 0, 'Priority must be a positive integer'

    assert.ok fn?, 'The function must be specified'

    if !@_sequences[priority]?
      @_sequences[priority] = new Sequence()

    @_sequences[priority].add fn

    if @_waiting
      @_waiting = false
      @_next()

module.exports = PrioritySequence