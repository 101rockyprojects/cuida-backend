const query = {
    fields: [
      'nombre',
      'slug',
      'descripcion',
      'link_facebook',
      'link_instagram',
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
        representante: {
          fields: ['nombre', 'num_contacto']
        }
    }
}

module.exports = query;