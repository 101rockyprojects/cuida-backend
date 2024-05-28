'use strict';
const query = require('./query');

/**
 * `populate` middleware
 */

async function getBody(necesidades) {
  const data = await Promise.all(necesidades.results.map(async (necesidad) => {
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

  const pagination = necesidades.pagination;

  return { data, pagination };
}

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const { page, pageSize } = ctx.query?.pagination || {
      page: 1,
      pageSize: 6
    };

    if (Object.keys(ctx.request.query).length === 0) {
      const necesidades = await strapi.entityService.findPage('api::necesidad.necesidad', {...query, page, pageSize });
      ctx.body = await getBody(necesidades);
    } else {
      if (ctx.request.query.filters && ctx.request.query.filters.refugio && ctx.request.query.filters.refugio.id) {
        query.filters.refugio.id.$eq = ctx.request.query.filters.refugio.id;
      }

      const necesidades = await strapi.entityService.findPage('api::necesidad.necesidad', {...query, page, pageSize });
      ctx.body = await getBody(necesidades);
    }

    await next();
  };
};
