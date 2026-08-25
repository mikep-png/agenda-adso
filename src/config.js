// Archivo: config.js
// Contiene las configuraciones generales de Agenda ADSO.
//
// La finalidad de este archivo es evitar repetir datos como la URL
// de la API o la información principal de la aplicación en diferentes archivos.

// URL base utilizada para comunicarse con JSON Server.
// Si cambia el puerto o la ruta de la API, solo se modifica este valor.
export const API_BASE_URL = "http://localhost:3002/contactos";

// Información general que utiliza la interfaz de Agenda ADSO.
// Estos datos pueden cambiarse desde un solo lugar sin modificar App.jsx.
export const APP_INFO = {
  ficha: "3223876",

  titulo: "Agenda ADSO v7",

  subtitulo:
    "Gestión de contactos conectada a una API local con JSON Server, con validaciones y mejor experiencia de usuario.",
};