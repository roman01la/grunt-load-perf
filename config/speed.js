/*
 * Connection speed profiles
 *
 * Average values from the internet
 */

'use strict';

var Kbit = 1024 * 8,
    Mbit = 1024 * Kbit,
    Gbit = 1024 * Mbit;

module.exports = {

    downstream: {
        fiber: 100 * Mbit,
        cable: 30  * Mbit,
        dsl:   5   * Mbit,
        g4:    3.5 * Mbit,
        g3:    0.5 * Mbit,
        g2:    128 * Kbit
    },

    upstream: {
        fiber: 100 * Mbit,
        cable: 5   * Mbit,
        dsl:   2   * Mbit,
        g4:    40  * Kbit,
        g3:    25  * Kbit,
        g2:    16  * Kbit
    }

};
