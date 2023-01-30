import Phaser from 'phaser'
//import components from '../components';
import Music from '../Music';

export default class WelcomeScene extends Phaser.Scene {
	
	centerX: number = 0;
	centerY: number = 0;
	bkgSFX!:Phaser.Sound.BaseSound;
	playbutton!: Phaser.GameObjects.Image;
	instructionbutton!: Phaser.GameObjects.Image;
	optionbutton!: Phaser.GameObjects.Image;

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

		// this.add.text(this.centerX, this.centerY - 100, "Hawaiian Cleanup", {
		// 	align: 'center', 
		// 	stroke: '#000000',
		// 	strokeThickness: 6,
		// 	fontSize: '50px'
		// }).setOrigin(0.5);

		this.add.image(this.centerX, 80, 'title').setOrigin(0.5,0).setScale(0.9);

		//add play and instructions button
		this.playbutton = this.add.image(this.centerX, this.centerY - 30, 'play').setOrigin(0.5,0).setScale(0.3);
        this.playbutton.setInteractive();
        this.playbutton.on('pointerover',() => {
            this.playbutton.setScale(0.35);
        });
		this.playbutton.on('pointerout',() => {
            this.playbutton.setScale(0.3);
        });
		this.playbutton.on('pointerup',() => {
            this.scene.start('LevelSelectScene');
        });

		this.instructionbutton = this.add.image(this.centerX, this.centerY + 20, 'instructions').setOrigin(0.5,0).setScale(0.3);
        this.instructionbutton.setInteractive();
        this.instructionbutton.on('pointerover',() => {
            this.instructionbutton.setScale(0.35);
        });
		this.instructionbutton.on('pointerout',() => {
            this.instructionbutton.setScale(0.3);
        });
		this.instructionbutton.on('pointerup',() => {
            this.scene.start('InstructionScene');
        });

		this.optionbutton = this.add.image(this.centerX, this.centerY + 70, 'options').setOrigin(0.5,0).setScale(0.3);
        this.optionbutton.setInteractive();
        this.optionbutton.on('pointerover',() => {
            this.optionbutton.setScale(0.35);
        });
		this.optionbutton.on('pointerout',() => {
            this.optionbutton.setScale(0.3);
        });
		this.optionbutton.on('pointerup',() => {
            this.scene.start('OptionsScene');
        });

		//components.Button(this.centerX, this.centerY - 35, 'Play', this, 'LevelSelectScene')
		//components.Button(this.centerX, this.centerY + 35, 'Instructions', this, 'InstructionScene')
		//components.Button(this.centerX, this.centerY + 35, 'Wins Test', this, 'WinScene')
		//components.Button(this.centerX, this.centerY + 70, 'Gameover Test', this, 'GameoverScene')
		//components.Button(this.centerX, this.centerY + 105, 'Options', this, 'OptionsScene')

	}
}
