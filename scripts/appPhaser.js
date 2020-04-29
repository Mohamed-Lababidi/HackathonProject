const config={
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default:'arcade',
        arcade: {
            gravity: {y:450},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


var game = new Phaser.Game(config)
var goat;  // notre player
var player; // test player
let cursors; // Les commandes pour déplacer notre goat
let platforms // forme de plateforms

    
    function preload () {
    this.load.image('background', '../assets/Background/green.png')
    this.load.image('goat', '../assets/Characters/goat_50px.png');
    this.load.image('chicken', '../assets/Characters/chicken.png');
    this.load.image('goatAttack', '../assets/Miscelenous/GoatShit.png')
    this.load.image('chickenAttack', '../assets/Miscelenous/eggs.png')
    // this.load.image('ground', '../assets/Miscelenous/platform.png')
}

    function create () {

    this.add.image(0, 0, 'background').setOrigin(0, 0)
    goat = this.physics.add.sprite(10, 100, 'goat')
    goat.body.collideWorldBounds = true;
    goat.setBounce(0.2);


    // this.physics.add.collider(player, platforms);
    // platforms = this.physics.add.staticGroup();
    // platforms.create(50, 250, 'ground');
    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // platforms.create(600, 400, 'ground');
    // platforms.create(750, 220, 'ground');


    cursors = this.input.keyboard.createCursorKeys()
}




    function update () {

        goat.setVelocityX(0)
        if(cursors.up.isDown){
            goat.setVelocity(0, -300)
        }
        if(cursors.right.isDown) {
            goat.setVelocity(100, 0)
        }
        if(cursors.left.isDown) {
            goat.setVelocity(-100, 0)
        }
    }


// this.anims.create({
//     key: 'left',
//     frames: this.anims.generateFrameNumbers('goat', { start: 0, end: 3 }),
//     frameRate: 10,
//     repeat: -1
// });

// this.anims.create({
//     key: 'turn',
//     frames: [ { key: 'goat', frame: 4 } ],
//     frameRate: 20
// });

// this.anims.create({
//     key: 'right',
//     frames: this.anims.generateFrameNumbers('goat', { start: 5, end: 8 }),
//     frameRate: 10,
//     repeat: -1
// });


