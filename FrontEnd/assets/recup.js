// récupération des catégories
async function recupererCategories() {
        const reponse = await fetch("http://localhost:5678/api/categories");
        return await reponse.json();
        // console.log(reponse);   
}
recupererCategories();


async function tabcategories() {
    const donnees = await recupererCategories();
    if (donnees) {
        const monTableau = donnees.map((element) => element.name);
        // console.log(monTableau);
    }
}
tabcategories();



//  création des boutons
let blocbutton = document.createElement("div");

let sectionbloc = document.getElementById("portfolio");
sectionbloc.appendChild(blocbutton);
blocbutton.classList.add("blocbtn");

let buttontous = document.createElement("div");
blocbutton.appendChild(buttontous);
buttontous.classList.add("btn");
buttontous.innerHTML=("tous");

let buttonobjet = document.createElement("div");
blocbutton.appendChild(buttonobjet);
buttonobjet.classList.add("btn");
buttonobjet.innerHTML= ("objet")

let buttonappartement = document.createElement("div");
blocbutton.appendChild(buttonappartement);
buttonappartement.classList.add("btn");
buttonappartement.innerHTML=("Appartements");

let buttonhoteletrestos = document.createElement("div");
blocbutton.appendChild(buttonhoteletrestos);
buttonhoteletrestos.classList.add("btn");
buttonhoteletrestos.innerHTML=("Hotels &t restaurants");


// variables
const gallery = document.createElement("div")
portfolio.appendChild(gallery)
gallery.classList.add("gallery")



// récupération des travaux
async function travaux () {
        const toustravaux = await fetch("http://localhost:5678/api/works");     
        return await toustravaux.json();
    }
travaux();



// affichage des travaux
 async function displaytravo () {
    const tabtravo = await travaux()
    console.log(tabtravo)   
    tabtravo.forEach(element => {
        const figure= document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src= element.imageUrl;
        title = element.title;
        alt = element.title;
        console.log(title)
        gallery.appendChild(figure);
        figure.appendChild(img);
        img.classList.add("gallery.img")
        figure.appendChild(figcaption);
        const titleelement= document.createElement("p")
        titleelement.textContent=title
        figcaption.appendChild(titleelement)
        
    })
}
displaytravo();