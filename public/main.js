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
//     // update
//     const res = await fetch(`${apiBase}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });
//     if (!res.ok) alert("Update failed");
//   } else {
//     // create
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

// // initial load
// fetchStudents().catch(err => console.error(err));



const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

form.addEventListener("submit", saveStudent);

async function saveStudent(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    rollNumber: document.getElementById("rollNumber").value,

    subject1Name: document.getElementById("subject1Name").value,
    subject1Marks: document.getElementById("subject1Marks").value,

    subject2Name: document.getElementById("subject2Name").value,
    subject2Marks: document.getElementById("subject2Marks").value,

    subject3Name: document.getElementById("subject3Name").value,
    subject3Marks: document.getElementById("subject3Marks").value
  };

  const id = document.getElementById("studentId").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `/api/students/${id}` : "/api/students";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });

  form.reset();
  document.getElementById("studentId").value = "";
  loadStudents();
}

async function loadStudents() {
  const res = await fetch("/api/students");
  const students = await res.json();

  tableBody.innerHTML = "";

  students.forEach(st => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${st.name}</td>
      <td>${st.email}</td>
      <td>${st.rollNumber}</td>
      <td>
        ${st.subject1Name} - ${st.subject1Marks}<br>
        ${st.subject2Name} - ${st.subject2Marks}<br>
        ${st.subject3Name} - ${st.subject3Marks}
      </td>
      <td>
        <button onclick="editStudent('${st._id}')">Edit</button>
        <button onclick="deleteStudent('${st._id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function editStudent(id) {
  const res = await fetch(`/api/students/${id}`);
  const s = await res.json();

  document.getElementById("studentId").value = s._id;

  document.getElementById("name").value = s.name;
  document.getElementById("email").value = s.email;
  document.getElementById("rollNumber").value = s.rollNumber;

  document.getElementById("subject1Name").value = s.subject1Name;
  document.getElementById("subject1Marks").value = s.subject1Marks;

  document.getElementById("subject2Name").value = s.subject2Name;
  document.getElementById("subject2Marks").value = s.subject2Marks;

  document.getElementById("subject3Name").value = s.subject3Name;
  document.getElementById("subject3Marks").value = s.subject3Marks;
}

async function deleteStudent(id) {
  await fetch(`/api/students/${id}`, { method: "DELETE" });
  loadStudents();
}


loadStudents();
