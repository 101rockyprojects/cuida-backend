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
        },
        pasarelas: {
          fields: ['nequi', 'daviplata', 'bancolombia', 'paypal']
        }
    }
}

module.exports = query;