const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const tableBody = document.getElementById("userTableBody");

const loadingTop = document.getElementById("loadingTop");
const spinnerTop = document.getElementById("spinnerTop");

const loadingBottom = document.getElementById("loadingBottom");
const spinnerBottom = document.getElementById("spinnerBottom");

let allUsers = [];

//  Show TOP loader
loadingTop.style.display = "block";
spinnerTop.style.display = "block";

//  Promise for TOP section
new Promise((resolve, reject) => {
  fetch("https://randomuser.me/api/?results=5000")
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
})
.then(data => {
  allUsers = data.results;
  displayUsers(allUsers);

  loadingTop.style.display = "none";
  spinnerTop.style.display = "none";
})
.catch(error => {
  loadingTop.innerText = "Failed to load users!"; 
  console.log("Error:", error);
});


function displayUsers(users) {
  const rows = users.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
      <td>${user.location.city}</td>
      <td>${user.location.country}</td>
    </tr>
  `);
  tableBody.innerHTML = rows.join("");
}

// Search by button
searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user =>
    (`${user.name.first} ${user.name.last} ${user.location.city} ${user.location.country}`)
      .toLowerCase()
      .includes(searchValue)
  );
  displayUsers(filtered);
});

//  Live search
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user =>
    (`${user.name.first} ${user.name.last} ${user.location.city} ${user.location.country}`)
      .toLowerCase()
      .includes(searchValue)
  );
  displayUsers(filtered);
});

//  Promise for BOTTOM section
loadingBottom.style.display = "block";
spinnerBottom.style.display = "block";

new Promise((resolve, reject) => {
  fetch("https://randomuser.me/api/?results=10")
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
})
.then(data => {
  const rows = data.results.map(user => `
    <tr>
      <td>${user.name.first} ${user.name.last}</td>
      <td>${user.email}</td>
      <td>${user.location.city}</td>
    </tr>
  `);
  document.getElementById("userBody2").innerHTML = rows.join("");

  loadingBottom.style.display = "none";
  spinnerBottom.style.display = "none";
})
.catch(error => {
  loadingBottom.innerText = "Failed to load users!";
  console.log("Error:", error);
});
