
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	var Lab = function(game, x, y, type) {
		// labType is one of "a", "b", "c" or "civilian", depending on functionality
		this.data = {
			type: type
		};

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, "lab");

		this.anchor.setTo(0.5, 0.5);

		game.add.existing(this);
	};

	inherits(Lab, Phaser.Sprite);

	var LabGroup = function(game, parent) {
		Phaser.Group.call(this, game, parent);
	};

	inherits(LabGroup, Phaser.Group);

	LabGroup.prototype.createLabs = function(x, y) {
		var offset = 150;

		this.add(new Lab(this.game, x - offset, y - offset, constants.ATOMIC));
		this.add(new Lab(this.game, x + offset, y - offset, constants.BIOLOGICAL));
		this.add(new Lab(this.game, x - offset, y + offset, constants.CHEMICAL));
		this.add(new Lab(this.game, x + offset, y + offset, constants.CIVILIAN));
	};

	return LabGroup;
});