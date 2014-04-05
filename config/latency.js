/*
 * Connection latency profiles based on data provided by Ilya Grigorik in his article “Why is my CDN 'slow' for mobile clients?”
 * <http://www.igvita.com/2014/03/26/why-is-my-cdn-slow-for-mobile-clients/>
 *
 * Latency = last-mile + coast-to-coast + server response + coast-to-coast + last-mile
 *
 * Server response time is excluded here ( -50ms without and -5ms with CDN ),
 * instead testable application server time is used.
 */

'use strict';

module.exports = {

    fiber: 136,
    cable: 152,
    dsl: 188,
    g4: 200,
    g3: 500,
    g2: 700,

    fiberCDN: 46,
    cableCDN: 62,
    dslCDN: 98,
    g4CDN: 110,
    g3CDN: 410,
    g2CDN: 560

};
