// Archivo: FormularioContacto.jsx
// Componente reutilizado para crear y editar contactos.

// Importamos los hooks necesarios.
import { useEffect, useState } from "react";

export default function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEnEdicion,
  onCancelarEdicion,
}) {
  // Estado principal del formulario.
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    etiqueta: "",
  });

  // Estado de errores.
  const [errores, setErrores] = useState({});

  // Estado para controlar el envío.
  const [enviando, setEnviando] = useState(false);

  // ---------------------------------------------------------
  // CARGAR CONTACTO EN EDICIÓN
  // ---------------------------------------------------------
  useEffect(() => {
    if (contactoEnEdicion) {
      setFormulario({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        empresa: contactoEnEdicion.empresa || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });

      setErrores({});
    } else {
      setFormulario({
        nombre: "",
        telefono: "",
        correo: "",
        empresa: "",
        etiqueta: "",
      });

      setErrores({});
    }
  }, [contactoEnEdicion]);

  // ---------------------------------------------------------
  // MANEJAR CAMBIOS
  // ---------------------------------------------------------
  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: "",
      general: "",
    }));
  }

  // ---------------------------------------------------------
  // VALIDAR FORMULARIO
  // ---------------------------------------------------------
  function validarFormulario() {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!formulario.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    return nuevosErrores;
  }

  // ---------------------------------------------------------
  // ENVIAR FORMULARIO
  // ---------------------------------------------------------
  async function manejarEnvio(evento) {
    evento.preventDefault();

    const erroresValidacion = validarFormulario();

    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    setEnviando(true);

    try {
      // Si existe contactoEnEdicion, estamos actualizando.
      if (contactoEnEdicion) {
        const actualizado = await onActualizar(
          contactoEnEdicion.id,
          formulario
        );

        if (actualizado) {
          setErrores({});
        }

        return;
      }

      // Si no existe contactoEnEdicion, estamos creando.
      const creado = await onAgregar(formulario);

      if (creado) {
        setFormulario({
          nombre: "",
          telefono: "",
          correo: "",
          empresa: "",
          etiqueta: "",
        });

        setErrores({});
      }
    } catch (error) {
      setErrores({
        general:
          "Ocurrió un problema al guardar los cambios. Inténtalo nuevamente.",
      });
    } finally {
      setEnviando(false);
    }
  }

  const modoEdicion = Boolean(contactoEnEdicion);

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6"
    >
      {/* Encabezado */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
          {modoEdicion ? "Modo edición" : "Modo creación"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          {modoEdicion
            ? "Editar contacto"
            : "Crear nuevo contacto"}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {modoEdicion
            ? "Modifica la información del contacto seleccionado."
            : "Completa los datos para registrar un nuevo contacto."}
        </p>
      </div>

      {/* Error general */}
      {errores.general && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errores.general}
        </div>
      )}

      {/* Nombre */}
      <div className="mb-4">
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Nombre
        </label>

        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={manejarCambio}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Nombre completo"
        />

        {errores.nombre && (
          <p className="text-red-500 text-sm mt-1">
            {errores.nombre}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Teléfono
        </label>

        <input
          id="telefono"
          name="telefono"
          type="text"
          value={formulario.telefono}
          onChange={manejarCambio}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Número de teléfono"
        />

        {errores.telefono && (
          <p className="text-red-500 text-sm mt-1">
            {errores.telefono}
          </p>
        )}
      </div>

      {/* Correo */}
      <div className="mb-4">
        <label
          htmlFor="correo"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Correo
        </label>

        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="correo@ejemplo.com"
        />

        {errores.correo && (
          <p className="text-red-500 text-sm mt-1">
            {errores.correo}
          </p>
        )}
      </div>

      {/* Empresa */}
      <div className="mb-4">
        <label
          htmlFor="empresa"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Empresa
        </label>

        <input
          id="empresa"
          name="empresa"
          type="text"
          value={formulario.empresa}
          onChange={manejarCambio}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Empresa"
        />
      </div>

      {/* Etiqueta */}
      <div className="mb-5">
        <label
          htmlFor="etiqueta"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Etiqueta
        </label>

        <input
          id="etiqueta"
          name="etiqueta"
          type="text"
          value={formulario.etiqueta}
          onChange={manejarCambio}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ej. Trabajo, Familia, Amigos"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="flex-1 bg-slate-900 text-white rounded-xl px-4 py-3 font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando
            ? "Guardando..."
            : modoEdicion
            ? "Guardar cambios"
            : "Agregar contacto"}
        </button>

        {modoEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            disabled={enviando}
            className="rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}