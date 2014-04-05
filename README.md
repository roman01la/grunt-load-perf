# grunt-load-perf

> Grunt task for generating visual report to measure web applications loading and rendering performance.

## Getting Started
This plugin is intendent to be used as loading and rendering performance measuring tool for web applications development. A list of common internet connection types provides network speed and latency simulation. They are: *Fiber*, *Cable*, *DSL*, *4G*, *3G*, *2G*.

Each of these can be specified to simulate assets delivering with or without CDN. Values used here are somewhat an averages for different location around the world. This should be enough to get relevant feedback on loading performance. You can specify custom values for `downstream`, `upstream` and `latency`.

Once started, the task will load target page and make a set of screenshots while loading, which can be converted into GIF animation. Visual report clearly shows how your application looks like while loading on different connection types. Setting up viewport size can be used for testing responsive design.

```shell
npm install grunt-load-perf --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-load-perf');
```

## The "load_perf" task

### Overview
In your project's Gruntfile, add a section named `load_perf` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  load_perf: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.url
Type: `String`
Default value: `'localhost'`

Remote test target path.

#### options.remotePort
Type: `Number`
Default value: `80`

Remote test target port.

#### options.localPort
Type: `Number`
Default value: `9001`

Port number at `localhost`.

#### options.networkProfile
Type: `String`
Default value: `undefined`

Simulate network performance with one of the available profiles.

#### options.cdn
Type: `Boolean`
Default value: `false`

Simulate CDN.

#### options.upstream
Type: `Number`
Default value: `100` Kbit/s

Custom upstream throttling.

#### options.downstream
Type: `Number`
Default value: `100` Kbit/s

Custom downstream throttling.

#### options.latency
Type: `Number`
Default value: `0`

Network latency in `ms`.

#### options.output
Type: `String`
Default value: `load-perf/`

Screenshots directory.

#### options.cwd
Type: `String`
Default value: `undefined`

Project root directory.

#### options.fps
Type: `Number`
Default value: `2`

Number of taken screenshots per second.

#### options.limit
Type: `Number`
Default value: `30`

Max number of taken screenshots.

#### options.animation
Type: `String`
Default value: `undefined`

Create GIF animation file from taken screenshots. Make sure you have `imagemagick` installed.

#### options.viewportWidth
Type: `Number`
Default value: `800`

Browser viewport width, screenshot width.

#### options.viewportHeight
Type: `Number`
Default value: `600`

Browser viewport height, screenshot height.

### Usage Examples

#### Basic usage

```js
grunt.initConfig({
  load_perf: {
    localPort: 3000,
    url: 'localhost',
    remotePort: 8080,
    networkProfile: '3G',
    cdn: true,
    output: 'perf-report/',
    animation: 'my-test.gif',
    fps: 1,
    viewportWidth: 1280,
    viewportHeight: 768,
    limit: 100
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 2014-04-05   v0.1.1   Fix animation output
- 2014-04-05   v0.1.0   Initial release

## License
Copyright (c) 2014 Roman Liutikov. Licensed under the MIT license.
