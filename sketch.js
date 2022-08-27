var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY =  1;
var END = 0;
var gameState = 1;
var gameover,gameoverImg;



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameoverImg = loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup= createGroup();
  climbersGroup=createGroup();
  invisibleBlockGroup=createGroup();

  ghost = createSprite(300,500)
  ghost.addImage(ghostImg)
  ghost.scale=0.5

  ghost.setCollider("rectangle",0,0,150,150);
  ghost.debug= false

  gameover = createSprite(300,300);
  gameover.addImage(gameoverImg)
  gameover.scale=0.

}

function draw() {
  background(200);
  if(gameState ) {
  if(tower.y > 400){
      tower.y = 300
    }

    drawSprites()
    doors();

   if(keyDown("right_arrow"))  {
    ghost.x +=3
   }
   if(keyDown("left_arrow"))  {
    ghost.x -=3
   }
   if(keyDown("up_arrow"))  {
    ghost.y -=3
   }
   if(keyDown("down_arrow"))  {
    ghost.y +=3
 
  }
   
spookySound.play();

  if(climbersGroup.isTouching(ghost)){
     gameState=End
      
}

}
else if (gameState === END) {
  towerImg.visible = true;
  climbersGroup.visible = true;
    gameoverImg.visible = true
  tower.velocityY = 0;
  ghost.velocityY = 0
  ghost.velocityX = 0
 
   
doorsGroup.setLifetimeEach(-1);
climbersGroup.setLifetimeEach(-1);
}

}




function doors(){

  if(frameCount % 200 ===0){
    
   door = createSprite(200,-50) 
   door.addImage(doorImg)
   door.velocityY=1
   door.x=Math.round(random(120,400))
   doorsGroup.add(door)
   door.lifetime=600


   climber= createSprite(200,10)
   climber.lifetime=600
   climbersGroup.add(climber)
   climber.addImage(climberImg)
   climber.velocityY=1
   climber.x=door.x

   invisibleBlock=createSprite(200,15)
   invisibleBlock.width=climber.width
   invisibleBlock.height=2
   invisibleBlock.velocityY=1
   invisibleBlock.x=door.x
   invisibleBlockGroup.add(invisibleBlock)
   invisibleBlock.lifetime=600
}

}