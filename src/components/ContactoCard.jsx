// src/components/ContactoCard.jsx

export default function ContactoCard({
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEliminar
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      {/* Nombre destacado */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {nombre}
      </h3>

      {/* Teléfono */}
      <p className="text-gray-700 mb-1">
        <strong>Teléfono:</strong> {telefono}
      </p>

      {/* Correo */}
      <p className="text-gray-700 mb-1">
        <strong>Correo:</strong> {correo}
      </p>

      {/* Empresa */}
      {empresa && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Empresa:</strong> {empresa}
        </p>
      )}

      {/* Etiqueta */}
      <p className="text-gray-700 mb-4">
        <strong>Etiqueta:</strong> {etiqueta}
      </p>

      {/* Acción eliminar */}
      <div className="flex justify-start">
        <button
          onClick={() => onEliminar(correo)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}