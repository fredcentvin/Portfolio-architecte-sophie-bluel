
// fonction fermer la modale
btnCloseModal.addEventListener("click", function() {
    modal1.style.display ="none";
})

// fonction effacer work

// const poubelle = document.createElement("i");
// poubelle.setAttribute("class", "fa-solid fa-trash-can");
// poubelle.setAttribute("id", "trash");

// poubelle.addEventListener("click", function (e) {
//   e.preventDefault();
//   e.stopPropagation();
//   const confirmation = confirm(
//     "Etes vous sûr de vouloir supprimer ce projet !"
//   );
//   if (confirmation) {
//     const projetId = projet.id;
//     // Supprime le projet depuis l'API
//     deleteImage(projetId);
//   }
// });