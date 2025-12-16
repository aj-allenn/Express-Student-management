document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("image");
    let imageBase64 = "";

    if (fileInput.files[0]) {
      imageBase64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
      });
    }

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      image: imageBase64
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
});
