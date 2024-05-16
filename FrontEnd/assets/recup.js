//** constantes */
const apiUrl = "http://localhost:5678/api/";
let works = [];
let categories = [];


//** récupération des travaux et stockage dans variable works */
async function getWorks() {
    const response = await fetch(apiUrl+"works");     
    works = await response.json();
    // console.log(works)
}


//** récupération des catégories */
async function getCategories() {
    const response = await fetch(apiUrl+"categories");
    categories = await response.json(); 
    // console.log(categories)    
}


//** création en dur dans html du bouton categorie"tous" */
const buttons = document.querySelectorAll("btn");
let blocButton = document.createElement("div");
let sectionBloc = document.getElementById("portfolio");
let buttonId0 = document.createElement("btn");
const gallery = document.createElement("div");
sectionBloc.appendChild(blocButton);
blocButton.classList.add("blocbtn");
blocButton.appendChild(buttonId0);
buttonId0.setAttribute("id","0");
buttonId0.classList.add("btn");
buttonId0.innerHTML=("tous");


//** création des boutons-filtre categories */
async function createBtns() {
    categories.forEach((element) => {
        const btn = document.createElement("button");
        blocButton.appendChild(btn);
        btn.id = element.id;
        btn.classList.add("btn");
        btn.textContent = element.name;
    })
}



//** filtrage categories au bouton actif*/
async function filtercategories() { 
    blocButton.addEventListener("click", (event) =>{
    btnid = event.target.id;
    event.target.classList.add('btnactive');
    gallery.innerHTML="";
    
    if (btnid != "0"){
         const workFilter = works.filter((work) =>work.categoryId == btnid);
         workFilter.forEach((element)=> {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            img.src = element.imageUrl;
            title = element.title;
            alt = element.title;
            id = element.categoryId;
            gallery.appendChild(figure);
            figure.appendChild(img);
            img.classList.add("gallery.img");
            figure.appendChild(figcaption);
            const titleElement= document.createElement("p");
            titleElement.textContent=title;
            figcaption.appendChild(titleElement);   
         })
    }
    else {
        displayTravo() 
    }
    }) 
} 
filtercategories()


//** création gallery dans html */
portfolio.appendChild(gallery);
gallery.classList.add("gallery");

//** affichage de tous les travaux dans la gallery */
async function displayTravo() {  
    works.forEach(element => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = element.imageUrl;
    title = element.title;
    alt = element.title;
    id = element.categoryId;
    gallery.appendChild(figure);
    figure.appendChild(img);
    img.classList.add("gallery.img");
    figure.appendChild(figcaption);
    const titleElement= document.createElement("p");
    titleElement.textContent=title;
    figcaption.appendChild(titleElement);
})
}


//**fonction initialisation */
document.addEventListener("DOMContentLoaded",async()=> {
    await getWorks();
    await getCategories();
    await createBtns();
    await filtercategories();
    await displayTravo();
})
