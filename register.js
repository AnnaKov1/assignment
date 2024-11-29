document.querySelector("button[type='submit']").onclick = function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username === "" || password === "" || confirmPassword === "") {
        alert("All fields are required.");
        return;
    }

    if (password.length < 4 || password.length > 20) {
        alert("Password must be between 4 and 20 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        alert("Please enter a valid email address.");
        return;
    }

    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];
    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
};
