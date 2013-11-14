fs = require 'fs'
path = require 'path'
child_process = require 'child_process'
assert = require 'assert'

# constants
SRC_DIR = path.join __dirname, 'src'
BUILD_DIR = path.join __dirname, 'build'
ENTRYPOINT = path.join BUILD_DIR, 'typewriter.js'
BUNDLE = path.join BUILD_DIR, 'bundle.js'
BUNDLE_STANDALONE = path.join BUILD_DIR, 'bundle-standalone.js'

walkSync = (dir, fileAction, dirAction) ->
  items = fs.readdirSync dir
  items.forEach (item) ->
    item = path.join dir, item
    stat = fs.statSync item
    if stat.isDirectory()
      walkSync item, fileAction, dirAction
      dirAction? item
    else
      fileAction? item

clean = (cb) ->
  walkSync(BUILD_DIR, ((file) => fs.unlink(file)), ((dir) => fs.rmdir(dir)))
  cb?()

compile = (cb) ->
  p = child_process.spawn 'coffee',
                          ['-c', '-o', BUILD_DIR, SRC_DIR], { stdio: 'inherit' }

  p.on 'close', (code) ->
    cb? code

browserify = (standalone, cb) ->
  if !cb?
    cb = standalone
    standalone = undefined

  b = require('browserify')()

  if (standalone?)
    b.add ENTRYPOINT
    rstream = b.bundle { standalone: 'typewriter-standalone' }
    wstream = fs.createWriteStream BUNDLE_STANDALONE
  else
    b.require ENTRYPOINT, { expose: 'typewriter' }
    rstream = b.bundle()
    wstream = fs.createWriteStream BUNDLE

  rstream.pipe wstream
  wstream.on 'finish', cb

build = (standalone, cb) ->
  if !cb?
    cb = standalone
    standalone = undefined

  compile () ->
    browserify standalone, cb

task 'clean', \
     'Recursively Removes all files and directories in build directory', () ->
  clean () ->
    console.log 'Done.'

task 'compile', 'Compiles CoffeeScript source files', () ->
  compile () ->
    console.log 'Done.'

task 'browserify', 'Makes a Browserify bundle', () ->
  browserify () ->
    console.log 'Done.'

task 'build', 'compile + browserify', () ->
  build () ->
    console.log 'Done.'

task 'standalone', 'Compiles CoffeeScript source files and makes a standalone' +
' Browserify bundle', () ->
  build true, () ->
    console.log 'Done.'

task 'rebuild', 'clean + build', () ->
  clean () ->
    build () ->
      console.log 'Done.'

task 'minify', 'Minifies created bundle(s)', () ->
  throw new Error("Not Implemented");

task 'doc', 'Generates documentation', () ->
  throw new Error("Not Implemented");

task 'test', 'Runs tests', () ->
  throw new Error("Not Implemented");