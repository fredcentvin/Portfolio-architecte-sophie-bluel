//**constantes globales */
const apiUrl = "http://localhost:5678/api/";
const email = document.querySelector("form #mail");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const submit = document.querySelector("form #submit");
const messErreur = document.querySelector("#connexion p");


//**ecouteur sur le bouton envoyer */
submit.addEventListener("click", (e) => {
    e.preventDefault()
    const email = e.target.email;
    const password = e.target.password;
    login();
})

//**envoi identifiants de connexion */
async function login() {
    try{
        const response = fetch(apiUrl+"users/login",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email, password})
        })
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.href = "./index.html"
        } else {
            console.error("Erreur lors de la connexion à l'API");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
    }
   






