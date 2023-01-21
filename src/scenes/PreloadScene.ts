export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // preload all assets
        //this.load.setBaseURL('https://picsum.photos/')
		
        //backgrounds
		this.load.image('main-bkgrd', 'assets/menus/oahu.jpg')
        this.load.image('level-select-bkgrd', 'assets/menus/volcano2.jpg')
        this.load.image('level-button-bkgrd', 'assets/menus/brick.jpg')
        this.load.image('level-1-bkgrd', '800/800')

        //sprites
        this.load.image('move-east', 'assets/tiles/block.jpg')

    }

    create() {
        this.scene.start('WelcomeScene')
    }
}