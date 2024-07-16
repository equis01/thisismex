const preguntas = [
    {
        pregunta: "¿Qué es un residuo?",
        respuestas: ["Una sustancia que siempre es beneficiosa para el medio ambiente", "Un objeto que siempre se puede reutilizar sin ningún tratamiento", "Materiales desechados que ya no tienen utilidad (o valor) para quien lo genera", "Una sustancia que nunca tiene impacto en el ambiente"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál de los siguientes es una clasificación de residuos?",
        respuestas: ["Líquidos", "Sólidos", "Gaseosos", "Peligrosos"],
        respuestaCorrecta: 3
    },
    {
        pregunta: "¿Cuál de las siguientes es un tipo de impacto ambiental?",
        respuestas: ["Contaminación del suelo", "Riesgos a la salud", "Poblaciones vulnerables", "Proliferación de plagas"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuál de las siguientes enfermedades puede ser desarrollada por la contaminación del aire?",
        respuestas: ["Diabetes", "Respiratorias", "Anemia"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué significan las siglas LGPGIR?",
        respuestas: ["Ley General para la Gestión Integral de Residuos", "Ley General para la Protección y Gestión Integral de los Recursos", "Ley General para la Gestión y Protección de Residuos", "Ley General para la Prevención y Gestión Integral de los Residuos"],
        respuestaCorrecta: 3
    },
    {
        pregunta: "¿Qué significan las siglas PEI?",
        respuestas: ["Programa Ecológico Institucional", "Programa Ecológico Integral", "Plan Estratégico de Innovación", "Proyecto Ecológico Internacional"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál de las siguientes opciones es un beneficio del reciclaje?",
        respuestas: ["Reducción significativa de residuos", "Incremento de residuos en los vertederos", "Aumento del consumo de recursos naturales", "Deterioro de la calidad del aire"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuál de las siguientes es una recomendación para mejorar la gestión de residuos?",
        respuestas: ["Depositar todos los residuos en vertederos sin separación", "Fomentar la reducción en la fuente: menos generación de residuos", "Quemar los residuos domésticos en el jardín", "Ignorar la educación y concienciación sobre la gestión de residuos"],
        respuestaCorrecta: 1
    },
    // Agrega más preguntas según necesites
];

let preguntaActual = 0;
let resultados = [];
let tiempoLimite = 25; // Tiempo límite por pregunta en segundos
let tiempoRestante = tiempoLimite;
let temporizador;

function iniciarTemporizador() {
    tiempoRestante = tiempoLimite;
    document.getElementById('timer').textContent = tiempoRestante;

    temporizador = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timer').textContent = tiempoRestante;

        if (tiempoRestante === 0) {
            clearInterval(temporizador);
            seleccionarRespuesta(-1); // Si se acaba el tiempo, selecciona una respuesta automáticamente
        }
    }, 1000);
}

function mostrarPregunta() {
    clearInterval(temporizador); // Reinicia el temporizador al mostrar una nueva pregunta
    iniciarTemporizador();

    const pregunta = preguntas[preguntaActual];
    document.getElementById('question').textContent = pregunta.pregunta;

    const answersList = document.getElementById('answers');
    answersList.innerHTML = '';
    pregunta.respuestas.forEach((respuesta, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = respuesta;
        listItem.classList.add('answer-item');
        listItem.addEventListener('click', () => seleccionarRespuesta(index));
        answersList.appendChild(listItem);
    });
}

function seleccionarRespuesta(indexRespuesta) {
    clearInterval(temporizador); // Detiene el temporizador al seleccionar una respuesta

    const pregunta = preguntas[preguntaActual];
    const resultado = {
        pregunta: pregunta.pregunta,
        respuestaSeleccionada: indexRespuesta === -1 ? 'Tiempo agotado' : pregunta.respuestas[indexRespuesta],
        esCorrecta: indexRespuesta === pregunta.respuestaCorrecta
    };
    resultados.push(resultado);

    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';

    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';

    let respuestasCorrectas = 0;

    resultados.forEach(resultado => {
        const listItem = document.createElement('li');
        listItem.textContent = `${resultado.pregunta} - ${resultado.respuestaSeleccionada} (${resultado.esCorrecta ? 'Correcta' : 'Incorrecta'})`;
        listItem.classList.add(resultado.esCorrecta ? 'correct-answer' : 'incorrect-answer');
        resultsList.appendChild(listItem);

        if (resultado.esCorrecta) {
            respuestasCorrectas++;
        }
    });

    const porcentajeCorrectas = (respuestasCorrectas / preguntas.length) * 100;
    const porcentajeElement = document.createElement('p');
    porcentajeElement.textContent = `Porcentaje de respuestas correctas: ${porcentajeCorrectas.toFixed(2)}%`;
    resultsList.appendChild(porcentajeElement);
}

mostrarPregunta();