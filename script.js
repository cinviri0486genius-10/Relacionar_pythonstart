// Banco de conceptos de Python Básico (Une 5 de los temas solicitados de forma aleatoria)
const conceptosPython = [
    { idMatch: 1, termino: "print()", definicion: "📢 Muestra un mensaje o un resultado en la pantalla o consola de la computadora." },
    { idMatch: 2, termino: "input()", definicion: "⌨️ Detiene el programa para pedirle al usuario que escriba un dato usando el teclado." },
    { idMatch: 3, termino: "if / elif / else", definicion: "🚦 Estructura condicional que toma decisiones ejecutando un código solo si la condición es verdadera." },
    { idMatch: 4, termino: "while", definicion: "🔄 Bucle que repite un bloque de código continuamente MIENTRAS su condición se mantenga verdadera." },
    { idMatch: 5, termino: "for ... in range()", definicion: "🔢 Bucle ideal para repetir instrucciones un número EXACTO y controlado de veces." }
];

let aciertos = 0;
let tarjetaTerminoSeleccionada = null;
let tarjetaDefinicionSeleccionada = null;

function iniciarJuego() {
    aciertos = 0;
    tarjetaTerminoSeleccionada = null;
    tarjetaDefinicionSeleccionada = null;
    document.getElementById("contador-puntos").innerText = aciertos;

    const colTerminos = document.getElementById("columna-terminos");
    const colDefiniciones = document.getElementById("columna-definiciones");

    // Barajar los términos y las definiciones para que nunca aparezcan en el mismo orden
    const terminosBarajados = [...conceptosPython].sort(() => Math.random() - 0.5);
    const definicionesBarajados = [...conceptosPython].sort(() => Math.random() - 0.5);

    colTerminos.innerHTML = "";
    colDefiniciones.innerHTML = "";

    // Crear tarjetas de comandos de Python (Izquierda)
    terminosBarajados.forEach(item => {
        const div = document.createElement("div");
        div.className = "tarjeta-juego tipo-termino";
        div.innerText = item.termino;
        div.setAttribute("data-id", item.idMatch);
        div.onclick = () => clickTermino(div);
        colTerminos.appendChild(div);
    });

    // Crear tarjetas de significados (Derecha)
    definicionesBarajados.forEach(item => {
        const div = document.createElement("div");
        div.className = "tarjeta-juego";
        div.innerText = item.definicion;
        div.setAttribute("data-id", item.idMatch);
        div.onclick = () => clickDefinicion(div);
        colDefiniciones.appendChild(div);
    });
}

function clickTermino(elemento) {
    if (elemento.classList.contains("correcto")) return;

    // Remover la selección de cualquier otro comando previo
    document.querySelectorAll(".tipo-termino").forEach(t => t.classList.remove("seleccionado"));
    
    elemento.classList.add("seleccionado");
    tarjetaTerminoSeleccionada = elemento;

    comprobarPareja();
}

function clickDefinicion(elemento) {
    if (elemento.classList.contains("correcto")) return;

    // Remover la selección de cualquier otra definición previa
    document.querySelectorAll(".tarjeta-juego:not(.tipo-termino)").forEach(t => t.classList.remove("seleccionado"));
    
    elemento.classList.add("seleccionado");
    tarjetaDefinicionSeleccionada = elemento;

    comprobarPareja();
}

function comprobarPareja() {
    // Solo evaluar cuando el alumno tenga una tarjeta activa de cada columna
    if (tarjetaTerminoSeleccionada !== null && tarjetaDefinicionSeleccionada !== null) {
        const idTermino = tarjetaTerminoSeleccionada.getAttribute("data-id");
        const idDefinicion = tarjetaDefinicionSeleccionada.getAttribute("data-id");

        if (idTermino === idDefinicion) {
            // ¡Match perfecto! Bloquear en verde
            tarjetaTerminoSeleccionada.className = "tarjeta-juego tipo-termino correcto";
            tarjetaDefinicionSeleccionada.className = "tarjeta-juego correcto";
            
            aciertos++;
            document.getElementById("contador-puntos").innerText = aciertos;

            tarjetaTerminoSeleccionada = null;
            tarjetaDefinicionSeleccionada = null;

            if (aciertos === 5) {
                setTimeout(() => {
                    document.getElementById("modal-victoria").style.display = "flex";
                }, 500);
            }
        } else {
            // Error de sintaxis: las deselecciona tras un breve parpadeo (segunda oportunidad)
            const animTermino = tarjetaTerminoSeleccionada;
            const animDefinicion = tarjetaDefinicionSeleccionada;
            
            setTimeout(() => {
                animTermino.classList.remove("seleccionado");
                animDefinicion.classList.remove("seleccionado");
            }, 600);

            tarjetaTerminoSeleccionada = null;
            tarjetaDefinicionSeleccionada = null;
        }
    }
}

function reiniciarJuego() {
    document.getElementById("modal-victoria").style.display = "none";
    iniciarJuego();
}

window.onload = iniciarJuego;
