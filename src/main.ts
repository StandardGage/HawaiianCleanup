import Phaser from 'phaser'
import LevelScene from './scenes/LevelScene'
import LevelSelectScene from './scenes/LevelSelectScene'
import PreloadScene from './scenes/PreloadScene'
import WelcomeScene from './scenes/WelcomeScene'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 600,
	height: 400,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [PreloadScene, WelcomeScene, LevelSelectScene, LevelScene],
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		zoom: 2
	},
})
