# Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

assert = require 'assert'

module.exports = () ->
  if !Function.prototype.bind?
    Function.prototype.bind = (oThis) ->
      assert.strictEqual typeof @, 'function',
          'What is trying to be bound is not callable'

      aArgs = Array.prototype.slice.call arguments, 1
      fToBind = @
      fNOP = () ->
      fBound = () ->
        fToBind.apply (if this instanceof fNOP && oThis then @ else oThis),
            aArgs.concat Array.prototype.slice.call arguments

      fNOP.prototype = @prototype
      fBound.prototype = new fNOP()

      return fBound