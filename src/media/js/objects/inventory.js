
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");


	var InventoryItem = function(game, x, y, image) {
		Phaser.Sprite.call(this, game, x, y, image);

		this.fixedToCamera = true;
		this.anchor.setTo(1, 1);

		var fill = game.add.bitmapData(this.width + constants.BORDER_WIDTH * 2, this.height + constants.BORDER_WIDTH * 2);

		fill.context.fillStyle = constants.INVENTORY_COLOUR;
		fill.context.beginPath();
		fill.context.rect(0, 0, this.width + constants.BORDER_WIDTH * 2, this.height + constants.BORDER_WIDTH * 2);
		fill.context.fill();

		this.fill = game.add.sprite(x + constants.BORDER_WIDTH / 2, y + constants.BORDER_WIDTH / 2, fill);
		this.fill.anchor.setTo(1, 1);
		this.fill.fixedToCamera = true;

		var outline = game.add.bitmapData(this.width + constants.BORDER_WIDTH * 2, this.height + constants.BORDER_WIDTH * 2);

		outline.context.beginPath();
		outline.context.rect(0, 0, this.width + constants.BORDER_WIDTH * 2, this.height + constants.BORDER_WIDTH * 2);
		outline.context.strokeStyle = constants.BORDER_COLOUR;
		outline.context.lineWidth = constants.BORDER_WIDTH;
		outline.context.stroke();

		this.border = game.add.sprite(x + constants.BORDER_WIDTH / 2, y + constants.BORDER_WIDTH / 2, outline);
		this.border.anchor.setTo(1, 1);
		this.border.fixedToCamera = true;
	};

	inherits(InventoryItem, Phaser.Sprite);

	var Inventory = function(game, x, y) {
		Phaser.Group.call(this, game);

		this.x = x;
		this.y = y;
		this.grid = 0;

		this.childX = 0;
		this.childY = 0;
	};

	inherits(Inventory, Phaser.Group);

	Inventory.prototype.addInventoryItem = function(image) {
		var item = new InventoryItem(this.game, this.childX, this.childY, image);

		this.add(item.fill);
		this.add(item);
		this.add(item.border);
		this.childX -= item.width + constants.BORDER_WIDTH;

		if(++this.grid >= 5) {
			this.grid = 0;
			this.childX = 0;
			this.childY -= item.height + constants.BORDER_WIDTH;
		}
	};

	Inventory.prototype.removeInventoryItem = function(image) {
		// TODO remove inventory item
	};

	return Inventory;
});