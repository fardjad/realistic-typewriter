assert = require 'assert'

Function.prototype.bind = null
require(__dirname + '/../src/bindshim')()

describe 'ES5 Function.prototype.bind Shim', () ->
  it 'Should work', () ->
    module =
      x: 81,
      getX: () ->
        @x

    getX = module.getX;
    assert.strictEqual getX(), undefined

    boundGetX = getX.bind module
    assert.strictEqual boundGetX(), 81