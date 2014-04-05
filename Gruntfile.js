/*
 * grunt-load-perf
 *
 *
 * Copyright (c) 2014 Roman Liutikov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['load-perf']
    },

    // Configuration to be run (and then tested).
    load_perf: {
      default_options: {
        options: {
            localPort: 9001,
            // url: 'localhost',
            remotePort: 9000,
            networkProfile: '2G',
            // cdn: Boolean,
            // upstream: 100,
            // downstream: 100,
            // output: 'load-perf/',
            // animation: 'load-perf.gif',
            // fps: 2,
            // viewportWidth: 800,
            // viewportHeight: 600,
            // limit: 30
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'load_perf']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
