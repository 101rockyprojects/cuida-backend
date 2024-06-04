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
        populate: {
          representante: {
            id: {
              $notNull: true
            }
          },
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
              populate:{
                datos_contacto: {
                  fields: ['email', 'numero']
                }
              }
            }
          }
        }
      },
      sort: {
        updatedAt: 'desc'
      },
  };

module.exports = query;