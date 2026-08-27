// Importamos los hooks necesarios de React.
import { useEffect, useState } from "react";

// Importamos las funciones encargadas de comunicarse con la API.
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la información general de la aplicación.
import { APP_INFO } from "./config";

// Importamos los componentes de la interfaz.
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Estado principal que almacena los contactos obtenidos desde la API.
  const [contactos, setContactos] = useState([]);

  // Estado para controlar la carga inicial de los contactos.
  const [cargando, setCargando] = useState(true);

  // Estado para mostrar errores relacionados con la comunicación con la API.
  const [errorApi, setErrorApi] = useState("");

  // Estado para controlar el término escrito en el buscador.
  const [busqueda, setBusqueda] = useState("");

  // Estado que determina la dirección del ordenamiento.
  // true = A-Z | false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Al cargar la aplicación, obtenemos los contactos desde JSON Server.
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setErrorApi("");

        const datos = await listarContactos();

        setContactos(datos);
      } catch (error) {
        // Mostramos un mensaje amigable sin exponer detalles técnicos.
        setErrorApi(
          "No fue posible cargar los contactos. Verifica que la API esté disponible."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarContactos();
  }, []);

  // Crea un contacto y actualiza la lista cuando la API responde correctamente.
  async function onAgregarContacto(nuevoContacto) {
    try {
      setErrorApi("");

      const contactoCreado = await crearContacto(nuevoContacto);

      setContactos((prev) => [...prev, contactoCreado]);
    } catch (error) {
      // El usuario recibe un mensaje comprensible si la API falla.
      setErrorApi(
        "No fue posible guardar el contacto. Verifica que la API esté disponible."
      );
    }
  }

  // Elimina un contacto mediante su ID y actualiza el estado local.
  async function onEliminarContacto(id) {
    try {
      setErrorApi("");

      await eliminarContactoPorId(id);

      setContactos((prev) => prev.filter((contacto) => contacto.id !== id));
    } catch (error) {
      setErrorApi(
        "No fue posible eliminar el contacto. Verifica que la API esté disponible."
      );
    }
  }

  // Filtramos los contactos según nombre, correo, etiqueta o teléfono.
  // toLowerCase() permite realizar búsquedas sin diferenciar mayúsculas
  // de minúsculas.
  const contactosFiltrados = contactos.filter((contacto) => {
    const termino = busqueda.toLowerCase().trim();

    const nombre = (contacto.nombre || "").toLowerCase();
    const correo = (contacto.correo || "").toLowerCase();
    const etiqueta = (contacto.etiqueta || "").toLowerCase();
    const telefono = String(contacto.telefono || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // Creamos una copia antes de utilizar sort para no modificar
  // directamente el arreglo original del estado.
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) {
      return ordenAsc ? -1 : 1;
    }

    if (nombreA > nombreB) {
      return ordenAsc ? 1 : -1;
    }

    return 0;
  });

  // Cambiamos automáticamente entre singular y plural.
  const textoContador =
    contactosOrdenados.length === 1
      ? "contacto"
      : "contactos";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado de la aplicación usando la configuración centralizada. */}
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

        {/* Formulario para crear nuevos contactos. */}
        <section className="mb-8">
          <FormularioContacto onAgregar={onAgregarContacto} />
        </section>

        {/* Mensaje general cuando ocurre un problema con la API. */}
        {errorApi && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorApi}
          </div>
        )}

        {/* Sección de búsqueda y ordenamiento. */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            {/* Input controlado para realizar búsquedas en tiempo real. */}
            <input
              type="text"
              className="w-full md:flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            {/* Botón que alterna entre orden A-Z y Z-A. */}
            <button
              type="button"
              onClick={() => setOrdenAsc((prev) => !prev)}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200 transition"
            >
              {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
            </button>
          </div>

          {/* Contador de resultados visibles. */}
          <p className="text-sm text-gray-500 mb-5">
            Mostrando {contactosOrdenados.length} {textoContador}
          </p>

          {/* Lista final de contactos filtrados y ordenados. */}
          {cargando ? (
            <p className="text-sm text-gray-500">
              Cargando contactos...
            </p>
          ) : contactosOrdenados.length === 0 ? (
            <p className="text-sm text-gray-500">
              No se encontraron contactos que coincidan con la búsqueda.
            </p>
          ) : (
            <div className="space-y-4">
              {contactosOrdenados.map((contacto) => (
                <ContactoCard
                  key={contacto.id}
                  nombre={contacto.nombre}
                  telefono={contacto.telefono}
                  correo={contacto.correo}
                  etiqueta={contacto.etiqueta}
                  onEliminar={() =>
                    onEliminarContacto(contacto.id)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}