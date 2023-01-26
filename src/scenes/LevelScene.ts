import { Vector } from "matter";
import components from "../components";

export default class LevelScene extends Phaser.Scene {

  constructor() {
    super({ key: "LevelScene" });
  }
  private blockArray: Array<any> = new Array();
  private player!: Phaser.Physics.Arcade.Sprite;
  
  go!: Phaser.GameObjects.Container

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
    this.load.image('player', 'assets/samplesprite.png')
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
    this.player = this.physics.add.sprite(this.tileSize + (this.tileSize/2), this.tileSize + (this.tileSize/2), "player").setScale(0.05);

    // add go button
    var go = this.add.image(60, 60, 'go')
    go.setDisplaySize(60,60)
    go.setInteractive().on('pointerdown', ()=>this.readBlocks(layer));

    // add test draggable blocks
    components.DraggableBlock(30, 400, 'right', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(90, 400, 'right', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(150, 400, 'right', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(210, 400, 'left', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(270, 400, 'left', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(330, 400, 'left', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(30, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(90, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(150, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(210, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(270, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(330, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(390, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(450, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(510, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);
    components.DraggableBlock(570, 300, 'forward', this, {width: 60, height: 60}, this.blockArray);

    //components.DraggableBlock(750, 400, 'down', this, {width: 60, height: 60}, this.blockArray);


    //add whenGo button
    this.go = components.DraggableBlock(500, 400, 'whenGo', this, {width: 60, height: 60}, this.blockArray);

  }

  async readBlocks(layer: Phaser.Tilemaps.TilemapLayer){
    let sortedArr: Array<any> = [];
    for (let i = 0; i < this.blockArray.length; i++) {
      sortedArr.push(this.blockArray[i]);
    }
    
    //Sorts array based on x position of the blocks. Sorts blocks in ascending order from lowest
    //x position to highest (from left to right on screen)
    sortedArr = sortedArr.sort(function(a, b) { return a.x - b.x; })
    
    


    for(let i = 0; i<sortedArr.length; i++){
      sortedArr[i].list[0].setAlpha(1)
      let direction = sortedArr[i].name

      const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));
      await sleep(500);      

      if(direction === "forward"){
        if(this.player.angle === 0){
          var tile = layer.getTileAtWorldXY(this.player.x + 32, this.player.y, true);
          if (tile.index === 2) {
            console.log('blocked')
          }
            else {
              this.player.x += 32;
            }
          }
        else if((this.player.angle === 90) || (this.player.angle === -270)){
          var tile = layer.getTileAtWorldXY(this.player.x, this.player.y + 32, true);
          if (tile.index === 2) {
            console.log('blocked')
          }
            else {
              this.player.y += 32;
            }
        }
        else if(Math.abs(this.player.angle) === 180){
          var tile = layer.getTileAtWorldXY(this.player.x - 32, this.player.y, true);
          if (tile.index === 2) {
            console.log('blocked')
          }
            else {
              this.player.x -= 32;
            }
        }
        else if((this.player.angle === 270) || (this.player.angle === -90)){
          var tile = layer.getTileAtWorldXY(this.player.x, this.player.y - 32, true);
          if (tile.index === 2) {
            console.log('blocked')
          }
            else {
              this.player.y -= 32;
            }
        }
      }
      else if(direction === 'right'){
        console.log("rotated right")
        this.player.angle += 90;
      }
      else if(direction === 'left'){
        this.player.angle -= 90;
      } 
    }
  }
}
