const query = {
    fields: [
      'titulo',
      'tipo',
      'descripcion',
      'fecha_inicio',
      'fecha_fin',
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
        documento_soporte: {
          fields: ['url']
        },
        refugio: {
          fields: ['nombre', 'slug'],
          populate: {
            logo: {
              fields: ['name', 'alternativeText', 'caption', 'url']
            }
          }
        },
        mascotas_beneficiadas: {
          fields: ['nombre', 'slug']
        }
      }
  };

module.exports = query;