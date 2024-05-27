function isAdmin() {
    const ctx = strapi.requestContext.get();
    const isAdmin = ctx.state.user.roles.some(rol => rol.code === 'strapi-super-admin');
    return isAdmin;
}

module.exports = { isAdmin }