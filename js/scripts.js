// Obtener el modal
var modal = document.getElementById("projectModal");

// Función para abrir el modal
function openModal(project) {
    document.getElementById("modalProjectTitle").innerText = project.title;
    document.getElementById("modalProjectDescription").innerText = project.description;
    document.getElementById("modalProjectLink").href = project.link;

    const techLogosContainer = document.getElementById("modalTechLogos");
    techLogosContainer.innerHTML = ''; // Limpiar logos anteriores

    // Añadir logos de tecnologías
    project.techLogos.forEach(logo => {
        const img = document.createElement('img');
        img.src = logo;
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

    // Mostrar el modal
    modal.style.display = "flex";
    document.body.classList.add('no-scroll');

    setTimeout(function () {
        modal.classList.add("show");
    }, 10);
}

// Función para cargar los proyectos desde el archivo JSON
function loadProjects() {
    fetch('src/docs/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectsGrid = document.querySelector('.project-grid');

            data.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <img src="src/icons/${project.gallery[0]}" alt="${project.title}">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;

                // Asignar evento de click para abrir el modal
                projectCard.onclick = function() {
                    openModal(project);
                };

                projectsGrid.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}

// Cargar los proyectos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProjects);


// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        document.body.classList.remove('no-scroll');

        setTimeout(function () {
            modal.style.display = "none";
        }, 300);
    }
};

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
