'use strict';
const query = require('./query');

/**
 * `detail` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (Object.keys(ctx.request.query).length === 0) {
      const id = ctx.params.id ? ctx.params.id : undefined;
      const necesidad = await strapi.entityService.findOne('api::necesidad.necesidad', id, query);
      if (necesidad.estado === 'Inactiva') {
        return ctx.badRequest('Esta necesidad no se encuentra activa')
      }
      query.populate.documento_soporte = {
        fields: ['url']
      };
      query.populate.mascotas_beneficiadas = {
        fields: [
          'nombre',
          'slug',
        ],
        populate: {
          fotos: {
            fields: ['name', 'alternativeText', 'caption', 'url']
          }
        }
      };

      ctx.query = query;
    }

    await next();
  };
};
