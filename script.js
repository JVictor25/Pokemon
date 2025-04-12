const pokemonContainer = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search-input');

pokemonCounter= 151;

colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCounter; i++) {
        await getPokemonData(i);
    }
}
const getPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    console.log(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.idtoString().padStart(3, '0');
    const pokeTypes = pokemon.types.map(type => type.type.name);
    
}


fetchPokemons();

