import components from "../components";

export default class LevelScene extends Phaser.Scene {

  constructor() {
    super({ key: "LevelScene" });
  }
  private blockMap: Map<string, number[]> = new Map();

  tileSize = 32;
  scoreText!: Phaser.GameObjects.Text
  movesLeft!: Phaser.GameObjects.Text 

  preload() {
    this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.tilemapCSV("map", "assets/grid.csv");
    this.load.image('whenGo', 'assets/whenGoClicked.png')

    this.load.image('forward', 'assets/Forward.png')
    this.load.image('right', 'assets/RightTurn.png')
    this.load.image('left', 'assets/LeftTurn.png')
    this.load.image('go', 'assets/GoButton.png')
    this.load.image('down', 'assets/Down.png')

  }

    create() {
    
    // add background
    this.add.image(400, 400, "level-1-bkgrd");
   
    // add score
    this.scoreText = this.add.text(16, 725, 'Score: 0', components.style);
    this.movesLeft = this.add.text(300, 725, 'Moves Left: 10', components.style);

    // setup map with tiles
    var map = this.make.tilemap({ key: "map", tileWidth: this.tileSize, tileHeight: this.tileSize });
    var tileset = map.addTilesetImage("tiles", 'tiles', this.tileSize, this.tileSize, 1, 2);
    var layer = map.createLayer(0, tileset, 0, 0);

    // setup player
    var player = this.add.image(this.tileSize + (this.tileSize/2), this.tileSize + (this.tileSize/2), "player");

    // add go button
    var go = this.add.image(60, 60, 'go')
    go.setDisplaySize(60,60)
    go.setInteractive().on('pointerdown', ()=>this.readBlocks());

    // add test draggable blocks
    components.DraggableBlock(200, 400, 'right', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(300, 400, 'forward', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(400, 400, 'left', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(500, 400, 'down', this, {width: 60, height: 60}, this.blockMap);


    //add whenGo button
    components.DraggableBlock(500, 400, 'whenGo', this, {width: 60, height: 60}, this.blockMap);


    this.setupMovement(player, layer);
  }

  setupMovement(player: Phaser.GameObjects.Image, layer: Phaser.Tilemaps.TilemapLayer) {
    //  Left movement
    this.input.keyboard.on("keydown-A", function () {
      var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.x -= 32;
        player.angle = 180;
      }
    });

    //  Right movement
    this.input.keyboard.on("keydown-D", function () {
      var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.x += 32;
        player.angle = 0;
      }
    });

    //  Up movement
    this.input.keyboard.on("keydown-W", function () {
      var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.y -= 32;
        player.angle = -90;
      }
    });

    //  Down movement
    this.input.keyboard.on("keydown-S", function () {
      var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        player.y += 32;
        player.angle = 90;
      }
    });
  }

  readBlocks(){
    console.log(this.blockMap)
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
