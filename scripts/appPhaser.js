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
var goat;
var player; // test player
let cursors; // Les commandes pour déplacer notre goat
let platforms  // forme de plateforms
let fire

    
    function preload () {
    this.load.image('background', '../assets/Background/backforest.jpg')
    this.load.image('goat', '../assets/Characters/goat_50px.png');
    this.load.image('chicken', '../assets/Characters/chicken.png');
    this.load.image('goatAttack', '../assets/Miscelenous/GoatShit.png')
    this.load.image('chickenAttack', '../assets/Miscelenous/eggs.png')
    this.load.image('ground', '../assets/Miscelenous/platform.png')   // image platform
}

    function create () {
        // game.physics.startSystem(Phaser.physics.ARCADE)
        // platforms.enableBody = true;

    this.add.image(0, 0, 'background').setOrigin(0, 0)  // ajout du background
    goat = this.physics.add.sprite(900, 900, 'goat')
    goat.body.collideWorldBounds = true; // délimitation cadre
    // this.physics.add.collider(goat, platforms)
    goat.setBounce(0.2);

    // platforms = this.physics.add.staticGroup();
    // platforms
    //     .create(400,500, 'ground')
    //     .setScale(2)    
    //     .refreshBody()
    
    // platforms.create(600,400, 'ground')
    // platforms.create(50,250, 'ground')
    // platforms.create(750,220, 'ground')

    fires = this.input.keyboard.addKey('space')  // touche tir
    groupefire = this.physics.add.group()
    
    
    
    
    
    
    this.chickens = game.add.group();
    this.timer = game.time.events.loop(200, this.addChicken, this);




    cursors = this.input.keyboard.createCursorKeys()
}

    function update () {

        goat.setVelocityX(0)
        if(cursors.up.isDown){
            goat.setVelocity(0, -200)
        }
        if(cursors.right.isDown) {
            goat.setVelocity(300, 0)
        }
        if(cursors.left.isDown) {
            goat.setVelocity(-300, 0)
        }
        if(cursors.down.isDown) {
            goat.setVelocity(0,200)
        }
        if(Phaser.Input.Keyboard.JustDown(fires)){
            fire(goat)
        }
        
        // function fire(goat)  gog og ogogogoo

        function addChicken () {
            var chicken = game.add.sprite(300, 100, 'chicken');
            game.physics.arcade.enable(chicken);
            chicken.body.gravity.y = 200;
            
            this.chickens.add(chicken);

            chicken.checkWorldBounds = true;
            chicken.outOfBoundsKill = true;

                // ce que que as écris semble bon il faudrait juste
                // separer ce qui va dans create et update
                // mais c'est cool ce que tu as ecris tu m'expliquera
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


