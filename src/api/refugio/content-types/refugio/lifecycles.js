const { generateSlug } = require('../../../services/slug');

module.exports = {
    async beforeCreate(event) {
      const {data} = event.params;
      data.slug = await generateSlug("api::refugio.refugio", data);
    },
    async beforeUpdate(event) {
        const {data} = event.params;
        data.slug = await generateSlug("api::refugio.refugio", data);
    }
  }