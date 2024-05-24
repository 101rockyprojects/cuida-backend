const { ValidationError } = require("@strapi/utils").errors;

module.exports = {
    async beforeCreate(event) {
      const {data} = event.params
      const today = new Date().toISOString().substring(0, 10);
      if (data.fecha_inicio < today) {
        data.fecha_inicio = today;
        throw new ValidationError('La fecha de inicio no puede ser anterior a la fecha actual.');
      }
      if (data.fecha_fin < today) {
        data.fecha_inicio = today;
        throw new ValidationError('La fecha final debe ser mayor a la fecha actual.');
      }
      if (data.fecha_fin < data.fecha_inicio) {
          throw new ValidationError('La fecha de inicio debe ser anterior a la fecha final.');
      }
    },
    async beforeUpdate(event) {
      const {data} = event.params
      const today = new Date().toISOString().substring(0, 10);
      if (data.fecha_inicio < today) {
        data.fecha_inicio = today;
        throw new ValidationError('La fecha de inicio no puede ser anterior a la fecha actual.');
      }
      if (data.fecha_fin < today) {
        data.fecha_inicio = today;
        throw new ValidationError('La fecha final debe ser mayor a la fecha actual.');
      }
      if (data.fecha_fin < data.fecha_inicio) {
        data.fecha_fin = data.fecha_inicio;
        throw new ValidationError('La fecha de inicio debe ser anterior a la fecha final.');
      }
    }
  }