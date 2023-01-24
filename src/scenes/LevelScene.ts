import components from "../components";

export default class LevelScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private fauna!: Phaser.Physics.Arcade.Sprite

  constructor() {
    super({ key: "LevelScene" });
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.load.image('outdoor-tiles', 'assets/tiles/outdoors.png')
    this.load.image('vehicle-tiles', 'assets/tiles/vehicles.png')
    //this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.image('player', "assets/menus.brick.jpg")
    //this.load.tilemapCSV("map", "assets/grid.csv");
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
    
    // add background
    //this.add.image(400, 400, "level-1-bkgrd");
    const tilemap = this.make.tilemap({ key: 'map' })
    const tileset1 = tilemap.addTilesetImage('outdoors', 'outdoor-tiles')
    const tileset2 = tilemap.addTilesetImage('vehicles', 'vehicle-tiles')

    tilemap.createLayer('Ground', tileset1)
    const bushLayer = tilemap.createLayer('Bushes', tileset1)
    bushLayer.setCollisionByProperty({ collides: true })
    const topLayer1 = tilemap.createLayer('Top', tileset1)
    topLayer1.setCollisionByProperty({ collides: true })
    const topLayer2 = tilemap.createLayer('Vehicles', tileset2)
    topLayer2.setCollisionByProperty({ collides: true })

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

    this.fauna.anims.play('char-idle-down')

    this.physics.add.collider(this.fauna, bushLayer)
    this.physics.add.collider(this.fauna, topLayer1)
    this.physics.add.collider(this.fauna, topLayer2)

    this.cameras.main.startFollow(this.fauna, true)

    // add test draggable blocks
    components.DraggableBlock(200, 200, "move-east", this);
    components.DraggableBlock(200, 200, "move-east", this);

  }

  update(t: number, dt: number) {
    if (!this.cursors || !this.fauna) {
      return
    }

    const speed = 100

    if (this.cursors.left?.isDown) {
      this.fauna.anims.play('char-run-side', true)
      this.fauna.setVelocity(-speed, 0)
      this.fauna.scaleX = -1
      this.fauna.body.offset.x = 24
    } else if (this.cursors.right?.isDown) {
      this.fauna.anims.play('char-run-side', true)
      this.fauna.setVelocity(speed, 0)
      this.fauna.scaleX = 1
      this.fauna.body.offset.x = 8
    } else if (this.cursors.up?.isDown) {
      this.fauna.anims.play('char-run-up', true)
      this.fauna.setVelocity(0, -speed)
    } else if (this.cursors.down?.isDown) {
      this.fauna.anims.play('char-run-down', true)
      this.fauna.setVelocity(0, speed)
    } else {
      const parts = this.fauna.anims.currentAnim.key.split('-')
      parts[1] = 'idle'
      this.fauna.play(parts.join('-'))
      this.fauna.setVelocity(0, 0)
    }
  }
}
