
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var _ = require("underscore");

	// module vars
	// text syles
	var style = {
		title   : { font: "40px Arial", fill: "#00ff44", align: "center" },
		section : { font: "30px Arial", fill: "#505050", align: "left" },
		summary : { font: "20px Arial", fill: "#eee", align: "left" },
		body    : { font: "14px Arial", fill: "#eee", align: "left" }
	};

	// constants
	var PAD = 100;

	var InventoryItem = function(game, x, y, image) {
		this.active = false;

		// create the background first so the icon sits over it
		this.background = game.add.image(x, y, "inventory", 1);
		this.background.anchor.setTo(0.5, 0.5);
		this.background.fixedToCamera = true;
		this.background.scale = new Phaser.Point(1.2, 1.2);

		Phaser.Image.call(this, game, x, y, image, 0);

		this.scale = new Phaser.Point(2, 2);
		this.fixedToCamera = true;
		this.anchor.setTo(0.5, 0.5);
		this.inputEnabled = true;
		this.input.useHandCursor = true;
	};

	inherits(InventoryItem, Phaser.Image);

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

		// TODO when the mouse is over the icon the name and description of the icon is displayed
		// when the mouse clicks an icon it is highlighted
		item.events.onInputOver.add(function() {
			// enough are selected
			if(this.selected.length >= this.selectionMax || item.active) {
				return;
			}

			item.background.frame = 0;
		}, this);
		item.events.onInputOut.add(function() {
			if(item.active) {
				return;
			}

			item.background.frame = 1;
		}, this);
		item.events.onInputDown.add(function() {
			// enough are selected
			if(this.selected.length >= this.selectionMax && !item.active) {
				return;
			}

			item.active = !item.active;

			// add to selected
			if(item.active) {
				this.selected.push(item);
				item.background.frame = 2;
			}
			// remove from selected
			else {
				this.selected = _.without(this.selected, item);
			}

		}, this);

		this.add(item.background);
		this.add(item);
		this.childX += item.background.width;

		if(++this.grid >= 3) {
			this.grid = 0;
			this.childX = 240;
			this.childY += item.background.height;
		}
	};

	var Overlay = function(game, lab, player) {
		Phaser.Group.call(this, game);

		// background
		var width  = constants.SCREEN_WIDTH - PAD;
		var height = constants.SCREEN_HEIGHT - PAD;
		var fill   = helpers.createSolid(game, width, height, constants.BACKGROUND_COLOUR);

		var background = game.add.image(PAD / 2, PAD / 2, fill);

		background.anchor.setTo(0, 0);
		background.fixedToCamera = true;

		// create the title
		var titleText   = "Create Biological Weapons";
		var summaryText = "Choose up to three chemicals.";

		if(lab.isChemical()) {
			titleText   = "Create Chemical Weapons";
			summaryText = "Choose a weapon type and one or two chemicals.";
		}

		var title = game.add.text(constants.SCREEN_WIDTH / 2, 100, titleText, style.title);

		title.anchor.setTo(0.5, 0.5);
		title.fixedToCamera = true;

		var text = game.add.text(constants.SCREEN_WIDTH / 2, 150, summaryText, style.summary);
		
		text.anchor.setTo(0.5, 0.5);
		text.fixedToCamera = true;

		var weapons = null;

		// add section for weapons
		if(lab.isChemical()) {
			weapons = new Panel(game, 100, 200, "Weapon Type", 1);
			
			// display all weapons in the player's inventory
			_.chain(player.data.inventory).filter(function(item) {
				return helpers.isWeapon(item.type);
			}).pluck("image").uniq().each(function(image) {
				weapons.addInventoryItem(image);
			});
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

		// add save and cancel buttons
		var save = game.add.button(constants.SCREEN_WIDTH / 2 - 100, constants.SCREEN_HEIGHT - 100, "btn-save",   function() {
			var selected = chemicals.selected;

			if(weapons) {
				selected = selected.concat(weapons.selected);
			}

			lab.onOverlayComplete(_.pluck(selected, "key"));
		}, this, 0, 0, 1);
		var cancel = game.add.button(constants.SCREEN_WIDTH / 2 + 100, constants.SCREEN_HEIGHT - 100, "btn-cancel", lab.onOverlayCancelled, lab, 0, 0, 1);

		cancel.fixedToCamera = save.fixedToCamera = true;

		cancel.anchor.setTo(0.5, 0.5);
		save.anchor.setTo(0.5, 0.5);

		// add everything
		this.add(background);
		this.add(title);
		this.add(text);

		if(weapons) {
			this.add(weapons);
		}

		this.add(chemicals);
		this.add(save);
		this.add(cancel);

		//	if save is pressed all of the selected icons are passed to the lab as an array
		//	if cancel is pressed the lab is notified+
	};

	inherits(Overlay, Phaser.Group);

	return Overlay;
});