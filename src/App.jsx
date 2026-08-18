import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    cargarContactos();
  }, []);

  async function cargarContactos() {
    try {
      setMensajeError("");
      const datos = await listarContactos();
      setContactos(datos);
    } catch (error) {
      setMensajeError(
        "No se pudieron cargar los contactos. Inténtalo nuevamente."
      );
    }
  }

  async function agregarContacto(nuevoContacto) {
    try {
      setMensajeError("");

      const contactoCreado = await crearContacto(nuevoContacto);

      setContactos((prev) => [...prev, contactoCreado]);

      return true;
    } catch (error) {
      setMensajeError(
        "No se pudo guardar el contacto. Inténtalo nuevamente."
      );

      return false;
    }
  }

  async function eliminarContacto(id) {
    try {
      setMensajeError("");

      await eliminarContactoPorId(id);

      setContactos((prev) =>
        prev.filter((contacto) => contacto.id !== id)
      );
    } catch (error) {
      setMensajeError(
        "No se pudo eliminar el contacto. Inténtalo nuevamente."
      );
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
          Agenda ADSO
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Gestión de contactos con React y JSON Server
        </p>

        {mensajeError && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
            {mensajeError}
          </div>
        )}

        <FormularioContacto
          onAgregar={agregarContacto}
        />

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            Contactos
          </h2>

          {contactos.length === 0 ? (
            <p className="text-gray-500">
              No hay contactos registrados.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {contactos.map((contacto) => (
                <ContactoCard
                  key={contacto.id}
                  {...contacto}
                  onEliminar={eliminarContacto}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}