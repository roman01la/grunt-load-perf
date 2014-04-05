/*
 * Network profiles
 *
 */

'use strict';

var speed = require('./speed'),
    latency = require('./latency');

module.exports = {

    fiber: {
        downstream: speed.downstream.fiber,
        upstream: speed.upstream.fiber,
        latency: latency.fiber
    },
    cable: {
        downstream: speed.downstream.cable,
        upstream: speed.upstream.cable,
        latency: latency.cable
    },
    dsl: {
        downstream: speed.downstream.dsl,
        upstream: speed.upstream.dsl,
        latency: latency.dsl
    },
    g4: {
        downstream: speed.downstream.g4,
        upstream: speed.upstream.g4,
        latency: latency.g4
    },
    g3: {
        downstream: speed.downstream.g3,
        upstream: speed.upstream.g3,
        latency: latency.g3
    },
    g2: {
        downstream: speed.downstream.g2,
        upstream: speed.upstream.g2,
        latency: latency.g2
    },

    fiberCDN: {
        downstream: speed.downstream.fiber,
        upstream: speed.upstream.fiber,
        latency: latency.fiberCDN
    },
    cableCDN: {
        downstream: speed.downstream.cable,
        upstream: speed.upstream.cable,
        latency: latency.cableCDN
    },
    dslCDN: {
        downstream: speed.downstream.dsl,
        upstream: speed.upstream.dsl,
        latency: latency.dslCDN
    },
    g4CDN: {
        downstream: speed.downstream.g4,
        upstream: speed.upstream.g4,
        latency: latency.g4CDN
    },
    g3CDN: {
        downstream: speed.downstream.g3,
        upstream: speed.upstream.g3,
        latency: latency.g3CDN
    },
    g2CDN: {
        downstream: speed.downstream.g2,
        upstream: speed.upstream.g2,
        latency: latency.g2CDN
    }

}
