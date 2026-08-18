import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
    empresa: "",
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  function manejarCambio(e) {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMensajeError("");
  }

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

  async function manejarEnvio(e) {
    e.preventDefault();

    const erroresValidacion = validarFormulario();

    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    setEnviando(true);
    setMensajeError("");

    try {
      const guardado = await onAgregar(formulario);

      if (guardado) {
        setFormulario({
          nombre: "",
          telefono: "",
          correo: "",
          etiqueta: "",
          empresa: "",
        });

        setErrores({});
      } else {
        setMensajeError(
          "No se pudo guardar el contacto. Inténtalo nuevamente."
        );
      }
    } catch (error) {
      setMensajeError(
        "Ocurrió un problema al guardar el contacto. Inténtalo nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Agregar contacto
      </h2>

      {mensajeError && (
        <div className="mb-5 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
          {mensajeError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errores.nombre && (
            <p className="text-red-500 text-sm mt-1">
              {errores.nombre}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>

          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errores.telefono && (
            <p className="text-red-500 text-sm mt-1">
              {errores.telefono}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo
          </label>

          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errores.correo && (
            <p className="text-red-500 text-sm mt-1">
              {errores.correo}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa
          </label>

          <input
            type="text"
            name="empresa"
            value={formulario.empresa}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Etiqueta
          </label>

          <input
            type="text"
            name="etiqueta"
            value={formulario.etiqueta}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>
    </form>
  );
}