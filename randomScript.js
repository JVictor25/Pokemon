const pokemonContainer = document.querySelector("#teamContainer");
const btnRandomizar = document.getElementById("btnRandomizar");

pokemonCounter = 1025;
pokemonEvoChains = 549;

const colors = {
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
    normal: '#F5F5F5',
    dark: '#A89988',
    ghost: '#C6B7F5',
    ice: '#e0f5ff',
    steel: '#d1d1e0'
};

const mainTypes = Object.keys(colors);

const getPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const pokeTypes = pokemon.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];
    const Height = pokemon.height / 10;
    const Weight = pokemon.weight / 10;
    const mt = Height >= 2 ? " Mts" : " M";

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="pokeCard">
            <h2>${name.toUpperCase()}</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="pokeImage">
            <p><span>#${id}</span></p>
            <p>Type: ${type.toUpperCase()}</p>
        </div>`;

    pokemonEl.innerHTML = pokemonInnerHTML;
    pokemonContainer.appendChild(pokemonEl);
}

const randomTeam = () => {
    pokemonContainer.innerHTML = '';
    const usedIds = new Set();
    while (usedIds.size < 6) {
        const randomId = Math.floor(Math.random() * pokemonCounter) + 1;
        if (!usedIds.has(randomId)) {
            usedIds.add(randomId);
            getPokemonData(randomId);
        }
    }
}

btnRandomizar.addEventListener("click", randomTeam);