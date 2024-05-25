async function getRefugioByUser(userId) {
    const representante = await strapi.entityService.findMany('api::representante.representante', {
        populate: { email: true },
        filters: {
        email: {
            id: userId
        }
        },
    });
    if (representante[0]) {
        const refugio = await strapi.entityService.findMany('api::refugio.refugio', {
            populate: { representante: true },
            filters: { 
                representante: {
                    id: representante[0].id
                }
            }
        });
        if (refugio[0]) {
            const refugioId = refugio[0].id;
            return refugioId;
        }
    }
    return null;
}

async function getAnimalsByRefugio(refugioId) {
    const mascotas = await strapi.entityService.findMany('api::animal.animal', {
      populate: { refugio: true },
      filters: {
        refugio: {
          id: refugioId
        },
        activo: true
      }
    });
    if (mascotas.length === 0) {
        return null;
    }
    return mascotas.map(mascota => mascota.id);
}

module.exports = { getRefugioByUser, getAnimalsByRefugio };