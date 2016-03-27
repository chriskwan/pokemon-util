(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pokemon-util", [], factory);
	else if(typeof exports === 'object')
		exports["pokemon-util"] = factory();
	else
		root["pokemon-util"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//cwkTODO generate a pokemon number to name dictionary
	//cwkTODO generate a pokemon name to number dictionary
	//cwkTODO or have two dictionaries that reference the same objects

	var pokemonApiBasePath = "https://pokeapi.co";

	var getUrl = function getUrl(url, callback) {
	    var request = new XMLHttpRequest();
	    request.onload = callback;
	    request.open("GET", url);
	    request.responseType = "json";
	    request.send();
	};

	var getPokemonAnimatedSprite = function getPokemonAnimatedSprite(pokemonName) {
	    //cwkTODO change to passing in pokemon Number and grabbing name for dictionary
	    //cwkTODO or wrap a pokemon object that has both
	    var url = "https://www.smogon.com/dex/media/sprites/xy/" + pokemonName + ".gif";
	    //cwkTODO how to check if image does not exist?
	    return url;
	};

	//cwkTODO change to passing in the pokemonNumber
	var getPokemonSprite = function getPokemonSprite(pokemonName, callback) {

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

	var getRandomNumberInRangeInclusive = function getRandomNumberInRangeInclusive(min, max) {
	    // Ref: http://stackoverflow.com/a/7228322
	    return Math.floor(Math.random() * (max - min + 1) + min);
	};

	var getPokemon = function getPokemon(id, callback, spriteCallback) {
	    var url = pokemonApiBasePath + "/api/v2/pokemon/" + id;
	    getUrl(url, function (e) {
	        var pokemon = e.currentTarget.response;

	        if (callback) {
	            callback(pokemon);
	        }

	        getPokemonSprite(pokemon.name, spriteCallback);
	    });
	};

	var getRandomPokemonNumber = function getRandomPokemonNumber() {
	    // Pokemon API goes from 1 - 721 (Volcanion)
	    //cwkTODO get this programmatically
	    return getRandomNumberInRangeInclusive(1, 721);
	};

	exports.getPokemon = getPokemon;
	exports.getRandomPokemonNumber = getRandomPokemonNumber;

/***/ }
/******/ ])
});
;