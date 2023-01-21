import { GameObjects } from "phaser";
import components from "../components";

export default class LevelScene extends Phaser.Scene {
    private go?: any
    private blockMap?: any

  constructor() {
    super({ key: "LevelScene" });
  }
    //private forward?: Phaser.GameObjects.GameObject;
    private go?: any
    private blockMap?: any


  preload() {
    this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.image("player", "move-east");
    this.load.tilemapCSV("map", "assets/grid.csv");

    this.load.image('forward', 'assets/Forward.png')
    this.load.image('right', 'assets/RightTurn.png')
    this.load.image('left', 'assets/LeftTurn.png')
    this.load.image('go', 'assets/GoButton.png')
  }

    create() {
    
    // add background
    this.add.image(400, 400, "level-1-bkgrd");

    //sydney
    this.blockMap = new Map();
    this.go = this.add.image(50, 50, 'go').setScale(0.5).setInteractive().on('pointerdown', ()=>this.readBlocks());

    // add test draggable blocks
    components.DraggableBlock(200, 400, 'right', this, 0.2, this.blockMap);
    components.DraggableBlock(300, 400, 'forward', this, 0.05, this.blockMap);
    components.DraggableBlock(400, 400, 'left', this, 0.2, this.blockMap);

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
       
        // add background
        this.add.image(400, 400, 'level-1-bkgrd')

        this.blockMap = new Map();
        this.go = this.add.image(50, 50, 'go').setScale(0.5).setInteractive().on('pointerdown', ()=>this.readBlocks());

        // add test draggable blocks
        components.DraggableBlock(200, 400, 'right', this, 0.2, this.blockMap);
        components.DraggableBlock(300, 400, 'forward', this, 0.05, this.blockMap);
        components.DraggableBlock(400, 400, 'left', this, 0.2, this.blockMap);
    }

  readBlocks(){
    let sortedArr: Array<any> = [];
    for(let key of this.blockMap.keys()) {
        sortedArr.push([this.blockMap.get(key)[0], this.blockMap.get(key)[1], key]) 
    }
    //Sorts array based on x position of the blocks. Sorts blocks in ascending order from lowest
    //x position to highest (from left to right on screen)
    sortedArr.sort()
    for(let i = 0; i<sortedArr.length; i++){
        console.log(sortedArr[i][0]);
        console.log(sortedArr[i][1]);
        console.log(sortedArr[i][2]);
    }
  }
}
