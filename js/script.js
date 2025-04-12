$(document).ready(function() {
    $.getJSON("projects.json", function(data) {
        let proyectosContainer = $("#project-card");
        let filaActual;

        $.each(data, function(index, proyecto) {
            // Crear una nueva fila cada 3 proyectos
            if (index % 3 === 0) {
                filaActual = $('<div class="row mb-3"></div>');
                proyectosContainer.append(filaActual);
            }j
            // Crear la columna y la tarjeta del proyecto
            let columna = $('<div class="col-12 col-md-4 mb-3"></div>');
            let cardHtml = `
                <div class="card w-100 h-100">
                    <img src="${proyecto.image}" class="card-img-top" alt="${proyecto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${proyecto.title}</h5>
                        <p class="card-text">${proyecto.description}</p>
                        <button class="btn btn-primary ver-detalle" data-index="${index}">Ver detalle</button>
                    </div>
                </div>
            `;
            columna.append(cardHtml);
            filaActual.append(columna);
        });
    });

    // Evento para el modal (lo agregaremos después)
});