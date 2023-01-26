import components from "../components";

export default class LevelScene extends Phaser.Scene {

  constructor() {
    super({ key: "LevelScene" });
  }
  private blockMap: Map<string, number[]> = new Map();
  private fauna!: Phaser.Physics.Arcade.Sprite

  tileSize = 32;
	scoreText!: Phaser.GameObjects.Text
  movesLeft!: Phaser.GameObjects.Text 

  preload() {
    this.load.image("tiles", "assets/drawtiles-spaced.png");
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
    this.load.image('outdoor-tiles', 'assets/tiles/outdoors.png')
    this.load.image('vehicle-tiles', 'assets/tiles/vehicles.png')
    this.load.tilemapTiledJSON('map', 'assets/tiles/map-01.json')
    this.load.atlas('fauna', 'assets/sprites/fauna.png', 'assets/sprites/fauna.json')
    this.load.audio('lvl1music', 'assets/sounds/space_traveler.ogg')
  }

    create() {
      this.sound.stopByKey('menumusic');
      var lvl1music = this.sound.add('lvl1music')
      var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      }
      lvl1music.play(musicConfig)

    // setup map with tiles
    const tilemap = this.make.tilemap({ key: 'map' })
    const tileset1 = tilemap.addTilesetImage('outdoors', 'outdoor-tiles')
    const tileset2 = tilemap.addTilesetImage('vehicles', 'vehicle-tiles')
    const allLayers = [tileset1, tileset2]

    tilemap.createLayer('Ground', tileset1)
    const bushLayer = tilemap.createLayer('Bushes', allLayers)
    bushLayer.setCollisionByProperty({ collides: true })
    const topLayer1 = tilemap.createLayer('Top', tileset1)
    topLayer1.setCollisionByProperty({ collides: true })

    // setup fauna
    this.fauna = this.physics.add.sprite(140, 140, 'fauna', 'walk-down-3.png')
    this.fauna.body.setSize(this.fauna.width * 0.5, this.fauna.height * 0.3)
    this.fauna.body.setOffset(8, 20)

    this.anims.create({
      key: 'char-idle-down',
      frames: [{ key: 'fauna', frame: 'walk-down-3.png' }]
    })

    this.anims.create({
      key: 'char-idle-up',
      frames: [{ key: 'fauna', frame: 'walk-up-3.png' }]
    })

    this.anims.create({
      key: 'char-idle-side',
      frames: [{ key: 'fauna', frame: 'walk-side-3.png' }]
    })


    this.anims.create({
      key: 'char-run-down',
      frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'walk-down-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })

    this.anims.create({
      key: 'char-run-up',
      frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'walk-up-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })

    this.anims.create({
      key: 'char-run-side',
      frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'walk-side-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })

    this.fauna.anims.play('char-idle-side')
    // add go button
    var go = this.add.image(60, 60, 'go')
    go.setDisplaySize(60,60)
    go.setInteractive().on('pointerdown', ()=>this.readBlocks(bushLayer));
    
    // add test draggable blocks
    components.DraggableBlock(20, 350, 'right1', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(60, 350, 'right2', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(100, 350, 'right3', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(140, 350, 'left1', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(180, 350, 'left2', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(220, 350, 'left3', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(20, 300, 'forward1', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(60, 300, 'forward2', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(100, 300, 'forward3', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(140, 300, 'forward4', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(180, 300, 'forward5', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(220, 300, 'forward6', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(260, 300, 'forward7', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(300, 300, 'forward8', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(340, 300, 'forward9', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(380, 300, 'forward10', this, {width: 25, height: 25}, this.blockMap);
    components.DraggableBlock(260, 350, 'down', this, {width: 25, height: 25}, this.blockMap);

    //add whenGo button
    components.DraggableBlock(300, 350, 'whenGo', this, {width: 25, height: 25}, this.blockMap);

    this.physics.add.collider(this.fauna, bushLayer)
    this.physics.add.collider(this.fauna, topLayer1)
    
    // add score
    this.scoreText = this.add.text(310, 16, 'Score: 0', {
      stroke: '#00000',
      strokeThickness: 10,
      fontSize: '12px',
		})
    this.movesLeft = this.add.text(305, 40, 'Moves: 10', {
      stroke: '#00000',
      strokeThickness: 10,
      fontSize: '12px',
		});
  }

  async readBlocks(layer: Phaser.Tilemaps.TilemapLayer){
    //console.log(this.blockMap)
    let sortedArr: Array<any> = [];
    for(let key of this.blockMap.keys()) {
        sortedArr.push([this.blockMap.get(key)![0], this.blockMap.get(key)![1], key]) 
    }
    
    //Sorts array based on x position of the blocks. Sorts blocks in ascending order from lowest
    //x position to highest (from left to right on screen)
    sortedArr = sortedArr.sort(function(a, b) { return a[0] - b[0]; })
    console.log(sortedArr)

    for(let i = 0; i<sortedArr.length; i++){
      let direction = sortedArr[i][2].slice(0, 4)
      console.log(direction)
      console.log(this.fauna.angle);


      const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));
      await sleep(500);      

      if(direction === "forw"){
        if(this.fauna.angle === 0){
          var tile = layer.getTileAtWorldXY(this.fauna.x + 32, this.fauna.y, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.fauna.anims.play('char-run-side', true)
              this.fauna.scaleX = 1
              this.fauna.x += 32;
            }
          }
        else if((this.fauna.angle === 90) || (this.fauna.angle === -270)){
          var tile = layer.getTileAtWorldXY(this.fauna.x, this.fauna.y + 32, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.fauna.anims.play('char-run-down', true)
              this.fauna.y += 32;
            }
        }
        else if(Math.abs(this.fauna.angle) === 180){
          var tile = layer.getTileAtWorldXY(this.fauna.x - 32, this.fauna.y, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.fauna.anims.play('char-run-side', true)
              this.fauna.scaleX = 1
              this.fauna.x -= 32;
            }
        }
        else if((this.fauna.angle === 270) || (this.fauna.angle === -90)){
          var tile = layer.getTileAtWorldXY(this.fauna.x, this.fauna.y - 32, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.fauna.anims.play('char-run-up', true)
              this.fauna.y -= 32;
            }
        }
      }
      else if(direction === 'righ'){
        console.log("rotated right")
        this.fauna.anims.play('char-idle-down')
        this.fauna.angle += 90;
      }
      else if(direction === 'left'){
        console.log("rotated left")
        this.fauna.anims.play('char-idle-up')
        this.fauna.angle -= 90;
      }
    }
    this.fauna.anims.stop()
  }
}
