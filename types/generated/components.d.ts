import type { Schema, Attribute } from '@strapi/strapi';

export interface ContactoDatosDeContacto extends Schema.Component {
  collectionName: 'components_contacto_datos_de_contactos';
  info: {
    displayName: 'Datos de contacto';
    icon: 'information';
    description: '';
  };
  attributes: {
    email: Attribute.String & Attribute.Required;
    numero: Attribute.String & Attribute.Required;
  };
}

export interface PasarelasPasarelasParaDonacion extends Schema.Component {
  collectionName: 'components_pasarelas_pasarelas_para_donaciones';
  info: {
    displayName: 'Pasarelas para donaci\u00F3n';
    icon: 'manyWays';
    description: '';
  };
  attributes: {
    nequi: Attribute.String;
    daviplata: Attribute.String;
    bancolombia: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
    paypal: Attribute.String;
  };
}

export interface RedesRedesSociales extends Schema.Component {
  collectionName: 'components_redes_redes_sociales';
  info: {
    displayName: 'Redes sociales';
    icon: 'link';
    description: '';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'contacto.datos-de-contacto': ContactoDatosDeContacto;
      'pasarelas.pasarelas-para-donacion': PasarelasPasarelasParaDonacion;
      'redes.redes-sociales': RedesRedesSociales;
    }
  }
}
