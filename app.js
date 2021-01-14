const bodyDiv = document.getElementById("bodyDiv");
const countryDiv = document.getElementById("countryBody");
const backButton = document.getElementById("backButton");
document.querySelector("form").addEventListener('submit', event => {
    event.preventDefault();
})
document.getElementById("search").addEventListener('keyup', event => {
    event.preventDefault();
    //const search = event.target.elements.searcInput.value;
    const search = document.querySelector("#search").value;
    fetch(`https://restcountries.eu/rest/v2/name/${search}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(json => {
            bodyDiv.style.display = "flex";
            countryDiv.style.display = "none";
            bodyDiv.innerHTML = "";

            json.map((data) => {

                const { name, flag } = data; //data is every each index in the array
                let Cdiv = document.createElement("div");
                let img = document.createElement("img");
                let cName = document.createElement("label");


                img.src = flag;
                cName.textContent = name;
                Cdiv.appendChild(img);
                Cdiv.appendChild(cName);
                Cdiv.classList.add("countryDiv");
                Cdiv.addEventListener("click", event => {
                    fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
                        .then(name_response => {
                            if (!name_response.ok) throw new Error(name_response.status);
                            return name_response.json();
                        })
                        .then(country => {
                            document.getElementById("name").textContent = ": " + country[0].name;
                            document.getElementById("capital").textContent = ": " + country[0].capital;
                            document.getElementById("population").textContent = ": " + country[0].population;
                            document.getElementById("region").textContent = ": " + country[0].region;
                            document.getElementById("curruncy").textContent = ": " + country[0].currencies[0].name;
                            document.getElementById("cflag").src = flag;
                            bodyDiv.style.display = "none";
                            countryDiv.style.display = "flex";
                            backButton.style.display = "inline";
                        });
                })
                bodyDiv.appendChild(Cdiv);
            })
        })
        .catch(error => {
            if (error.message === "404") {
                bodyDiv.innerHTML = "";
                const lab = document.createElement("label");
                lab.textContent = "country not found";
                lab.classList.add("lab");
                bodyDiv.appendChild(lab);
            }
        })
})

backButton.addEventListener("click", event => {
    bodyDiv.style.display = "flex";
    countryDiv.style.display = "none";
    backButton.style.display = "none";
})