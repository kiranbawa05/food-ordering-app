if (!localStorage.getItem("role")) {
    window.location.href = "login.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "/login.html";
}

let rating = 0;

function setRating(r) {
    rating = r;
    document.getElementById("status").innerText = "Rating: " + r;
}

async function submitFeedback() {
    const message = document.getElementById("msg").value;

    const res = await fetch("/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rating,
            message
        })
    });

    const data = await res.json();

    document.getElementById("status").innerText = data.message;
}