window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('pokemonName');

    if (pokemonName) {
        // Se o nome do Pokémon foi passado na URL, busca as informações e exibe.
        searchPokemon(pokemonName);
    }
});

async function searchPokemon(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayPokemonInfo(data);
        } else {
            console.error('Erro ao buscar o Pokémon:', data);
        }
    } catch (error) {
        console.error('Erro ao buscar o Pokémon:', error);
    }
}

function displayPokemonInfo(pokemon) {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonDetails = document.getElementById('pokemon-details');
    
    if (pokemonImage && pokemonDetails) {
        pokemonImage.innerHTML = `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">`;

        const pokemonName = document.createElement('h2');
        pokemonName.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemonDetails.appendChild(pokemonName);

        const ul = document.createElement('ul');
        ul.innerHTML = `
            <li><strong>ID:</strong> <span>${pokemon.id}</span></li>
            <li><strong>HP:</strong> <span>${pokemon.stats[0].base_stat}</span></li>
            <li><strong>Stamina:</strong> <span>${pokemon.stats[1].base_stat}</span></li>
            <li><strong>Attack:</strong> <span>${pokemon.stats[2].base_stat}</span></li>
            <li><strong>Defense:</strong> <span>${pokemon.stats[3].base_stat}</span></li>
            <li><strong>Abilities:</strong> <span>${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span></li>
            <li><strong>Types:</strong> <span>${pokemon.types.map(type => type.type.name).join(', ')}</span></li>
        `;
        pokemonDetails.appendChild(ul);
    } else {
        console.error('Elementos HTML não encontrados.');
    }
}

const returnToPokedex = () => window.location.href = "index.html"