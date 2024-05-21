const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
  theme: {
    light: {
      colors: {
        primary100: '#F4E8E2',  // Selected
        primary600: '#F18A41', // Text Selected Left Menu
        buttonPrimary600: '#EE7015', // Button
      }
    },
    dark: {
      colors: {
        neutral0: '#202024', // Card
        neutral100: '#2B2B2F',  // Background
        primary100: '#423E4B',  // Selected
        primary600: '#F18A41', // Text Selected Left Menu
        buttonPrimary500: '#F18A41', // Button
      }
    }
  },
  translations: {
    es: {
      'app.components.LeftMenu.navbrand.title': 'Cuida',
      "global.content-manager": "Administrar contenido",
      "content-manager.plugin.name": "Administrar contenido",
      "global.plugins.content-type-builder": "Gestionar contenido",
      "global.plugins.upload.description": "Gestión de archivos multimedia.",
      "global.marketplace": "Tienda de plugins",
      "cloud.plugin.name": "Strapi Cloud",
      "app.components.LeftMenu.navbrand.workplace": "Panel de administración",
      "content-manager.api.id": "Tipo de contenido",
      "global.select-all-entries": "Selecionar todos los elementos",
      "New entry": "Nuevo elemento",
      "Settings.apiTokens.create": "Añadir elemento",
      "components.PageFooter.select": "elementos por página",
      "content-manager.HeaderLayout.button.label-add-entry": "Crear nuevo elemento",
      "content-manager.components.TableDelete.label": "{number, plural, one {# elemento seleccionado} other {# elementos seleccionados}}",
      "content-manager.containers.Edit.delete-entry": "Eliminar este elemento",
      "content-manager.containers.Edit.pluginHeader.title.new": "Crea un elemento",
      "content-manager.containers.EditView.add.new-entry": "Agregar un elemento",
      "content-manager.form.Input.pageEntries": "{ContentType}s por página",
      "content-manager.pages.ListView.header-subtitle": "{number, plural, =0 {# elementos encontrados} one {# elemento encontrado} other {# elementos encontrados}}",
      "content-manager.utils.data-loaded": "{number, plural, =1 {Cargado correctamente} other {Cargados correctamente}}",
      "content-manager.header.name": "Mi contenido",
      "content-manager.components.LeftMenu.collection-types": "Mi información",
      "app.components.EmptyStateLayout.content-document": "No se encontraron elementos aún. ¡Da el primer paso!",
      "Auth.form.welcome.title": "¡Bienvenido a Cuida!",
      "Auth.form.welcome.subtitle": "Inicia sesión y empieza a administrar tu refugio.",
      "app.components.ToggleCheckbox.off-label": "Falso",
      "app.components.ToggleCheckbox.on-label": "Verdadero"
    },
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
