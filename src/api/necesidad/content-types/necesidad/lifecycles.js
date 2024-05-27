const { ValidationError } = require("@strapi/utils").errors;
const { getRefugioByUser } = require('../../../services/refugio');
const { isAdmin } = require('../../../services/isAdmin');

function validateDates(fecha_inicio, fecha_fin) {
  const today = new Date().toISOString().substring(0, 10);
  if (fecha_inicio < today) {
    fecha_inicio = today;
    throw new ValidationError('La fecha de inicio no puede ser anterior a la fecha actual.');
  }
  if (fecha_fin < today) {
    fecha_inicio = today;
    throw new ValidationError('La fecha final debe ser mayor a la fecha actual.');
  }
  if (fecha_fin < fecha_inicio) {
      throw new ValidationError('La fecha de inicio debe ser anterior a la fecha final.');
  }
}

module.exports = {
    async beforeCreate(event) {
      const {data} = event.params
      validateDates(data.fecha_inicio, data.fecha_fin);
      const userId = data.createdBy;
      const refugioId = await getRefugioByUser(userId);
      const hasPermit = isAdmin();
      if (!refugioId && !hasPermit) {
        throw new ValidationError('No se encontró un refugio asignado a este usuario');
      }
      if (data.mascotas_beneficiadas.connect.length === 0 && data.tipo === 'Cirugía') {
        throw new ValidationError('Por favor agrega la mascota o las mascotas que se beneficiarán de la cirugía');
      }
      data.refugio = { connect: refugioId };
      data.estado = 'Activa';
    },
    async beforeUpdate(event) {
      const {data} = event.params
      validateDates(data.fecha_inicio, data.fecha_fin);
    }
  }