const url = 'https://pokeapi.co/api/v2/pokemon/';
const card = document.querySelector('#detailed-info')
const searchBtn = document.querySelector('#poke-search')
const team = document.querySelector('#pokemon-bar')
const resetBtn = document.querySelector('#reset-team')
const addToTeamBtn = document.querySelector('#team-add')
const typeColor = {
    dark: "#171616",
    bug: "#26de81",
    dragon: "#d114f7",
    electric: "#fed330",
    fairy: "#ff3085",
    fighting: "#d40000",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#02c238",
    ground: "#8f7038",
    ghost: "#4c255c",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#3d134f",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#050da3"}
// let counter = 0;
let pokemon

const randBtn = document.querySelector('#rand')

let randPoke = () => {
    let input = document.getElementsByName('pokeId')[0];
    console.log(input);
    input.value = 'ditto';
    let randId = Math.floor(Math.random() * 897) + 1;
    showPokemon(randId)
}

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, white 36%)`;
    card.querySelectorAll("#type ").forEach(typeColor => {typeColor.style.backgroundColor = color})
}

function getPokemon(e) {
    const id = document.querySelector('#pokeId').value;

    showPokemon(id)

    e.preventDefault();
} 

function showPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(r => r.json())
    .then(data => {
        pokemon = data
        let pokeName = document.querySelector('#name');
        let pokePic = document.querySelector('#image');
        let pokeType = document.querySelector('#type');
        let idNum = document.querySelector('#idNum');
        let hp = document.querySelector('#hp');
        let attack = document.querySelector('#attack')
        let def = document.querySelector('#defense')

        let themeColor = typeColor[data.types[0].type.name];

        def.textContent = `DEF: ${data.stats[2].base_stat}`;
        attack.textContent = `ATK: ${data.stats[1].base_stat}`;
        hp.textContent = `HP: ${data.stats[0].base_stat}`;
        idNum.textContent = `#${data.id}`;
        pokePic.src = pokemon.sprites.front_default;
        pokeName.textContent = (data.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase()}));
        pokeType.textContent = `Type: ${data.types.map(type => type.type.name).join('/ ')}`;

        pokePic.onmouseout = function () {
            pokePic.src = pokemon.sprites.front_default;
        };
        pokePic.onmouseover = function () {
            pokePic.src = pokemon.sprites.front_shiny;
        };
        
        styleCard(themeColor);
    })
    .catch((err) => {
        alert('That\'s not a pokemon! Try again 😆', err);
    })
    
}

function makeTeam() {
    const teamPoke = document.createElement('div')
    teamPoke.id = 'team'
    teamPoke.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    `

        let deleteMon = document.createElement('button')
        deleteMon.id = 'deleteMon'
        deleteMon.textContent = "❌";
        teamPoke.appendChild(deleteMon);
        

        deleteMon.addEventListener('click', (e) => { 
            teamPoke.remove()
            let teamNum = team.getElementsByTagName('div').length;
            if (teamNum <= 5) addToTeamBtn.disabled = false;
            if (teamNum <= 5) addToTeamBtn.textContent = 'Add to my team'
        })
        team.append(teamPoke)

        resetBtn.addEventListener('click', (e) => {
            teamPoke.remove()
        })
}

addToTeamBtn.onclick = () => {
    let teamNum = team.getElementsByTagName('div').length;
    if (teamNum === 5) addToTeamBtn.disabled = true;
    if (teamNum === 5) addToTeamBtn.textContent = "That's the maximum number! Reset or remove a Pokemon below! ⬇️";
    if (teamNum === 4) addToTeamBtn.disabled = false;
}

resetBtn.onclick = () => {
    addToTeamBtn.textContent = 'Add to my team';
    addToTeamBtn.disabled = false;
    // window.location.reload();
}

randBtn.addEventListener('click', randPoke);

searchBtn.addEventListener('submit', getPokemon)

addToTeamBtn.addEventListener('click', makeTeam)

showPokemon(132)
