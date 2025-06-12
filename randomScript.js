const pokemonContainer = document.querySelector("#teamContainer");
const btnRandomizar = document.getElementById("btnRandomizar");
const checkInicial = document.getElementById("incluirInicial"); 
const checkSoEvoluidos = document.getElementById("soEvoluidos");

const pokemonCounterFireRed = 151;


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

const getFullEvolved = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const data = await response.json();
    const evolutionChainUrl = data.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    if (!evolutionResponse.ok) {
        throw new Error('Evolutionchain not found');
    }
    const evolutionData = await evolutionResponse.json();
    const chain = evolutionData.chain;

    let estagioAtual = chain;

    while (estagioAtual.evolves_to.length > 0) {
        estagioAtual = estagioAtual.evolves_to[0];
    }

    const urlDoPokemonMaisEvoluido = estagioAtual.species.url;

    const idDoPokemonMaisEvoluido = parseInt(urlDoPokemonMaisEvoluido.split('/').slice(-2, -1)[0]);

    return idDoPokemonMaisEvoluido;
}


const randomTeam = async () => {
    pokemonContainer.innerHTML = '';
    const usedIds = new Set();
    const isInicialChecked = checkInicial.checked;
    if (isInicialChecked) {
        if (checkSoEvoluidos.checked) {
            const starters = [3, 6, 9];
            const randomStartersId = Math.floor(Math.random() * starters.length);
            usedIds.add(starters[randomStartersId]);
        }
        else {
            const starters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const randomStartersId = Math.floor(Math.random() * starters.length);
            usedIds.add(starters[randomStartersId]);
        }
    }
    while (usedIds.size < 6) {
    const randomId = Math.floor(Math.random() * pokemonCounterFireRed) + 1;

    if (checkSoEvoluidos.checked) {
        try {
            const fullEvolvedId = await getFullEvolved(randomId);

            if (fullEvolvedId && !usedIds.has(fullEvolvedId)) {
                usedIds.add(fullEvolvedId);
            }
        } catch (error) {
            console.error(error);
        }
    }
    else if (!usedIds.has(randomId)) {
        usedIds.add(randomId);
    }
}
    for(const id of usedIds) {
        getPokemonData(id);
    }
}

btnRandomizar.addEventListener("click", randomTeam);