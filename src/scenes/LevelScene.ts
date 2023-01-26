import { Vector } from "matter";
import components from "../components";

export default class LevelScene extends Phaser.Scene {

  constructor() {
    super({ key: "LevelScene" });
  }
  private blockMap: Map<string, number[]> = new Map();
  private player: Phaser.Physics.Arcade.Sprite;

  tileSize = 32;
  scoreText!: Phaser.GameObjects.Text
  movesLeft!: Phaser.GameObjects.Text 

  preload() {
    this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.tilemapCSV("map", "assets/grid.csv");
    this.load.image('whenGo', 'assets/whenGoClicked.png')

    this.load.image('forward1', 'assets/Forward.png')
    this.load.image('forward2', 'assets/Forward.png')
    this.load.image('forward3', 'assets/Forward.png')
    this.load.image('forward4', 'assets/Forward.png')
    this.load.image('forward5', 'assets/Forward.png')
    this.load.image('forward6', 'assets/Forward.png')
    this.load.image('forward7', 'assets/Forward.png')
    this.load.image('forward8', 'assets/Forward.png')
    this.load.image('forward9', 'assets/Forward.png')
    this.load.image('forward10', 'assets/Forward.png')
    this.load.image('right1', 'assets/RightTurn.png')
    this.load.image('right2', 'assets/RightTurn.png')
    this.load.image('right3', 'assets/RightTurn.png')
    this.load.image('left1', 'assets/LeftTurn.png')
    this.load.image('left2', 'assets/LeftTurn.png')
    this.load.image('left3', 'assets/LeftTurn.png')
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
    components.DraggableBlock(30, 400, 'right1', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(90, 400, 'right2', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(150, 400, 'right3', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(210, 400, 'left1', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(270, 400, 'left2', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(330, 400, 'left3', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(30, 300, 'forward1', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(90, 300, 'forward2', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(150, 300, 'forward3', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(210, 300, 'forward4', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(270, 300, 'forward5', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(330, 300, 'forward6', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(390, 300, 'forward7', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(450, 300, 'forward8', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(510, 300, 'forward9', this, {width: 60, height: 60}, this.blockMap);
    components.DraggableBlock(570, 300, 'forward10', this, {width: 60, height: 60}, this.blockMap);

    components.DraggableBlock(750, 400, 'down', this, {width: 60, height: 60}, this.blockMap);


    //add whenGo button
    components.DraggableBlock(500, 400, 'whenGo', this, {width: 60, height: 60}, this.blockMap);

  }

  async readBlocks(layer: Phaser.Tilemaps.TilemapLayer){
    //console.log(this.blockMap)
    let sortedArr: Array<any> = [];
    for(let key of this.blockMap.keys()) {
        sortedArr.push([this.blockMap.get(key)[0], this.blockMap.get(key)[1], key]) 
    }
    
    //Sorts array based on x position of the blocks. Sorts blocks in ascending order from lowest
    //x position to highest (from left to right on screen)
    sortedArr = sortedArr.sort(function(a, b) { return a[0] - b[0]; })
    console.log(sortedArr)

    for(let i = 0; i<sortedArr.length; i++){
      let direction = sortedArr[i][2].slice(0, 4)
      console.log(direction)
      console.log(this.player.angle);


      const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));
      await sleep(500);      

      if(direction === "forw"){
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
      else if(direction === 'righ'){
        console.log("rotated right")
        this.player.angle += 90;
      }
      else if(direction === 'left'){
        this.player.angle -= 90;
      } 
    }
  }
}
