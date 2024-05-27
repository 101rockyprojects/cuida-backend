const query = {
    fields: [
      'nombre',
      'slug',
      'descripcion',
    ],
    filters: {
      activo: 'true',
      representante: {
        id: {
          $notNull: true,
        }
      }
    },
    populate: {
        logo: {
          fields: ['name', 'alternativeText', 'caption', 'url']
        },
        redes: {
          fields: ['facebook', 'instagram']
        }
    }
}

module.exports = query;