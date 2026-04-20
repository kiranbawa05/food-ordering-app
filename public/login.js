async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.status !== 200) {
        document.getElementById("error").innerText = data.message;
        return;
    }

    // save role
    localStorage.setItem("role", data.role);

    // redirect
    if (data.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}