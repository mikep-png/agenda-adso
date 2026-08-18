const API_URL = "http://localhost:3002/contactos";

export async function listarContactos() {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los contactos");
  }

  return await respuesta.json();
}

export async function crearContacto(contacto) {
  const respuesta = await fetch(API_URL, {
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

export async function eliminarContactoPorId(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el contacto");
  }
}