const query = {
    fields: [
      'nombre',
      'slug',
      'sexo',
      'peso',
      'edad',
      'especie',
      'personalidad',
      'historia',
      'esterilizado',
      'padecimientos',
      'estado'
    ],
    filters: {
      activo: 'true',
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
        fotos: {
          fields: ['name', 'alternativeText', 'caption', 'url'],
        },
        refugio: {
          fields: ['nombre', 'slug'],
          populate: {
            logo: {
              fields: ['name', 'alternativeText', 'caption', 'url']
            },
            representante: {
              fields: ['num_contacto']
            }
          }
        }
      }
  };

module.exports = query;