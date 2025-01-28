function calcularPrecio() {
    // Obtener los valores del formulario
    const provinciaDestino = document.getElementById("provincia-destino").value;
    const bultos = parseInt(document.getElementById("bultos").value) || 0;
    const peso = parseInt(document.getElementById("kg").value) || 0;
    const largo = parseInt(document.getElementById("largo").value) || 0;
    const ancho = parseInt(document.getElementById("ancho").value) || 0;
    const alto = parseInt(document.getElementById("alto").value) || 0;

    // Validar límites máximos
    if (largo > 240 || ancho > 240 || alto > 220) {
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.textContent = "No se admiten mercancías con medidas superiores a 240cm.";
        return; // Detener la ejecución si las dimensiones son inválidas
    }

    // Calcular volumen con la nueva fórmula
    const volumen = (largo / 100 * ancho / 100 * alto / 100) * 250; // Fórmula volumétrica
    const pesoFacturable = Math.max(peso, volumen);

    // Determinar tarifa según el grupo de provincias
    let tarifa = 0;
    let tarifaBase = 0;
    let precioFinal = 0;

    if (["Caceres", "Badajoz"].includes(provinciaDestino)) {
        tarifa = 1; // Grupo 1
    } else if (["Madrid", "Sevilla", "Cordoba"].includes(provinciaDestino)) {
        tarifa = 2; // Grupo 2
    } else {
        tarifa = 3; // Grupo 3
    }

    // Determinar el precio de acuerdo a la tarifa y el peso facturable
    if (tarifa === 1) {
        if (pesoFacturable <= 100) {
            tarifaBase = 8;
        } else if (pesoFacturable <= 200) {
            tarifaBase = 15;
        } else {
            tarifaBase = pesoFacturable * 0.5;
        }
    } else if (tarifa === 2) {
        if (pesoFacturable <= 100) {
            tarifaBase = 10;
        } else if (pesoFacturable <= 200) {
            tarifaBase = 20;
        } else {
            tarifaBase = pesoFacturable * 0.6;
        }
    } else if (tarifa === 3) {
        if (pesoFacturable <= 100) {
            tarifaBase = 12;
        } else if (pesoFacturable <= 300) {
            tarifaBase = 20;
        } else {
            tarifaBase = pesoFacturable * 0.7;
        }
    }

    // Calcular precio final considerando los bultos
    precioFinal = tarifaBase;

    // Mostrar resultado
    const resultadoDiv = document.getElementById("resultado");
    //resultadoDiv.textContent = `Peso facturable: ${pesoFacturable.toFixed(0)} kg\nEl precio calculado es: €${precioFinal.toFixed(2)}`;

     // Mostrar el modal con el resultado
     //mostrarResultado(`Peso facturable: ${pesoFacturable.toFixed(0)} kg\n El precio calculado es: €${precioFinal.toFixed(2)}`);

     // Redirigir a la página de aceptación con los resultados como parámetros
     window.location.href = `aviso_aceptacion.html?peso=${encodeURIComponent(pesoFacturable.toFixed(0))}&precio=${encodeURIComponent(precioFinal.toFixed(2))}&largo=${encodeURIComponent(largo)}&ancho=${encodeURIComponent(ancho)}&alto=${encodeURIComponent(alto)}`;

}

// Función para mostrar el modal personalizado
function mostrarResultado(mensaje) {
    const modal = document.getElementById("resultadoModal");
    const texto = document.getElementById("resultadoTexto");
    const aceptarBtn = document.getElementById("aceptarPropuesta");
    const cancelarBtn = document.getElementById("cancelarPropuesta");

    // Mostrar el mensaje en el modal
    texto.textContent = mensaje;

    // Mostrar el modal
    modal.style.display = "flex";



    aceptarBtn.onclick = () => {
        // Obtener los valores de modal y texto
        const valor1 = modal ? modal.textContent : '';  // Contenido de modal (si es que tiene algún valor)
        const valor2 = texto ? texto.textContent : '';  // Contenido de texto (mensaje)

        // Redirigir al usuario a la página aviso_aceptacion.html con parámetros de URL
        window.location.href = `aviso_aceptacion.html?valor1=${encodeURIComponent(valor1)}&valor2=${encodeURIComponent(valor2)}`;
    };

    // Evento para el botón "Cancelar"
    cancelarBtn.onclick = () => {
        modal.style.display = "none"; // Ocultar el modal
    };
}


// Asociar evento al botón de calcular
document.getElementById("calcularBtn").addEventListener("click", calcularPrecio);
