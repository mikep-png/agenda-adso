const API = "http://localhost:3002/contactos";

export async function listarContactos() {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Error al listar contactos");
  }

  return res.json();
}

export async function crearContacto(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear el contacto");
  }

  return res.json();
}

export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el contacto");
  }

  return true;
}