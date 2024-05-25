async function generateSlug(contentType, data) {
    return await strapi.service('plugin::content-manager.uid').generateUIDField({
      contentTypeUID: contentType,
      field: "slug",
      data: data
    });
}

module.exports = { generateSlug };