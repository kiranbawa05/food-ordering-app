if (localStorage.getItem("role") !== "admin") {
    window.location.href = "login.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "/login.html";
}

async function addItem() {
    const item = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        quantity: Number(document.getElementById("quantity").value),
        available: true,
        image: document.getElementById("image").value
    };

    await fetch("/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    loadItems();
}

async function loadItems() {
    const res = await fetch("/menu");
    const data = await res.json();

    const div = document.getElementById("items");
    div.innerHTML = "";

    data.forEach(item => {
        div.innerHTML += `
            <p>${item.name} - ${item.quantity}</p>
            <button onclick="del('${item._id}')">Delete</button>
        `;
    });
}

async function del(id) {
    await fetch("/menu/" + id, { method: "DELETE" });
    loadItems();
}

loadItems();