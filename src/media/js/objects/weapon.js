
define(function(require) {
	var _ = require("underscore");
	var helpers = require("../utils/helpers");
	var constants = require("../utils/constants");

	// a weapon built from a WeaponType and two Chemicals
	var Weapon = function(player) {
		// these are the properties which the type and chemicals will need to generate
		this.data = {
			type     : "",
			range    : 0,
			damage   : 5,
			duration : 0,
			mutation : 0,
			ammo     : 5,
			reload   : 0
		};

		this.hasWeaponType = false;
		this.reloadTimer = 0;
		this.player = player;
	};

	Weapon.prototype.addComponent = function(component) {
		if(helpers.isWeapon(component.type)) {
			this.hasWeaponType = true;
		}

		// add the relevant properties of the component to the weapon's data
		var keys = _.keys(this.data);

		keys.forEach(function(key) {
			if(key === "type") {
				this.data.type = component.type;
			}
			else if(component[key]) {
				this.data[key] += component[key];
			}
		}.bind(this));
	};

	Weapon.prototype.fire = function(game, x, y, direction) {
		if(!this.hasWeaponType) {
			// TODO bad fizzle audio
			return;
		}

		var bullet = null;

		if(game.time.now > this.reloadTimer) {
			// bullet
			if(this.data.type === constants.GUN) {
				bullet = game.add.sprite(x, y, "bullet");

				game.physics.arcade.enable(bullet);

				bullet.body.velocity.x = 800 * direction;
				bullet.outOfBoundsKill = true;
				bullet.checkWorldBounds = true;
				bullet.scale = new Phaser.Point(direction * -1, 1);
				bullet.data = this.data;
			}

			this.reloadTimer = game.time.now + this.data.reload;

			// out of ammo so this weapon is now useless
			if(--this.data.ammo <= 0) {
				this.player.weapon = null;
			}
		}

		// return the bullet so the game can add collision detection to it
		return bullet;
	};

	return Weapon;
});