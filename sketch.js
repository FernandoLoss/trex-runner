var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var restartImg;
var restart;

var gameoverImg;
var gameOver;

var checkpoint;
var die;
var jump;

var backgroound, backgrooundImg;


function preload(){
  trex_running = loadAnimation("Run (1).png", "Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png");
  trex_collided = loadAnimation("Dead (1).png","Dead (2).png","Dead (3).png","Dead (4).png","Dead (5).png","Dead (6).png","Dead (7).png","Dead (8).png",);
  trex_jumping = loadAnimation("Jump (1).png","Jump (2).png","Jump (3).png","Jump (4).png","Jump (5).png","Jump (6).png","Jump (7).png","Jump (8).png",)


  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  backgrooundImg = loadImage("background.png");

  gameoverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

  checkpoint = loadSound("checkpoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  backgroound= createSprite(500,100);
  backgroound.addImage(backgrooundImg);
  backgroound.scale= 3;

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale= 0.5;


  trex = createSprite(70,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided);
  trex.addAnimation("jumping" , trex_jumping);
  trex.scale = 0.2;
  
  
  ground = createSprite(width-50, height-200,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 1.5;
 
  

  invisibleGround = createSprite(width/2,height-10,width,350, 400,20);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  gameOver = createSprite(width/2,height -400);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.5;

 

trex.setCollider("circle",0,0,40);
trex.debug=false;
  
  console.log("Ol??" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  text("Pontua????o: "+ score, 100,50);
  text(mouseX+","+mouseY,mouseX,mouseY)
  
  
  if(gameState === PLAY){
       
    ground.velocityX = -4;
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;

      ground.velocityX = -(4 + 2* (score/200));
    }

    score = score + Math.round(frameRate()/60);

    
   
    if(touches.lenght>0||keyDown("space")&& trex.y >= 513) {
        trex.velocityY = -13;
        touches = []

        jump.play();

        trex.changeAnimation("jumping", trex_jumping);
        
    }

    if(trex.y>523){

      trex.changeAnimation("running",trex_running);

    }

    console.log(trex.y);
    
    if(score > 00 && score % 200 == 0){
      checkpoint.play();
      }

    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      die.play();
    }

    gameOver.visible = false;

    restart.visible = false;
  }

   else if (gameState === END) {
       
      ground.velocityX = 0;

      trex.velocityY=0;

      trex.changeAnimation("collided",trex_collided);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);

     gameOver.visible = true;

     restart.visible = true;

     restart.depth = obstaclesGroup.depth;
     obstaclesGroup.depth = restart.depth +10000000;

     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);

     if(mousePressedOver(restart)){

     reset();

     }

   }
  
 

  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(width,height-200,10,40);
   obstacle.velocityX = -6;
   obstacle.velocityX = -(4 + 2* (score/200));

   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(width,100,40,10);
    cloud.y = Math.round(random(10,400));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

function reset(){

  gameState = PLAY;


  restart.visible = false;
  gameOver.visible = false;

cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();

trex.changeAnimation("running", trex_running);

score=0;

}
