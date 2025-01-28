
function calcularPrecio() {
    // Obtener los valores del formulario
    const provinciaDestino = document.getElementById("provincia-destino").value;
    const bultos = parseInt(document.getElementById("bultos").value) || 0;
    const peso = parseInt(document.getElementById("kg").value) || 0;
    const largo = parseInt(document.getElementById("largo").value) || 0;
    const corto = parseInt(document.getElementById("corto").value) || 0;
    const alto = parseInt(document.getElementById("alto").value) || 0;

    // Calcular volumen con la nueva fórmula
    const volumen = (largo / 100 * corto / 100 * alto / 100) * 250; // Fórmula volumétrica
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
    precioFinal = tarifaBase * bultos;

    // Mostrar resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.textContent = `Peso facturable: ${pesoFacturable.toFixed(0)} kg\nEl precio calculado es: €${precioFinal.toFixed(2)}`;
}