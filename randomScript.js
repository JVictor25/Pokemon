const pokemonContainer = document.querySelector("#pokeContainer")
const searchInput = document.getElementById('search-input');

pokemonCounter= 1025;

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
    normal: '#F5F5F5',
    dark: '#A89988',
    ghost: '#C6B7F5',
    ice: '#e0f5ff',
    steel: '#d1d1e0'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCounter; i++) {
        await getPokemonData(i);
    }
}

const randomPokemon = () => {
    const randomNumber = Math.floor(Math.random() * pokemonCounter) + 1;
    getPokemonData(randomNumber);
}

const getPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    console.log(data);
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const pokeTypes = pokemon.types.map(type => type.type.name);
    const type =mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];
    const Height = pokemon.height / 10;
    mt = "";
    if (Height >= 2){
        mt = " Mts";}
    if(Height < 2){mt = " M";}
    
    const Weight = pokemon.weight / 10;

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `<div class="pokeCard" id="pokeCard">
                <h2 id="pokeName">${name.toUpperCase()}</h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Pikachu" class="pokeImage" id="pokeImage">
                <p id="pokeId"><span id="pokeIdNumber">#${id}</span></p>
                <p id="pokeType">Type: ${type.toUpperCase()}</p>
                <p id="pokeHeight">Height: ${Height}${mt}</p>
                <p id="pokeWeight">Weight: ${Weight} KG</p>
            </div>`
            pokemonEl.innerHTML = pokemonInnerHTML;
            pokemonContainer.appendChild(pokemonEl);    
    
}



//fetchPokemons();
randomPokemon();
