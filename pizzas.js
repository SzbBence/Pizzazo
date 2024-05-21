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
initApp();
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

let adatok = [];

//Get kérés
fetch("https://pizza.kando-dev.eu/Pizza")
.then(function(data) {
    return data.json();
})
.then(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        adatok.push(data[i])
        document.getElementById("content").innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${data[i].kepURL}" alt="Avatar">
        <div class="card-body">
          <h5>${data[i].name}</h5>
          <p>${data[i].szoveg}</p>
          <a href="#">${data[i].link}</a>
          <button onclick="Részletek: ${adatok[i].id}">Részletek</button>
        </div>
      </div>`
    }
});

function Reszletek(id) {
    console.log(id);
}