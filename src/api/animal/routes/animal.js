'use strict';

/**
 * animal router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::animal.animal', {
    config: {
        find: {
            middlewares: ['api::animal.populate'],
        },
    },
});
