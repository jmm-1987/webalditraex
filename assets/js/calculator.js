function showForm() {
    // Mostrar un aviso de confirmación
    const confirmar = confirm("Por favor, antes de hacer su simulación lea detenidamente el condicionado");

    if (!confirmar) {
        // Si el usuario hace clic en "Cancelar", salir de la función
        return;
    }

    // Mostrar segundo aviso de confirmación con condiciones
    const condicionesConfirmar = confirm(
        "La mercancía debe estar perfectamente embalada y paletizada para ser transportada en nuestra red.\n" +
        "Esta mercancía transportada no es cubierta por nuestro seguro. Con lo cual, cualquier avería o daño, pérdida que surja en estas tipologías o similares en caso de aceptación de servicio no serán admitidas sus reclamaciones por parte de Alditraex.\n" +
        "No entramos en fincas, nuestras entregas y recogidas son puerta a puerta.\n" +
        "Si el bulto una vez recibido en nuestro almacén difiriere de las medidas y pesos que nos han dicho ustedes en la petición del servicio, deben saber que primarán las medidas y pesos tomadas en nuestras instalaciones para el precio del servicio a pagar."
    );

    if (!condicionesConfirmar) {
        // Si el usuario hace clic en "Cancelar", salir de la función
        return;
    }




    // Crear una nueva ventana
    const newWindow = window.open('', '_blank', 'width=500,height=500');

    // Crear el formulario
    const form = newWindow.document.createElement('form');
    form.onsubmit = function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener valores del formulario
        const provinciaDestino = form.provincia_destino.value;
        const kilos = parseInt(form.kilos.value, 10);
        const largo = parseInt(form.largo.value, 10);
        const ancho = parseInt(form.ancho.value, 10);
        const alto = parseInt(form.alto.value, 10);

        // Calcular volumen
        const volumen = (largo * ancho * alto) / 1000000 * 250;

        // Determinar la tarifa y calcular el precio
        let precio;
        let tarifaPorKg;

        // Función para calcular el precio según el peso y la tarifa
        function calcularPrecio(peso, tarifa) {
            if (peso <= 10) {
                return tarifa[0];
            } else if (peso <= 20) {
                return tarifa[1];
            } else if (peso <= 30) {
                return tarifa[2];
            } else if (peso <= 40) {
                return tarifa[3];
            } else if (peso <= 50) {
                return tarifa[4];
            } else if (peso <= 60) {
                return tarifa[5];
            } else if (peso <= 70) {
                return tarifa[6];
            } else if (peso <= 80) {
                return tarifa[7];
            } else if (peso <= 90) {
                return tarifa[8];
            } else if (peso <= 100) {
                return tarifa[9];
            } else if (peso <= 150) {
                return tarifa[10];
            } else if (peso <= 200) {
                return tarifa[11];
            } else if (peso <= 250) {
                return tarifa[12];
            } else if (peso <= 300) {
                return tarifa[13];
            } else if (peso <= 350) {
                return tarifa[14];
            } else if (peso <= 400) {
                return tarifa[15];
            } else if (peso <= 450) {
                return tarifa[16];
            } else if (peso <= 500) {
                return tarifa[17];
            } else if (peso <= 600) {
                return tarifa[18];
            } else if (peso <= 700) {
                return tarifa[19];
            } else if (peso <= 800) {
                return tarifa[20];
            } else if (peso <= 900) {
                return tarifa[21];
            } else if (peso <= 1000) {
                return tarifa[22];
            } else if (peso <= 2000) {
                return peso * tarifa[23];
            } else if (peso <= 3000) {
                return tarifa[24];
            }
            else {
                return peso * tarifa[25];
            }
        }

        // Seleccionar la tarifa según la provincia de destino
        if (provinciaDestino === 'Cáceres' || provinciaDestino === 'Badajoz') {
            // Tabla 1
            tarifaPorKg = [7.20, 9.15, 9.53, 10.72, 0.054];
        } else if (provinciaDestino === 'Madrid' || provinciaDestino === 'Sevilla') {
            // Tabla 2
            tarifaPorKg = [7, 9, 10, 0.070];
        } else {
            // Tabla 3
            tarifaPorKg = [9, 11, 11, 0.154];
        }

        // Calcular el precio basado en kilos y volumen
        const precioPorKilos = calcularPrecio(kilos, tarifaPorKg);
        const precioPorVolumen = calcularPrecio(volumen, tarifaPorKg);
        precio = Math.max(precioPorKilos, precioPorVolumen);

        // Mostrar el resultado
        const resultadoDiv = newWindow.document.createElement('div');
        resultadoDiv.id = 'resultado';
        resultadoDiv.innerHTML = `
            <h3>Resultado del Cálculo</h3>
            <p><strong>Provincia de destino:</strong> ${provinciaDestino}</p>
            <p><strong>Kilos:</strong> ${kilos} kg</p>
            <p><strong>Volumen (kg):</strong> ${volumen.toFixed(2)} kg</p>
            <p><strong>Precio calculado:</strong> ${precio.toFixed(2)}€</p>
            <button id="finalizar" class="main-button">Finalizar</button>
            <p> Si está de acuerdo con la tasación adjunte la imagen de la mercancía embalada </p>
            <button id="calcular_nuevo" class="main-button">Calcular de nuevo</button>
            <a id="solicitar_servicio" class="main-button" href="mailto:jmurillo@alditraex.es?subject=Solicitud%20de%20Servicio&body=Provincia%20de%20destino:%20${provinciaDestino}%0A%0AKilos:%20${kilos}%20kg%0A%0AVolumen%20(kg):%20${volumen.toFixed(2)}%20kg%0A%0APrecio%20calculado:%20${precio.toFixed(2)}€%0A%0AAdjunto%20imagen%20de%20la%20mercancía%20embalada.">Solicitar servicio</a>
        `;

        newWindow.document.body.appendChild(resultadoDiv);

        // Añadir event listeners a los botones de resultado
        newWindow.document.getElementById('finalizar').onclick = function() {
            newWindow.close(); // Cierra la ventana
        };

        newWindow.document.getElementById('calcular_nuevo').onclick = function() {
            newWindow.close(); // Cierra la ventana
            // Reabrir la ventana con el formulario
            showForm();
        };

        // Deshabilitar el formulario después de mostrar el resultado
        form.querySelectorAll('input, select').forEach(element => {
            element.disabled = true;
        });
    };

    // Añadir los campos de formulario (misma estructura que antes)
    // Código de los campos del formulario...

    // Campo 1: Provincia origen
    const provinciaOrigenLabel = newWindow.document.createElement('label');
    provinciaOrigenLabel.textContent = 'Provincia origen:';
    form.appendChild(provinciaOrigenLabel);

    const provinciaOrigen = newWindow.document.createElement('select');
    provinciaOrigen.name = 'provincia_origen';
    provinciaOrigen.className = 'input-field';

    const opcionesOrigen = ['Cáceres', 'Badajoz'];
    opcionesOrigen.forEach(opcion => {
        const option = newWindow.document.createElement('option');
        option.value = opcion;
        option.textContent = opcion;
        provinciaOrigen.appendChild(option);
    });

    form.appendChild(provinciaOrigen);

    // Campo 2: Provincia destino
    const provinciaDestinoLabel = newWindow.document.createElement('label');
    provinciaDestinoLabel.textContent = 'Provincia destino:';
    form.appendChild(provinciaDestinoLabel);

    const provinciaDestino = newWindow.document.createElement('select');
    provinciaDestino.name = 'provincia_destino';
    provinciaDestino.className = 'input-field';

    const opcionesDestino = [
        'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
        'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 
        'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 
        'Islas Baleares', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 
        'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 
        'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Tenerife', 
        'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
    ];

    opcionesDestino.forEach(opcion => {
        const option = newWindow.document.createElement('option');
        option.value = opcion;
        option.textContent = opcion;
        provinciaDestino.appendChild(option);
    });

    form.appendChild(provinciaDestino);

    // Campo 3: Bultos
    const bultosLabel = newWindow.document.createElement('label');
    bultosLabel.textContent = 'Bultos:';
    form.appendChild(bultosLabel);

    const bultos = newWindow.document.createElement('input');
    bultos.type = 'number';
    bultos.name = 'bultos';
    bultos.className = 'input-field';
    bultos.required = true;
    form.appendChild(bultos);

    // Campo 4: Kilos
    const kilosLabel = newWindow.document.createElement('label');
    kilosLabel.textContent = 'Kilos:';
    form.appendChild(kilosLabel);

    const kilos = newWindow.document.createElement('input');
    kilos.type = 'number';
    kilos.name = 'kilos';
    kilos.className = 'input-field';
    kilos.required = true;
    kilos.step = '1';  // Para no permitir decimales
    form.appendChild(kilos);

    // Campo 5: Largo
    const largoLabel = newWindow.document.createElement('label');
    largoLabel.textContent = 'Largo (cm):';
    form.appendChild(largoLabel);

    const largo = newWindow.document.createElement('input');
    largo.type = 'number';
    largo.name = 'largo';
    largo.className = 'input-field';
    largo.required = true;
    largo.step = '1';  // Para no permitir decimales
    form.appendChild(largo);

    // Campo 6: Ancho
    const anchoLabel = newWindow.document.createElement('label');
    anchoLabel.textContent = 'Ancho (cm):';
    form.appendChild(anchoLabel);

    const ancho = newWindow.document.createElement('input');
    ancho.type = 'number';
    ancho.name = 'ancho';
    ancho.className = 'input-field';
    ancho.required = true;
    ancho.step = '1';  // Para no permitir decimales
    form.appendChild(ancho);

    // Campo 7: Alto
    const altoLabel = newWindow.document.createElement('label');
    altoLabel.textContent = 'Alto (cm):';
    form.appendChild(altoLabel);

    const alto = newWindow.document.createElement('input');
    alto.type = 'number';
    alto.name = 'alto';
    alto.className = 'input-field';
    alto.required = true;
    alto.step = '1';  // Para no permitir decimales
    form.appendChild(alto);

    // Crear botón de envío
    const submitButton = newWindow.document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Calcular precio';
    submitButton.className = 'main-button';
    form.appendChild(submitButton);

    // Añadir el formulario al cuerpo de la nueva ventana
    newWindow.document.body.appendChild(form);

    // Opcional: añadir estilo básico
    const estilo = newWindow.document.createElement('style');
    estilo.textContent = `
        body { font-family: Arial, sans-serif; padding: 5px; }
        form { display: flex; flex-direction: column; }
        label { margin: 10px 0 5px; }
        .background-image { background-image: url('../images/fondo.jpg'); }
        .input-field { margin-bottom: 4px; padding: 4px; }
        .main-button { padding: 5px; background-color: #007BFF; color: white; border: none; cursor: pointer; }
        .main-button:hover { background-color: #0056b3; }
        #resultado { margin-top: 20px; padding: 15px; background-color: #f4f4f4; border-radius: 8px; }
    `;
    newWindow.document.head.appendChild(estilo);
}