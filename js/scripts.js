// Obtener el modal
var modal = document.getElementById("projectModal");

// Función para abrir el modal
function openModal(title, description, link, techLogos) {
    document.getElementById("modalProjectTitle").innerText = title;
    document.getElementById("modalProjectDescription").innerText = description;
    document.getElementById("modalProjectLink").href = link;

    // Limpia los logos anteriores
    const techLogosContainer = document.getElementById("modalTechLogos");
    techLogosContainer.innerHTML = ''; // Limpiar contenido anterior

    // Agrega los logos de tecnologías
    techLogos.forEach(logo => {
        const img = document.createElement('img');
        img.src = logo; // URL del logo
        img.alt = "Technology Logo"; // Texto alternativo
        techLogosContainer.appendChild(img);
    });

    // Inicialmente, configuramos display flex pero sin mostrar aún (manteniendo la opacidad en 0)
    modal.style.display = "flex";

    // Esperar un pequeño intervalo antes de agregar la clase 'show' para activar la animación
    setTimeout(function () {
        modal.classList.add("show");
    }, 10);  // El pequeño retraso permite que la transición se active correctamente
}

// Cuando el usuario hace clic fuera del modal, lo cierra
window.onclick = function(event) {
    if (event.target == modal) {
        // Ocultar el modal eliminando la clase 'show'
        modal.classList.remove("show");

        // Esperar a que la transición finalice antes de cambiar el display
        setTimeout(function() {
            modal.style.display = "none";
        }, 300);  // Debe coincidir con la duración de la transición en el CSS
    }
}

// Desplazamiento suave entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efecto de aparición al hacer scroll en secciones con clase .animated
const animatedSections = document.querySelectorAll('.animated');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            sectionObserver.unobserve(entry.target); // Deja de observar una vez que ha aparecido
        }
    });
}, { threshold: 0.1 });

animatedSections.forEach(section => {
    sectionObserver.observe(section);
});

// Efecto de aparición al hacer scroll en proyectos
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            projectObserver.unobserve(entry.target); // Deja de observar una vez que ha aparecido
        }
    });
}, { threshold: 0.1 });

projectCards.forEach((card, index) => {
    // Ajusta la animación de cada proyecto con un retraso basado en su índice
    card.style.animationDelay = `${(index + 5) * 0.2}s`;
    projectObserver.observe(card);
});
