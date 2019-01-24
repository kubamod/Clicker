var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', { preload: preload, create: create, update: update,render:render });

var emitter;
var text;
var iloscGwiazdek = 1;
var number = 10;
var tencza;
var jar;
var iloscSloikow = 0;
var state = 0;
var background;

var rainbowStorm;

var chmura;

function preload() {
    game.stage.backgroundColor = '#0116db';
    game.load.spritesheet('jar', 'assets/jar2.png', 640, 640);
    game.load.spritesheet('tencza', 'assets/tencza.png', 640,270);
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('chmura', 'assets/cloud.png', 64, 32);
    game.load.image('love', 'assets/love.png', 32,37);
    game.forceSingleUpdate = true;

    game.load.image("ranbowStorm", 'assets/rainbow.png', 50, 50);
    
}
function rainbowStorm(){
    rainbowStorm = game.add.emitter(640, 32, 640);
    
    rainbowStorm.width = 0;
        // chmura.angle = 30; 
        rainbowStorm.makeParticles('ranbowStorm');
    
        rainbowStorm.maxParticleScale = 0.2;
        rainbowStorm.minParticleScale = 0.2;
        rainbowStorm.area = 50;
        rainbowStorm.gravity = 200;
        rainbowStorm.setYSpeed(50, 50);
        rainbowStorm.setXSpeed(0, 0);
        rainbowStorm.minRotation = 0;
        rainbowStorm.maxRotation = 0;
        rainbowStorm.start(false, 3000, 1);
        
        
    
        game.add.tween(rainbowStorm).to( { emitX: 900 }, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
}
function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(32,32,'chmura');

    background = game.add.emitter(-300,game.world.centerY, 3);
    background.height = 720;
    background.width = 1000;
    background.makeParticles("chmura");
    background.frame = 1;
    background.minParticleSpeed.setTo(200, 0);
    background.maxParticleSpeed.setTo(250, 0);
    background.gravity = 0;
    background.minRotation = 0;
    background.maxRotation = 0;

    background.minParticleScale = 0.5;
    background.maxParticleScale = 1;

    
    background.start(false,10000, 0,0, 4);


    
     
    chmury();

    jar = game.add.sprite(game.world.centerX, game.world.centerY , 'jar', 0);
    jar.inputEnabled = true;
    jar.scale.set(0.7);
    jar.anchor.setTo(0.5);

    emitter = game.add.emitter(0, 0, 100);
    
    emitter.makeParticles('love');
    emitter.gravity = -200;
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    
    text = game.add.text(game.world.centerX, 680, '', { fill: '#ffffff' });
    text.anchor.setTo(0.5);
    
    jar.events.onInputDown.add(listener, this);
    
    jar.events.onInputDown.add(emitterOnClick, this);
    
    jar.input.useHandCursor = true;

    rainbowStorm();
}

//Nie 
function chmury(){

    chmura = game.add.emitter(game.world.centerX, 0, 400);

	chmura.width = game.world.width;
	// chmura.angle = 30; 
	chmura.makeParticles('star');

	chmura.minParticleScale = 0.1;
	chmura.gravity = 200;

	chmura.setYSpeed(100, 100);

	chmura.minRotation = 20;
	chmura.maxRotation = 100;

}

function tenczaaa() {
    Tencza = game.add.sprite(game.world.centerX - 4, game.world.centerY /2, 'tencza', 0);
    Tencza.scale.set(1);
    Tencza.smoothed = false;
    Tencza.anchor.setTo(0.5);
    anim = Tencza.animations.add('tenczaCreate');
    
}

function changeColor() {

    var c = Phaser.Color.getRandomColor(50, 255, 255);

    game.stage.backgroundColor = c;

    game.fd.record(4);

}

function listener () {

    state++;
    if (state > 4) {
        state = 1;
        iloscSloikow++;
        jar.frame = 0;
    } else if (state == 1) {
        jar.frame = 1;
    } else if (state == 2) {
        jar.frame = 2;
    } else if (state == 3) {
        jar.frame = 3;
    } else if (state == 4) {
        jar.frame = 4;
    }
    
    function killAch() {
        achivment.destroy();
    }
    
    if (iloscSloikow == number && state == 1) {
        tenczaaa();
        anim.play(8, false); 
        achivment = game.add.text(game.world.centerX-20, game.world.centerY /2 - 40, '', { fill: '#ffffff' });
        achivment.text = "WoW! " + iloscSloikow + " jars";
        achivment.anchor.setTo(0.5);
        setTimeout(killAch, 3000);
        chmura.start(false, 1500, 10, 50);
        number += 10;
       
   }
   
   if (iloscSloikow > 10) {
       jar.events.onInputDown.add(changeColor, this);
       text.tint = (text.tint === 0xffffff) ? 0xff0000 : 0xffffff;
   }
   if (iloscSloikow > 20){ 
    //nic tu nie ma
   }

   textchanger()
  
}

//jeśli ilość słoików == "jeden słoik"
function textchanger() {
    if (iloscSloikow == 1){
        text.text = "You filled " + iloscSloikow + " jar with love";
    }
    else {
        text.text = "You filled " + iloscSloikow + " jars with love"; 
    }
}


function emitterOnClick(pointer) {
    emitter.x = game.input.x;
    emitter.y = game.input.y;

    emitter.start(true, 2000, null, iloscGwiazdek);
}

function update() {

  
}

function render() {
    // cursor position // game.debug.text( game.input.x, 10, 40 );
     //game.debug.text( "state " + state, 70, 40 );
    // game.debug.text( "| sloiki " + iloscSloikow, 150, 40 );
     
     game.debug.text("pre-alpha 0.2", 1100,40);
     
}
