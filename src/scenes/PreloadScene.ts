export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // preload all assets
        this.load.setBaseURL('https://picsum.photos/')
		
        //backgrounds
		this.load.image('main-bkgrd', '800/800')
        this.load.image('level-select-bkgrd', '800/800')
        this.load.image('level-button-bkgrd', '200/200')
        this.load.image('level-1-bkgrd', '800/800')

        //sprites
        this.load.image('move-east', '50/50')

    }

    create() {
        this.scene.start('WelcomeScene')
    }
}