import Phaser from 'phaser'
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
	scene: [PreloadScene, WelcomeScene, LevelSelectScene],
}

export default new Phaser.Game(config)
