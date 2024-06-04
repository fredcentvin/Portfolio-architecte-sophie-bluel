// variables gobales
let categories= [];
let works = [];
const apiUrl = 'http://localhost:5678/api/';
let filterContainer = null;
let galleryContainer = null;
let currentFilter = 0;
let deleteModal = null;
let deleteBt = null;


// fonctions
async function fetchCategories(){
    const response = await fetch(apiUrl + 'categories');
    const data = await response.json();
    categories = data;
}

async function fetchWorks(){
    const response = await fetch(apiUrl + 'works');
    const data = await response.json();
    works = data;
    console.log(works)
}

function displayCategories(){
    categories.forEach(category => {
        const categoryElement = document.createElement('button');
        categoryElement.className = 'filter';
        categoryElement.innerHTML = category.name;
        filterContainer.appendChild(categoryElement);
        categoryElement.addEventListener('click', (event) => filterWorks(category.id, event));   
    });
}


function filterWorks(categoryId, event) {
    currentFilter = categoryId;
    document.querySelector('button').classList.remove('active');
    event.target.classList.add('active');
    displayWorks();
}


function displayWorks(){
    galleryContainer.innerHTML = '';
    works.forEach(work => {
        if(currentFilter === 0 || work.categoryId === currentFilter){
            buildWorkHtml(work);
        }
    });
}

function displayDeleteModalWorks() {
    deleteModal.innerHTML = '';
    works.forEach(work => {
       
        buildDeleteModalWorkHtml(work);
    });
}

function buildDeleteModalWorkHtml(work){
    const workElement = document.createElement('div');
    workElement.className = 'work';
    workElement.setAttribute("workid", work.id);
    workElement.innerHTML = `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <button class="trashModalButton" type="button"><i class="fa-regular fa-trash-can"></i></button>   
        </figure>
    `;
    workElement.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        deleteWork(work.id)
    })
    deleteModal.appendChild(workElement);
}

function  buildWorkHtml(work){
    const workElement = document.createElement('div');
    workElement.className = 'work';
    workElement.innerHTML = `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `;
    galleryContainer.appendChild(workElement);
}


async function init() {
    // trouver des éléménts du DOM
    filterContainer = document.getElementById('filters');
    galleryContainer = document.getElementById('gallery');
    btTous = document.getElementById('btTous');
    title = document.getElementById('title');
    deleteBt = document.getElementById('btDelete');
    deleteModal = document.getElementById('deleteModal');
    modal1 = document.getElementById('modal1');
   

    // connecter des actions
    btTous.addEventListener('click', (event) => filterWorks(0, event));
    modifs.addEventListener('click', showDeleteModal);

    // fetch data
    await fetchWorks();
    await fetchCategories();

    // initialiser l'interface
    displayCategories();
    displayWorks();
}


function showDeleteModal() {
    modal1.style.display ='block';
    deleteModal.style.display ='grid';
    displayDeleteModalWorks();
}

// eventlistener
document.addEventListener('DOMContentLoaded', init);


// modifs affichage DOM après login
function changeDisplayHtml(){
    const logout = document.getElementById("logout");
    const login = document.getElementById("login");
    const editing = document.getElementById('editing')
    const modifs = document.getElementById('modifs')
   

    if (window.localStorage.getItem("token")) {
        login.style.display = "none";
        logout.style.display ="block";
        editing.style.display = "flex";
        filters.style.display = "none";
        btTous.style.display = "none";
        modifs.style.display = "flex";
    } 
    else {
        logout.style.display = "none";
        login.style.display = "flex";
        editing.style.display = "none";
        filters.style.display = "flex";
        modifs.style.display = "none";
    }
}
changeDisplayHtml()


// fonction déconnexion admin
logout.addEventListener("click", function() {
    window.localStorage.removeItem("token");
    window.location.href="./index.html";
})