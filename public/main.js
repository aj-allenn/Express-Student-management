const apiBase = "/api/students";

const $ = (id) => document.getElementById(id);

async function fetchStudents() {
  const res = await fetch(apiBase);
  const list = await res.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  list.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.rollNumber}</td>
      <td>${s.marks.subject1}, ${s.marks.subject2}, ${s.marks.subject3}</td>
      <td>
        <button data-id="${s._id}" class="edit">Edit</button>
        <button data-id="${s._id}" class="del">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function submitForm(e) {
  e.preventDefault();
  const id = $("studentId").value;
  const payload = {
    name: $("name").value,
    email: $("email").value,
    rollNumber: $("rollNumber").value,
    marks: {
      subject1: Number($("subject1").value),
      subject2: Number($("subject2").value),
      subject3: Number($("subject3").value)
    }
  };

  if (id) {
    // update
    const res = await fetch(`${apiBase}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) alert("Update failed");
  } else {
    // create
    const res = await fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) alert("Create failed");
  }

  clearForm();
  await fetchStudents();
}

function clearForm() {
  $("studentId").value = "";
  $("name").value = "";
  $("email").value = "";
  $("rollNumber").value = "";
  $("subject1").value = "";
  $("subject2").value = "";
  $("subject3").value = "";
}

document.getElementById("studentForm").addEventListener("submit", submitForm);
document.getElementById("clearBtn").addEventListener("click", () => { clearForm(); });

document.querySelector("#studentsTable").addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit")) {
    const id = e.target.dataset.id;
    const res = await fetch(`${apiBase}/${id}`);
    const s = await res.json();
    $("studentId").value = s._id;
    $("name").value = s.name;
    $("email").value = s.email;
    $("rollNumber").value = s.rollNumber;
    $("subject1").value = s.marks.subject1;
    $("subject2").value = s.marks.subject2;
    $("subject3").value = s.marks.subject3;
  }

  if (e.target.classList.contains("del")) {
    const id = e.target.dataset.id;
    if (!confirm("Delete this student?")) return;
    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchStudents();
    } else {
      alert("Delete failed");
    }
  }
});

// initial load
fetchStudents().catch(err => console.error(err));
