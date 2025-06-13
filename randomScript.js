const pokemonContainer = document.querySelector("#teamContainer");
const btnRandomizar = document.getElementById("btnRandomizar");
const checkInicial = document.getElementById("incluirInicial"); 
const checkSoEvoluidos = document.getElementById("soEvoluidos");
const checkSemLendarios = document.getElementById("semLendarios");
const checksemMiticos = document.getElementById("semMiticos");
const checkRandomizeInteligente = document.getElementById("randomizeInteligente");
const checkTipoNaoRepete = document.getElementById("tipoNaoRepete");

const pokemonCounterFireRed = 151;
const legendaryIds = [144, 145, 146, 150, 151];
const mythicalIds = [151];

// ===================================================================
//                DADOS DE DISPONIBILIDADE DE POKÉMON
// ===================================================================

// ETAPA 1: Antes do Ginásio de Pewter City (Brock)
// Inclui: Pallet Town, Rota 1, Viridian City, Rota 2, Viridian Forest, Rota 22.
const ANTES_DO_GYM_1 = [
    // Iniciais e suas evoluções
    1, 2, 3,     // Bulbasaur, Ivysaur, Venusaur
    4, 5, 6,     // Charmander, Charmeleon, Charizard
    7, 8, 9,     // Squirtle, Wartortle, Blastoise
    
    // Capturáveis e suas evoluções
    10, 11, 12,  // Caterpie, Metapod, Butterfree
    13, 14, 15,  // Weedle, Kakuna, Beedrill
    16, 17, 18,  // Pidgey, Pidgeotto, Pidgeot
    19, 20,      // Rattata, Raticate
    29, 30, 31,  // Nidoran♀, Nidorina, Nidoqueen
    32, 33, 34,  // Nidoran♂, Nidorino, Nidoking
    56, 57       // Mankey, Primeape
];

// ETAPA 2: Antes do Ginásio de Vermilion City (Lt. Surge)
// Inclui: Mt. Moon, Rota 4, Cerulean City, Rotas 24 & 25, Rotas 5 & 6.
// Esta lista contém APENAS os Pokémon que se tornam recém-disponíveis.
const ANTES_DO_GYM_3 = [
    21, 22,      // Spearow, Fearow
    23, 24,      // Ekans, Arbok
    25, 26,      // Pikachu, Raichu
    27, 28,      // Sandshrew, Sandslash
    35, 36,      // Clefairy, Clefable
    39, 40,      // Jigglypuff, Wigglytuff
    41, 42,      // Zubat, Golbat
    43, 44, 45,  // Oddish, Gloom, Vileplume
    46, 47,      // Paras, Parasect
    50, 51,      // Diglett, Dugtrio
    52, 53,      // Meowth, Persian
    54, 55,      // Psyduck, Golduck
    63, 64, 65,  // Abra, Kadabra, Alakazam
    69, 70, 71,  // Bellsprout, Weepinbell, Victreebel
    74, 75, 76,  // Geodude, Graveler, Golem
    129, 130     // Magikarp, Gyarados
];

// ETAPA 3: Antes do Ginásio de Saffron City (Sabrina) - 5º Ginásio na ordem do projeto
// Inclui: Diglett's Cave, Rotas 9 & 10, Rock Tunnel, Pokémon Tower, Celadon City (Prêmios e Compras).
const ANTES_DO_GYM_5 = [
    58, 59,      // Growlithe, Arcanine
    60, 61, 62,  // Poliwag, Poliwhirl, Poliwrath
    66, 67, 68,  // Machop, Machoke, Machamp
    72, 73,      // Tentacool, Tentacruel
    77, 78,      // Ponyta, Rapidash
    79, 80,      // Slowpoke, Slowbro
    81, 82,      // Magnemite, Magneton
    83,          // Farfetch'd
    84, 85,      // Doduo, Dodrio
    88, 89,      // Grimer, Muk
    90, 91,      // Shellder, Cloyster
    92, 93, 94,  // Gastly, Haunter, Gengar
    95,          // Onix
    96, 97,      // Drowzee, Hypno
    100, 101,    // Voltorb, Electrode
    102, 103,    // Exeggcute, Exeggutor
    104, 105,    // Cubone, Marowak
    106,         // Hitmonlee
    107,         // Hitmonchan
    108,         // Lickitung
    109, 110,    // Koffing, Weezing
    111, 112,    // Rhyhorn, Rhydon
    113,         // Chansey
    115,         // Kangaskhan
    116, 117,    // Horsea, Seadra
    118, 119,    // Goldeen, Seaking
    122,         // Mr. Mime
    123,         // Scyther
    124,         // Jynx
    125,         // Electabuzz
    126,         // Magmar
    127,         // Pinsir
    128,         // Tauros
    131,         // Lapras
    133, 134, 135, 136, // Eevee, Vaporeon, Jolteon, Flareon
    137,         // Porygon
    143          // Snorlax
];

// ETAPA 4: Antes do Ginásio de Cinnabar Island (Blaine) - 7º/8º Ginásio
// Inclui: Safari Zone, Seafoam Islands.
const ANTES_DO_GYM_8 = [
    98, 99,      // Krabby, Kingler
    114,         // Tangela
    120, 121,    // Staryu, Starmie
    138, 139,    // Omanyte, Omastar (Fóssil)
    140, 141,    // Kabuto, Kabutops (Fóssil)
    142,         // Aerodactyl (Fóssil)
    147, 148, 149 // Dratini, Dragonair, Dragonite (prêmio da Safari Zone ou comprado)
];

// ETAPA 5: Antes da Elite Four
// Inclui: Power Plant, Victory Road, etc.
const ANTES_DA_ELITE_4 = [
    132,         // Ditto
    144,         // Articuno
    145,         // Zapdos
    146,         // Moltres
    150,         // Mewtwo
    151          // Mew (evento, mas incluído para completar)
];

const poolGym1 = ANTES_DO_GYM_1;
const poolGym3 = [...poolGym1, ...ANTES_DO_GYM_3];
const poolGym5 = [...poolGym3, ...ANTES_DO_GYM_5];
const poolGym8 = [...poolGym5, ...ANTES_DO_GYM_8];
const poolElite4 = [...poolGym8, ...ANTES_DA_ELITE_4];


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
    let type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    if (type=='fairy'){
        type = 'normal';
    }
    if (id == 122) {
        type = 'psychic';
    }
    const color = colors[type];

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
        throw new Error('Evolution chain not found');
    }
    const evolutionData = await evolutionResponse.json();
    const chain = evolutionData.chain;

    let estagioAtual = chain;

    while (estagioAtual.evolves_to.length > 0) {
        const estagioFuturo = estagioAtual.evolves_to[0];
        const auxEvolucaoFuturo = estagioFuturo.species.url;
        const auxEvolucaoFireRed=parseInt(auxEvolucaoFuturo.split('/').slice(-2, -1)[0]);
        if(auxEvolucaoFireRed < pokemonCounterFireRed) {
            estagioAtual = estagioAtual.evolves_to[0];
        }else {
            break;
        }
    }

    const urlDoPokemonMaisEvoluido = estagioAtual.species.url;

    const idDoPokemonMaisEvoluido = parseInt(urlDoPokemonMaisEvoluido.split('/').slice(-2, -1)[0]);

    return idDoPokemonMaisEvoluido;
}

const getType = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Pokemon not found');
    }
    const pokemon = await response.json();
    const pokeTypes = pokemon.types.map(type => type.type.name);
    let type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    if (type=='fairy'){
        type = 'normal';
    }
    if (id == 122) {
        type = 'psychic';
    }
    return type;


}

const randomTeam = async () => {
    pokemonContainer.innerHTML = '';
    const usedIds = new Set();
    const usedTypes = new Set();
    const isInicialChecked = checkInicial.checked;
    const isSoEvoluidosChecked = checkSoEvoluidos.checked;
    const isSemLendariosChecked = checkSemLendarios.checked;
    const isSemMiticosChecked = checksemMiticos.checked;
    const isRandomizeInteligenteChecked = checkRandomizeInteligente.checked;
    const isTipoNaoRepeteChecked = checkTipoNaoRepete.checked;
    if (isInicialChecked) {
        if (checkSoEvoluidos.checked) {
            const starters = [3, 6, 9];
            const randomStartersId = Math.floor(Math.random() * starters.length);
            usedTypes.add(await getType(starters[randomStartersId]));
            usedIds.add(starters[randomStartersId]);
        }
        else {
            const starters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const randomStartersId = Math.floor(Math.random() * starters.length);
            usedTypes.add(await getType(starters[randomStartersId]));
            usedIds.add(starters[randomStartersId]);

        }
    }
    while (usedIds.size < 6) {
    const randomId = Math.floor(Math.random() * pokemonCounterFireRed) + 1;
    const starters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (starters.includes(randomId)) {
        continue;
    }
    if (isSemLendariosChecked && legendaryIds.includes(randomId)) {
        continue;
    }
    if (isSemMiticosChecked && mythicalIds.includes(randomId)) {
        continue;
    }
    if (isRandomizeInteligenteChecked) {
        if ((usedIds.size==0||usedIds.size==1) && (!poolGym1.includes(randomId))) {
            continue;
        }
        if ((usedIds.size==2) && (!poolGym3.includes(randomId))) {
            continue;
        }
        if ((usedIds.size==3) && (!poolGym5.includes(randomId))) {
            continue;
        }
        if ((usedIds.size==4) && (!poolGym8.includes(randomId))) {
            continue;
        }
    }
    
    if (isSoEvoluidosChecked) {
        try {
            const fullEvolvedId = await getFullEvolved(randomId);
            const fullEvolvedType = await getType(fullEvolvedId);
            if (isTipoNaoRepeteChecked && usedTypes.has(fullEvolvedType)) {
                continue;
            }
            if (fullEvolvedId && !usedIds.has(fullEvolvedId)) {
                usedTypes.add(fullEvolvedType);
                usedIds.add(fullEvolvedId);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const randomType = await getType(randomId);
    if (isTipoNaoRepeteChecked && usedTypes.has(randomType)) {
        continue;
    }
    else if (!usedIds.has(randomId)) {
        usedTypes.add(randomType);
        usedIds.add(randomId);
    }
}
    for(const id of usedIds) {
        getPokemonData(id);
    }
}

btnRandomizar.addEventListener("click", randomTeam);