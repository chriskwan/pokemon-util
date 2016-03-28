//cwkTODO generate a pokemon number to name dictionary
//cwkTODO generate a pokemon name to number dictionary
//cwkTODO or have two dictionaries that reference the same objects

const pokemonApiBasePath = "https://pokeapi.co";

const getUrl = function (url, callback) {
    let request = new XMLHttpRequest();
    request.onload = callback;
    request.open("GET", url);
    request.responseType = "json";
    request.send();
};

const getPokemonAnimatedSprite = function (pokemonName) {
    //cwkTODO change to passing in pokemon Number and grabbing name for dictionary
    //cwkTODO or wrap a pokemon object that has both
    let url = "https://www.smogon.com/dex/media/sprites/xy/" + pokemonName + ".gif";
    //cwkTODO how to check if image does not exist?
    return url;
};

//cwkTODO change to passing in the pokemonNumber
const getPokemonSprite = function (pokemonName, callback) {

    //cwkTODO change to passing in pokemonNumber
    let animatedSpriteUrl = getPokemonAnimatedSprite(pokemonName);
    if (callback) {
        callback(animatedSpriteUrl);
        return; //cwkTODO instead of doing this, only return if the url is valid
    }

    //cwkTODO update this to v2 now that sprites are supported!
    // https://github.com/phalt/pokeapi/issues/80
    let url = pokemonApiBasePath + "/api/v1/pokemon/" + pokemonName;
    getUrl(url, function (e) {
        let pokemon = e.currentTarget.response;

        if (pokemon && pokemon.sprites && pokemon.sprites.length) {
            let spriteUrl = pokemonApiBasePath + pokemon.sprites[0].resource_uri;
            getUrl(spriteUrl, function (e) {
                let sprite = e.currentTarget.response;

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

const getRandomNumberInRangeInclusive = function (min, max) {
    // Ref: http://stackoverflow.com/a/7228322
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getPokemon = function (id, callback, spriteCallback) {
    let url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
    getUrl(url, function (e) {
        let pokemon = e.currentTarget.response;

        if (callback) {
            callback(pokemon);
        }

        getPokemonSprite(pokemon.name, spriteCallback);
    });
};

const getRandomPokemonNumber = function () {
    // Pokemon API goes from 1 - 721 (Volcanion)
    //cwkTODO get this programmatically
    return getRandomNumberInRangeInclusive(1, 721);
};

export { getPokemon, getRandomPokemonNumber };
