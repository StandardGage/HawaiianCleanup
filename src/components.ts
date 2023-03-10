import Phaser from "phaser";

export default class components{

    /**
     * standard text style
     */
    static style:any = {
        stroke: '#00000',
        strokeThickness: 10,
        fontSize: '32px',
    }

    static levelStyle:any = {
        fontFamily: 'Arial', 
        fontSize: '25px', 
        color: '#ffffff', 
        stroke: '#000000', 
        strokeThickness: 5
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
    * @param {boolean | undefined} _isDisabled - Whether or not the button is disabled
    */
    static LevelButton(x:number, y:number, text:string, image:string, scene: Phaser.Scene, new_scene:string | undefined, _isDisabled:boolean | undefined) {
        var levelButton = scene.add.container(x, y)
        var levelText = scene.add.text(0,0,text, this.levelStyle)
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
     * @param displaySize - size of block {width, height}
     * @param map - array of all blocks
     * @param displaySize - size of block {width, height}
     * @param map - array of all blocks
     * @todo - allow it to snap to other blocks, show when it is picked up, connect to an array when snapped together
     */
    static DraggableBlock(x: number, y:number, image: string, scene: Phaser.Scene, displaySize: {width: number, height: number}, array: Array<any>) {
        var img = scene.add.image(0, 0, image);
        img.setDisplaySize(displaySize.width, displaySize.height)
        var shadow = scene.add.rectangle(0, 0, displaySize.width + 10, displaySize.height + 10, 0x0000000)
        shadow.setAlpha(0)
        var draggableBlock = scene.add.container(x, y, [shadow, img])
        draggableBlock.setSize(displaySize.width, displaySize.height)
        draggableBlock.setInteractive();
        scene.input.setDraggable(draggableBlock);
        draggableBlock.depth = 0
        draggableBlock.name = image
        
        array.push(draggableBlock)

        scene.input.on('drag', function (pointer: any, gameObject: { x: number; y: number; list: Phaser.GameObjects.GameObject[], depth:number}, dragX: number, dragY: number) {
            pointer
            let shadow:any = gameObject.list[0]
            gameObject.x = dragX
            gameObject.y = dragY
            shadow.setAlpha(1)
            gameObject.depth = 1
        })

        scene.input.on('pointerup', () => {
            shadow.setAlpha(0)
            draggableBlock.depth = 0
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
        })
        
        return draggableBlock
    }
}
