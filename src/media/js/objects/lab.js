
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	// import objects
	var Overlay = require("./overlay");

	var Lab = function(game, x, y, type) {
		this.data = {
			type: type
		};

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, "lab-" + type);

		this.anchor.setTo(0.5, 0.5);

		game.add.existing(this);
	};

	inherits(Lab, Phaser.Sprite);

	Lab.prototype.activate = function(owner, player) {
		// nothing to do in civilian labs
		if(this.data.type === constants.CIVILIAN) {
			return;
		}

		// handle atomic bomb separately
		if(this.data.type === constants.ATOMIC) {
			console.log("BOOM!");
			return;
		}
			
		owner.pause = true;

		// TODO display the screen and allow the player to modify stuff
		console.log("activating " + this.data.type)

		// display UI
		var overlay = new Overlay(this.game, this.data.type, player, function() {
			// on complete
			owner.pause = false;
		});

		// do stuff
		// when it's complete set...
		// owner.pause = false;
	};

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