'use strict';
const query = require('./query');

/**
 * `populate` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (Object.keys(ctx.request.query).length === 0) {
      const refugios = await strapi.entityService.findMany('api::refugio.refugio', query);
      const data = await Promise.all(refugios.map(async (refugio) => {
        const [mascotas, total_mascotas] = await strapi.db.query('api::animal.animal').findWithCount({
          where: {
            activo: true,
            refugio: refugio.id
          }
        });
        const total_perros = mascotas.filter(mascota => mascota.especie === 'Perro').length;
        const total_gatos = mascotas.filter(mascota => mascota.especie === 'Gato').length;

        return {
          ...refugio,
          total_mascotas,
          total_perros,
          total_gatos
        };
      }));

      ctx.body = data;
    }

    await next();
  };
};
