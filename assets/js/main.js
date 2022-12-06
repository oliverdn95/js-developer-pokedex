const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailsButton = document.getElementById('detailsButton')
const pkmnDetails = document.getElementById('pkmnDetails')
const closeDetailsButton = document.getElementById('closeDetailsButton')

const maxRecords = 151
const limit = 5
let offset = 0

function loadPokemonItens(offset, limit){
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <a href="./pokemon.html?name=${pokemon.name}">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            
        </li>
        </a>
        `).join('')
        pokemonList.innerHTML += newHtml
    
    })
}

loadPokemonItens(offset, limit)
    loadMoreButton.addEventListener('click', () => {
        offset += limit
        const qtdRecordNextPage = offset + limit
    
        if(qtdRecordNextPage >= maxRecords){
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)
    
            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else{
            loadPokemonItens(offset, limit)
        }
    
        
    })
    /*
    detailsButton.addEventListener('click', () => {
        pokeApi.getPokemonDetail(pokemon).then(() => {
            const newHtml = `        
            <div class="pokemon ${pokemon.type}">
                    <div class="detailDetails">
                        <ol class="typesDetails">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <span class="numberDetails">#${pokemon.number}</span>
                    <span class="nameDetails">${pokemon.name}</span>
                    
                </div>
                <button id="closeDetailsButton" type="button">
                </button>
            `})
            pkmnDetails.innerHTML += newHtml
    })
    closeDetailsButton.addEventListener('click', () => {
        pokeApi.getPokemonDetail(pokemon).then(() => {
            const newHtml = pokemon `        
            <div class="pokemon ${pokemon.type}">
                    <div class="detailDetails">
                        <ol class="typesDetails">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <span class="numberDetails">#${pokemon.number}</span>
                    <span class="nameDetails">${pokemon.name}</span>
                    
                </div>
                <button id="closeDetailsButton" type="button">Fechar Detalhes
                </button>
            `})
        
            pkmnDetails.innerHTML -= newHtml
    })
*/
