var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gunSound;
var sheriffGroup,bulletGroup;
var bullet,bulletImage;
var sheriff,sheriffImage;
var bandit,banditImage;
var ground, invisibleGround, groundImage;


var score;
var gameOverImg,restartImg

function preload(){
  
  groundImage = loadImage("town.jpg");
  banditImage=loadImage("Bandit.png");
  sheriffImage=loadImage("Sheriff.png");
  bulletImage=loadImage("bullet.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  gunSound = loadSound("GunSound.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1600, 800);
bandit=createSprite(150,550,10,50);
 bandit.addImage(banditImage)

 
  
 
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale=1.4
  gameOver = createSprite(700,400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(700,500);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1.5;
  restart.scale = 1.5;
  
 
 sheriffGroup=new Group() 
 bulletGroup=new Group()
 

  
  
  
  score = 0;
  
}

function draw() {
  
  background(255);
  //displaying score
  
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    ground.velocityX=-6
    if (ground.x < 500){
      ground.x = ground.width/2+380;
    }
    
    ground.depth=0
    if(keyDown("UP_ARROW")){
      bandit.y=bandit.y-5
    }
    if(keyDown("DOWN_ARROW")){
      bandit.y=bandit.y+5
    }
    spawnSheriff()
    if(keyWentDown("space")){
      Bullet()
      gunSound.play()
    }
    if(bulletGroup.isTouching(sheriffGroup)){
      bulletGroup.destroyEach()
      sheriffGroup.destroyEach()
    }
    if(sheriffGroup.isTouching(bandit)){
      bandit.x=-30
      //sheriff.destroyEach()
      gameState=END
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     ground.velocityX=0
    sheriffGroup.setVelocityXEach(0)
     
   }
  if(mousePressedOver(restart)){
    gameOver.visible = false;
      restart.visible = false;
      gameState=PLAY
      bandit.x=150
      sheriffGroup.destroyEach()
      score = 0
  }

  drawSprites();
  fill("white")
  textSize(30)
  text("Score: "+ score, 1000,100);
}

function spawnSheriff(){
  if(frameCount%180===0){
    sheriff=createSprite(1200,550,10,50);
    sheriff.addImage(sheriffImage)
    sheriff.velocityX=-6
    sheriff.lifetime=200
    sheriffGroup.add(sheriff)
  }
}
function Bullet(){
    bullet=createSprite(200,450,10,50);
    bullet.y=bandit.y-30
    bullet.addImage(bulletImage)
    bullet.scale=0.1
    bullet.velocityX=6
    bullet.lifetime=200
    bulletGroup.add(bullet)
  }