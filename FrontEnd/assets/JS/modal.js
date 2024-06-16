
// Trouver les éléments du DOM
const btnBack = document.getElementById('return');
const btnForward = document.getElementById('ajout');
const btnFindPic = document.getElementById('choice');
const btnValidateChoice = document.getElementById('validate');
btnCloseModal1 = document.getElementById('closeModal1');
btnCloseModal2 = document.getElementById('closeModal2');
modal2 = document.getElementById('modal2');
const token = window.localStorage.getItem("token");
const form= document.querySelector('#addPic');
const formTitle = modal2.querySelector('#titre');
const formSelect = modal2.querySelector('#categoryId');
const inputFile = document.querySelector("#inputFile");
const previewImage = document.querySelector("#previewImage");


// fonction fermer les modales
btnCloseModal1.addEventListener("click", function() {
    modal1.style.display = "none";
})

btnCloseModal2.addEventListener("click", function() {
  modal2.style.display = "none";
  location.reload();
})

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none"; 
  }
  if (event.target == modal2) {
    location.reload();
    modal2.style.display = "none"; 
  }
}

// retour sur première modal
btnBack.addEventListener("click", function(event) {
    event.preventDefault();
    modal2.style.display = "none";
    modal1.style.display = "flex";
})

// aller sur modal2
btnForward.addEventListener("click", function(event) {
  event.preventDefault();
  modal2.style.display = "flex";
  modal1.style.display = "none";
  resetForm();
  form.querySelector('i.fa-image').style.display="block";
  form.querySelector('p').style.display="block";
  form.querySelector('#choice').style.display="block";
  form.querySelector('#inputFile').style.display="none";
  form.querySelector('#previewImage').style.display="none";
  document.getElementById('picChoice').style.padding="10px";
  btnValidateChoice.classList.remove('active');  
});


// Réinitialise le formulaire
function resetForm() {
  form.reset();
  const inputFile = document.getElementById('inputFile');
  inputFile.value = '';
  previewImage.src = '';
 
}


// Écouteur d'événement pour le champ de titre
formTitle.addEventListener('input', function() {
  updateButtonClass();
});


// Écouteur d'événement pour le champ de catégorie
formSelect.addEventListener('change', function() {
  updateButtonClass();
});


// Fonction pour mettre à jour la classe du bouton
function updateButtonClass() {
  const titleValue = formTitle.value.trim();
  const selectValue = formSelect.value;

  if (titleValue !== '' && selectValue !== '' && inputFile !== '') {
      btnValidateChoice.classList.add('active');
  } else {
      btnValidateChoice.classList.remove('active');  
  }
}


// envoi nouvel élément au serveur
    form.addEventListener("submit", (e) =>{
      e.preventDefault();
      e.stopPropagation();
      sendNewWork(e);   
})


// fonction pour choisir la photo a ajouter dans la gallerie
async function addPic(){
    btnFindPic.addEventListener("click", (event) => {
        event.preventDefault();
        form.querySelector('#inputFile').style.display="block";
        form.querySelector('#previewImage').style.display="block";
        document.getElementById('picChoice').style.padding="0";
       
        form.querySelector('i.fa-image').style.display="none";
        form.querySelector('p').style.display="none";
        form.querySelector('#choice').style.display="none";
    })
}
addPic();


// gestion aperçu image
if (inputFile) {
    inputFile.addEventListener("change", function (event) {
      event.preventDefault();
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
        previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
        form.querySelector('#inputFile').style.display="none";
      }
    });
  }


  /////// Dialogue avec API ///////

  // Fonction pour charger les catégories depuis l'API et les afficher dans le sélecteur
async function loadCategories() {
  // Ajoute une option par défaut
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Choisissez une catégorie";
    formSelect.appendChild(defaultOption);

  // Ajoute les catégories au sélecteur
categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    formSelect.appendChild(option);
  }) 
}


// envoi nouveau projet au serveur 
async function sendNewWork(event){
    event.preventDefault();  
    const formData = new FormData(form);
    // console.log(formData)
    try{
    const response = await fetch(apiUrl + 'works',{
        method: 'POST',
        headers: {Authorization: `bearer ${token}`},  
        body: formData,
    })
    modal2.style.display="none";
    await fetchWorks();
    displayWorks();
  } 
  catch (error) {
  console.error('Erreur lors de la requête :', error);
}
} 


 // fonction effacer work sur serveur  
async function deleteWork(workid) {
    const response = await fetch(apiUrl + 'works/'+ workid,{
      method: 'DELETE',
      headers: {Authorization: `bearer ${token}`},  
  })
  .then((response) => {
      console.log(response);
      if (response.status == 204) {
        // L'élement à bien été supprimé de la base de donnnées
        // Actualiser le tableau global de mes projets
        works = works.filter((work) => work.id != workid);
        // Supprimer depuis la page index le projet avec id = workid
        document.querySelector(`[workid='${workid}']`).remove();
        displayWorks();
      }
      if (response.status == 401) {
        alert("Vous n'etes pas autorisé a supprimer le projet !");
      }
    })
    .catch((error) => {
      alert("Le projet a bien été supprimé !");
      console.log(error);
    });
}
