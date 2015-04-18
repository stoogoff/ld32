define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var _ = require("underscore");

	// module vars
	var SPEED = 500;

	var Player = function(game, x, y, frame) {
		this.data = {
			toughness: 100,
			civilians: 100,
			atomBomb: 0,
			weapon: null,
			inventory: []
		};

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, "player", frame);

		// set physics and game specific stuff
		game.physics.arcade.enable(this);
		game.add.existing(this);

		this.body.collideWorldBounds = true;
		this.anchor.setTo(0.5, 0.5);
	};

	inherits(Player, Phaser.Sprite);

	Player.prototype.move = function(vector) {
		this.body.velocity.x = vector.x * SPEED;
		this.body.velocity.y = vector.y * SPEED;
	};

	Player.prototype.addInventoryItem = function(sprite) {
		sprite = sprite.data;

		if(_.contains(this.data.inventory, sprite)) {
			return false;
		}

		this.data.inventory.push(sprite);

		return true;
	};

	Player.prototype.removeInventoryItem = function(sprite) {
		sprite = sprite.data;

		if(_.contains(this.data.inventory, sprite)) {
			this.data.inventory = _.without(this.data.inventory, sprite);

			return true;
		}

		return false;
	};

	Player.prototype.fire = function() {
		if(this.weapon) {
			this.weapon.fire();
		}
	};

	return Player;
});