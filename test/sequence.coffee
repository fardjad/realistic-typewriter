assert = require 'assert'
Sequence = require __dirname + '/../src/sequence'

sequence = null
asyncCallsCount = 0

describe 'Sequence', ->
  it 'Should create an instance of Sequence', ->
    sequence = new Sequence()
    assert.ok sequence instanceof Sequence

describe 'Sequence#add', ->
  it 'Should throw an exception when no function is specified', ->
    assert.throws () ->
      sequence.add()
    , /The function must be specified/

  it 'Should queue an asynchronous function', ->
    async = (cb) ->
      setTimeout () ->
        asyncCallsCount++
        cb?()
      , 1000

    assert.doesNotThrow () ->
      sequence.add async
      sequence.add async

    assert.ok sequence._queue.length == 2
    assert.strictEqual sequence._queue[0], async
    assert.strictEqual sequence._queue[1], async

describe 'Sequence#next', ->
  it 'Should call the next function in queue', (done) ->
    @timeout 0

    sequence.next () ->
      assert.strictEqual asyncCallsCount, 1
      assert.strictEqual sequence._queue.length, 1
      sequence.next () ->
        assert.strictEqual asyncCallsCount, 2
        assert.strictEqual sequence._queue.length, 0
        done()

  it 'Should check if queue is empty', () ->
    assert.strictEqual sequence.empty(), true