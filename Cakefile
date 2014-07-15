fs = require 'fs'
path = require 'path'
child_process = require 'child_process'
assert = require 'assert'

Browserify = require 'browserify'
UglifyJS = require 'uglify-js'

# coffee
COFFEE_PATH = 'coffee'
SRC_DIR = path.join __dirname, 'src'
BUILD_DIR = path.join __dirname, 'build'

# browserify
ENTRYPOINT = path.join BUILD_DIR, 'typewriterbuilder.js'
BUNDLE = path.join BUILD_DIR, 'typewriter-bundle.js'
BUNDLE_STANDALONE = path.join BUILD_DIR, 'typewriter-bundle-sa.js'

# uglify
BUNDLE_MIN = path.join BUILD_DIR, 'typewriter-bundle.min.js'
BUNDLE_STANDALONE_MIN = path.join BUILD_DIR, 'typewriter-bundle-sa.min.js'

# mocha
MOCHA_PATH = 'mocha'

# release
ZIP = path.join BUILD_DIR, 'release.zip'
README = path.join __dirname, 'README.md'
EXAMPLES_DIR = path.join __dirname, 'examples'

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
  p = child_process.spawn COFFEE_PATH,
      ['-c', '-o', BUILD_DIR, SRC_DIR], { stdio: 'inherit' }

  p.on 'close', (code) ->
    cb? code

browserify = (standalone, cb) ->
  # compile if ENTRYPOINT doesn't exist
  if !fs.existsSync(ENTRYPOINT)
    compile browserify.bind null, standalone, cb
    return;

  # standalone arg is optional
  if !cb?
    cb = standalone
    standalone = false

  b = Browserify()

  if (standalone)
    b.add ENTRYPOINT
    rstream = b.bundle { standalone: 'typewriter-standalone' }
    wstream = fs.createWriteStream BUNDLE_STANDALONE
  else
    b.require ENTRYPOINT, { expose: 'typewriter' }
    rstream = b.bundle()
    wstream = fs.createWriteStream BUNDLE

  rstream.pipe wstream
  wstream.on 'finish', cb

browserifyMin = (standalone, cb) ->
  # standalone arg is optional
  if !cb?
    cb = standalone
    standalone = false

  bundleName = (if standalone then BUNDLE_STANDALONE else BUNDLE)

  # browserify if neither BUNDLE_STANDALONE nor BUNDLE exist
  if !fs.existsSync bundleName
    browserify standalone, browserifyMin.bind null, standalone, cb
    return;

  result = UglifyJS.minify bundleName

  minBundleName = (if standalone then BUNDLE_STANDALONE_MIN else BUNDLE_MIN)
  fs.writeFile minBundleName, result.code, cb

test = (cb) ->
  p = child_process.spawn MOCHA_PATH,
      ['--compilers', 'coffee:coffee-script/register', '-R', 'spec'],
      { stdio: 'inherit' }

  p.on 'close', (code) ->
    cb? code

all = (cb) ->
  compile () ->
    browserify () ->
      browserify true, () ->
        browserifyMin () ->
          browserifyMin true, () ->
            cb?()

zip = (cb) ->
  output = fs.createWriteStream ZIP
  output.on 'close', cb

  archive = require('archiver')('zip')
  archive.on 'error', (err) ->
    throw err

  archive.pipe output

  toRelativePath = (p) ->
    return p.substring __dirname.length + 1

  addFile = (fileName) ->
    archive.append fs.createReadStream(fileName),
      name: toRelativePath fileName

  addDirectory = (dirName) ->
    walkSync dirName, addFile


  addFile README
  addFile BUNDLE
  addFile BUNDLE_MIN
  addFile BUNDLE_STANDALONE
  addFile BUNDLE_STANDALONE_MIN
  addDirectory EXAMPLES_DIR

  archive.finalize (err, bytes) ->
    throw err if err?

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

task 'browserify-sa', 'Makes a standalone Browserify bundle', () ->
  browserify true, () ->
    console.log 'Done.'

task 'browserify-min', 'Makes a minified Browserify bundle', () ->
  browserifyMin () ->
    console.log 'Done.'

task 'browserify-sa-min', 'Makes a minified standalone Browserify' +
    'bundle', () ->
  browserifyMin true, () ->
    console.log 'Done.'

task 'all', 'Compiles CoffeeScript source files and makes all targets', () ->
  all () ->
    console.log 'Done.'

task 'release', 'Creates a release zip', () ->
  all () ->
    zip () ->
      console.log 'Done.'

task 'test', 'Runs tests', () ->
  test()

task 'doc', 'Generates documentation', () ->
  throw new Error("Not Implemented");