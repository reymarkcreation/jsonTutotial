const button = document.getElementById("loadBtn");
const userList = document.getElementById("userList");
const postButton = document.getElementById("loadPost");

button.addEventListener("click", getUsers);
postButton.addEventListener("click", createPost);

async function getUsers() {
  userList.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to retrieve users");
    }
    const users = await response.json();

    userList.innerHTML = "";
    users.forEach(function (user) {
      const card = document.createElement("div");
      card.className = "user-card";

      const name = document.createElement("h3");
      name.textContent = user.name;

      const email = document.createElement("p");
      email.textContent = user.email;

      const city = document.createElement("p");
      city.textContent = user.address.city;

      const phone = document.createElement("p");
      phone.textContent = user.phone;

      const street = document.createElement("p");
      street.textContent = user.address.street;

      const lat = document.createElement("p");
      lat.textContent = "Latitude: " + user.address.geo.lat;

      const lng = document.createElement("p");
      lng.textContent = "Longitude: " + user.address.geo.lng;

      const catchPhrase = document.createElement("p");
      catchPhrase.textContent = "Catch Phrase: " + user.company.catchPhrase;

      card.append(name, email, city, phone, street, lat, lng);
      userList.appendChild(card);
    });
    console.log(users);
  } catch (error) {
    userList.textContent = "Error: " + error.message;
  }
}
async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({
      title: "My First API Post",
      body: "Learning API Integration",
      userId: 1,
    }),
  });
  if (!response.ok) throw new Error("POST failed");
  console.log(await response.json());
}
createPost().catch(console.error);
