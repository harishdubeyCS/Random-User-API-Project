const el = (id) => document.getElementById(id);

const btn = el("generateBtn");

async function getUser() {

    btn.textContent = "Loading...";
    btn.disabled = true;

    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        const user = data.results[0];

        // User data ko object me store karo
        const userData = {
            image: user.picture.large,
            fullName: `${user.name.title} ${user.name.first} ${user.name.last}`,
            email: user.email,
            phone: user.phone,
            location: `${user.location.city}, ${user.location.country}`
        };

        // LocalStorage me save
        localStorage.setItem("randomUser", JSON.stringify(userData));

        displayUser(userData);

    } catch (error) {
        el("errorMessage").textContent =
            "Something went wrong. Please try again.";
    }

    btn.textContent = "Generate Random User";
    btn.disabled = false;
}


// User ko UI par show karne ka function
function displayUser(user) {

    el("userImage").src = user.image;
    el("name").textContent = user.fullName;
    el("email").textContent = user.email;
    el("phone").textContent = user.phone;
    el("location").textContent = user.location;
}


// Page load par LocalStorage check karo
const savedUser = localStorage.getItem("randomUser");

if (savedUser) {

    const user = JSON.parse(savedUser);

    displayUser(user);

} else {

    getUser();
}


// Button click
btn.addEventListener("click", getUser);