/* fetchPokemon = async() => {
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const json = await req.json()     
} */
fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonList = []
    for(let i=1;i <= 200;i++){
        pokemonList.push(fetch(getPokemonUrl(i)).then((result) => {return result.json()})) 
    }
    Promise.all(pokemonList)
    .then((pokemons) => {
    const listPokemons = pokemons.reduce((html, pokemon) => {
        const types =pokemon.types.map((typeInfo) =>{return typeInfo.type.name})
        html += `<li class='card ${types[0]}' >
        
        <img class='card-image'  alt ="${pokemon.name}"src='https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png'
        </br>
        <h2 class='card-title'>${pokemon.id}. ${pokemon.name}</h2>
        <p class='card-subtitle'>${types.join(' | ')}</p>

        </li>`
        return html
    }, '')
    const ul = document.querySelector('.pokedex')
    console.log(ul)
    ul.innerHTML = listPokemons

    //console.log(listPokemons)
    })
}
fetchPokemon()
