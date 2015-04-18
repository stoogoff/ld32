
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	var GunType = function() {
		this.image = "weapon-gun";
		this.range = 0;
		this.duration = 0;
	};
	var SprayType = function() {
		this.image = "weapon-spray";
		this.range = 0;
		this.duration = 0;
	};
	var BombType = function() {
		this.image = "weapon-bomb";
		this.range = 0;
		this.duration = 0;
	};

	// the type icon which can be picked up
	var WeaponType = function(game, x, y, type) {
		this.data = {
			type   : type,
			object : null
		};

		if(this.data.type === constants.GUN) {
			this.data.object = new GunType();
		}
		else if(this.data.type === constants.SPRAY) {
			this.data.object = new SprayType();
		}
		else if(this.data.type === constants.BOMB) {
			this.data.object = new BombType();
		}

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, this.data.object.image);

		game.physics.arcade.enable(this);
		game.add.existing(this);

		this.anchor.setTo(0.5, 0.5);
	};

	inherits(WeaponType, Phaser.Sprite);

	return WeaponType;
});