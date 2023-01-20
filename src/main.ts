import Phaser from 'phaser'
import LevelScene from './scenes/LevelScene'
import LevelSelectScene from './scenes/LevelSelectScene'

import PreloadScene from './scenes/PreloadScene'
import WelcomeScene from './scenes/WelcomeScene'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	backgroundColor: '#2e333b',
	scale: {
		parent: 'phaser-game',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		width: 800,
		height: 800,
	},
	scene: [PreloadScene, WelcomeScene, LevelSelectScene, LevelScene],
}

export default new Phaser.Game(config)
