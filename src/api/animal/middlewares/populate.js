'use strict';
const query = require('./query');

/**
 * `populate` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (Object.keys(ctx.request.query).length === 0) {
      ctx.query = query;
    }
  
    await next()
  }
};
