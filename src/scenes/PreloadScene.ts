export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // preload all assets
        this.load.setBaseURL('https://picsum.photos/')
		
		this.load.image('main-bkgrd', '800/800')
        this.load.image('level-select-bkgrd', '800/800')
    }

    create() {
        this.scene.start('WelcomeScene')
    }
}