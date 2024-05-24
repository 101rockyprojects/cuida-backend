'use strict';

/**
 * refugio router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::refugio.refugio', {
    config: {
        find: {
            middlewares: ['api::refugio.populate'],
        },
        findOne: {
            middlewares: ['api::refugio.detail'],
        },
    },
});
