// const token = localStorage.getItem("token");
// const user = JSON.parse(localStorage.getItem("user"));

// if(!token || !user) window.location.href="login.html";

// // Show user avatar
// const userAvatarDiv = document.getElementById("userAvatar");
// if(user.image){
//   userAvatarDiv.innerHTML = `<img src="${user.image}" alt="${user.name}">`;
// } else {
//   userAvatarDiv.innerHTML = `<div>${user.name[0]}</div>`;
// }

// // Logout
// document.getElementById("logoutBtn").addEventListener("click", ()=>{
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   window.location.href="login.html";
// });

// // Convert file to Base64
// function toBase64(file){
//   return new Promise((res, rej)=>{
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = ()=>res(reader.result);
//     reader.onerror = e=>rej(e);
//   });
// }

// // Form submission
// document.getElementById("studentForm").addEventListener("submit", async e=>{
//   e.preventDefault();
//   const id = document.getElementById("studentId").value;
//   const fileInput = document.getElementById("image");
//   let imageBase64 = "";

//   if(fileInput && fileInput.files[0]){
//     imageBase64 = await toBase64(fileInput.files[0]);
//   }

//   const studentData = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     rollNumber: document.getElementById("rollNumber").value,
//     subject1: document.getElementById("subject1").value,
//     subject2: document.getElementById("subject2").value,
//     subject3: document.getElementById("subject3").value,
//     image: imageBase64
//   };

//   const url = id ? `/api/students/${id}` : "/api/students";
//   const method = id ? "PUT" : "POST";

//   await fetch(url,{
//     method,
//     headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},
//     body: JSON.stringify(studentData)
//   });

//   document.getElementById("studentForm").reset();
//   fetchStudents();
// });

// // Fetch students
// async function fetchStudents(){
//   const res = await fetch("/api/students", { headers: { Authorization:`Bearer ${token}` } });
//   const students = await res.json();
//   const tbody = document.getElementById("studentsTable");
//   tbody.innerHTML = "";

//   students.forEach(s=>{
//     let avatarHTML = s.image ? `<img class="student-img" src="${s.image}">` : `<div class="student-img" style="background:#22d3ee;color:white;text-align:center;">${s.name[0]}</div>`;
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${avatarHTML} ${s.name}</td>
//       <td>${s.email}</td>
//       <td>${s.rollNumber}</td>
//       <td>${s.subject1}, ${s.subject2}, ${s.subject3}</td>
//       <td>
//         <button onclick="editStudent('${s._id}')">Edit</button>
//         <button onclick="deleteStudent('${s._id}')">Delete</button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// // Edit student
// window.editStudent = async id => {
//   const res = await fetch(`/api/students/${id}`, { headers:{Authorization:`Bearer ${token}`} });
//   const s = await res.json();
//   document.getElementById("studentId").value = s._id;
//   document.getElementById("name").value = s.name;
//   document.getElementById("email").value = s.email;
//   document.getElementById("rollNumber").value = s.rollNumber;
//   document.getElementById("subject1").value = s.subject1;
//   document.getElementById("subject2").value = s.subject2;
//   document.getElementById("subject3").value = s.subject3;
// };

// // Delete student
// window.deleteStudent = async id => {
//   await fetch(`/api/students/${id}`, { method:"DELETE", headers:{Authorization:`Bearer ${token}`} });
//   fetchStudents();
// };

// // Initial load
// fetchStudents();






const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

// Redirect to login if no token
if (!token || !user) {
  window.location.href = "login.html";
}

// Show user avatar
const userAvatarDiv = document.getElementById("userAvatar");
if (user.image) {
  userAvatarDiv.innerHTML = `<img src="${user.image}" alt="${user.name}">`;
} else {
  userAvatarDiv.innerHTML = `<div>${user.name[0]}</div>`;
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

// Convert file to Base64
function toBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (err) => rej(err);
  });
}

// Student form submission
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("studentId").value;
  const fileInput = document.getElementById("image");
  let imageBase64 = "";

  if (fileInput.files[0]) imageBase64 = await toBase64(fileInput.files[0]);

  const studentData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    rollNumber: document.getElementById("rollNumber").value,
    subject1: document.getElementById("subject1").value,
    subject2: document.getElementById("subject2").value,
    subject3: document.getElementById("subject3").value,
    image: imageBase64
  };

  const url = id ? `/api/students/${id}` : "/api/students";
  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(studentData)
  });

  document.getElementById("studentForm").reset();
  fetchStudents();
});

// Fetch all students
async function fetchStudents() {
  const res = await fetch("/api/students", { headers: { Authorization: `Bearer ${token}` } });
  const students = await res.json();
  const tbody = document.getElementById("studentsTable");
  tbody.innerHTML = "";

  students.forEach(s => {
    let avatarHTML = s.image ? `<img class="student-img" src="${s.image}">` :
      `<div class="student-img" style="background:#22d3ee;color:white;text-align:center;">${s.name[0]}</div>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${avatarHTML} ${s.name}</td>
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

// Edit student
window.editStudent = async id => {
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

// Delete student
window.deleteStudent = async id => {
  await fetch(`/api/students/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  fetchStudents();
};

// Initial load
fetchStudents();

