'use strict';
const baseQuery = require('./query');
const { getQuery } = require('./../../services/sanitize');

/**
 * `populate` middleware
 */

async function getBody(animales) {
  const data = await Promise.all(animales.results.map(async (animal) => {
    if (animal.padecimientos === null) {
      animal.padecimientos = [];
    }
    return animal;
  }));

  const pagination = animales.pagination;

  return { data, pagination };
}

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const { page, pageSize } = ctx.query?.pagination || {
      page: 1,
      pageSize: 6
    };

    const query = getQuery(baseQuery);

    if (Object.keys(ctx.request.query).length === 0) {
      const animales = await strapi.entityService.findPage('api::animal.animal', {...query, page, pageSize });
      ctx.body = await getBody(animales);
    } else {
      if (ctx.request.query.filters && ctx.request.query.filters.refugio && ctx.request.query.filters.refugio.id) {
        query.filters.refugio.id.$eq = ctx.request.query.filters.refugio.id;
      }

      const animales = await strapi.entityService.findPage('api::animal.animal', {...query, page, pageSize });
      ctx.body = await getBody(animales);
    }
    
    await next()
  }
};
