$(document).ready(function() {
    $.getJSON("https://felixaveras.github.io/js/projects.json", function(data) {
        let proyectosContainer = $("#project-card");
        let filaActual;

        $.each(data, function(index, proyecto) {
            // Crear una nueva fila cada 3 proyectos
            if (index % 3 === 0) {
                filaActual = $('<div class="row"></div>');
                proyectosContainer.append(filaActual);
            }
            // Crear la columna y la tarjeta del proyecto
            let columna = $('<div class="col-12 col-md-12 mb-3"></div>');
            let cardHtml = `
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${proyecto.image}" class="img-fluid rounded-start" alt="${proyecto.title}">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${proyecto.title}</h5>
                            <p class="card-text">${proyecto.short_description}</p>
                            <button class="btn btn-link ver-detalle card-link" data-index="${index}">View Details</button>
                        </div>
                        </div>
                    </div>
                </div>
            `;
            columna.append(cardHtml);
            filaActual.append(columna);
        });
    });

    $(document).on('click', '.ver-detalle', function() {
        let index = $(this).data('index');
        console.log("Índice del proyecto:", index); // Depuración

        $.getJSON("https://felixaveras.github.io/js/projects.json", function(data) {
            let proyecto = data[index];
            let detalles = proyecto.details[0];

            console.log("Detalles del proyecto:", detalles); // Depuración

            if (!detalles) {
                console.error("No se encontraron detalles para este proyecto.");
                return;
            }

            let coownerHtml = '';

            // Verificar si coowner existe en el objeto principal del proyecto
            if (proyecto.coowner && Array.isArray(proyecto.coowner) && proyecto.coowner.length > 0) {
                let coownerLinks = proyecto.coowner.map(coowner => `<a class="coownerLink" href="${coowner.url}">${coowner.name}</a>`).join('');
                coownerHtml = `<p>Co-owner with ${coownerLinks}</p>`;
                console.log("Co-owners encontrados:", proyecto.coowner); // Depuración
            } else {
                console.log("No se encontraron co-owners para este proyecto."); // Depuración
            }

            let techListHtml = '';
            if (detalles.tech && Array.isArray(detalles.tech)) {
                techListHtml = detalles.tech.map(tech => `<li>${tech.name}</li>`).join('');
            } else {
                console.log("No se encontraron tecnologías para este proyecto."); // Depuración
            }

            let linksListHtml = '';
            if (detalles.links && Array.isArray(detalles.links)) {
                linksListHtml = detalles.links.map(link => `<a class="list-group-item list-group-item-action" href="${link.url}">${link.name}</a>`).join('');
            } else {
                console.log("No se encontraron links para este proyecto."); // Depuración
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
                                            ${techListHtml}
                                        </ul>
                                        <h6>Links:</h6>
                                        <ul class="list-group list-group-flush">
                                            ${linksListHtml}
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
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar el archivo JSON:", textStatus, errorThrown);
        });
    });
});