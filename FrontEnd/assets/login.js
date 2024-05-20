//**constantes globales */
const apiUrl = "http://localhost:5678/api/";
let userInfos ={
email : document.getElementById("email"),
password : document.getElementById("password")
};
const form = document.querySelector("form");
const submit = document.querySelector("form #submit");
const messErreur = document.querySelector("#connexion p");
console.log(userInfos)

//**ecouteur sur le bouton envoyer */
submit.addEventListener("click", (e) => {
    e.preventDefault();
    login();
})

//**envoi identifiants de connexion */
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
            messErreur.textContent = "erreur lors de la connexion, veuillez reessayer";
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        messErreur.textContent = "Veuiiez vérifier votre connexion";
    }
    }