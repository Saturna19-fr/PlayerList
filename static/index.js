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