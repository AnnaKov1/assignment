const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
    document.querySelector(".showed-user").textContent = `Welcome, ${loggedInUser.username}!`;
} else {
    document.querySelector(".showed-user").textContent = "No user logged in.";
}

document.querySelector("button[type='logout']").onclick = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
};

fetch("https://api.escuelajs.co/api/v1/products")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const galleryContainer = document.getElementById("gallery-container");

        for (let i = 0; i < 20; i++) {
            const image = data[i];
            const card = document.createElement("div");
            card.classList.add("col");

            card.innerHTML = `
                <div class="card">
                    <img src="${image.images}" class="card-img-top">
                </div>
            `;

            galleryContainer.appendChild(card);
        }
    })
