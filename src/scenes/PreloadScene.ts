export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // preload all assets
        //this.load.setBaseURL('https://picsum.photos/')
		
        // backgrounds
		this.load.image('main-bkgrd', 'assets/menus/oahu.jpg')
        this.load.image('level-select-bkgrd', 'assets/menus/volcano2.jpg')
        this.load.image('level-button-bkgrd', 'assets/menus/brick.jpg')
        this.load.image('level-1-bkgrd', '800/800')

        // tiles
        this.load.image("tiles", "assets/drawtiles-spaced.png");
        this.load.image('outdoor-tiles', 'assets/tiles/outdoors.png')
        this.load.image('vehicle-tiles', 'assets/tiles/vehicles.png')
        this.load.tilemapTiledJSON('map', 'assets/tiles/map-01.json')
        this.load.atlas('fauna', 'assets/sprites/fauna.png', 'assets/sprites/fauna.json')

        // code blocks
        this.load.image('go', 'assets/GoButton.png')
        this.load.image('whenGo', 'assets/whenGoClicked.png')
        this.load.image('forward', 'assets/Forward.png')
        this.load.image('down', 'assets/Down.png')
        this.load.image('right', 'assets/RightTurn.png')
        this.load.image('left', 'assets/LeftTurn.png')

        // audio
        this.load.audio('menumusic', 'assets/sounds/menu_music.ogg')
        this.load.audio('lvl1music', 'assets/sounds/space_traveler.ogg')
    }

    create() {
        this.scene.start('WelcomeScene')
    }
}