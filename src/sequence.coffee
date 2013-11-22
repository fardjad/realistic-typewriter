assert = require 'assert'

class Sequence
  constructor: () ->
    @_queue = []

  next: (cb) ->
    if !@empty()
      fn = @_queue.shift()
      fn cb

  add: (fn) ->
    assert.ok fn?, 'The function must be specified'
    @_queue.push fn

  empty: () ->
    return @_queue.length == 0

module.exports = Sequence