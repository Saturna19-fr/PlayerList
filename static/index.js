let selected = []

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

function RemoveItem(array, item){
  if (array.includes(item)){
    selected = array.filter(function(elem) {
      return elem !== item;
  });
  }
}

function copyText(button) {
  alert("Le bouton copy ne fonctionne pas encore.")
  var text = button.previousElementSibling;
  
  text.select();
  navigator.clipboard.writeText(text.value);
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
  AlertUpdate.textContent = "Mis à jour à "+ formattedTime + " !"
}

var BanReasonsDiv = document.getElementById("banreasons")

fetch('/static/banreasons.json') // URL du fichier JSON
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Traitez les données JSON ici
        data.forEach(ban => {
          console.log(`bansmall: ${ban.bansmall}`);
          const button = document.createElement("button");
    
          
          // Définir la classe Bootstrap et le type de bouton
          
          button.type = "button";
          
          button.className = "btn"; // Utilise Bootstrap pour le style

          
          // Ajouter le texte au bouton
          
          button.textContent = ban.bansmall;

          
          // Ajouter un attribut personnalisé (data-bs-banreason)
          
          button.setAttribute("data-bs-banreason", ban.bansmall);
          button.setAttribute("data-bs-toggle", "button")
          button.setAttribute("data-bs-placement", "top")
          button.setAttribute("data-bs-title", ban.banlarge)

          
          // Ajouter le bouton au div
          
          BanReasonsDiv.appendChild(button);
          
          
          button.addEventListener("click", event => {
            if (button.classList.contains("active")) {
              console.log("On add")
              selected.push(button.textContent);
            }
            else {
              RemoveItem(selected, button.textContent)
            }
            console.log(selected)
            if (selected.length == 0){
              document.getElementById("banreason").value = "" // Juste pour afficher la demande de mettre des éléments.
            } else {
              document.getElementById("banreason").value = "/ban " + "12 " + `${selected.join(", ")}`
            }
          })
          // new bootstrap.Tooltip(button)
        })
      })
      .catch(error => {
        console.error('Il y a eu une erreur:', error);
    });

// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))