$(document).ready(function() {
    $.getJSON("https://felixaveras.github.io/js/projects.json", function(data) {
        let proyectosContainer = $("#project-card");
        
        $.each(data, function(index, proyecto) {
            // Layout moderno: Tarjetas verticales con efecto hover elegante
            let cardHtml = `
                <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="project-flat-card shadow-sm">
                        <div class="project-img-wrapper">
                            <img src="${proyecto.image}" alt="${proyecto.title}">
                        </div>
                        <div class="p-4">
                            <h5 class="fw-bold mb-2">${proyecto.title}</h5>
                            <p class="text-muted small mb-4">${proyecto.short_description}</p>
                            <button class="btn btn-outline-primary rounded-pill px-4 ver-detalle" data-index="${index}">
                                Explore Details
                            </button>
                        </div>
                    </div>
                </div>
            `;
            proyectosContainer.append(cardHtml);
        });
    });

    $(document).on('click', '.ver-detalle', function() {
        let index = $(this).data('index');

        $.getJSON("https://felixaveras.github.io/js/projects.json", function(data) {
            let proyecto = data[index];
            let detalles = proyecto.details[0];

            if (!detalles) return;

            let techListHtml = (detalles.tech || []).map(tech => 
                `<span class="badge bg-light text-primary border me-1 mb-1 p-2">${tech.name}</span>`
            ).join('');

            let linksListHtml = (detalles.links || []).map(link => 
                `<a class="btn btn-primary rounded-pill me-2 mb-2" href="${link.url}" target="_blank">${link.name}</a>`
            ).join('');

            let modalHtml = `
                <div class="modal fade" id="proyectoModal" tabindex="-1">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content border-0" style="border-radius: 30px; overflow: hidden;">
                            <div class="modal-body p-0">
                                <div class="row g-0">
                                    <div class="col-lg-5">
                                        <img src="${detalles.image}" class="img-fluid h-100" style="object-fit: cover;" alt="${detalles.title}">
                                    </div>
                                    <div class="col-lg-7 p-5">
                                        <div class="d-flex justify-content-between align-items-start mb-4">
                                            <h3 class="fw-bold m-0">${detalles.title}</h3>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <p class="text-muted mb-4">${detalles.description}</p>
                                        <h6 class="fw-bold small text-uppercase tracking-wider mb-3">Technologies</h6>
                                        <div class="mb-4">${techListHtml}</div>
                                        <div class="pt-3 border-top">${linksListHtml}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('body').append(modalHtml);
            $('#proyectoModal').modal('show');
            $('#proyectoModal').on('hidden.bs.modal', () => $('#proyectoModal').remove());
        });
    });
});
