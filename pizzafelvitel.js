document.getElementById("pizza-bekuldes").onclick = function() {

    let adatok2 = {
    name: document.getElementById("name").value,
    kepURL: document.getElementById("kepURL").value,
    isGlutenFree: document.getElementById("isGlutenFree").checked ? 1 : 0
    }
    console.log(adatok2);

fetch("https://pizza.kando-dev.eu/Pizza",{
        method: "POST",
        body: JSON.stringify(adatok2),
        headers: {
            "Content-Type" : "application/json"
        }
    })
}
