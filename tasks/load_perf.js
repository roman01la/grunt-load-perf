/*
 * grunt-load-perf
 *
 *
 * Copyright (c) 2014 Roman Liutikov
 * Licensed under the MIT license.
 */

'use strict';

var net = require('net'),
    fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn,
    asset = path.join.bind(null, __dirname, '..'),
    profiles = require( asset('/config/profiles') ),
    ThrottleGroup = require('stream-throttle').ThrottleGroup;

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('load_perf', 'Grunt task for generating visual report to measure web applications loading and rendering performance.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      localHost: 'localhost',
      localPort: 9001,
      url: 'localhost',
      remotePort: 80,
      output: 'load-perf/',
      fps: 2,
      viewportWidth: 800,
      viewportHeight: 600,
      limit: 30,

      phantomScript: asset('phantomjs/bridge.js'),
    });

    var done = this.async(),
        profile = options.networkProfile,
        shotsList = [],
        limitReached = false;

    if (!profile && !options.downstream) {
      grunt.warn('Network profile or at least downstream rate should be specified!');
    }

    if (profile) {

      profile = profile.toLowerCase();

      if (profile.length === 2) {
        profile = profile.split('').reverse().join('');
      }

      if (options.cdn) {
        profile = profile + 'CDN';
      }

      profile = profiles[profile];

      if (!profile) {
        grunt.warn('Wrong network profile! Check available options!');
      }

    } else {
      profile = {};

      profile.downstream = 1024 * 8 * (options.downstream || 100);
      profile.upstream = 1024 * 8 * (options.upstream || 100);
      profile.latency = options.latency || 0;
    }

    options.url = options.url.split('://').length === 2 ?
                         options.url.split('://')[1] :
                         options.url;

    if (options.url.split('/').length >= 2) {
      options.remoteHost = options.url.split('/')[0];
      options.url = options.url.split('/');
      options.url.shift();
      options.url = '/' + options.url.join('');
    } else {
      options.remoteHost = options.url;
      options.url = '/';
    }

    var upThrottle = new ThrottleGroup({ rate: profile.upstream }),
        downThrottle = new ThrottleGroup({ rate: profile.downstream });

    var server = net.createServer({ allowHalfOpen: true }, function (local) {

      var remote = net.createConnection({
        host: options.remoteHost,
        port: options.remotePort,
        allowHalfOpen: true
      });

      var localThrottle = upThrottle.throttle(),
          remoteThrottle = downThrottle.throttle();

      local.pipe(localThrottle).pipe(remote);

      remoteThrottle.pipe(local);

      remote.on('data', function (chunk) {
        setTimeout(function() {
          remoteThrottle.write(chunk);
        }, profile.latency);
      });

      remote.on('end', function() {
        setTimeout(function() {
          remoteThrottle.end();
        }, profile.latency);
      });

    });

    server.listen(options.localPort, function() {
      var phantomjs = require('grunt-lib-phantomjs').init(grunt),
          url = 'http://localhost:' + options.localPort + options.url;

      phantomjs.spawn(url, {
        options: options,
        done: function (err) {
          if (err) return grunt.warn(err);
        }
      });

      phantomjs.on('error', function (msg) {
        grunt.log.error(msg);
      });

      phantomjs.on('console', function (msg) {
        grunt.log.writeln(msg.cyan);
      });

      phantomjs.on('screenshot', function (msg) {
        grunt.log.writeln( ('Screenshot #' + msg).green );
      });

      phantomjs.on('path', function (msg) {
        shotsList.push(msg);

        if (shotsList.length > options.limit) {

          if (!limitReached) {
            grunt.log.writeln(
              ('Too many shots has been taken, removing first from the list...').yellow );
          }

          limitReached = true;

          fs.unlink(shotsList[0], function (err) {
            if (err) return console.log(err);
            shotsList.shift();
          });

        }
      });

      phantomjs.on('done', function() {
        phantomjs.halt();

        if (!options.animation) {
          done();
        } else {

          var args = [
            '-delay', 100,
            '-loop', 0,
            path.join(__dirname + '/../' + options.output, 'scrn-*'),
            path.join(__dirname + '/../' + options.output, options.animation)
          ];

          var animation = spawn('convert', args);

          grunt.log.writeln( ('Processing images... Creating animation...').cyan );

          animation.stdout.on('end', function() {
            done();
          });

        }
      });
    });

    server.on('error', function (err) {
      grunt.fatal(err);
    });

  });

};
