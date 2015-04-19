
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	// imported objects
	var WeaponType = require("./weapon-type");
	var Chemical = require("./chemical");

	var CollectableGroup = function(game, parent) {
		Phaser.Group.call(this, game, parent);

		var objects = game.cache.getJSON("objects");

		this.chemicalTypes = objects.chemicals;
	};

	inherits(CollectableGroup, Phaser.Group);

	// weapon types
	CollectableGroup.prototype.addWeapon = function(type) {
		var point = helpers.getRandomPoint(this.game);

		this.add(new WeaponType(this.game, point.x, point.y, type));
	};
	CollectableGroup.prototype.addGun = function() {
		this.addWeapon(constants.GUN);
	};
	CollectableGroup.prototype.addSpray = function() {
		this.addWeapon(constants.SPRAY);
	};
	CollectableGroup.prototype.addBomb = function() {
		this.addWeapon(constants.BOMB);
	};
	CollectableGroup.prototype.addRandomWeapon = function() {
		var weapons = [constants.GUN, constants.SPRAY, constants.BOMB];

		this.addWeapon(this.game.rnd.pick(weapons));
	};

	// add checmical types
	CollectableGroup.prototype.addRandomChemical = function() {
		var type = this.game.rnd.pick(this.chemicalTypes);
		var point = helpers.getRandomPoint(this.game);

		this.add(new Chemical(this.game, point.x, point.y, type));
	};
	CollectableGroup.prototype.addRandomChemicals = function(num) {
		for(var i = 0; i < num; ++i) {
			this.addRandomChemical();
		}
	};

	// collision detection
	CollectableGroup.prototype.collision = function(sprite, callback, context) {
		this.forEach(function(item) {
			if(item.overlap(sprite)) {
				callback.call(context, sprite, item);
			}
		});
	};

	return CollectableGroup;
});