// Archivo: api.js

// Contiene las funciones encargadas de comunicarse con JSON Server.
//
// La responsabilidad de este archivo es separar las peticiones HTTP
// de la interfaz de React. De esta manera, App.jsx no necesita
// manejar directamente las solicitudes GET, POST, PUT y DELETE.

// Importamos la URL centralizada desde config.js.
// Esto evita repetir la dirección de la API en cada función.

import { API_BASE_URL } from "./config";

// ---------------------------------------------------------
// LISTAR CONTACTOS
// ---------------------------------------------------------

// Realiza una petición GET para obtener todos los contactos.

export async function listarContactos() {
  const respuesta = await fetch(API_BASE_URL);

  // Verificamos que la API haya respondido correctamente.
  // Si ocurre un error HTTP, lanzamos una excepción para que
  // App.jsx pueda manejarla mediante try/catch.

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los contactos");
  }

  // Convertimos la respuesta de la API de JSON a un objeto JavaScript.

  return await respuesta.json();
}

// ---------------------------------------------------------
// CREAR CONTACTO
// ---------------------------------------------------------

// Envía un nuevo contacto mediante una petición POST.

export async function crearContacto(contacto) {
  const respuesta = await fetch(API_BASE_URL, {
    method: "POST",

    // Indicamos que los datos enviados están en formato JSON.

    headers: {
      "Content-Type": "application/json",
    },

    // Convertimos el objeto JavaScript a una cadena JSON.

    body: JSON.stringify(contacto),
  });

  // Comprobamos si la API respondió correctamente.

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el contacto");
  }

  // Retornamos el contacto creado por JSON Server.
  // La respuesta incluye el ID generado por el servidor.

  return await respuesta.json();
}

// ---------------------------------------------------------
// ACTUALIZAR CONTACTO
// ---------------------------------------------------------

// Actualiza un contacto existente utilizando una petición PUT.
// Recibe el ID del contacto y los nuevos datos.

export async function actualizarContacto(id, data) {
  // Construimos la URL utilizando el ID del contacto.

  const respuesta = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",

    // Indicamos que los datos enviados están en formato JSON.

    headers: {
      "Content-Type": "application/json",
    },

    // Convertimos el objeto JavaScript a una cadena JSON.

    body: JSON.stringify(data),
  });

  // Si la API responde con un error, informamos mediante una excepción.

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar el contacto");
  }

  // Retornamos el contacto actualizado por JSON Server.

  return await respuesta.json();
}

// ---------------------------------------------------------
// ELIMINAR CONTACTO
// ---------------------------------------------------------

// Elimina un contacto utilizando su identificador.

export async function eliminarContactoPorId(id) {
  // Construimos la URL utilizando el ID del contacto.

  const respuesta = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  // Si la API responde con un error, informamos mediante una excepción.

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el contacto");
  }

  // Indicamos que la eliminación se realizó correctamente.

  return true;
}