
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");

	var GunType = function() {
		this.image = "";
		this.range = 0;
		this.duration = 0;
	};
	var SprayType = function() {
		this.image = "";
		this.range = 0;
		this.duration = 0;
	};
	var GrenadeType = function() {
		this.image = "";
		this.range = 0;
		this.duration = 0;
	};

	// the type icon which can be picked up
	var WeaponType = function(game, x, y, type) {
		this.type = data["type"]; // one of gun, spray-can or smoke-grenade
		this.object = null;

		if(this.type === "gun") {
			this.object = new GunType();
		}
		else if(this.type === "spray-can") {
			this.object = new SprayType();
		}
		else {
			this.object = new GrenadeType();
		}

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, this.object.image, frame);

		game.physics.enable(this, Phaser.Physics.ARCADE);
	};

	inherits(WeaponType, Phaser.Sprite);

	return WeaponType;
});