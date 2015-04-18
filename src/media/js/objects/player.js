define(function(require) {
	// imports
	var inherits = require("../utils/inherits");

	// module vars
	var cursors = null, velocity = 500;

	var Player = function(game, x, y, frame) {
		this.toughness = 0;
		this.civilians = 0;
		this.weapon = null;

		// phaser related stuff	
		Phaser.Sprite.call(this, game, x, y, "player", frame);

		// set physics and game specific stuff
		game.physics.enable(this, Phaser.Physics.ARCADE);
		game.add.existing(this);

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
			this.body.velocity.x = -velocity;
		}
		else if(cursors.right.isDown) {
			this.body.velocity.x = velocity;
		}

		if(cursors.up.isDown) {
			this.body.velocity.y = -velocity;
		}
		else if(cursors.down.isDown) {
			this.body.velocity.y = velocity;
		}
	};

	Player.prototype.fire = function() {
		if(this.weapon) {
			this.weapon.fire();
		}
	};

	return Player;
});