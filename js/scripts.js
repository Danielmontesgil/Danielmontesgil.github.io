// Obtener el modal
var modal = document.getElementById("projectModal");

// Función para abrir el modal
function openModal(project) {
    document.getElementById("modalProjectTitle").innerText = project.title;
    document.getElementById("modalProjectDescription").innerText = project.description;

    const techLogosContainer = document.getElementById("modalTechLogos");
    techLogosContainer.innerHTML = ''; // Limpiar logos anteriores

    // Añadir logos de tecnologías
    project.tools.forEach(logo => {
        const img = document.createElement('img');
        img.src = `src/icons/${logo}`;
        img.alt = "Technology Logo";
        techLogosContainer.appendChild(img);
    });

    // Limpiar responsabilidades anteriores
    const responsibilitiesList = document.getElementById("modalResponsibilities");
    responsibilitiesList.innerHTML = '';

    // Añadir responsabilidades
    project.responsibilities.forEach(responsibility => {
        const li = document.createElement('li');
        li.innerText = responsibility;
        responsibilitiesList.appendChild(li);
    });

    // Mostrar o ocultar la sección del enlace de GitHub
    const projectLinkContainer = document.getElementById("modalLinkContainer");
    if (project.link) {
        projectLinkContainer.style.display = "block"; // Mostrar la sección completa
        document.getElementById("modalProjectLink").href = project.link; // Asignar enlace

        // Añadir la clase 'modal-section' si hay enlace
        techLogosContainer.classList.add("modal-section");
    } else {
        projectLinkContainer.style.display = "none"; // Ocultar toda la sección si no hay enlace

        // Quitar la clase 'modal-section' si no hay enlace
        techLogosContainer.classList.remove("modal-section");
    }

    // Mostrar el modal
    modal.style.display = "flex";
    document.body.classList.add('no-scroll');

    setTimeout(function () {
        modal.classList.add("show");
    }, 10);

    const gallerySection = document.querySelector('.modal-gallery');  // Sección de la galería
    const gallerySlidesContainer = document.querySelector('.gallery-slides');
    gallerySlidesContainer.innerHTML = ''; // Limpiar las imágenes anteriores

    // Obtener la lista de imágenes sin el primer ícono
    const galleryImages = project.gallery.slice(1); 

    // Si hay imágenes adicionales, mostrar la galería
    if (galleryImages.length > 0) {
        gallerySection.style.display = 'block'; // Mostrar la galería

        // Añadir imágenes de la galería al modal
        galleryImages.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = `src/images/${imageSrc}`;  // Asumiendo que las imágenes estén en esta ruta
            img.alt = "Project image";
            gallerySlidesContainer.appendChild(img);
        });

        // Resetear el slide actual
        currentSlide = 0;
        moveSlide(0); // Mover al primer slide cuando se abre el modal
    } else {
        // Si no hay imágenes, ocultar la galería
        gallerySection.style.display = 'none';
    }
}

// Función para cargar los proyectos desde el archivo JSON y rellenar las tarjetas existentes
function loadProjects() {
    fetch('src/docs/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const projectId = card.getAttribute('data-id');
                const projectData = data[projectId];

                if (projectData) {
                    const imgElement = card.querySelector('img');
                    const titleElement = card.querySelector('h3');

                    imgElement.src = `src/icons/${projectData.gallery[0]}`; 
                    imgElement.alt = projectData.title;
                    titleElement.innerText = projectData.title;

                    // Asignar evento para abrir el modal al hacer clic en la tarjeta
                    card.onclick = function() {
                        openModal(projectData);
                    };
                }
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}

// Índice actual de la galería
let currentSlide = 0;

// Función para moverse entre imágenes de la galería
function moveSlide(direction) {
    const slides = document.querySelectorAll('.gallery-slides img');
    const totalSlides = slides.length;

    // Calcular el índice de la nueva imagen
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Mover las imágenes
    const gallerySlides = document.querySelector('.gallery-slides');
    gallerySlides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Función para alternar la visibilidad de las responsabilidades al hacer clic en el título
function toggleResponsibilities() {
    const responsibilitiesList = document.getElementById("modalResponsibilities");

    if (responsibilitiesList.style.display === "none" || responsibilitiesList.style.display === "") {
        responsibilitiesList.style.display = "block";
    } else {
        responsibilitiesList.style.display = "none";
    }
}

// Función para inicializar el estado de la lista de responsabilidades según el dispositivo
function initializeResponsibilities() {
    const responsibilitiesList = document.getElementById("modalResponsibilities");
    const responsibilitiesTitle = document.querySelector(".modal-section h4");

    // Comprobamos si estamos en móvil (pantalla pequeña) o en escritorio (pantalla grande)
    if (window.innerWidth <= 1024) {
        responsibilitiesList.style.display = "none";  // Ocultamos responsabilidades en móviles
        responsibilitiesTitle.addEventListener('click', toggleResponsibilities);  // Añadimos el evento solo en móvil
    } else {
        responsibilitiesList.style.display = "block";  // Mostramos siempre las responsabilidades en escritorio
        responsibilitiesTitle.innerText = "Responsabilidades";  // Título normal en escritorio
    }
}

// Llamamos a la función de inicialización cuando la página esté lista
document.addEventListener('DOMContentLoaded', initializeResponsibilities);


// Cargar los proyectos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProjects);

function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove('no-scroll');

    setTimeout(function () {
        modal.style.display = "none";
    }, 300);
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Desplazamiento suave entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Efecto de aparición al hacer scroll en las secciones generales
const animatedSections = document.querySelectorAll('.animated');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-section');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedSections.forEach(section => {
    sectionObserver.observe(section);
});

// Animación en cascada para los proyectos
const projectSection = document.querySelector('#projects');
const projectCards = document.querySelectorAll('.project-card');

const projectSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in-up-card');
                }, index * 100); // Ajuste el retraso entre tarjetas
            });
            projectSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectSectionObserver.observe(projectSection);

// Obtener el año actual dinámicamente
document.getElementById('currentYear').textContent = new Date().getFullYear();
