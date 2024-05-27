'use strict';
const query = require('./query');
const { objectToArray } = require('../../services/ArrayParse');

/**
 * `populate` middleware
 */

async function getBody(refugios) {
  const data = await Promise.all(refugios.map(async (refugio) => {
    refugio.redes = objectToArray(refugio.redes, 'redSocial', 'url');
    refugio.pasarelas = objectToArray(refugio.pasarelas, 'metodo', 'numCuenta');
    
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

  return { data };
}

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (Object.keys(ctx.request.query).length === 0) {
      const refugios = await strapi.entityService.findMany('api::refugio.refugio', query);

      ctx.body = await getBody(refugios);
    }

    await next();
  };
};
