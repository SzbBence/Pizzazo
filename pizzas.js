let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Margarétás Pizza',
        image: 'margareta.webp',
        price: 1950
    },
    {
        id: 2,
        name: 'Szalámis Pizza',
        image: 'szalamis.jpg',
        price: 2250
    },
    {
        id: 3,
        name: 'Hawaii Pizza',
        image: 'hawaii.jpg',
        price: 2550
    },
    {
        id: 4,
        name: 'Vegetáriánus Pizza',
        image: 'vege.jpg',
        price: 2550
    },
    {
        id: 5,
        name: 'Pikáns prémium pizza',
        image: 'pikans.jpg',
        price: 2950
    },
    {
        id: 6,
        name: 'Carbonara pizza',
        image: 'carbonara.avif',
        price: 2550
    },
    {
        id: 7,
        name: 'Coca-Cola',
        image: 'coca.png',
        price: 300
    },
    {
        id: 8,
        name: 'Coca-cola Zero',
        image: 'zero.png',
        price: 250
    },
    {
        id: 9,
        name: 'Fanta',
        image: 'fanta.png',
        price: 300
    },
    {
        id: 10,
        name: 'Cappy',
        image: 'cappy.png',
        price: 350
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="pizzak/${value.image}" style="-webkit-user-drag: none; border-radius: 10px;">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} Ft</div>
            <button onclick="addToCard(${key})" style="border-radius: 10px; background-color: #E74049; color: black;">Kosárba dobás</button>`;
        list.appendChild(newDiv);
    })
}

function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="pizzak/${value.image}" style="-webkit-user-drag: none; border-radius: 10px;"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} Ft</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}


let searchButton = document.querySelector('button[type="submit"]');
let searchInput = document.querySelector('input[type="search"]');
let allItems = document.querySelectorAll('.item');

searchButton.addEventListener('click', (event) => {
    event.preventDefault();

    let searchValue = searchInput.value.toLowerCase();
    allItems.forEach(item => {
        item.style.display = 'none';
    });

    allItems.forEach(item => { 
        let itemName = item.querySelector('.title').textContent.toLowerCase();
        if (itemName.includes(searchValue)) {
            item.style.display = 'block';
        }
    });
});


searchInput.addEventListener('input', () => {
    let inputValue = searchInput.value.trim();

    if (inputValue === '') {
        allItems.forEach(item => {
            item.style.display = 'block';
        });
    }
});



let adatok = []
fetch("https://pizza.kando-dev.eu/Pizza")
.then((res) => res.json())
.then((datas) => {
    console.log(datas);
    let content = document.getElementById("content");
    for(const data of datas) {
      adatok.push(data);

      products.push({
        name: data.name,
        id: data.id,
        image: data.kepURL,
        price: 1000
      })


        /*content.innerHTML += `<div class="card m-3" style="width: 18rem;">
        <img src="${data.kepURL}" class="card-img-top" alt="...">
        <div class="cardbody">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="https://www.youtube.com/watch?v=QYlzoplheEU" class="btn btn-primary">NYOMJ RÁ</a>
          <p>Gluténmentes: ${data.isGlutenFree ? "Igen" : "Nem"}</p>
          <button onclick="Reszletek(${data.id})">Részletek</button>
          <button onclick="Delete(${data.id})">Törlés</button>
        </div>
      </div>`*/
    }
    initApp();
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
