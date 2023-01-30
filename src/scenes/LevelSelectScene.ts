import components from "../components";

export default class extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        
        // add background
        this.add.image(300, 200, 'level-select-bkgrd');

        components.Button(550, 30, 'X', this, 'WelcomeScene')

        // add menu button
        components.Button(100, 700, 'Menu', this, 'WelcomeScene')

        // add level buttons
        components.LevelButton(60, 60, 'Level 1', 'level-button-bkgrd', this, 'LevelScene', false)
        components.LevelButton(153.33, 60, 'Level 2', 'level-button-bkgrd', this, undefined, false)
        components.LevelButton(246.67, 60, 'Level 3', 'level-button-bkgrd', this, undefined, false)
        components.LevelButton(340, 60, 'Level 4', 'level-button-bkgrd', this, undefined, false)

        
    }
}