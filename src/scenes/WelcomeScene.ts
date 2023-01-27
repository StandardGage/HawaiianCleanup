import Phaser from 'phaser'
import components from '../components';

export default class WelcomeScene extends Phaser.Scene {
	
	centerX: number = 0;
	centerY: number = 0;
	
	constructor() {
		super('WelcomeScene')
	}

	init() {
		this.centerX = this.cameras.main.centerX;
		this.centerY = this.cameras.main.centerY;
	}

	create() {
		var menumusic = this.sound.add('menumusic')
		menumusic.play()

		// add background image
		this.add.image(200, 200, 'main-bkgrd');
		//add play button
		components.Button(this.centerX, this.centerY, 'Play', this, 'LevelSelectScene')
	}
}
