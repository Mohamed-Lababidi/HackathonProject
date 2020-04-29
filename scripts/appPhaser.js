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
var scoreText;
var lives;

    
    function preload () {
    this.load.image('background', '../assets/Background/backforest.jpg')
    this.load.image('goat', '../assets/Characters/goat_50px.png');
    this.load.spritesheet('chicken', '../assets/Characters/chicken_good.png', { frameWidth: 40, frameHeight: 40 });
    this.load.image('chicken2', '../assets/Characters/chicken-Transparent/fame-2.png')
    this.load.image('goatAttack', '../assets/Miscelenous/GoatShit.png')
    this.load.image('chickenAttack', '../assets/Miscelenous/eggs.png')
    this.load.image('ground', '../assets/Miscelenous/platform.png')   // image platform
}

    function create () {
        // game.physics.startSystem(Phaser.physics.ARCADE)
        // platforms.enableBody = true;
    

    this.add.image(0, 0, 'background').setOrigin(0, 0)  // ajout du background
    goat = this.physics.add.sprite(790, 600, 'goat') // ajout de la chevre
    
    const group = this.add.group({
        key: 'chicken',
        frame: [ 0, 1, 2, 3, 4 ],
        frameQuantity:20
    });
    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 16,
        height: 5,
        cellWidth: 40,
        cellHeight: 40,
        x: 100,
        y: 100
    });

    scoreText = this.add.text(16, 50, 'score: 0', { fontSize: '25px', fill: '#000' }); //score counter
    lives = this.add.text(16, 16, 'lives: 3', { fontSize: '25px', fill: '#000' }); //lives counter

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
        }
    
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
    
