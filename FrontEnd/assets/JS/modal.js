
// Trouver les éléments du DOM
const btnBack = document.getElementById('return');
const btnForward = document.getElementById('ajout');
const btnFindPic = document.getElementById('choice');
const btnValidateChoice = modal2.querySelector('#validate');
btnCloseModal1 = document.getElementById('closeModal1');
btnCloseModal2 = document.getElementById('closeModal2');
modal2 = document.getElementById('modal2');
const token = window.localStorage.getItem("token");
const form= document.querySelector('#addPic');

// fonction fermer la modale1
btnCloseModal1.addEventListener("click", function() {
    modal1.style.display = "none";
})

// fermer la modale2
btnCloseModal2.addEventListener("click", function() {
    modal2.style.display = "none";
})

// retour sur première modal
btnBack.addEventListener("click", function(event) {
    event.preventDefault();
    modal2.style.display = "none";
    modal1.style.display = "flex";
})

// aller sur modal2
btnForward.addEventListener("click", function(event) {
    event.preventDefault();
    modal2.style.display ="flex";
    modal1.style.display ="none";
    removeOldForm();
    createNewElements();
})

function removeOldForm() {
    const oldForm = document.querySelector('.formContainer');
    if (oldForm) {
        oldForm.remove();
    }
}


// Création de nouveaux éléments de la modal2
function createNewElements() {
    loadCategories();
   form.addEventListener("submit", (e) =>{
       console.log("coucou")
       e.preventDefault()
        sendNewWork(e);
       
})
}


// Fonction pour charger les catégories depuis l'API et les afficher dans le sélecteur
async function loadCategories() {
    const categorySelect = document.getElementById("categoryId");
    const response = await fetch(apiUrl + 'categories');
    const categories = await response.json();

    // Ajoute une option par défaut
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Choisissez une catégorie";
    categorySelect.appendChild(defaultOption);

    // Ajoute les catégories au sélecteur
    categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
    }); 
  }

// fonction pour choisir la photo a ajouter dans la gallerie
async function addPic(){
    btnFindPic.addEventListener("click", (event) => {
        event.preventDefault()
        form.querySelector('#inputFile').style.display="block";
        form.querySelector('#previewImage').style.display="block";
        form.querySelector('#picChoice').style.display="none";
        form.querySelector("p").style.display="none";
        form.querySelector('#choice').style.display="none";
    })
}
addPic();

// gestion aperçu image
const inputFile = document.querySelector("#inputFile");
const previewImage = document.querySelector("#previewImage");

if (inputFile) {
    inputFile.addEventListener("change", function (event) {
      event.preventDefault()
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

// envoi nouveau projet au serveur 
async function sendNewWork(event){
    event.preventDefault();  
    const formData= new FormData(form);
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
        //Actualiser le tableau global de mes projets
        works = works.filter((work) => work.id != workid);
        //Supprimer depuis la page index le projet avec id = workid
        document.querySelector(`[workid='${workid}']`).remove()
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
