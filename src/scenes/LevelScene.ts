import components from "../components";

export default class LevelScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private fauna!: Phaser.GameObjects.Sprite

  constructor() {
    super({ key: "LevelScene" });
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.load.image('outdoor-tiles', 'assets/tiles/outdoors.png')
    this.load.image('vehicle-tiles', 'assets/tiles/vehicles.png')
    //this.load.image("tiles", "assets/drawtiles-spaced.png");
    this.load.image('player', "assets/menus.brick.jpg");
    //this.load.tilemapCSV("map", "assets/grid.csv");
    this.load.tilemapTiledJSON('map', 'assets/tiles/map-01.json')
    this.load.atlas('fauna', 'assets/sprites/fauna.png', 'assets/sprites/fauna.json')
  }

  create() {
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

    this.fauna = this.add.sprite(140, 140, 'fauna', 'walk-down-3.png')

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

    // add test draggable blocks
    components.DraggableBlock(200, 200, "move-east", this);
    components.DraggableBlock(200, 200, "move-east", this);

    this.input.keyboard.on("keydown-A",  () => {
      var tile = tilemap.getTileAtWorldXY(this.fauna.x - 32, this.fauna.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        this.fauna.x -= 16;
      }
    });

    //  Right movement
    this.input.keyboard.on("keydown-D",  () => {
      var tile = tilemap.getTileAtWorldXY(this.fauna.x + 32, this.fauna.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        this.fauna.x += 16;
      }
    });

    //  Up movement
    this.input.keyboard.on("keydown-W",  () => {
      var tile = tilemap.getTileAtWorldXY(this.fauna.x, this.fauna.y - 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        this.fauna.y -= 16;
      }
    });

    //  Down movement
    this.input.keyboard.on("keydown-S",  () => {
      var tile = tilemap.getTileAtWorldXY(this.fauna.x, this.fauna.y + 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      } else {
        this.fauna.y += 16;
      }
    });
  }

  update() {}
}
