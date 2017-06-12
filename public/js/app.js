$.getJSON("http://pokeapi.co/api/v2/pokemon/", function(response){
    var pokemones = response.results;
    agregarPokemones(pokemones);
});


$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $(document).on("click",".cadaPokemon",mostrarDetallePokemon);
});


var sprite = 0;

function agregarPokemones(pokemones){
    pokemones.forEach(function(pokemon, indice){ 
        var $a = $("<a />", {"href": "#modalPokemon"});
        var $li = $("<li />", {"class": "cadaPokemon", "data-indice": indice, "data-url": pokemon.url});        
        $a.append($("<div />").css("background", "url(assets/img/pokemones_sprite.png)" + sprite + "px 0"));
        $li.append($a);
        $li.append($("<span />").text(pokemon.name));
        $("#lista_pokemones").append($li);
        sprite -= 80;
        
    });
    
};

var plantillaModal = '<div class="modal-content container">' +
              '<h4 id="nombre_Pokemon" class="center-align">__nombre__</h4>' +
              '<p>Habilidades</p>' +
              '<div class="row">' +
                  '<span class="col s3">HP</span>' +
                  '<div class="progress col s9">' +
                      '<div class="determinate progress-bar" id="hp" style="width: __hp__"> __hp__ </div>' +
                  '</div>' +
              '</div>' +
              '<div class="row">' +
                  '<span class="col s3">Ataque</span>' +
                  '<div class="progress col s9">' +
                      '<div class="determinate progress-bar" id="ataque" style="width: __ataque__"> __ataque__ </div>' +
                  '</div>' +
              '</div>' +
              '<div class="row">' +
                  '<span class="col s3">Defensa</span>' +
                  '<div class="progress col s9">' +
                      '<div class="determinate progress-bar" id="defensa" style="width: __defensa__"> __defensa__ </div>' +
                  '</div>' +
              '</div>' +
              '<div class="row">' +
                  '<span class="col s3">Velocidad</span>' +
                  '<div class="progress col s9">' +
                      '<div class="determinate progress-bar" id="velocidad" style="width: __vel__"> __vel__ </div>'+
                  '</div>' +
              '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>' +
            '</div>';

var mostrarDetallePokemon = function(){
    var url = ($(this).data("url"));
    var $información = $("#modalPokemon");    
    
    $.getJSON(url, function(response){
        var hp = response.stats[5].base_stat;
        var ataque = response.stats[4].base_stat;
        var defensa = response.stats[3].base_stat;
        var velocidad = response.stats[0].base_stat;
        $información.html(plantillaModal.replace("__nombre__", response.forms[0].name.toUpperCase())
        .replace("__hp__",hp + "px")
        .replace("__hp__",hp)
        .replace("__ataque__",ataque +"px")
        .replace("__ataque__",ataque)
        .replace("__defensa__",defensa +"px")
        .replace("__defensa__",defensa)
        .replace("__vel__",velocidad +"px")
        .replace("__vel__",velocidad));
    });
};
