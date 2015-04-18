
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var AI = require("./ai");

	var Bug = function(game, x, y) {
		// properties that bugs will need
		// growth
		// quantity
		// strength
		// speed
		// toughness
		// smarts
		this.components = [];

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, "", frame);

		game.physics.enable(this, Phaser.Physics.ARCADE);
	};

	inherits(Bug, Phaser.Sprite);

	return Bug;
});