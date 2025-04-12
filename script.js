const pokemonContainer = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search-input');

const getPokemonData = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    console.log(data);
    return data;

}

getPokemonData('1')

