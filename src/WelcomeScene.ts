import Phaser from 'phaser'

export default class WelcomeScene extends Phaser.Scene {
	constructor() {
		super('welcome-scene')
	}

	preload() {
		
		this.load.setBaseURL('https://picsum.photos/')
		
		this.load.image('welcome', '800/800')
		this.load.image('play', '800/800')
	}

	create() {
		this.add.image(400, 400, 'welcome');
		this.add.text(350, 400, 'Welcome!', {
			stroke: '#2e333b',
			strokeThickness: 10,
			fontSize: 32,
		});

		let scene = this;


		var playButton = this.add.text(370, 450, 'Play!', {
			stroke: '#2e333b', 
			strokeThickness: 10,
			fontSize: 32,
		} ).setInteractive();

		playButton.on('pointerdown', function () {
			scene.add.image(400, 400, 'play')
		});
		//const particles = this.add.particles('red')

		/* const emitter = particles.createEmitter({
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
		}) */

		//const logo = this.physics.add.image(400, 100, 'logo')

		// logo.setVelocity(100, 200)
		// logo.setBounce(1, 1)
		// logo.setCollideWorldBounds(true)

		//emitter.startFollow(logo)

		
	}
}
