assert = require 'assert'

layout = require __dirname + '/../src/defaultkeyboardlayout'
charactergenerator = require __dirname + '/../src/charactergenerator'
charactergenerator = charactergenerator.bind undefined, layout, 0, 5

pad = '        '
text = 'This is a text being typed with zero accuracy :D'
cg = charactergenerator text
typedText = ''

type = (cb) ->
  c = cg.next()
  if c == null
    assert.strictEqual typedText, text
    cb?()
    return

  if c != '\b'
    typedText += c
  else
    typedText = typedText.substring 0, typedText.length - 1

  process.stdout.write '\r' + pad + typedText
  setTimeout () ->
    type cb
  , 100

describe 'charactergenerator', () ->
  it 'Should type the sample text', (done) ->
    @timeout 0
    process.stdout.write '\r\n'
    type () ->
      process.stdout.write '\r\n'
      done()