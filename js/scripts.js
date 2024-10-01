// Obtener el modal
var modal = document.getElementById("projectModal");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Función para abrir el modal
function openModal(title, description, link) {
    document.getElementById("modalProjectTitle").innerText = title;
    document.getElementById("modalProjectDescription").innerText = description;
    document.getElementById("modalProjectLink").href = link;
    modal.style.display = "flex";  // Cambiar "block" por "flex" para el centrado
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, lo cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
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

// Efecto de aparición al hacer scroll
const animatedElements = document.querySelectorAll('.animated');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target); // Deja de observar una vez que ha aparecido
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => {
    observer.observe(element);
});


document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.classList.add('show');
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.classList.add('hide'); // Añadimos la clase hide para la animación de salida

    // Espera el tiempo de la animación antes de eliminar el modal
    setTimeout(() => {
        modal.classList.remove('show', 'hide');
    }, 300); // Asegúrate de que coincida con la duración de la transición en CSS
});
