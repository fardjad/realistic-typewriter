assert = require 'assert'

integerInRange = (min, max) ->
  assert.ok min?, 'The minimum must be specified'
  assert.strictEqual typeof min, 'number', 'Min must be a Number'
  assert.strictEqual ~~min, min, 'Min must be an integer'

  assert.ok max?, 'The maximum must be specified'
  assert.strictEqual typeof max, 'number', 'Max must be a Number'
  assert.strictEqual ~~max, max, 'Max must be an integer'

  assert.strictEqual min <= max, true, 'Min must be less than or equal to Max'

  return min if min == max

  return Math.floor(Math.random() * (max - min + 1)) + min;

module.exports.integerInRange = integerInRange