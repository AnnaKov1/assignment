const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const users = JSON.parse(localStorage.getItem("users")) || [];
const profileContainer = document.getElementById("profile-container");

if (loggedInUser) {
    let user;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === loggedInUser.username) {
            user = users[i];
            break;
        }
    }

    if (user) {
        profileContainer.innerHTML = `
            <div class="card" style="max-width: 400px; margin: auto;">
                <img src="${user.image || 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'}" alt="User Image" class="card-img-top" style="height: 250px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">Username: ${user.username}</h5>
                    <p class="card-text">Password: ${user.password}</p>
                    <button id="updatePassword" class="btn btn-primary w-100 mb-2">Update Password</button>
                    <button id="updateImage" class="btn btn-secondary w-100">Update Image</button>
                </div>
            </div>
        `;

        document.getElementById("updatePassword").onclick = () => {
            const newPasswordInput = document.createElement("input");
            newPasswordInput.type = "password";
            newPasswordInput.placeholder = "Enter new password";
            newPasswordInput.classList.add("form-control", "mb-2");

            const confirmButton = document.createElement("button");
            confirmButton.textContent = "Confirm";
            confirmButton.classList.add("btn", "btn-success", "w-100", "mb-2");

            profileContainer.appendChild(newPasswordInput);
            profileContainer.appendChild(confirmButton);

            confirmButton.onclick = () => {
                const newPassword = newPasswordInput.value;
                if (newPassword.length >= 4 && newPassword.length <= 20) {
                    user.password = newPassword;
                    updateLocalStorage(users);
                    alert("Password updated successfully!");
                    profileContainer.querySelector(".card-text").textContent = `Password: ${user.password}`;
                    newPasswordInput.remove();
                    confirmButton.remove();
                } else {
                    alert("Password must be between 4 and 20 characters.");
                }
            };
        };

        document.getElementById("updateImage").onclick = () => {
            const newImageInput = document.createElement("input");
            newImageInput.type = "text";
            newImageInput.placeholder = "Enter image URL";
            newImageInput.classList.add("form-control", "mb-2");

            const confirmButton = document.createElement("button");
            confirmButton.textContent = "Confirm";
            confirmButton.classList.add("btn", "btn-success", "w-100");

            profileContainer.appendChild(newImageInput);
            profileContainer.appendChild(confirmButton);

            confirmButton.onclick = () => {
                const newImage = newImageInput.value;
                if (newImage) {
                    user.image = newImage;
                    updateLocalStorage(users);
                    profileContainer.querySelector(".card-img-top").src = newImage;
                    alert("Image updated successfully!");
                    newImageInput.remove();
                    confirmButton.remove();
                }
            };
        };
    }
}

const logoutButton = document.querySelector("button[type='logout']");
if (logoutButton) {
    logoutButton.onclick = () => {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    };
}

function updateLocalStorage(updatedUsers) {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
}
