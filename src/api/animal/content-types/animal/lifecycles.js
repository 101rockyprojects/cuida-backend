const { ValidationError } = require("@strapi/utils").errors;
const { getRefugioByUser } = require('../../../services/refugio');
const { generateSlug } = require('../../../services/slug');
const { isAdmin } = require('../../../services/isAdmin');

module.exports = {
    async beforeCreate(event) {
      const {data} = event.params;
      data.slug = await generateSlug("api::animal.animal", data);
      data.fotos.forEach(foto => {
        if (!foto.alternativeText) {
          throw new ValidationError('Por favor agrega un texto alternativo a todas las fotos');
        }
      });
      const userId = data.createdBy;
      const refugioId = await getRefugioByUser(userId);
      const hasPermit = isAdmin();
      if (!refugioId && !hasPermit) {
        throw new ValidationError('No se encontró un refugio asignado a este usuario');
      }
      data.refugio = { connect: refugioId };
    },
    async beforeUpdate(event) {
        const { data, where } = event.params;
        data.fotos.forEach(foto => {
          if (!foto.alternativeText) {
            throw new ValidationError('Por favor agrega un texto alternativo a todas las fotos');
          }
        });
        const id = where.id;
        const existingData = await strapi.entityService.findOne("api::animal.animal", id);
        if (existingData.nombre !== data.nombre) {
          data.slug = await generateSlug("api::animal.animal", data);
        }
    }
  }