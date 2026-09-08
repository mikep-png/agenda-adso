// Archivo: api.js
// Contiene todas las funciones encargadas de comunicarse
// con la API de JSON Server.

// Importamos la URL centralizada desde config.js.
import { API_BASE_URL } from "./config";

// ---------------------------------------------------------
// LISTAR CONTACTOS
// ---------------------------------------------------------
// Obtiene todos los contactos mediante una petición GET.
export async function listarContactos() {
  const respuesta = await fetch(API_BASE_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los contactos");
  }

  return await respuesta.json();
}

// ---------------------------------------------------------
// CREAR CONTACTO
// ---------------------------------------------------------
// Envía un nuevo contacto mediante POST.
export async function crearContacto(contacto) {
  const respuesta = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contacto),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el contacto");
  }

  return await respuesta.json();
}

// ---------------------------------------------------------
// ACTUALIZAR CONTACTO
// ---------------------------------------------------------
// Actualiza un contacto existente mediante PUT.
export async function actualizarContacto(id, data) {
  const respuesta = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!respuesta.ok) {
    throw new Error("Error al actualizar el contacto");
  }

  return await respuesta.json();
}

// ---------------------------------------------------------
// ELIMINAR CONTACTO
// ---------------------------------------------------------
// Elimina un contacto mediante su ID.
export async function eliminarContactoPorId(id) {
  const respuesta = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el contacto");
  }

  return true;
}