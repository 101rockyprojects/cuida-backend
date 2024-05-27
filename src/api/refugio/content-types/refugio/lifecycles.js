const { generateSlug } = require('../../../services/slug');

module.exports = {
    async beforeCreate(event) {
      const {data} = event.params;
      data.slug = await generateSlug("api::refugio.refugio", data);
    },
    async beforeUpdate(event) {
      const { data, where } = event.params;
      const id = where.id;
      const existingData = await strapi.entityService.findOne("api::refugio.refugio", id);
      if (existingData.nombre !== data.nombre) {
        data.slug = await generateSlug("api::refugio.refugio", data);
      }
    }
  }