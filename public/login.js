document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      email: document.getElementById("loginEmail").value.trim(),
      password: document.getElementById("loginPassword").value
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "students.html"; // Redirect after login
      } else {
        errorMsg.textContent = data.message || "Login failed";
      }

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "Server error";
    }
  });
});
