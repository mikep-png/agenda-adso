// Archivo: App.jsx
// Componente principal de Agenda ADSO.
//
// Se encarga de:
// - Mantener la lista de contactos.
// - Cargar los contactos desde la API.
// - Crear nuevos contactos.
// - Eliminar contactos.
// - Mostrar errores relacionados con la API.
// - Coordinar FormularioContacto y ContactoCard.
//
// La información general de la aplicación se obtiene desde config.js
// para evitar tener textos y configuraciones repetidas en este componente.

import { useEffect, useState } from "react";

// Importamos las funciones responsables de comunicarse con JSON Server.
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la información general centralizada de la aplicación.
import { APP_INFO } from "./config";

// Importamos los componentes utilizados por App.
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Estado que almacena todos los contactos obtenidos desde la API.
  const [contactos, setContactos] = useState([]);

  // Estado utilizado para mostrar mensajes cuando ocurre
  // un problema durante la comunicación con la API.
  const [mensajeError, setMensajeError] = useState("");

  // ---------------------------------------------------------
  // CARGAR CONTACTOS
  // ---------------------------------------------------------

  // useEffect ejecuta la carga inicial cuando se monta el componente.
  useEffect(() => {
    async function cargarContactos() {
      try {
        // Solicitamos los contactos mediante la función de api.js.
        const datos = await listarContactos();

        // Guardamos los datos recibidos en el estado.
        setContactos(datos);
      } catch (error) {
        // Mostramos un mensaje amigable sin exponer detalles técnicos.
        setMensajeError(
          "No fue posible cargar los contactos. Verifica que el servidor esté activo."
        );
      }
    }

    cargarContactos();
  }, []);

  // ---------------------------------------------------------
  // AGREGAR CONTACTO
  // ---------------------------------------------------------

  // Recibe un contacto desde FormularioContacto y lo envía a la API.
  async function agregarContacto(nuevoContacto) {
    try {
      // Limpiamos cualquier mensaje anterior.
      setMensajeError("");

      // Enviamos el contacto mediante una petición POST.
      const contactoCreado = await crearContacto(nuevoContacto);

      // Agregamos el contacto creado a la lista actual.
      setContactos((contactosActuales) => [
        ...contactosActuales,
        contactoCreado,
      ]);

      // Informamos al formulario que la operación fue exitosa.
      return true;
    } catch (error) {
      // Si la API falla, mostramos un mensaje comprensible para el usuario.
      setMensajeError(
        "Ocurrió un problema al guardar el contacto. Inténtalo nuevamente."
      );

      // Informamos al formulario que ocurrió un error.
      return false;
    }
  }

  // ---------------------------------------------------------
  // ELIMINAR CONTACTO
  // ---------------------------------------------------------

  // Elimina un contacto utilizando su ID.
  async function eliminarContacto(id) {
    try {
      // Eliminamos mensajes anteriores.
      setMensajeError("");

      // Realizamos la petición DELETE.
      await eliminarContactoPorId(id);

      // Quitamos el contacto eliminado del estado.
      setContactos((contactosActuales) =>
        contactosActuales.filter((contacto) => contacto.id !== id)
      );
    } catch (error) {
      // Mostramos un mensaje amigable si la eliminación falla.
      setMensajeError(
        "No fue posible eliminar el contacto. Inténtalo nuevamente."
      );
    }
  }

  // ---------------------------------------------------------
  // INTERFAZ
  // ---------------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* 
          Encabezado de la aplicación.
          Los textos se obtienen desde APP_INFO para centralizar
          la configuración y facilitar futuros cambios.
        */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {/* 
          Mensaje general para errores producidos por la API.
          Solo aparece cuando mensajeError contiene información.
        */}
        {mensajeError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {mensajeError}
          </div>
        )}

        {/* 
          Formulario encargado de validar y crear contactos.
          La función agregarContacto se entrega mediante props.
        */}
        <FormularioContacto onAgregar={agregarContacto} />

        {/* -------------------------------------------------
            LISTA DE CONTACTOS
        -------------------------------------------------- */}

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            Contactos
          </h2>

          {/* Si no existen contactos mostramos un mensaje. */}
          {contactos.length === 0 ? (
            <p className="text-gray-500">
              No hay contactos registrados.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {/* 
                map() recorre los contactos y crea una tarjeta
                independiente para cada registro.
              */}
              {contactos.map((contacto) => (
                <ContactoCard
                  key={contacto.id}
                  nombre={contacto.nombre}
                  telefono={contacto.telefono}
                  correo={contacto.correo}
                  empresa={contacto.empresa}
                  etiqueta={contacto.etiqueta}
                  onEliminar={() => eliminarContacto(contacto.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}