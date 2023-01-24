import components from "../components";

export default class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelScene" });
  }

  preload() {
    this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.image("player", "move-east");
    this.load.tilemapCSV("map", "assets/grid.csv");
  }

  create() {
    // add background
    this.add.image(400, 400, "level-1-bkgrd");
   
    this.scoreText = this.add.text(16, 725, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.movesLeft = this.add.text(300, 725, 'Moves Left: 10', { fontSize: '32px', fill: '#000' });

    // add test draggable blocks
    components.DraggableBlock(400, 400, "move-east", this);
    components.DraggableBlock(440, 400, "move-east", this);

    var map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    var tileset = map.addTilesetImage("tiles", null, 32, 32, 1, 2);
    var layer = map.createLayer(0, tileset, 0, 0);

    var player = this.add.image(32 + 16, 32 + 16, "player");

    //  Left movement
    this.input.keyboard.on("keydown-A", function (event) {
      var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.x -= 32;
        player.angle = 180;
      }
    });

    //  Right movement
    this.input.keyboard.on("keydown-D", function (event) {
      var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.x += 32;
        player.angle = 0;
      }
    });

    //  Up movement
    this.input.keyboard.on("keydown-W", function (event) {
      var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.y -= 32;
        player.angle = -90;
      }
    });

    //  Down movement
    this.input.keyboard.on("keydown-S", function (event) {
      var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.y += 32;
        player.angle = 90;
      }
    });
  }

  update() {}
}
