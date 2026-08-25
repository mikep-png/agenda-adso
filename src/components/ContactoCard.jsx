// Archivo: ContactoCard.jsx
// Componente encargado de representar un contacto individual.
//
// Recibe la información mediante props y muestra:
// nombre, teléfono, correo, empresa y etiqueta.
//
// También recibe la función onEliminar para ejecutar
// la eliminación del contacto desde el componente padre.

export default function ContactoCard({
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
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

      {/* 
        El botón ejecuta onEliminar, función proporcionada
        por App.jsx mediante las props del componente.
      */}
      <button
        type="button"
        onClick={onEliminar}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
      >
        Eliminar
      </button>
    </article>
  );
}