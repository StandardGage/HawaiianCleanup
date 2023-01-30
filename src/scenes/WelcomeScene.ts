import Phaser from 'phaser'
import components from '../components';
import Music from '../Music';

export default class WelcomeScene extends Phaser.Scene {
	
	centerX: number = 0;
	centerY: number = 0;
	bkgSFX:Phaser.Sound.BaseSound;
	
	constructor() {
		super('WelcomeScene')
	}

	init() {
		this.centerX = this.cameras.main.centerX;
		this.centerY = this.cameras.main.centerY;
	}

	create() {
		if(!Music.addedOnce){
            Music.bkgSFX = this.sound.add('menumusic', { loop: true});
            Music.addedOnce = true;
        }
        if(!Music.musicPlaying){
            Music.bkgSFX.play();
            Music.musicPlaying = true;
        }

		// add background image
		this.add.image(300, 200, 'main-bkgrd');

		this.add.text(this.centerX, this.centerY - 100, "Hawaiian Cleanup", {
			align: 'center', 
			stroke: '#000000',
			strokeThickness: 6,
			fontSize: '50px'
		}).setOrigin(0.5);

		//add play and instructions button 
		components.Button(this.centerX, this.centerY - 35, 'Play', this, 'LevelSelectScene')
		components.Button(this.centerX, this.centerY, 'Instructions', this, 'InstructionScene')
		components.Button(this.centerX, this.centerY + 35, 'Wins Test', this, 'WinScene')
		components.Button(this.centerX, this.centerY + 70, 'Gameover Test', this, 'GameoverScene')
		components.Button(this.centerX, this.centerY + 105, 'Options Test', this, 'OptionsScene')

	}
}
