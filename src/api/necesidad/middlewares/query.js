const query = {
    fields: [
      'titulo',
      'tipo',
      'descripcion',
      'meta_dinero',
      'estado'
    ],
    filters: {
      creado: 'true',
      estado: 'Activa',
      refugio: {
        id: {
          $notNull: true,
        },
        representante: {
          id: {
            $notNull: true
          }
        },
        activo: 'true',
      }
    },
    populate: {
        refugio: {
          fields: ['nombre', 'slug'],
          populate: {
            logo: {
              fields: ['name', 'alternativeText', 'caption', 'url']
            }
          }
        }
      }
  };

module.exports = query;