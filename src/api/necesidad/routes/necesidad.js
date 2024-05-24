'use strict';

/**
 * necesidad router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::necesidad.necesidad', {
    config: {
        find: {
            middlewares: ['api::necesidad.populate'],
        },
        findOne: {
            middlewares: ['api::necesidad.detail'],
        },
    },
});
