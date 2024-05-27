'use strict';
const query = require('./query');

/**
 * `populate` middleware
 */

async function getBody(necesidades) {
  const data = await Promise.all(necesidades.map(async (necesidad) => {
    if (necesidad.tipo === 'Cirugía') {
      return {
        ...necesidad,
        total_mascotas_beneficiadas: necesidad.mascotas_beneficiadas.length
      };
    } else {
      const total_mascotas_beneficiadas = necesidad.mascotas_beneficiadas.length
      necesidad.mascotas_beneficiadas = [];
      return {
        ...necesidad,
        total_mascotas_beneficiadas
      };
    }
  }));

  return { data };
}

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (ctx.request.query.filters && ctx.request.query.filters.refugio && ctx.request.query.filters.refugio.id) {
      query.filters.refugio.id.$eq = ctx.request.query.filters.refugio.id;
      const necesidades = await strapi.entityService.findMany('api::necesidad.necesidad', query);
      ctx.body = await getBody(necesidades);
    }
    if (Object.keys(ctx.request.query).length === 0) {
      const necesidades = await strapi.entityService.findMany('api::necesidad.necesidad', query);
      ctx.body = await getBody(necesidades);
    }

    await next();
  };
};
