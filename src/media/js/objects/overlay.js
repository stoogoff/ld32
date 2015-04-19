
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var _ = require("underscore");

	// import objects
	var InventoryItem = require("./inventory").InventoryItem;

	// module vars
	// text syles
	var style = {
		title   : { font: "40px Arial", fill: "#00ff44", align: "center" },
		section : { font: "30px Arial", fill: "#505050", align: "left" },
		body    : { font: "20px Arial", fill: "#eee", align: "left" }
	};

	// constants
	var PAD = 100, INVENTORY_SCALE = 2;

	var Panel = function(game, x, y, title, selectionMax) {
		Phaser.Group.call(this, game);
		
		var section = this.add(new Phaser.Text(game, 0, 0, title, style.section));
		
		section.anchor.setTo(0, 0);
		section.fixedToCamera = true;

		this.selectionMax = selectionMax;
		this.selected = [];

		this.x = x;
		this.y = y;
		this.grid = 0;

		this.childX = 240;
		this.childY = 30;
	};

	inherits(Panel, Phaser.Group);

	Panel.prototype.addInventoryItem = function(image) {
		// display icons in a grid
		var item = new InventoryItem(this.game, this.childX, this.childY, image);

		item.active = false;
		item.anchor.setTo(0.5, 0.5);
		item.fill.anchor.setTo(0.5, 0.5);
		item.border.anchor.setTo(0.5, 0.5);

		item.fill.scale = item.border.scale = item.scale = new Phaser.Point(INVENTORY_SCALE, INVENTORY_SCALE);
		item.fill.alpha = item.border.alpha = item.alpha = 0.8;

		item.inputEnabled = true;
		item.input.useHandCursor = true;
		item.events.onInputOver.add(function() {
			// enough are selected
			if(this.selected.length >= this.selectionMax) {
				return;
			}

			item.fill.alpha = item.border.alpha = item.alpha = 1;
		}, this);
		item.events.onInputOut.add(function() {
			if(item.active) {
				return;
			}

			item.fill.alpha = item.border.alpha = item.alpha = 0.8;
		}, this);
		item.events.onInputDown.add(function() {
			// enough are selected
			if(this.selected.length >= this.selectionMax && !item.active) {
				return;
			}

			// remove from selected
			if(item.active) {
				this.selected = _.without(this.selected, item);
			}
			// add to selected
			else {
				this.selected.push(item);
			}

			item.active = !item.active;
		}, this);

		this.add(item.fill);
		this.add(item);
		this.add(item.border);
		this.childX += item.width + constants.BORDER_WIDTH * INVENTORY_SCALE;

		if(++this.grid >= 3) {
			this.grid = 0;
			this.childX = 240;
			this.childY += item.height + constants.BORDER_WIDTH * INVENTORY_SCALE;
		}
	};

	var Overlay = function(game, lab, player) {
		// background
		var width = constants.SCREEN_WIDTH - PAD;
		var height = constants.SCREEN_HEIGHT - PAD;
		var fill = helpers.createSolid(game, width, height, constants.BACKGROUND_COLOUR);

		Phaser.Image.call(this, game, PAD / 2, PAD / 2, fill);

		this.anchor.setTo(0, 0);
		this.fixedToCamera = true;

		game.add.existing(this);

		// create the title
		var title = "Create Biological Weapons";
		var text  = "Choose up to three chemicals.";

		if(lab.isChemical()) {
			title = "Create Chemical Weapons";
			text  = "Choose a weapon type and one or two chemicals.";
		}

		this.title = game.add.text(constants.SCREEN_WIDTH / 2, 100, title, style.title);
		this.title.anchor.setTo(0.5, 0.5);
		this.title.fixedToCamera = true;

		this.text = game.add.text(constants.SCREEN_WIDTH / 2, 150, text, style.body);
		this.text.anchor.setTo(0.5, 0.5);
		this.text.fixedToCamera = true;

		this.panels = [];

		// add section for weapons
		if(lab.isChemical()) {
			var weapons = new Panel(game, 100, 200, "Weapon Type", 1);
			
			// display all weapons in the player's inventory
			_.chain(player.data.inventory).filter(function(item) {
				return helpers.isWeapon(item.type);
			}).pluck("image").uniq().each(function(image) {
				weapons.addInventoryItem(image);
			});

			this.panels.push(weapons);
		}

		// add section for chemicals
		// chemicals need to be positioned dependent on whether or not there is a weapons section
		var chemicals = new Panel(game, 100, lab.isChemical() ? 300 : 200, "Chemicals", lab.isChemical() ? 2 : 3);

		// display all chemicals in the player's inventory
		_.chain(player.data.inventory).filter(function(item) {
			return !helpers.isWeapon(item.type);
		}).pluck("image").uniq().each(function(image) {
			chemicals.addInventoryItem(image);
		});

		this.panels.push(chemicals);

		// TODO all displayed icons have rollover states
		//	when the mouse is over the icon the name and description of the icon is displayed
		//	when the mouse clicks an icon it is highlighted
		// TODO add save and cancel buttons
		//	if save is pressed all of the selected icons are passed to the lab as an array
		//	if cancel is pressed the lab is notified
	};

	inherits(Overlay, Phaser.Image);

	return Overlay;
});