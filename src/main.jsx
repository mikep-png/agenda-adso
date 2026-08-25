// Archivo: main.jsx
// Punto de entrada de la aplicación React.
//
// Se encarga de cargar App dentro del elemento root
// definido en el archivo HTML principal.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importamos los estilos globales.
import "./index.css";

// Importamos el componente principal.
import App from "./App.jsx";

// Renderizamos la aplicación dentro del elemento root.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);