import components from "../components";

export default class LevelScene extends Phaser.Scene {


  constructor() {
    super({ key: "LevelScene" });
  }
  private blockArray: Array<Phaser.GameObjects.Container> = new Array();
  private player!: Phaser.Physics.Arcade.Sprite;
  
  whenGo!: Phaser.GameObjects.Container

  tileSize = 16;
  scoreText!: Phaser.GameObjects.Text
  movesLeft!: Phaser.GameObjects.Text 
  endpt!: any;
  gem!: Phaser.GameObjects.Sprite

  preload() {
    this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.image('whenGo', 'assets/whenGoClicked.png')
    this.load.image('forward', 'assets/Forward.png')
    this.load.image('right', 'assets/RightTurn.png')
    this.load.image('left', 'assets/LeftTurn.png')
    this.load.image('go', 'assets/GoButton.png')
    this.load.image('down', 'assets/Down.png')
    this.load.image('outdoor-tiles', 'assets/tiles/outdoors.png')
    this.load.image('vehicle-tiles', 'assets/tiles/vehicles.png')
    this.load.tilemapTiledJSON('map', 'assets/tiles/map-01.json')
    this.load.atlas('fauna', 'assets/sprites/fauna.png', 'assets/sprites/fauna.json')
    this.load.audio('lvl1music', 'assets/sounds/space_traveler.ogg')
    this.load.image('gem', 'assets/empty.png')
    this.load.image('background', 'assets/stone2.jpg')
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
    var tilemap = this.make.tilemap({ key: 'map'})
    var tileset1 = tilemap.addTilesetImage('outdoors', 'outdoor-tiles')
    var tileset2 = tilemap.addTilesetImage('vehicles', 'vehicle-tiles')
    var allLayers = [tileset1, tileset2]

    tilemap.createLayer('Ground', tileset1)
    var bushLayer = tilemap.createLayer('Bushes', allLayers)
    bushLayer.setCollisionByProperty({ collides: true })
    var topLayer1 = tilemap.createLayer('Top', tileset1)
    topLayer1.setCollisionByProperty({ collides: true })

    this.add.image(500, 200, "background");

    // setup player
    this.player = this.physics.add.sprite(40, 160, 'fauna', 'walk-down-3.png')
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.3)
    this.player.body.setOffset(8, 20)

    // setup animations
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

    this.player.anims.play('char-idle-side')

    // add go button
    var go = this.add.image(560, 360, 'go')
    go.setDisplaySize(60, 34)
    go.setInteractive().on('pointerdown', ()=>this.readBlocks(bushLayer));

    // add test draggable blocks
    components.DraggableBlock(550, 80, 'right', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(550, 120, 'right', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(550, 160, 'left', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(550, 200, 'left', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 80, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 120, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 160, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 200, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 240, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 280, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 320, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(450, 360, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 80, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 120, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 160, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 200, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 240, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 280, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(500, 320, 'forward', this, {width: 25, height: 25}, this.blockArray);

    //add whenGo button
    this.whenGo = components.DraggableBlock(450, 40, 'whenGo', this, {width: 25, height: 25}, this.blockArray);

    this.physics.add.collider(this.player, bushLayer)
    this.physics.add.collider(this.player, topLayer1)

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

    this.endpt = tilemap.findObject("Objects", obj => obj.name === "end");
    this.gem = this.add.sprite(this.endpt.x, this.endpt.y, "gem");
    this.physics.add.existing(this.gem, true);
    this.physics.add.overlap(this.gem,this.player,this.reachedGoal, function(){}, this);
  }

  async readBlocks(layer: Phaser.Tilemaps.TilemapLayer){
    var index = {x:this.whenGo.x, y:this.whenGo.y}

    // get all blocks vertical from whenGo
    var sortedArr: Array<Phaser.GameObjects.Container> = [];
    for (let i = 0; i < this.blockArray.length; i++) {
      if (this.blockArray[i].x == index.x) {
        if (this.blockArray[i].name === 'whenGo') {
          continue
        }
        sortedArr.push(this.blockArray[i])
      }
    }

    // sort array by y values; top first
    sortedArr.sort((a,b) => a.y - b.y)

    // get all blocks connected to whenGo
    var directions: Array<Phaser.GameObjects.Container> = []
    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i].y === index.y + 25) {
        directions.push(sortedArr[i])
        index.y += 25
      }
    }

    for(let i = 0; i<directions.length; i++){
      let shadow:any = directions[i].list[0]
      shadow.setAlpha(1)
      let direction = directions[i].name

      const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));
      await sleep(500);      

      if(direction === "forward"){
        if(this.player.angle === 0){
          var tile = layer.getTileAtWorldXY(this.player.x + 32, this.player.y, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.player.anims.play('char-run-side', true)
              this.player.scaleX = 1
              this.player.x += 32;            }
          }
        else if((this.player.angle === 90) || (this.player.angle === -270)){
          var tile = layer.getTileAtWorldXY(this.player.x, this.player.y + 32, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.player.anims.play('char-run-down', true)
              this.player.y += 32;
            }
        }
        else if(Math.abs(this.player.angle) === 180){
          var tile = layer.getTileAtWorldXY(this.player.x - 32, this.player.y, true);
          if (tile.index > 2) {
            console.log('blocked')
          }
            else {
              this.player.anims.play('char-run-side', true)
              this.player.scaleX = 1
              this.player.x -= 32;
            }
        }
        else if((this.player.angle === 270) || (this.player.angle === -90)){
          var tile = layer.getTileAtWorldXY(this.player.x, this.player.y - 32, true);
          if (tile.index > 0) {
            console.log('blocked')
          }
            else {
              this.player.anims.play('char-run-up', true)
              this.player.y -= 32;
            }
        }
      }
      else if(direction === 'right' && this.player.angle === 0){
        console.log("rotated right")
        //this.player.rotation += -Math.PI/2;
        this.player.angle += 90;
        this.player.anims.play('char-idle-down')
      }
      else if(direction === 'left'){
        console.log("rotated left")
        this.player.anims.play('char-idle-up')
        this.player.angle -= 90;
      } 
    }
    this.player.anims.stop()
  }

  reachedGoal(){
    console.log("Reached end");
    //placeholder for now, just move on to next scene here
    this.scene.start('WinScene')
  }
}
