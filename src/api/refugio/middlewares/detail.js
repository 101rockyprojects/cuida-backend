'use strict';
const query = require('./query');
const { objectToArray } = require('../../services/ArrayParse');

/**
 * `detail` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (Object.keys(ctx.request.query).length === 0) {
      const id = ctx.params.id ? ctx.params.id : undefined;
      query.fields = query.fields.concat(['activo','servicios']);
      query.populate = {
        ...query.populate,
        fotos: {
          fields: ['name', 'alternativeText', 'caption', 'url']
        },
        pasarelas: {
          fields: ['nequi', 'daviplata', 'bancolombia', 'paypal']
        },
        representante: {
          populate: {
            datos_contacto: {
              fields: ['email', 'numero']
            }
          }
        }
      }

      const refugio = await strapi.entityService.findOne('api::refugio.refugio', id, query);
      if (!refugio) {
        return ctx.notFound();
      }
      if (!refugio.activo || !refugio.representante) {
        return ctx.badRequest('Este refugio no se encuentra activo')
      }
      if (!refugio.fotos) {
        refugio.fotos = [];
      }

      const email = refugio.representante.datos_contacto.email;
      const whatsapp = refugio.representante.datos_contacto.numero;

      delete refugio.representante;

      const redes = objectToArray(refugio.redes, 'redSocial', 'url');
      const pasarelas = objectToArray(refugio.pasarelas, 'metodo', 'numCuenta');

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
          email,
          whatsapp,
          redes,
          pasarelas,
          total_mascotas,
          total_perros,
          total_gatos
        }
      };
    }

    await next();
  };
};
