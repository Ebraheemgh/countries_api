const bodyDiv = document.getElementById("bodyDiv");
const countryDiv = document.getElementById("countryBody");

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
            bodyDiv.innerHTML = "";

            json.map((data) => {

                const { name, flag } = data; //data is every each index in the array
                // const name= data.name;
                // const flag= data.flag;
                Cdiv = document.createElement("div");
                img = document.createElement("img");
                cName = document.createElement("label");


                img.src = flag;
                cName.textContent = name;
                Cdiv.appendChild(img);
                Cdiv.appendChild(cName);
                Cdiv.classList.add("countryDiv");
                Cdiv.addEventListener("click", event => {
                    fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
                        .then(r => {
                            if (!r.ok) throw new Error(r.status);
                            return r.json();
                        })
                        .then(country => {


                            // console.log("name", country[0].name);
                            document.getElementById("name").textContent = ": " + country[0].name;

                            // console.log("capital", country[0].capital)
                            document.getElementById("capital").textContent = ": " + country[0].capital;

                            // console.log("population", country[0].population);
                            document.getElementById("population").textContent = ": " + country[0].population;

                            // console.log("region", country[0].region);
                            document.getElementById("region").textContent = ": " + country[0].region;

                            //  console.log("currency", country[0].currencies[0].name);
                            document.getElementById("curruncy").textContent = ": " + country[0].currencies[0].name;
                            document.getElementById("cflag").src = flag;
                            bodyDiv.style.display = "none";
                            countryDiv.style.display = "flex";
                        })
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

document.getElementById("backButton").addEventListener("click", event => {
    bodyDiv.style.display = "flex";
    countryDiv.style.display = "none";
})