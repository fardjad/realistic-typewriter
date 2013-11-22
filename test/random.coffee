random = require __dirname + '/../src/random'
assert = require 'assert'

describe 'random#integerInRange', () ->
  it 'Should throw an exception when invalid arguments are specified', () ->
    assert.throws () ->
      random.integerInRange()
    , /The minimum must be specified/

    assert.throws () ->
      random.integerInRange '0'
    , /Min must be a Number/

    assert.throws () ->
      random.integerInRange 0.1
    , /Min must be an integer/

    assert.throws () ->
      random.integerInRange 0
    , /The maximum must be specified/

    assert.throws () ->
      random.integerInRange 0, '1'
    , /Max must be a Number/

    assert.throws () ->
      random.integerInRange 0, 1.1
    , /Max must be an integer/

    assert.throws () ->
      random.integerInRange 1, 0
    , /Min must be less than or equal to Max/

  it 'Should not throw any exceptions when arguments are valid', () ->
    assert.doesNotThrow () ->
      random.integerInRange 0, 1