const bodyDiv = document.getElementById("bodyDiv");

document.querySelector("form").addEventListener('submit', event => {
    event.preventDefault();
    const search = event.target.elements.searcInput.value;
    //const search = document.querySelector("#search").value;
    fetch(`https://restcountries.eu/rest/v2/name/${search}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(json => {
            bodyDiv.innerHTML = "";
            json.map((data) => {
                const { name, flag } = data;
                //const name=data.name;
                //const flag=data.flag;
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

                        })
                })
                bodyDiv.appendChild(Cdiv);
            })
        })
        .catch(error => {
            if (error.message === "404") { console.log("notFound"); }
        })
})