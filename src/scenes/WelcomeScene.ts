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
		// add background image
		this.add.image(400, 400, 'main-bkgrd');
		//testing4
		//add play button
		components.makeButton(this.centerX, this.centerY, 'Play', this, 'LevelSelectScene')
	}
}
