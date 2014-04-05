'use strict';

var fs = require('fs');

// The temporary file used for communications.
var tmpfile = phantom.args[0];
// The page URL to load.
var url = phantom.args[1];
// Extra, optionally overridable stuff.
var options = JSON.parse(phantom.args[2] || {});

// Messages are sent to the parent by appending them to the tempfile.
// NOTE, the tempfile appears to be shared between asynchronously running grunt tasks
var sendMessage = function (arg) {
    var args = Array.isArray(arg) ? arg : [].slice.call(arguments);
    var channel = args[0];
    args[0] = channel;
    fs.write(tmpfile, JSON.stringify(args) + '\n', 'a');
};

var shotsCount = 0,
    shotsRate = 1000 / options.fps,
    shotsRunnerId;

// This allows grunt to abort if the PhantomJS version isn't adequate.
sendMessage('private', 'version', phantom.version);

// Create a new page.
var page = require('webpage').create();

page.viewportSize = {
    width: options.viewportWidth,
    height: options.viewportHeight
};

page.onError = function (msg, trace) {
    sendMessage('error', msg, trace);
};

page.onLoadStarted = function() {
  page.injectJs('../inject/phantom-script.js');
  sendMessage('console', 'Page loading... Taking screenshots...');

  shotsRunnerId = setInterval(function() {
    var name = 'scrn-' + Date.now() + '.jpg',
        path = options.output + name;

    shotsCount++;

    page.render(path, { format: 'jpg', quality: 80 });
    sendMessage('screenshot', shotsCount);
    sendMessage('path', path);
  }, shotsRate);
};

page.onLoadFinished = function() {
  sendMessage('console', 'Page loaded... Taking last screenshot...');

  setTimeout(function() {
    clearInterval(shotsRunnerId);

    sendMessage('console', 'Done. Exiting PhantomJS...');
    sendMessage('done');

    phantom.exit();
  }, shotsRate);
};

page.open(url);
