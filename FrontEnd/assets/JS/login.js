// constantes globales 
const apiUrl = "http://localhost:5678/api/";
const form = document.querySelector("form");
const submit = document.querySelector("form #submit");
const messError = document.querySelector("#connexion p");
let userInfos ={
email : document.getElementById("email"),
password : document.getElementById("password")
};


// ecouteur sur le bouton envoyer 
submit.addEventListener("click", (e) => {
    e.preventDefault();
    login();
})

// envoi identifiants de connexion 
async function login() {
    try{
        const response = await fetch(apiUrl+"users/login",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email:userInfos.email.value, password:userInfos.password.value}),
        })
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.href = ".././index.html";
            
        } else {
            console.error("Erreur lors de la connexion à l'API");
            messError.textContent = "Erreur lors de la connexion, veuillez reessayer";
        }
    }
    catch (error) {
        console.error("Erreur réseau :", error);
        messError.textContent = "Veuillez vérifier votre connexion";
    }
    }

   
      
    