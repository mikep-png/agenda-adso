// Archivo: ContactoCard.jsx

// Componente encargado de representar un contacto individual.
//
// Recibe la información mediante props y muestra:
// nombre, teléfono, correo, empresa y etiqueta.
//
// También recibe las funciones onEditar y onEliminar para
// ejecutar las acciones correspondientes desde el componente padre.

export default function ContactoCard({
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEditar,
  onEliminar,
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      {/* Nombre principal del contacto. */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {nombre}
      </h3>

      {/* Información principal del contacto. */}
      <div className="space-y-1">
        <p className="text-gray-700">
          <span className="font-medium">Teléfono:</span> {telefono}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Correo:</span> {correo}
        </p>

        {/* Empresa solo se muestra si contiene información. */}
        {empresa && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Empresa:</span> {empresa}
          </p>
        )}

        {/* Etiqueta solo se muestra si contiene información. */}
        {etiqueta && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Etiqueta:</span> {etiqueta}
          </p>
        )}
      </div>

      {/* Botones de acciones del contacto. */}
      <div className="mt-4 flex gap-2">
        {/* Botón para iniciar la edición del contacto. */}
        <button
          type="button"
          onClick={onEditar}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
        >
          Editar
        </button>

        {/* Botón para eliminar el contacto. */}
        <button
          type="button"
          onClick={onEliminar}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}