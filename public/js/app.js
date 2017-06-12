$.getJSON("http://pokeapi.co/api/v2/pokemon/", function(response){
    var pokemones = response.results;
    agregarPokemones(pokemones);
});

var sprite = 0;

function agregarPokemones(pokemones){
    pokemones.forEach(function(pokemon){ 
        var $li = $("<li />");
        $li.append($("<div />").css("background", "url(assets/img/pokemones_sprite.png)" + sprite + "px 0"));
        $("#lista_pokemones").append($li.append($("<span />").text(pokemon.name)));
        sprite -= 80;
    });
    
};