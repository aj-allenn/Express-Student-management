// const apiBase = "/api/students";

// const $ = (id) => document.getElementById(id);

// async function fetchStudents() {
//   const res = await fetch(apiBase);
//   const list = await res.json();
//   const tbody = document.querySelector("#studentsTable tbody");
//   tbody.innerHTML = "";
//   list.forEach(s => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${s.name}</td>
//       <td>${s.email}</td>
//       <td>${s.rollNumber}</td>
//       <td>${s.marks.subject1}, ${s.marks.subject2}, ${s.marks.subject3}</td>
//       <td>
//         <button data-id="${s._id}" class="edit">Edit</button>
//         <button data-id="${s._id}" class="del">Delete</button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// async function submitForm(e) {
//   e.preventDefault();
//   const id = $("studentId").value;
//   const payload = {
//     name: $("name").value,
//     email: $("email").value,
//     rollNumber: $("rollNumber").value,
//     marks: {
//       subject1: Number($("subject1").value),
//       subject2: Number($("subject2").value),
//       subject3: Number($("subject3").value)
//     }
//   };

//   if (id) {
  
//     const res = await fetch(`${apiBase}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });
//     if (!res.ok) alert("Update failed");
//   } else {
    
//     const res = await fetch(apiBase, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });
//     if (!res.ok) alert("Create failed");
//   }

//   clearForm();
//   await fetchStudents();
// }

// function clearForm() {
//   $("studentId").value = "";
//   $("name").value = "";
//   $("email").value = "";
//   $("rollNumber").value = "";
//   $("subject1").value = "";
//   $("subject2").value = "";
//   $("subject3").value = "";
// }

// document.getElementById("studentForm").addEventListener("submit", submitForm);
// document.getElementById("clearBtn").addEventListener("click", () => { clearForm(); });

// document.querySelector("#studentsTable").addEventListener("click", async (e) => {
//   if (e.target.classList.contains("edit")) {
//     const id = e.target.dataset.id;
//     const res = await fetch(`${apiBase}/${id}`);
//     const s = await res.json();
//     $("studentId").value = s._id;
//     $("name").value = s.name;
//     $("email").value = s.email;
//     $("rollNumber").value = s.rollNumber;
//     $("subject1").value = s.marks.subject1;
//     $("subject2").value = s.marks.subject2;
//     $("subject3").value = s.marks.subject3;
//   }

//   if (e.target.classList.contains("del")) {
//     const id = e.target.dataset.id;
//     if (!confirm("Delete this student?")) return;
//     const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
//     if (res.ok) {
//       await fetchStudents();
//     } else {
//       alert("Delete failed");
//     }
//   }
// });


// fetchStudents().catch(err => console.error(err));



const token = localStorage.getItem("token");
if(!token) window.location.href = "login.html";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

const form = document.getElementById("studentForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("studentId").value;
  const studentData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    rollNumber: document.getElementById("rollNumber").value,
    subject1: document.getElementById("subject1").value,
    subject2: document.getElementById("subject2").value,
    subject3: document.getElementById("subject3").value,
  };
  
  const url = id ? `/api/students/${id}` : "/api/students";
  const method = id ? "PUT" : "POST";
  
  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(studentData)
  });
  
  form.reset();
  fetchStudents();
});

async function fetchStudents() {
  const res = await fetch("/api/students", { headers: { Authorization: `Bearer ${token}` } });
  const students = await res.json();
  const tbody = document.getElementById("studentsTable");
  tbody.innerHTML = "";
  students.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.rollNumber}</td>
      <td>${s.subject1}, ${s.subject2}, ${s.subject3}</td>
      <td>
        <button onclick="editStudent('${s._id}')">Edit</button>
        <button onclick="deleteStudent('${s._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.editStudent = async (id) => {
  const res = await fetch(`/api/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  const s = await res.json();
  document.getElementById("studentId").value = s._id;
  document.getElementById("name").value = s.name;
  document.getElementById("email").value = s.email;
  document.getElementById("rollNumber").value = s.rollNumber;
  document.getElementById("subject1").value = s.subject1;
  document.getElementById("subject2").value = s.subject2;
  document.getElementById("subject3").value = s.subject3;
};

window.deleteStudent = async (id) => {
  await fetch(`/api/students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  fetchStudents();
};

// Load students on page load
fetchStudents();
