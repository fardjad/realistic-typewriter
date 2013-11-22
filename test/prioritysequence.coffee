assert = require 'assert'

PrioritySequence = require __dirname + '/../src/prioritysequence'

logs = []
testConsole =
  log: (message) ->
    logs.push message

check = (() ->
  values = ['1','2','3','4','5','6','7','8','9','10']
  return () ->
    return logs.shift() == values.shift()
)()

class PSTest
  constructor: (@console) ->
    @_prioritySequence = new PrioritySequence () =>
      @_sequenceLevel = 0

  check: () ->
    assert.ok check()

  print: (text, cb) ->
    if cb?
      shadow = Object.create @
      shadow._sequenceLevel = @_sequenceLevel

    @_prioritySequence.then @_sequenceLevel, (next) =>
      @console.log text
      cb?.call shadow
      next()

    @_sequenceLevel++ if cb?
    return @ if !cb? or @hasOwnProperty '_prioritySequence'

  wait: (millis, cb) ->
    if cb?
      shadow = Object.create @
      shadow._sequenceLevel = @_sequenceLevel

    @_prioritySequence.then @_sequenceLevel, (next) =>
      setTimeout () =>
        cb?.call shadow
        next()
      , millis

    @_sequenceLevel++ if cb?
    return @ if !cb? or @hasOwnProperty '_prioritySequence'

pstest = new PSTest testConsole

describe 'PrioritySequence', () ->
  it 'Should work with the PSTest class', (done) ->
    @timeout 0
    pstest.wait(1000).print('1', () ->
      @wait(1000).print('2').wait(1000).print('3').wait(1000).print('4', () ->
        @wait(1000).print('5').wait(1000).print('6', () ->
          @wait(1000).print('7').wait(1000).print('8')
        )
      )
    ).wait(1000).print('9').wait(1000).print('10', done)