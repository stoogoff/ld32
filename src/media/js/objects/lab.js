
define(function(require) {
	var inherits = require("../utils/inherits");

	var Lab = function(game, x, y, frame) {
		Phaser.Sprite.call(this, game, x, y, "lab", frame);

		game.add.existing(this);
	};

	inherits(Lab, Phaser.Sprite);

	return Lab;
});