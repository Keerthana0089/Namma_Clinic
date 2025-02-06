document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            // Get selected role
            const role = document.querySelector('input[name="role"]:checked')?.value;

            // Ensure that role is selected
            if (!role) {
                document.getElementById("error-message").innerText = "Please select a role!";
                return;
            }

            // Check if username and password are entered
            if (username.trim() === "" || password.trim() === "") {
                document.getElementById("error-message").innerText = "Username and password are required!";
                return;
            }

            // Store login details in localStorage
            localStorage.setItem("token", "dummy-jwt-token");
            localStorage.setItem("username", username);
            localStorage.setItem("role", role); // Store role

            // Redirect based on role
            if (role === "admin") {
                window.location.href = "admin_dashboard.html"; // Admin Dashboard
            } else if (role === "patient") {
                window.location.href = "patient_dashboard.html"; // Patient Dashboard
            }

            // Uncomment this when using a real backend:
            /*
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", username);
                localStorage.setItem("role", role);
                window.location.href = role === "admin" ? "admin_dashboard.html" : "patient_dashboard.html";
            } else {
                document.getElementById("error-message").innerText = data.message;
            }
            */
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Check user role on dashboard
    const role = localStorage.getItem("role");
    if (role === "admin" && window.location.pathname.includes("admin_dashboard.html")) {
        document.querySelector("h1").innerText = `Welcome, Admin!`;
    } else if (role === "patient" && window.location.pathname.includes("patient_dashboard.html")) {
        document.querySelector("h1").innerText = `Welcome, Patient!`;
    } else if (!role) {
        window.location.href = "index.html"; // Redirect to login page if no role
    }

    // Logout functionality
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Remove the data from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            
            // Redirect to login page
            window.location.href = "index.html";
        });
    }
});
