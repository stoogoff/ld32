
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var AI = require("./ai");

	var Alien = function(game, x, y, data) {
		// TODO - sensible defaults
		this.strength  = data["strength"]  || 0;
		this.speed     = data["speed"]     || 0;
		this.toughness = data["toughness"] || 0;
		this.smarts    = data["smarts"]    || 0;

		// TODO weapon types will come in later

		// image to use will come from data
		// this will need to include animation data
		this.image = data["image"];

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, this.image, frame);

		game.physics.enable(this, Phaser.Physics.ARCADE);
	};

	inherits(Alien, Phaser.Sprite);

	return Alien;
});