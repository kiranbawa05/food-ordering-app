// protect page
if (!localStorage.getItem("role")) {
    window.location.href = "login.html";
}

let cart = [];
let menuData = [];

// logout
function logout() {
    localStorage.clear();
    window.location.href = "/login.html";
}

// load menu
async function loadMenu() {
    const res = await fetch("/menu");
    menuData = await res.json();
    displayMenu(menuData);
}

// display menu
function displayMenu(data) {
    const menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="images/${item.image}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <p>${item.available ? "Available" : "Out of Stock"}</p>

            <button 
                ${!item.available ? "disabled" : ""} 
                onclick="addToCart('${item.name}')">
                Add
            </button>
        `;

        menuDiv.appendChild(card);
    });
}

// search
function searchItem() {
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = menuData.filter(i => i.name.toLowerCase().includes(value));
    displayMenu(filtered);
}

// cart
function addToCart(name) {
    const item = cart.find(i => i.name === name);

    if (item) item.qty++;
    else cart.push({ name, qty: 1 });

    updateCart();
}

function updateCart() {
    const div = document.getElementById("cart");
    const totalDiv = document.getElementById("total");

    div.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const p = document.createElement("p");

        p.innerHTML = `
            ${item.name} x ${item.qty}
            <button onclick="inc('${item.name}')">+</button>
            <button onclick="dec('${item.name}')">-</button>
        `;

        div.appendChild(p);
        total += item.qty;
    });

    totalDiv.innerText = "Items: " + total;
}

function inc(name) {
    const item = cart.find(i => i.name === name);
    item.qty++;
    updateCart();
}

function dec(name) {
    const item = cart.find(i => i.name === name);
    item.qty--;

    if (item.qty === 0) {
        cart = cart.filter(i => i.name !== name);
    }

    updateCart();
}

// place order
async function placeOrder() {
    const res = await fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: cart })
    });

    const data = await res.json();

    alert(data.message);

    cart = [];
    updateCart();
    loadMenu();
}

// init
loadMenu();