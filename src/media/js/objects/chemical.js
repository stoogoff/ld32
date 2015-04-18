
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");

	// a chemical for building bugs and weapons
	var Chemical = function(game, x, y, data) {
		// TODO - sensible defaults

		// weapon properties
		this.range    = data["range"]    || 0;
		this.damage   = data["damage"]   || 0;
		this.duration = data["duration"] || 0;
		this.mutation = data["mutation"] || 0;
		this.ammo     = data["ammo"]     || 0;

		// bug properties
		this.growth    = data["growth"]    || 0;
		this.quantity  = data["quantity"]  || 0;
		this.strength  = data["strength"]  || 0;
		this.speed     = data["speed"]     || 0;
		this.toughness = data["toughness"] || 0;
		this.smarts    = data["smarts"]    || 0;

		// image to use will come from data
		this.image = data["image"];

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, this.image);

		game.physics.enable(this, Phaser.Physics.ARCADE);
	};

	inherits(Chemical, Phaser.Sprite);

	return Chemical;
});