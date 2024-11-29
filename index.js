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


fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
        const postsContainer = document.getElementById("post-container");

        const posts = data;

        const latestPosts = posts.slice(0, 50);

        latestPosts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.className = "col-12 col-md-6 col-lg-4 mb-4";
            postDiv.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}...</p>
                        <button class="btn btn-primary" id="read-more-${post.id}">Read More</button>
                    </div>
                </div>
            `;

            postsContainer.appendChild(postDiv);

            const readMoreButton = document.getElementById(`read-more-${post.id}`);
            readMoreButton.addEventListener("click", () => {
                console.log("Read More clicked for post", post);

                localStorage.setItem("post_id", post.id);
                localStorage.setItem("username", post.userId);
                window.location.href = "single-page.html";
            });
        });
    })
    .catch((error) => {
        console.error("Error fetching posts:", error);
    });