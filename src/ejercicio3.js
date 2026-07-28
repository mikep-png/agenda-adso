const nombre = "Andrés";
const ficha = 3443874;

const notas = [3.0, 1.8, 2.0];

let suma = 0;

for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
}

const promedio = suma / notas.length;

const estado = promedio >= 3.0 ? "Aprobado" : "No Aprobado";

console.log(`
=========================
   SISTEMA DE NOTAS SENA
=========================
Aprendiz : ${nombre}
Ficha    : ${ficha}
Notas    : ${notas.join(", ")}

Promedio : ${promedio.toFixed(2)}
Estado   : ${estado}
=========================
`);