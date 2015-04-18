
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	var PAD = 100;

	var Overlay = function(game, type, player, onComplete) {
		// background
		var width = constants.SCREEN_WIDTH - PAD;
		var height = constants.SCREEN_HEIGHT - PAD;
		var fill = game.add.bitmapData(width, height);

		fill.context.fillStyle = constants.BACKGROUND_COLOUR;
		fill.context.beginPath();
		fill.context.rect(0, 0, width, height);
		fill.context.fill();

		Phaser.Sprite.call(this, game, PAD / 2, PAD / 2, fill);

		this.anchor.setTo(0, 0);
		this.fixedToCamera = true;

		game.add.existing(this);

		// called when finished with the overlay
		this.onComplete = onComplete;
	};

	inherits(Overlay, Phaser.Sprite);

	return Overlay;
});