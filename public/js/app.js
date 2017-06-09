$.getJSON("http://pokeapi.co/api/v2/pokemon/", function(response){
    var pokemones = response.results;
    agregarPokemones(pokemones);
});

function agregarPokemones(pokemones){
    pokemones.forEach(function(pokemon){
        $("#lista_pokemones").append($("<li />").text(pokemon.name));
        
    });
    
};