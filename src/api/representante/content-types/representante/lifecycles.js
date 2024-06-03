const { ValidationError } = require("@strapi/utils").errors;

module.exports = {
    async beforeUpdate(event) {
      const { data, where } = event.params;
      const id = where.id;
      const existingData = await strapi.entityService.findOne('api::representante.representante', id, {
              populate: ['datos_contacto'],
      });
      if (existingData.datos_contacto.email === null || existingData.datos_contacto.numero === null) {
        throw new ValidationError('Por favor, agrega datos de contacto y atención');
      }
    }
  }