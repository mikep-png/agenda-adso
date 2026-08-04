export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <div className="card-contacto">
      <h3 className="card-nombre">{nombre}</h3>

      <p className="card-linea">📞 {telefono}</p>

      <p className="card-linea">📧 {correo}</p>

      {etiqueta && (
        <p className="card-etiqueta">{etiqueta}</p>
      )}

      <button
        className="btn-eliminar"
        onClick={() => onDelete(id)}
      >
        Eliminar
      </button>
    </div>
  );
}