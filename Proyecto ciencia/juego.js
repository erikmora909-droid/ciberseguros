
const preguntas = [
  {
    pregunta: "Un mensaje dice que ganaste un premio y pide tu contraseña. ¿Qué haces?",
    opciones: [
      "Enviar mi contraseña",
      "No compartirla y pedir ayuda",
      "Mandarla a mis amigos"
    ],
    correcta: 1,
    explicacion: "Tu contraseña es privada y nadie debe pedírtela."
  },
  {
    pregunta: "¿Cuál es la mejor contraseña?",
    opciones: [
      "123456",
      "Mi nombre",
      "Una frase larga y única"
    ],
    correcta: 2,
    explicacion: "Una contraseña larga y única ayuda a proteger tu cuenta."
  },
  {
    pregunta: "Un desconocido te pide tu dirección. ¿Qué haces?",
    opciones: [
      "Se la envío",
      "No la comparto y aviso a un adulto",
      "Le digo dónde estudio"
    ],
    correcta: 1,
    explicacion: "Tu dirección y escuela son datos personales."
  },
  {
    pregunta: "Alguien te molesta por Internet. ¿Qué haces?",
    opciones: [
      "Lo amenazo también",
      "Comparto sus datos",
      "Pido ayuda y uso bloquear o denunciar"
    ],
    correcta: 2,
    explicacion: "Pedir ayuda y denunciar el acoso es una decisión segura."
  },
  {
    pregunta: "¿De dónde conviene descargar juegos?",
    opciones: [
      "De sitios desconocidos",
      "De tiendas oficiales, consultando a un adulto",
      "De cualquier enlace recibido"
    ],
    correcta: 1,
    explicacion: "Las fuentes oficiales y la revisión de permisos reducen riesgos."
  }
];

let indice = 0;
let puntuacion = 0;
let respondida = false;

const textoPregunta = document.getElementById("textoPregunta");
const opciones = document.getElementById("opciones");
const resultado = document.getElementById("resultado");
const progreso = document.getElementById("progreso");
const siguiente = document.getElementById("siguiente");
const contenedor = document.getElementById("pregunta");
const barraProgreso = document.getElementById("barraProgreso");
const avance = document.getElementById("avance");

function actualizarBarra(preguntasCompletadas) {
  const porcentaje =
    (preguntasCompletadas / preguntas.length) * 100;

  avance.style.width = `${porcentaje}%`;
  barraProgreso.setAttribute(
    "aria-valuenow",
    preguntasCompletadas
  );
}

function mostrarPregunta() {
  respondida = false;

  const actual = preguntas[indice];

  progreso.textContent =
    `Pregunta ${indice + 1} de ${preguntas.length}`;

  actualizarBarra(indice);

  textoPregunta.textContent = actual.pregunta;
  opciones.replaceChildren();

  resultado.textContent = "";
  siguiente.hidden = true;

  actual.opciones.forEach((opcion, i) => {
    const boton = document.createElement("button");

    boton.className = "boton";
    boton.textContent = opcion;

    boton.addEventListener("click", () => responder(i));

    opciones.appendChild(boton);
  });
}

function responder(seleccion) {
  if (respondida) return;

  respondida = true;

  const actual = preguntas[indice];
  const botones = opciones.querySelectorAll("button");

  botones.forEach(boton => {
    boton.disabled = true;
  });

  actualizarBarra(indice + 1);

  if (seleccion === actual.correcta) {
    puntuacion++;

    resultado.textContent =
      "¡Correcto! 🎉 " + actual.explicacion;

    resultado.style.color = "#176b3a";
  } else {
    resultado.textContent =
      "¡Sigue aprendiendo! 🔐 La respuesta correcta es: " +
      actual.opciones[actual.correcta] + ". " +
      actual.explicacion;

    resultado.style.color = "#a12a2a";
  }

  siguiente.hidden = false;

  siguiente.textContent =
    indice === preguntas.length - 1
      ? "Ver resultado"
      : "Siguiente pregunta →";
}

siguiente.addEventListener("click", () => {
  if (!respondida) {
    resultado.textContent =
      "¡Elige una respuesta antes de continuar! 🔐";

    resultado.style.color = "#a12a2a";
    return;
  }

  indice++;

  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultadoFinal();
  }
});

function mostrarResultadoFinal() {
  progreso.textContent = "¡Reto terminado!";

  actualizarBarra(preguntas.length);

  contenedor.replaceChildren();

  const titulo = document.createElement("h3");

  titulo.textContent =
    `Obtuviste ${puntuacion} de ${preguntas.length} puntos`;

  const mensaje = document.createElement("p");

  mensaje.textContent =
    puntuacion === preguntas.length
      ? "¡Excelente! Eres un gran explorador digital. 🏆"
      : "¡Buen trabajo! Repasa las lecciones e inténtalo de nuevo. 💙";

  const reiniciar = document.createElement("button");

  reiniciar.className = "boton";
  reiniciar.textContent = "Volver a jugar";

  reiniciar.addEventListener("click", () => {
    indice = 0;
    puntuacion = 0;
    respondida = false;

    contenedor.append(
      textoPregunta,
      opciones,
      resultado,
      siguiente
    );

    mostrarPregunta();
  });

  contenedor.append(titulo, mensaje, reiniciar);
}

mostrarPregunta();
