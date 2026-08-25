// Archivo: FormularioContacto.jsx
// Componente encargado de registrar nuevos contactos.
//
// Responsabilidades:
// - Capturar la información del usuario.
// - Validar nombre, teléfono y correo.
// - Mostrar mensajes de error.
// - Evitar envíos con datos inválidos.
// - Controlar el estado "Guardando...".
// - Enviar los datos al componente App mediante onAgregar.

// Importamos useState para manejar el estado del formulario.
import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // ---------------------------------------------------------
  // ESTADO DEL FORMULARIO
  // ---------------------------------------------------------

  // Contiene todos los datos que el usuario escribe.
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    etiqueta: "",
  });

  // ---------------------------------------------------------
  // ESTADO DE ERRORES
  // ---------------------------------------------------------

  // Guarda los mensajes de validación de cada campo.
  const [errores, setErrores] = useState({});

  // ---------------------------------------------------------
  // ESTADO DE ENVÍO
  // ---------------------------------------------------------

  // Indica si actualmente se está enviando información a la API.
  const [enviando, setEnviando] = useState(false);

  // ---------------------------------------------------------
  // MANEJAR CAMBIOS
  // ---------------------------------------------------------

  // Actualiza el valor del campo que el usuario está modificando.
  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));

    // Cuando el usuario modifica un campo,
    // eliminamos el mensaje de error correspondiente.
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: "",
    }));
  }

  // ---------------------------------------------------------
  // VALIDAR FORMULARIO
  // ---------------------------------------------------------

  // Comprueba que los campos obligatorios tengan datos válidos.
  function validarFormulario() {
    const nuevosErrores = {};

    // El nombre no puede estar vacío.
    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // El teléfono no puede estar vacío.
    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    // El correo es obligatorio y debe contener @.
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
    // Evitamos que el navegador recargue la página.
    evento.preventDefault();

    // Ejecutamos las validaciones antes de realizar la petición.
    const erroresValidacion = validarFormulario();

    // Guardamos los errores encontrados.
    setErrores(erroresValidacion);

    // Si existe algún error, detenemos el proceso.
    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    // Indicamos que comenzó el envío.
    setEnviando(true);

    try {
      // Enviamos el formulario al componente App.
      // App se encarga posteriormente de comunicarse con la API.
      const guardado = await onAgregar(formulario);

      // Si la creación fue correcta, limpiamos el formulario.
      if (guardado) {
        setFormulario({
          nombre: "",
          telefono: "",
          correo: "",
          empresa: "",
          etiqueta: "",
        });

        // También limpiamos los mensajes de validación.
        setErrores({});
      }
    } catch (error) {
      // Mostramos un mensaje amigable en caso de error.
      // No mostramos detalles técnicos de la excepción.
      setErrores({
        general:
          "Ocurrió un problema al guardar el contacto. Inténtalo nuevamente.",
      });
    } finally {
      // El botón vuelve a estar disponible independientemente
      // de si la petición tuvo éxito o falló.
      setEnviando(false);
    }
  }

  // ---------------------------------------------------------
  // INTERFAZ DEL FORMULARIO
  // ---------------------------------------------------------

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-5">
        Agregar contacto
      </h2>

      {/* Mensaje general cuando ocurre un error durante el guardado. */}
      {errores.general && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          {errores.general}
        </div>
      )}

      {/* -------------------------------------------------
          CAMPO NOMBRE
      -------------------------------------------------- */}

      <div className="mb-4">
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre
        </label>

        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={manejarCambio}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Nombre completo"
        />

        {/* El mensaje solo aparece cuando existe un error. */}
        {errores.nombre && (
          <p className="text-red-500 text-sm mt-1">
            {errores.nombre}
          </p>
        )}
      </div>

      {/* -------------------------------------------------
          CAMPO TELÉFONO
      -------------------------------------------------- */}

      <div className="mb-4">
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Teléfono
        </label>

        <input
          id="telefono"
          name="telefono"
          type="text"
          value={formulario.telefono}
          onChange={manejarCambio}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Número de teléfono"
        />

        {errores.telefono && (
          <p className="text-red-500 text-sm mt-1">
            {errores.telefono}
          </p>
        )}
      </div>

      {/* -------------------------------------------------
          CAMPO CORREO
      -------------------------------------------------- */}

      <div className="mb-4">
        <label
          htmlFor="correo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Correo
        </label>

        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="correo@ejemplo.com"
        />

        {errores.correo && (
          <p className="text-red-500 text-sm mt-1">
            {errores.correo}
          </p>
        )}
      </div>

      {/* -------------------------------------------------
          CAMPO EMPRESA
      -------------------------------------------------- */}

      <div className="mb-4">
        <label
          htmlFor="empresa"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Empresa
        </label>

        <input
          id="empresa"
          name="empresa"
          type="text"
          value={formulario.empresa}
          onChange={manejarCambio}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Empresa"
        />
      </div>

      {/* -------------------------------------------------
          CAMPO ETIQUETA
      -------------------------------------------------- */}

      <div className="mb-5">
        <label
          htmlFor="etiqueta"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Etiqueta
        </label>

        <input
          id="etiqueta"
          name="etiqueta"
          type="text"
          value={formulario.etiqueta}
          onChange={manejarCambio}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Ej. Trabajo, Familia, Amigos"
        />
      </div>

      {/* -------------------------------------------------
          BOTÓN DE ENVÍO
      -------------------------------------------------- */}

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* 
          El texto cambia mientras se procesa la petición.
          Además, disabled evita múltiples envíos simultáneos.
        */}
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>
    </form>
  );
}