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
		this.add.image(300, 200, 'main-bkgrd');

		this.add.text(this.centerX, this.centerY - 100, "Hawaiian Cleanup", {
			align: 'center', 
			stroke: '#000000',
			strokeThickness: 6,
			fontSize: 50
		}).setOrigin(0.5);

		//add play and instructions button 
		components.Button(this.centerX, this.centerY - 35, 'Play', this, 'LevelSelectScene')
		components.Button(this.centerX, this.centerY, 'Instructions', this, 'InstructionScene')
		components.Button(this.centerX, this.centerY + 35, 'Wins Test', this, 'WinScene')
		components.Button(this.centerX, this.centerY + 70, 'Gameover Test', this, 'GameoverScene')


	}
}
