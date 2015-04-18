
define(function(require) {
	return {
		SCREEN_WIDTH: 800,
		SCREEN_HEIGHT: 800,

		// world parameters
		WORLD_WIDTH: 1600,
		WORLD_HEIGHT: 1600,

		// HUD
		BACKGROUND_COLOUR: "rgba(0, 0, 0, 0.9)",
		INVENTORY_COLOUR: "rgba(200, 200, 200, 1)",
		BORDER_COLOUR: "#222",
		BORDER_WIDTH: 3,
		GOOD_COLOUR: "rgba(0, 255, 0, 0.7)",
		BAD_COLOUR: "rgba(255, 0, 0, 0.7)",

		// target keys
		PLAYER: "player",
		ALIEN: "alien",
		BUG: "bug",

		// bases
		ATOMIC: "atomic",
		BIOLOGICAL: "biological",
		CHEMICAL: "chemical",
		CIVILIAN: "civilian",

		// weapon types
		GUN: "gun",
		SPRAY: "spray-can",
		BOMB: "bomb"
	};
});