const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const tableBody = document.getElementById("userTableBody");
const loading = document.getElementById("loading");
const spinner = document.getElementById("spinner");

let allUsers = [];


loading.style.display = "block";
spinner.style.display = "block";

fetch("https://randomuser.me/api/?results=5000")
  .then(res => res.json())
  .then(data => {
    allUsers = data.results;
    displayUsers(allUsers);

    loading.style.display = "none";
    spinner.style.display = "none";
  })
  .catch(error => {
    console.log("Error", error);
    loading.innerText = "Failed to load users!";
  });

function displayUsers(users) {
  const rows = users.map((user, index) => {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
            <td>${user.location.city}</td>
            <td>${user.location.country}</td>
        </tr>
        `;
  });
  document.getElementById("userTableBody").innerHTML = rows.join("");
}

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user =>
    (`${user.name.first} ${user.name.last} ${user.location.city} ${user.location.country}`)
      .toLowerCase()
      .includes(searchValue)
  );
  displayUsers(filtered);
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user =>
    (`${user.name.first} ${user.name.last} ${user.location.city} ${user.location.country}`)
      .toLowerCase()
      .includes(searchValue)
  );
  displayUsers(filtered);
});


const userBody2 = document.getElementById("userBody2");

fetch("https://randomuser.me/api/?results=10")
  .then(res => res.json())
  .then(data => {
    const rows = data.results.map(user => `
        <tr>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td>${user.location.city}</td>
        </tr>
    `);
    userBody2.innerHTML = rows.join("");
  })
  .catch(error => console.log("Error:", error));

