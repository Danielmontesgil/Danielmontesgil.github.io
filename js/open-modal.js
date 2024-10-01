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
