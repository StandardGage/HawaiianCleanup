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
        var levelText = scene.add.text(0,0,text,{ fontFamily: 'Arial', fontSize: '25px', color: '#ffffff', stroke: '#000000', strokeThickness: 5 })
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

    /**
     * Draggable block that snaps to grid and other blocks when placed
     * @param x - Horizontal location
     * @param y - Vertical location
     * @param image - Block image
     * @param scene - current scene (use 'this')
     * @todo - allow it to snap to other blocks, show when it is picked up, connect to an array when snapped together
     */
    static DraggableBlock(x: number, y:number, image: string, scene: Phaser.Scene) {
        var draggableBlock = scene.add.image(x, y, image);
        draggableBlock.setInteractive();
        scene.input.setDraggable(draggableBlock)
        

        scene.input.on('drag', function (pointer: any, gameObject: { x: number; y: number; }, dragX: number, dragY: number) {
            gameObject.x = dragX
            gameObject.y = dragY
        })

        scene.input.on('pointerup', () => {
            let snap = 25;
            let left = Math.floor(draggableBlock.x / snap) * snap
            let right = Math.ceil(draggableBlock.x / snap) * snap
            if (draggableBlock.x <= left + (snap/2)) {
                draggableBlock.x = left
            } else {
                draggableBlock.x = right
            }
            let up = Math.floor(draggableBlock.y / snap) * snap
            let down = Math.ceil(draggableBlock.y / snap) * snap
            if (draggableBlock.y <= up + 16) {
                draggableBlock.y = up
            } else {
                draggableBlock.y = down
            }

            console.log(draggableBlock.x, draggableBlock.y)
        })
        
    }
}
