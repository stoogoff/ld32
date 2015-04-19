
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
		Phaser.Image.call(this, game, x, y, "lab-" + type);

		this.anchor.setTo(0.5, 0.5);

		game.add.existing(this);
	};

	inherits(Lab, Phaser.Image);

	Lab.prototype.isCivilian = function() {
		return this.data.type === constants.CIVILIAN;
	};

	Lab.prototype.isAtomic = function() {
		return this.data.type === constants.ATOMIC;
	};

	Lab.prototype.isBiological = function() {
		return this.data.type === constants.BIOLOGICAL;
	};

	Lab.prototype.isChemical = function() {
		return this.data.type === constants.CHEMICAL;
	};

	Lab.prototype.activate = function(owner, player, callback) {
		// nothing to do in civilian labs
		// atomic is handled in the main game play state
		if(this.isCivilian() || this.isAtomic()) {
			return;
		}

		this.owner = owner;
		this.owner.activeOverlay = true;
		this.player = player;
		this.onComplete = callback;

		// display UI
		this.overlay = new Overlay(this.game, this, player);

		// do stuff
		// when it's complete set...
		// owner.pause = false;
	};

	Lab.prototype.onOverlayComplete = function(selected) {
		// TODO stuff with selected
		// either build a weapon and assign it to the player
		// or create a bug
		console.log(selected);

		this.owner.activeOverlay = false;
		this.overlay.destroy();
	};

	Lab.prototype.onOverlayCancelled = function() {
		this.owner.activeOverlay = false;
		this.overlay.destroy();
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