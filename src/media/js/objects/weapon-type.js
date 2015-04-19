
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	// the type icon which can be picked up
	var WeaponType = function(game, x, y, type) {
		this.data = {
			type : type
		};

		if(this.data.type === constants.GUN) {
			this.data.image = "weapon-gun";
			this.data.range = 0;
			this.data.duration = 0;
		}
		else if(this.data.type === constants.SPRAY) {
			this.data.image = "weapon-spray";
			this.data.range = 0;
			this.data.duration = 0;
		}
		else if(this.data.type === constants.BOMB) {
			this.data.image = "weapon-bomb";
			this.data.range = 0;
			this.data.duration = 0;
		}

		// phaser related stuff
		Phaser.Image.call(this, game, x, y, this.data.image);

		game.add.existing(this);

		this.anchor.setTo(0.5, 0.5);
	};

	inherits(WeaponType, Phaser.Image);

	return WeaponType;
});