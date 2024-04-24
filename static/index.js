var IsDarkMode = true
IsDarkMode = document.querySelector("html").getAttribute('data-bs-theme') == "dark"
const exampleModal = document.getElementById('playerIdentifiers')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-identifier')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.
    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBodyInput = exampleModal.querySelector('.showlicense')

    modalTitle.textContent = `License de ${button.textContent}`
    modalBodyInput.value = recipient
  })
}

function copyText(button) {
  alert("Le bouton copy ne fonctionne pas encore.")
  var text = button.previousElementSibling;
  
  text.select();
  document.execCommand("copy");
}

const toggleDarkModeBtn = document.getElementById('toggledarkmode')
toggledarkmode.addEventListener('click', event => {
  if (IsDarkMode) {
    document.querySelector("html").setAttribute("data-bs-theme", "light")
    IsDarkMode = false
  }
  else
  {
    document.querySelector("html").setAttribute("data-bs-theme", "dark")
    IsDarkMode = true

  }
  let color = document.querySelector("html").getAttribute("data-bs-theme")
  fetch('/setcookie', {
    method: 'POST',
    headers: {
      "selectedColors": color
    }
  })
})

const AlertUpdate = document.getElementById("majat")
if (AlertUpdate){
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0'); // Formate avec zéro à gauche si nécessaire
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  AlertUpdate.textContent = "Mis à jour à "+ formattedTime
}

setInterval(function() {
  window.location.reload();
}, 300000); // in ms
// const playerIdentifiers = document.getElementById('playerIdentifiers')
// if (playerIdentifiers) {
//   playerIdentifiers.addEventListener('show.bs.modal', event => {
//     // Button that triggered the modal
//     const button = event.relatedTarget
//     // Extract info from data-bs-* attributes
//     // const recipient = button.getAttribute('data-bs-identifier')
//     const recipient = "test"

//     // Update the modal's content.
//     const modalTitle = playerIdentifiers.querySelector('.modal-title')
//     const modalBodyInput = playerIdentifiers.querySelector('.modal-body input')

//     modalTitle.textContent = `New message to ${recipient}`
//     modalBodyInput.value = recipient
//   })
// }