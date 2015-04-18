define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var _ = require("underscore");

	// module vars
	var cursors = null, SPEED = 500;

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

		// set up player controls
		cursors = game.input.keyboard.createCursorKeys();
	};

	inherits(Player, Phaser.Sprite);

	// move the player
	Player.prototype.update = function() {
		this.move();

		// fire
	};

	Player.prototype.move = function() {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;

		if(cursors.left.isDown) {
			this.body.velocity.x = -SPEED;
		}
		else if(cursors.right.isDown) {
			this.body.velocity.x = SPEED;
		}

		if(cursors.up.isDown) {
			this.body.velocity.y = -SPEED;
		}
		else if(cursors.down.isDown) {
			this.body.velocity.y = SPEED;
		}
	};

	Player.prototype.addInventoryItem = function(sprite) {
		sprite = sprite.data;

		if(_.contains(this.data.inventory, sprite)) {
			return false;
		}

		this.data.inventory.push(sprite);

		return true;
	};

	Player.prototype.fire = function() {
		if(this.weapon) {
			this.weapon.fire();
		}
	};

	return Player;
});