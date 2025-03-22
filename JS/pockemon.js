import fetch from "node-fetch";

//started
async function getPokemonData(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error("Failed to get the Pokemon data");
        
        const pokemonData = await response.json();
        
        const speciesResponse = await fetch(pokemonData.species.url);
        if (!speciesResponse.ok) throw new Error("Failed to get the Pokemon species data");
        
        const speciesData = await speciesResponse.json();
        
        const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");

        return {
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map(type => type.type.name),
            flavorText: flavorTextEntry ? flavorTextEntry.flavor_text : "No flavor text available",
            habitat: speciesData.habitat ? speciesData.habitat.name : "Unknown",
            isLegendary: speciesData.is_legendary
        };
    } catch (error) {
        console.error("Error getting the  Pokemon data:", error);
        return null;
    }
}

async function assignmentTask() {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const pokemon = await getPokemonData(randomId);
    console.log(pokemon);
}

assignmentTask();