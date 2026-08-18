export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEliminar,
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {nombre}
      </h3>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Teléfono:</span> {telefono}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Correo:</span> {correo}
      </p>

      {empresa && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Empresa:</span> {empresa}
        </p>
      )}

      {etiqueta && (
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Etiqueta:</span> {etiqueta}
        </p>
      )}

      <button
        onClick={() => onEliminar(id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Eliminar
      </button>
    </article>
  );
}