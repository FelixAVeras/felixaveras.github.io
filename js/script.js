$(document).ready(function() {
    $.getJSON("https://felixaveras.github.io/js/projects.json", function(data) {
        let proyectosContainer = $("#project-card");
        let filaActual;

        $.each(data, function(index, proyecto) {
            // Crear una nueva fila cada 3 proyectos
            if (index % 3 === 0) {
                filaActual = $('<div class="row mb-3"></div>');
                proyectosContainer.append(filaActual);
            }
            // Crear la columna y la tarjeta del proyecto
            let columna = $('<div class="col-12 col-md-4 mb-3"></div>');
            let cardHtml = `
                <div class="card w-100 h-100">
                    <img src="${proyecto.image}" class="img-fluid rounded" alt="${proyecto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${proyecto.title}</h5>
                        <p class="card-text">${proyecto.short_description}</p>
                        <button class="btn btn-primary ver-detalle" data-index="${index}">View Details</button>
                    </div>
                </div>
            `;
            columna.append(cardHtml);
            filaActual.append(columna);
        });
    });

    // Evento para el modal (lo agregaremos después)
    $(document).on('click', '.ver-detalle', function() {
        let index = $(this).data('index');
        $.getJSON("https://felixaveras.github.io/js/projects.json", function(data) {
            let proyecto = data[index];
            let detalles = proyecto.details[0]; // Obtener el primer objeto de detalles

            let coownerHtml = '';
            
            if (detalles.coowner && detalles.coowner.length > 0) {
                let coownerLinks = detalles.coowner.map(coowner => `<a class="list-group-item list-group-item-action" href="${coowner.url}">${coowner.name}</a>`).join('');
                coownerHtml = `<p>Co-owner with ${coownerLinks}</p>`;
            }

            let modalHtml = `
                <div class="modal fade" id="proyectoModal" tabindex="-1" aria-labelledby="proyectoModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="proyectoModalLabel">${detalles.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${coownerHtml}
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <img src="${detalles.image}" class="img-fluid rounded" alt="${detalles.title}">
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <p>${detalles.description}</p>
                                        <h6>Tech Used:</h6>
                                        <ul>
                                            ${detalles.tech.map(tech => `<li>${tech.name}</li>`).join('')}
                                        </ul>
                                        <h6>Links:</h6>
                                        <ul class="list-group list-group-flush">
                                            ${detalles.links.map(link => `<a class="list-group-item list-group-item-action" href="${link.url}">${link.name}</a>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('body').append(modalHtml);
            $('#proyectoModal').modal('show');
            $('#proyectoModal').on('hidden.bs.modal', function (e) {
                $('#proyectoModal').remove();
            });
        });
    });
});