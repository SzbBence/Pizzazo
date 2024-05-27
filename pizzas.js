

let adatok = []
fetch("https://pizza.kando-dev.eu/Pizza")
.then((res) => res.json())
.then((datas) => {
    console.log(datas);
    let content = document.getElementById("content");
    for(const data of datas) {
      adatok.push(data);
        content.innerHTML += `<div class="card m-3" style="width: 18rem;">
        <img src="${data.kepURL}" class="card-img-top" alt="...">
        <div class="cardbody">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="https://www.youtube.com/watch?v=QYlzoplheEU" class="btn btn-primary">NYOMJ RÁ</a>
          <p>Gluténmentes: ${data.isGlutenFree ? "igen" : "Nem"}</p>
          <button onclick="Reszletek(${data.id})">Részletek</button>
          <button onclick="Delete(${data.id})">Törlés</button>
        </div>
      </div>`
    }
})
function Reszletek(id) {
    fetch("https://pizza.kando-dev.eu/Pizza" + id)
        .then (function(adatok){
            return adatok.json();
        })
    }

function Delete(id) {
    fetch("https://pizza.kando-dev.eu/Pizza/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(function() {
        location.reload();
    })
}
