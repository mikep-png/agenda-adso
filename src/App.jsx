import { useState } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

export default function App() {
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "michael kaiser",
      telefono: "309 5749494",
      correo: "michaelkaiser67@gmail.com",
      etiqueta: "Compañera",
    },
  ]);

  // Agregar
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  // Eliminar
  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}