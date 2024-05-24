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
      query.fields = query.fields.concat(['activo','servicios', 'nequi', 'daviplata', 'paypal']);

      const refugio = await strapi.entityService.findOne('api::refugio.refugio', id, query);
      if (!refugio.activo || !refugio.representante) {
        return ctx.badRequest('Este refugio no se encuentra activo')
      }
      const [mascotas, total_mascotas] = await strapi.db.query('api::animal.animal').findWithCount({
        where: {
          activo: true,
          refugio: id
        }
      });
      const total_perros = mascotas.filter(mascota => mascota.especie === 'Perro').length;
      const total_gatos = mascotas.filter(mascota => mascota.especie === 'Gato').length;

      ctx.body = {
        data: {
          ...refugio,
          total_mascotas,
          total_perros,
          total_gatos
        }
      };
    }

    await next();
  };
};
