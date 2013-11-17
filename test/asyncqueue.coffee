assert = require 'assert'
AsyncQueue = require __dirname + '/../src/asyncqueue'

fn1Finished = false
fn2Finished = false

asyncFn1 = (cb) ->
  setTimeout () ->
    fn1Finished = true
    process.nextTick cb
  , 1000

asyncFn2 = (cb) ->
  setTimeout () ->
    fn2Finished = true
    process.nextTick cb
  , 1000

describe 'AsyncQueue', () ->
  it 'Should work', (done) ->
    @timeout 3000

    asyncqueue = new AsyncQueue @

    asyncqueue.add asyncFn1

    asyncqueue.add (cb) ->
      assert.strictEqual fn1Finished, true
      assert.strictEqual fn2Finished, false
      cb?()

    asyncqueue.add asyncFn2

    asyncqueue.add (cb) ->
      assert.strictEqual fn1Finished, true
      assert.strictEqual fn2Finished, true
      cb?()

    asyncqueue.add (cb) ->
      done()