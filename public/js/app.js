$.getJSON("https://pokeapi.co/api/v2/pokemon/", function(response){
    var pokemones = response.results;
    $("#siguiente").attr('data-sig', response.next);
    console.log($("#siguiente").data('sig'));
    agregarPokemones(pokemones);
    
});

$(document).ready(function(){
    $('.modal').modal();
    $(document).on("click",".cadaPokemon",mostrarDetallePokemon);
    $("#siguiente").click(siguientes20);
});

var siguientes20 = function(){
var url = $("#siguiente").data('sig');
   $.getJSON(url, function(response){
        var pokemones = response.results;
        $("#siguiente").data('sig', response.next);
        agregarPokemones(pokemones);
   }); 
};



var sprite = 0;
var spriteY = 0;

function agregarPokemones(pokemones){
    $("#lista_pokemones").html("");
    pokemones.forEach(function(pokemon, indice){ 
        var $a = $("<a />", {"href": "#modalPokemon"});
        var $li = $("<li />", {"class": "cadaPokemon", "data-indice": indice, "data-url": pokemon.url});        
        $a.append($("<div />").css("background", "url(public/assets/img/pokemones_sprite.png)" + sprite + "px "  + spriteY + "px"));
        $li.append($a);
        $li.append($("<span />").text(pokemon.name));
        $("#lista_pokemones").append($li);
        sprite -= 80; 
        if (sprite === -2240){
            sprite = 0;
            spriteY -=80;            
        }
    });    
};

var mostrarDetallePokemon = function(){
    var url = ($(this).data("url"));
    
    $.getJSON(url, function(response){
        var hp = response.stats[5].base_stat;
        var ataque = response.stats[4].base_stat;
        var defensa = response.stats[3].base_stat;
        var velocidad = response.stats[0].base_stat;
        
        $("#nombre_Pokemon").text(response.forms[0].name.toUpperCase());
        $("#hp").text(hp).css("width",hp + "%");
        $("#ataque").text(ataque).css("width",ataque + "%");
        $("#defensa").text(defensa).css("width",defensa + "%");
        $("#velocidad").text(velocidad).css("width",velocidad + "%");
    });
};
