// Archivo: App.jsx
// Componente principal de Agenda ADSO v10.
//
// En esta versión mantenemos toda la lógica del CRUD
// y agregamos una interfaz tipo dashboard con dos vistas:
// crear y contactos.

// Importamos los hooks necesarios de React.
import { useEffect, useState } from "react";

// Importamos las funciones encargadas de comunicarse con la API.
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la información general de la aplicación.
import { APP_INFO } from "./config";

// Importamos los componentes de la interfaz.
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // ---------------------------------------------------------
  // ESTADOS PRINCIPALES
  // ---------------------------------------------------------

  // Lista principal de contactos.
  const [contactos, setContactos] = useState([]);

  // Controla la carga inicial.
  const [cargando, setCargando] = useState(true);

  // Mensaje general de error de la API.
  const [errorApi, setErrorApi] = useState("");

  // Texto de búsqueda.
  const [busqueda, setBusqueda] = useState("");

  // true = A-Z | false = Z-A.
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Contacto que actualmente se está editando.
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // ---------------------------------------------------------
  // ESTADO DE LA VISTA
  // ---------------------------------------------------------

  // Controla cuál vista está activa.
  // "crear" = formulario de creación.
  // "contactos" = gestión de contactos.
  const [vista, setVista] = useState("crear");

  // Variables booleanas para facilitar el renderizado.
  const estaEnVistaCrear = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";

  // ---------------------------------------------------------
  // CARGAR CONTACTOS
  // ---------------------------------------------------------

  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setErrorApi("");

        const datos = await listarContactos();

        setContactos(datos);
      } catch (error) {
        setErrorApi(
          "No fue posible cargar los contactos. Verifica que la API esté disponible."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarContactos();
  }, []);

  // ---------------------------------------------------------
  // CREAR CONTACTO
  // ---------------------------------------------------------

  async function onAgregarContacto(nuevoContacto) {
    try {
      setErrorApi("");

      const contactoCreado =
        await crearContacto(nuevoContacto);

      setContactos((prev) => [
        ...prev,
        contactoCreado,
      ]);

      return contactoCreado;
    } catch (error) {
      setErrorApi(
        "No fue posible guardar el contacto. Verifica que la API esté disponible."
      );

      return null;
    }
  }

  // ---------------------------------------------------------
  // ACTUALIZAR CONTACTO
  // ---------------------------------------------------------

  async function onActualizarContacto(id, datos) {
    try {
      setErrorApi("");

      const contactoActualizado =
        await actualizarContacto(id, datos);

      setContactos((prev) =>
        prev.map((contacto) =>
          contacto.id === id
            ? contactoActualizado
            : contacto
        )
      );

      // Terminamos el modo edición.
      setContactoEnEdicion(null);

      return contactoActualizado;
    } catch (error) {
      setErrorApi(
        "No fue posible actualizar el contacto. Verifica que la API esté disponible."
      );

      return null;
    }
  }

  // ---------------------------------------------------------
  // ELIMINAR CONTACTO
  // ---------------------------------------------------------

  async function onEliminarContacto(id) {
    try {
      setErrorApi("");

      await eliminarContactoPorId(id);

      setContactos((prev) =>
        prev.filter((contacto) => contacto.id !== id)
      );

      // Si se estaba editando ese contacto, cancelamos la edición.
      if (contactoEnEdicion?.id === id) {
        setContactoEnEdicion(null);
      }
    } catch (error) {
      setErrorApi(
        "No fue posible eliminar el contacto. Verifica que la API esté disponible."
      );
    }
  }

  // ---------------------------------------------------------
  // CAMBIAR DE VISTA
  // ---------------------------------------------------------

  function irAVerContactos() {
    setVista("contactos");
    setContactoEnEdicion(null);
    setErrorApi("");
  }

  function irACrearContacto() {
    setVista("crear");
    setContactoEnEdicion(null);
    setBusqueda("");
    setErrorApi("");
  }

  // ---------------------------------------------------------
  // EDITAR CONTACTO
  // ---------------------------------------------------------

  function onEditarClick(contacto) {
    setContactoEnEdicion(contacto);
    setErrorApi("");
  }

  // ---------------------------------------------------------
  // CANCELAR EDICIÓN
  // ---------------------------------------------------------

  function onCancelarEdicion() {
    setContactoEnEdicion(null);
    setErrorApi("");
  }

  // ---------------------------------------------------------
  // FILTRAR CONTACTOS
  // ---------------------------------------------------------

  const contactosFiltrados = contactos.filter((contacto) => {
    const termino = busqueda
      .toLowerCase()
      .trim();

    const nombre = (contacto.nombre || "")
      .toLowerCase();

    const correo = (contacto.correo || "")
      .toLowerCase();

    const etiqueta = (contacto.etiqueta || "")
      .toLowerCase();

    const telefono = String(
      contacto.telefono || ""
    ).toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // ---------------------------------------------------------
  // ORDENAR CONTACTOS
  // ---------------------------------------------------------

  // Creamos una copia para no modificar el estado original.
  const contactosOrdenados = [
    ...contactosFiltrados,
  ].sort((a, b) => {
    const nombreA = (a.nombre || "")
      .toLowerCase();

    const nombreB = (b.nombre || "")
      .toLowerCase();

    if (nombreA < nombreB) {
      return ordenAsc ? -1 : 1;
    }

    if (nombreA > nombreB) {
      return ordenAsc ? 1 : -1;
    }

    return 0;
  });

  // ---------------------------------------------------------
  // INDICADORES DEL PANEL LATERAL
  // ---------------------------------------------------------

  // Cantidad total de contactos.
  const totalContactos = contactos.length;

  // Cantidad de contactos que tienen etiqueta.
  const contactosConEtiqueta = contactos.filter(
    (contacto) =>
      contacto.etiqueta &&
      contacto.etiqueta.trim() !== ""
  ).length;

  // Último contacto agregado.
  const ultimoContacto =
    contactos.length > 0
      ? contactos[contactos.length - 1]
      : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-900">
      
      {/* ---------------------------------------------------
          BARRA SUPERIOR
      --------------------------------------------------- */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Identidad */}
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                A
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">
                  {APP_INFO.titulo}
                </h1>

                <p className="text-xs text-slate-400">
                  Ficha {APP_INFO.ficha} · SENA CTMA · ADSO
                </p>
              </div>
            </div>

            {/* Botón de navegación */}
            <button
              type="button"
              onClick={
                estaEnVistaCrear
                  ? irAVerContactos
                  : irACrearContacto
              }
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
            >
              {estaEnVistaCrear
                ? "Ver contactos"
                : "Volver a crear contacto"}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------
          CONTENIDO PRINCIPAL
      --------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* -------------------------------------------------
              COLUMNA PRINCIPAL
          ------------------------------------------------- */}
          <section className="lg:col-span-2">

            {/* ENCABEZADO DE LA VISTA */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-purple-300 font-semibold">
                {estaEnVistaCrear
                  ? "Modo creación"
                  : "Modo contactos"}
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                {estaEnVistaCrear
                  ? "Crear contacto"
                  : "Gestionar contactos"}
              </h2>

              <p className="text-slate-400 mt-2">
                {estaEnVistaCrear
                  ? "Registra nuevos contactos utilizando el formulario."
                  : "Busca, ordena, edita y elimina los contactos registrados."}
              </p>
            </div>

            {/* -------------------------------------------------
                VISTA CREAR
            ------------------------------------------------- */}
            {estaEnVistaCrear && (
              <FormularioContacto
                onAgregar={onAgregarContacto}
                onActualizar={onActualizarContacto}
                contactoEnEdicion={null}
                onCancelarEdicion={
                  onCancelarEdicion
                }
              />
            )}

            {/* -------------------------------------------------
                VISTA CONTACTOS
            ------------------------------------------------- */}
            {estaEnVistaContactos && (
              <>
                {/* FORMULARIO DE EDICIÓN */}
                {contactoEnEdicion && (
                  <div className="mb-6">
                    <FormularioContacto
                      onAgregar={onAgregarContacto}
                      onActualizar={
                        onActualizarContacto
                      }
                      contactoEnEdicion={
                        contactoEnEdicion
                      }
                      onCancelarEdicion={
                        onCancelarEdicion
                      }
                    />
                  </div>
                )}

                {/* BUSCADOR Y ORDENAMIENTO */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-6">
                  <div className="flex flex-col md:flex-row gap-3">
                    
                    <input
                      type="text"
                      value={busqueda}
                      onChange={(e) =>
                        setBusqueda(e.target.value)
                      }
                      placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setOrdenAsc(
                          (prev) => !prev
                        )
                      }
                      className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                    >
                      {ordenAsc
                        ? "Ordenar Z-A"
                        : "Ordenar A-Z"}
                    </button>
                  </div>

                  <p className="text-sm text-slate-500 mt-3">
                    Mostrando{" "}
                    {contactosOrdenados.length}{" "}
                    {contactosOrdenados.length === 1
                      ? "contacto"
                      : "contactos"}
                  </p>
                </div>

                {/* ERROR DE API */}
                {errorApi && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorApi}
                  </div>
                )}

                {/* LISTA */}
                {cargando ? (
                  <div className="bg-white rounded-3xl p-6">
                    <p className="text-sm text-slate-500">
                      Cargando contactos...
                    </p>
                  </div>
                ) : contactosOrdenados.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 text-center">
                    <p className="text-slate-500">
                      No se encontraron contactos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactosOrdenados.map(
                      (contacto) => (
                        <ContactoCard
                          key={contacto.id}
                          nombre={
                            contacto.nombre
                          }
                          telefono={
                            contacto.telefono
                          }
                          correo={
                            contacto.correo
                          }
                          empresa={
                            contacto.empresa
                          }
                          etiqueta={
                            contacto.etiqueta
                          }
                          onEditar={() =>
                            onEditarClick(
                              contacto
                            )
                          }
                          onEliminar={() =>
                            onEliminarContacto(
                              contacto.id
                            )
                          }
                        />
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </section>

          {/* -------------------------------------------------
              PANEL LATERAL
          ------------------------------------------------- */}
          <aside className="space-y-5">

            {/* BANNER PRINCIPAL */}
            <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white shadow-xl">
              <p className="text-sm font-semibold text-purple-200">
                SENA CTMA · ADSO
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Agenda ADSO - Dashboard
              </h3>

              <p className="text-sm text-purple-100 mt-3">
                CRUD completo desarrollado con
                React y JSON Server.
              </p>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-purple-200">
                  Contactos registrados
                </p>

                <p className="text-4xl font-extrabold mt-1">
                  {totalContactos}
                </p>
              </div>
            </div>

            {/* INDICADORES */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Resumen
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <p className="text-xs text-slate-500">
                    Total
                  </p>

                  <p className="text-2xl font-bold text-slate-900">
                    {totalContactos}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4">
                  <p className="text-xs text-slate-500">
                    Con etiqueta
                  </p>

                  <p className="text-2xl font-bold text-slate-900">
                    {contactosConEtiqueta}
                  </p>
                </div>
              </div>

              {/* NUEVO INDICADOR */}
              <div className="mt-3 rounded-2xl bg-purple-50 p-4">
                <p className="text-xs text-purple-600">
                  Último contacto
                </p>

                <p className="font-semibold text-slate-900 mt-1">
                  {ultimoContacto
                    ? ultimoContacto.nombre
                    : "Sin contactos"}
                </p>
              </div>
            </div>

            {/* TIPS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Code Best Practices
              </h3>

              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-800">
                    Nombres descriptivos
                  </p>

                  <p className="text-slate-500 mt-1">
                    Cada componente tiene un nombre
                    relacionado con su responsabilidad.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Evitar duplicación
                  </p>

                  <p className="text-slate-500 mt-1">
                    Reutilizamos componentes y funciones
                    para evitar repetir lógica.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Responsabilidades claras
                  </p>

                  <p className="text-slate-500 mt-1">
                    Cada archivo se encarga de una parte
                    específica de la aplicación.
                  </p>
                </div>
              </div>
            </div>

            {/* MENSAJE PERSONAL */}
            <div className="rounded-3xl bg-slate-800 border border-slate-700 p-6">
              <p className="text-xs uppercase tracking-widest text-purple-300 font-semibold">
                Mi visión
              </p>

              <p className="text-sm text-slate-200 mt-3 leading-6">
                Mi objetivo como desarrollador es crear
                aplicaciones que no solo funcionen,
                sino que también sean claras, organizadas
                y fáciles de utilizar.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}