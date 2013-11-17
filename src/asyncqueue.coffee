require('./bindshim')()

class AsyncQueue
  constructor: (@context) ->
    @queue = []

  next: () ->
    if @queue.length > 0
      fn = @queue.shift()
      fn.call @context, @next.bind @

  add: (fn) ->
    @queue.push fn

    # invoke next for first call in chain
    if @queue.length == 1
      process.nextTick @next.bind @

module.exports = AsyncQueue