// Obtener el modal
var modal = document.getElementById("projectModal");

// Función para abrir el modal
function openModal(title, description, link, techLogos) {
    document.getElementById("modalProjectTitle").innerText = title;
    document.getElementById("modalProjectDescription").innerText = description;
    document.getElementById("modalProjectLink").href = link;

    const techLogosContainer = document.getElementById("modalTechLogos");
    techLogosContainer.innerHTML = ''; // Limpiar logos anteriores

    techLogos.forEach(logo => {
        const img = document.createElement('img');
        img.src = logo;
        img.alt = "Technology Logo";
        techLogosContainer.appendChild(img);
    });

    modal.style.display = "flex";
    document.body.classList.add('no-scroll');

    setTimeout(function () {
        modal.classList.add("show");
    }, 10);
}

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
