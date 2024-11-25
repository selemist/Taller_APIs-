const apiUrl = "https://www.moogleapi.com/api/v1/characters/search?gender=female";

async function fetchCharacters() {
    try {
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Error al obtener los datos");
        
        const data = await response.json();
        
        displayCharacters(data);
    } catch (error) {
        console.error("Error:", error);
        displayErrorMessage();
    }
}

function displayCharacters(characters) {
    const container = document.getElementById("character-container");
    
    container.innerHTML = "";

    if (!characters || characters.length === 0) {
        container.innerHTML = "<p>No se encontraron personajes.</p>";
        return;
    }

    characters.forEach(character => {
        const charDiv = document.createElement("div");
        charDiv.classList.add("col-md-3", "d-flex", "justify-content-center", "align-items-stretch");


        const imgUrl = character.pictures?.[0]?.url;
        const name = character.name;
        const origin = character.origin;
        const description = character.description || "No hay descripción disponible.";

        charDiv.innerHTML = `
            <div class="card">
                <img src="${imgUrl}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h2 class="card-title">${name}</h2>
                    <p class="card-text">Juego: ${origin}</p>
                    <div class="card-description">
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(charDiv);
    });
}

// Llama a la función para obtener y mostrar los personajes
fetchCharacters();
