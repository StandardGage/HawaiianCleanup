import components from "../components";

export default class LevelScene extends Phaser.Scene {


  constructor() {
    super({ key: "LevelScene" });
  }
  private blockArray: Array<Phaser.GameObjects.Container> = new Array();
  private player!: Phaser.Physics.Arcade.Sprite;
  
  go!: Phaser.GameObjects.Container

  tileSize = 32;
  scoreText!: Phaser.GameObjects.Text
  movesLeft!: Phaser.GameObjects.Text 

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
    var tilemap = this.make.tilemap({ key: 'map' })
    var tileset1 = tilemap.addTilesetImage('outdoors', 'outdoor-tiles')
    var tileset2 = tilemap.addTilesetImage('vehicles', 'vehicle-tiles')
    var allLayers = [tileset1, tileset2]

    tilemap.createLayer('Ground', tileset1)
    var bushLayer = tilemap.createLayer('Bushes', allLayers)
    bushLayer.setCollisionByProperty({ collides: true })
    var topLayer1 = tilemap.createLayer('Top', tileset1)
    topLayer1.setCollisionByProperty({ collides: true })

    // setup player
    this.player = this.physics.add.sprite(140, 140, 'fauna', 'walk-down-3.png')
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
    var go = this.add.image(60, 60, 'go')
    go.setDisplaySize(60,60)
    go.setInteractive().on('pointerdown', ()=>this.readBlocks(bushLayer));

    // add test draggable blocks
    components.DraggableBlock(20, 350, 'right', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(60, 350, 'right', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(100, 350, 'right', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(140, 350, 'left', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(180, 350, 'left', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(220, 350, 'left', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(20, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(60, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(100, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(140, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(180, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(220, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(260, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(300, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(340, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);
    components.DraggableBlock(380, 300, 'forward', this, {width: 25, height: 25}, this.blockArray);

    //add whenGo button
    this.go = components.DraggableBlock(260, 350, 'whenGo', this, {width: 25, height: 25}, this.blockArray);

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
        this.player.angle += 90;
        this.player.rotation += -Math.PI/2;
        this.player.anims.play('char-idle-down')
      }
      else if(direction === 'left'){
        console.log("rotated left")
        this.player.anims.play('char-idle-up')
        //this.fauna.angle -= 90;
      } 
    }
    this.player.anims.stop()
  }
}
