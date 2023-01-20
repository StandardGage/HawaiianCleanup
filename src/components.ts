import Phaser from "phaser";

export default class components{

    /**
     * standard text style
     */
    static style:Phaser.GameObjects.TextStyle = {
        stroke: '#00000',
        strokeThickness: 10,
        fontSize: '32px',
    }

    /**
     * Creates a standard button
     * @param {number} x - Horizontal location
     * @param {number} y - Vertical location
     * @param {string} text What the button says
     * @param {Phaser.Scene} scene The current scene this button is in (use 'this')
     * @param {string | undefined} new_scene The scene this button will traverse to when pressed
     */
    static Button(x:number, y:number, text:string, scene:Phaser.Scene, new_scene:string | undefined) {
        
        var button = scene.add.text(x, y, text, this.style)
        button.setOrigin(0.5,0.5)
        button.setInteractive();

        button.on('pointerover',() => {
            button.setScale(1.1);
        });

		button.on('pointerout', () => {
			button.setScale(1);
		})
		
		button.on('pointerup', () => {
			scene.scene.start(new_scene)
		});

        return button
    }

    /**
    * Creates a button composed of a background image and text.
    * To be used as a button for when users choose a level.
    * @param {number} x - Horizontal location
    * @param {number} y - Vertical location
    * @param {string} text - What the button says
    * @param {string} image - What background the button has
    * @param {Phaser.Scene} scene - The current scene this button is in (use 'this')
    * @param {string | undefined} new_scene - The scene this button will go to if pressed
    * @param {boolean | undefined} isDisabled - Whether or not the button is disabled
    */
    static LevelButton(x:number, y:number, text:string, image:string, scene: Phaser.Scene, new_scene:string | undefined, isDisabled:boolean | undefined) {
        var levelButton = scene.add.container(x, y)
        var levelText = scene.add.text(0,0,text,this.style)
        levelText.setOrigin(0.5,0.5)
        var levelImage = scene.add.image(0,0,image)
        levelButton.add( [levelImage,levelText] )
        levelImage.setInteractive();

        levelImage.on('pointerover',() => {
            levelImage.setScale(1.1)
            levelText.setScale(1.1)
        });

		levelImage.on('pointerout', () => {
			levelImage.setScale(1)
            levelText.setScale(1)
		})
		
		levelImage.on('pointerup', () => {
			scene.scene.start(new_scene)
		});

        return levelButton;
    }
}