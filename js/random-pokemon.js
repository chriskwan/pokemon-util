//cwkTODO move this code to random-pokemon package
(function () {
    //cwkTODO generate a pokemon number to name dictionary
    //cwkTODO generate a pokemon name to number dictionary
    //cwkTODO or have two dictionaries that reference the same objects

    var pokemonApiBasePath = "https://pokeapi.co";

    var getUrl = function (url, callback) {
            var request = new XMLHttpRequest();
            request.onload = callback;
            request.open("GET", url);
            request.responseType = "json";
            request.send();
    };

    var getPokemonAnimatedSprite = function (pokemonName) {
        //cwkTODO change to passing in pokemon Number and grabbing name for dictionary
        //cwkTODO or wrap a pokemon object that has both
        var url = "https://www.smogon.com/dex/media/sprites/xy/" + pokemonName + ".gif";
        //cwkTODO how to check if image does not exist?
        return url;
    };

    //cwkTODO change to passing in the pokemonNumber
    var getPokemonSprite = function (pokemonName, callback) {

        //cwkTODO change to passing in pokemonNumber
        var animatedSpriteUrl = getPokemonAnimatedSprite(pokemonName);
        if (callback) {
            callback(animatedSpriteUrl);
            return; //cwkTODO instead of doing this, only return if the url is valid
        }

        //cwkTODO update this to v2 now that sprites are supported!
        // https://github.com/phalt/pokeapi/issues/80
        var url = pokemonApiBasePath + "/api/v1/pokemon/" + pokemonName;
        getUrl(url, function (e) {
            var pokemon = e.currentTarget.response;

            if (pokemon && pokemon.sprites && pokemon.sprites.length) {
                var spriteUrl = pokemonApiBasePath + pokemon.sprites[0].resource_uri;
                getUrl(spriteUrl, function (e) {
                    var sprite = e.currentTarget.response;

                    if (callback) {
                        callback(pokemonApiBasePath + sprite.image);
                    }
                });
            } else {
                if (callback) {
                    // Ref: http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png
                    callback("./missingno.png");
                }
            }
        });
    };

    var getRandomNumberInRangeInclusive = function (min, max) {
        // Ref: http://stackoverflow.com/a/7228322
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var randomPokemon = {
        getPokemon: function (id, callback, spriteCallback) {
            var url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
            getUrl(url, function (e) {
                var pokemon = e.currentTarget.response;

                if (callback) {
                    callback(pokemon);
                }

                getPokemonSprite(pokemon.name, spriteCallback);
            });
        },

        getRandomPokemonNumber: function () {
            // Pokemon API goes from 1 - 721 (Volcanion)
            //cwkTODO get this programmatically
            return getRandomNumberInRangeInclusive(1, 721);
        }
    };

    window.randomPokemon = randomPokemon;
})();
