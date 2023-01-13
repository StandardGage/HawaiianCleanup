import Phaser from 'phaser'

import WelcomeScene from './WelcomeScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	backgroundColor: '#2e333b',
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 800,
	},
	scene: [WelcomeScene],
}

export default new Phaser.Game(config)
