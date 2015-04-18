
define(function(require) {

	// a weapon built from a WeaponType and two Chemicals
	var Weapon = function() {
		// these are the properties which the type and chemicals will need to generate
		// type
		// range
		// damage
		// duration
		// mutation
		// ammo

		this.components = [];
	};

	return Weapon;
});