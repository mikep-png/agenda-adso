// Archivo: ContactoCard.jsx
// Componente encargado de mostrar la información de un contacto.

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
    <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      {/* Información principal del contacto */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div>
          {/* Nombre */}
          <h3 className="text-lg font-bold text-slate-900">
            {nombre}
          </h3>

          {/* Información del contacto */}
          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <p>📞 {telefono}</p>
            <p>✉️ {correo}</p>

            {empresa && (
              <p>🏢 {empresa}</p>
            )}

            {etiqueta && (
              <p>🏷️ {etiqueta}</p>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEditar}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={onEliminar}
            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}