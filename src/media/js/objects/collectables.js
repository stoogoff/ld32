
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	// imported objects
	var WeaponType = require("./weapon-type");

	var CollectableGroup = function(game, parent) {
		Phaser.Group.call(this, game, parent);
	};

	inherits(CollectableGroup, Phaser.Group);

	CollectableGroup.prototype.addWeapon = function(x, y, type) {
		this.add(new WeaponType(this.game, x, y, type));
	};
	CollectableGroup.prototype.addGun = function(x, y) {
		this.addWeapon(x, y, constants.GUN);
	};
	CollectableGroup.prototype.addSpray = function(x, y) {
		this.addWeapon(x, y, constants.SPRAY);
	};
	CollectableGroup.prototype.addBomb = function(x, y) {
		this.addWeapon(x, y, constants.BOMB);
	};

	return CollectableGroup;
});