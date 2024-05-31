const { ValidationError } = require("@strapi/utils").errors;

module.exports = {
    async beforeUpdate(event) {
      const {data} = event.params;
      if (!data.datos_contacto) {
        throw new ValidationError('Por favor, agrega datos de contacto y atención');
      }
    }
  }