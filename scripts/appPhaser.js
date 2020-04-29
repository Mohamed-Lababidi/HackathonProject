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
var chicken;
var player; // test player
let cursors; // Les commandes pour déplacer notre goat
let platforms  // forme de plateforms
let fire

    
    function preload () {
    this.load.image('background', '../assets/Background/backforest.jpg')
    this.load.image('goat', '../assets/Characters/goat_50px.png');
<<<<<<< HEAD
    this.load.spritesheet('chicken', '../assets/Characters/chicken.png');
=======
    this.load.spritesheet('chicken', '../assets/Characters/chicken_good.png', { frameWidth: 50, frameHeight: 50 });
    this.load.image('chicken2', '../assets/Characters/chicken-Transparent/fame-2.png')
>>>>>>> a7f6a528b261d7e8b21678a40a208854b19dc2d8
    this.load.image('goatAttack', '../assets/Miscelenous/GoatShit.png')
    this.load.image('chickenAttack', '../assets/Miscelenous/littleEgg.png', { frameWidth: 100, frameHeight: 400 });
    this.load.image('ground', '../assets/Miscelenous/platform.png')   // image platform
    this.load.spritesheet('kaboom', '../assets/Miscelenous/explode.png', { frameWidth: 128, frameHeight: 128 });

}

    function create () {
        // game.physics.startSystem(Phaser.physics.ARCADE)
        // platforms.enableBody = true;

    this.add.image(0, 0, 'background').setOrigin(0, 0)  // ajout du background

    goat = this.physics.add.sprite(790, 600, 'goat') // ajout de la chevre
    
    const group = this.add.group({
        key: 'chicken',
        frame: [ 0, 1, 2, 3, 4 ],
        frameQuantity: 6,
    });
    attacks = this.physics.add.group({
        key: 'chickenAttack',
        frame: [ 0, 1 ],
        repeat: 1,
        setXY: { x: 120, y: 20, stepX: 200 }
    });
    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 10,
        height: 4,
        cellWidth: 32,
        cellHeight: 32,
        x: 350,
        y: 390
    });

    
    // stars.children.iterate(function (child) {
    
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    // });


    goat.body.collideWorldBounds = true; // délimitation cadre
    // this.physics.add.collider(goat, platforms)
    goat.setBounce(0.2);
    goat.angle = 0;    
    // platforms = this.physics.add.staticGroup();
    // platforms
    //     .create(400,500, 'ground')
    //     .setScale(2)    
    //     .refreshBody()
    
    // platforms.create(600,400, 'ground')
    // platforms.create(50,250, 'ground')
    // platforms.create(750,220, 'ground')

    // fires = this.input.keyboard.addKey('space')  // touche tir
    // groupefire = this.physics.add.group()

    // this.physics.add.overlap(groupefire, null, this)
    
    // this.physics.world.on("worldBounds", function(body) {
    //     let objet = body.gameObject;
    //     if (groupefire.contains(objet)) {
    //         objet.destroy();
    //     }
    // })

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
    }
        // if(Phaser.Input.Keyboard.JustDown(fires)){
        //     fire(goat)
        // }
        
        // function fire(goat) {
        //     let firedirection;
        //         if(goat.direction == "left") {
        //             firedirection = -1;
        //         }else {
        //             firedirection = 1
        //         }
        // }

        // let xShit = goat.x + 25;
        // let yShit = goat.y - 4;

        // var goatAttack = groupefire.create(xShit,yShit, 'goatAttack');
        // goatAttack.setCollideWorldBounds(true);
        // goatAttack.body.onWorldBounds = true
        // goatAttack.body.allowGravity = false
        // goatAttack.setVelocity(0,0)
    
        // function update(){ 
        //     this.physics.arcade.collide(goat, ennemi, perdu); 
        // }
         
        // function perdu(){ 
        //     goat.kill();    // supprime le sprite du héros
        //         game.input.onTap.addOnce(rejouer, this);      // après un clique de souris, exécute la fonction rejouer
        // }
         
        // function rejouer(){
        //         this.state.restart();   // le jeu recommence
        // }
    
