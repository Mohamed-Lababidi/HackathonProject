const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 450 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var goat;
var chicken;
let cursors; // Les commandes pour déplacer notre goat
let fire;
let explode;

function preload() {
  	this.load.image("background", "../assets/Background/backforest.jpg");
  	this.load.image("goat", "../assets/Characters/goat_50px.png");
  	this.load.image("chicken", "../assets/Characters/chicken_good.png");
  	this.load.image("goatAttack", "../assets/Miscelenous/bouze_30px.png");
  	this.load.image("chickenAttack", "../assets/Miscelenous/littleEgg.png", {frameWidth: 100,frameHeight: 400});
  	this.load.spritesheet("kaboom", "../assets/Miscelenous/explode.png", {
    	frameWidth: 128,
    	frameHeight: 128,
  });
}

function create() {

  this.add.image(0, 0, "background").setOrigin(0, 0); // ajout du background

  goat = this.physics.add.sprite(790, 600, "goat"); // ajout de la chevre

  const group = this.add.group({
    key: "chicken",
    frame: [0, 1, 2, 3, 4],
    frameQuantity: 6,
  });
  // attacks = this.physics.add.group({
  //     key: 'chickenAttack',
  //     frame: [ 0, 1 ],
  //     repeat: 1,
  //     setXY: { x: 120, y: 20, stepX: 200 }
  // });
  Phaser.Actions.GridAlign(group.getChildren(), {
    width: 10,
    height: 4,
    cellWidth: 32,
    cellHeight: 32,
    x: 350,
    y: 390,
});

  // stars.children.iterate(function (child) {
  //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  // });

goat.body.collideWorldBounds = true; // délimitation cadre
  // this.physics.add.collider(goat, platforms)
goat.setBounce(0.2);
goat.angle = 0;


cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
	if (cursors.left.isDown) {
    ship.x -= speed * delta;
} else if (cursors.right.isDown) {
    ship.x += speed * delta;
}
    if (cursors.up.isDown && time > lastFired) {
        var bullet = bullets.get();
            if (bullet) {
                bullet.fire(ship.x, ship.y);
                lastFired = time + 50;
    }
}
}

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
