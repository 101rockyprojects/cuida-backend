'use strict';
const query = require('./query');

/**
 * `populate` middleware
 */

async function getBody(animales) {
  const data = await Promise.all(animales.map(async (animal) => {
    if (animal.padecimientos === null) {
      animal.padecimientos = {};
    }
    return animal;
  }));
  return { data };
}

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (ctx.request.query.filters && ctx.request.query.filters.refugio && ctx.request.query.filters.refugio.id) {
      query.filters.refugio.id.$eq = ctx.request.query.filters.refugio.id;
      const animales = await strapi.entityService.findMany('api::animal.animal', query);
      ctx.body = await getBody(animales);
    }
    if (Object.keys(ctx.request.query).length === 0) {
      const animales = await strapi.entityService.findMany('api::animal.animal', query);
      ctx.body = await getBody(animales);
    }
    
    await next()
  }
};
