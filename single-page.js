document.addEventListener("DOMContentLoaded", () => {
    const postContainer = document.getElementById("post-container");
    console.log(postContainer);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        document.querySelector(".showed-user").textContent = `Welcome, ${loggedInUser.username}!`;
    } else {
        document.querySelector(".showed-user").textContent = "No user logged in.";
    }

    const logoutButton = document.querySelector("button[type='button']");
    if (logoutButton) {
        logoutButton.onclick = () => {
            localStorage.removeItem("loggedInUser");
            alert("Logged out successfully!");
            window.location.href = "login.html";
        };
    } else {
        console.error("Logout button not found");
    }

});


document.addEventListener("DOMContentLoaded", () => {
    const postId = localStorage.getItem("post_id");

    if (postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                const singleContainer = document.getElementById("single-container");
                singleContainer.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Error fetching post:", error);
                const singleContainer = document.getElementById("single-container");
                singleContainer.innerHTML = `<p>Post not found.</p>`;
            });
    } else {
        console.error("No post ID found in localStorage.");
    }
});