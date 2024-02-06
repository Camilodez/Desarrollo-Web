document.addEventListener("DOMContentLoaded", function() {
    const friendForm = document.getElementById("friendForm");
    const usernameInput = document.getElementById("username");
    const nameInput = document.getElementById("name");
    const imageURLInput = document.getElementById("imageURL");
    const petsInput = document.getElementById("pets");
    const friendTableBody = document.querySelector("#friendTable tbody");
    const petsList = document.getElementById("petsList");

    const friends = []; // Array para almacenar los amigos

    friendForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos
        const username = usernameInput.value.trim();
        const name = nameInput.value.trim();
        const imageURL = imageURLInput.value.trim();
        const pets = petsInput.value.trim();

        // Verificar que ningún campo esté vacío y que el username incluya al menos un "."
        if (username === "" || name === "" || imageURL === "" || pets === "" || !username.includes(".")) {
            alert("Por favor completa todos los campos y asegúrate de que el username incluya al menos un '.'");
            return;
        }

        // Verificar si el usuario ya existe en la lista
        const existingFriend = friends.find(friend => friend.username === username);
        if (existingFriend) {
            // Si el usuario ya existe, agregar la mascota si es única
            if (existingFriend.pets.includes(pets)) {
                alert("Este usuario ya tiene una mascota con ese nombre.");
                return;
            } else {
                existingFriend.pets.push(pets);
                renderPetsList(existingFriend);
                return;
            }
        }

        // Si el usuario no existe, agregarlo a la lista de amigos
        const friend = {
            username,
            name,
            imageURL,
            pets: [pets]
        };
        friends.push(friend);
        renderFriendRow(friend);
        renderPetsList(friend);

        // Limpiar los campos del formulario después de agregar un amigo
        usernameInput.value = "";
        nameInput.value = "";
        imageURLInput.value = "";
        petsInput.value = "";
    });

    // Función para renderizar una fila de amigo en la tabla
    function renderFriendRow(friend) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${friend.username}</td>
            <td>${friend.name}</td>
            <td><img src="${friend.imageURL}" alt="Imagen de ${friend.name}" style="width: 50px; height: auto;"></td>
            <td>${friend.pets.join(", ")}</td>
            <td><button class="viewPetsButton" data-username="${friend.username}">Ver Mascotas</button></td>
        `;
        friendTableBody.appendChild(row);
    }

    // Función para renderizar la lista de mascotas de un amigo
    function renderPetsList(friend) {
        const listItems = friend.pets.map(pet => `<li>${pet}</li>`).join("");
        petsList.innerHTML = listItems;
        petsList.classList.remove("hidden");
    }

    // Event listener para ver las mascotas de un amigo
    friendTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("viewPetsButton")) {
            const username = event.target.dataset.username;
            const friend = friends.find(friend => friend.username === username);
            if (friend) {
                renderPetsList(friend);
            }
        }
    });
});
