import Phaser from 'phaser'
import LevelScene from './scenes/LevelScene'
import LevelSelectScene from './scenes/LevelSelectScene'
import PreloadScene from './scenes/PreloadScene'
import WelcomeScene from './scenes/WelcomeScene'
import InstructionScene from './scenes/InstructionScene'
import WinScene from './scenes/WinScene'
import GameoverScene from './scenes/GameoverScene'
import OptionsScene from './scenes/OptionsScene'


export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 600,
	height: 400,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [PreloadScene, WelcomeScene, LevelSelectScene, LevelScene, InstructionScene, WinScene, GameoverScene, OptionsScene],
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		zoom: 2
	},
})
