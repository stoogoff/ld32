
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	// a chemical for building bugs and weapons
	var Chemical = function(game, x, y, data) {
		// TODO should fiz and bubble out of the top
		// TODO - sensible defaults
		this.data = {
			type: constants.CHEMICAL,

			// weapon properties
			range    : data["range"]    || 0,
			damage   : data["damage"]   || 0,
			duration : data["duration"] || 0,
			mutation : data["mutation"] || 0,
			ammo     : data["ammo"]     || 0,

			// bug properties
			growth    : data["growth"]    || 0,
			quantity  : data["quantity"]  || 0,
			strength  : data["strength"]  || 0,
			speed     : data["speed"]     || 0,
			toughness : data["toughness"] || 0,
			smarts    : data["smarts"]    || 0,

			// descriptive properties
			name        : data["name"],
			description : data["description"],
			image       : data["image"]
		};

		// phaser related stuff
		Phaser.Image.call(this, game, x, y, this.data.image);

		//game.physics.arcade.enable(this);
		game.add.existing(this);

		this.anchor.setTo(0.5, 0.5);
	};

	inherits(Chemical, Phaser.Image);

	return Chemical;
});