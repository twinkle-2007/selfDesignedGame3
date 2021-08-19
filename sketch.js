var pc,pcIMG,bgIMG,obstacle1IMG,obstacle2IMG;
var edges,tableIMG,table,obstacle1,obstacleGroup;
var bgSnow,bgRain,bgSun;
var gameState = "PLAY"
var score=0;

function preload(){
  pcIMG=loadImage("bear.png");
  tableIMG=loadImage("table.png")
  obstacleIMG1=loadImage("blue.png")
  obstacleIMG2=loadImage("pink.png")
  obstacleIMG3=loadImage("pinkcracked_egg.jpeg")
  bg1IMG=loadImage("background1.jpg")
  bgIMG=loadImage("background.png")
  bgSnow=loadImage("snow.jpeg")
  bgSun=loadImage("sky.jpeg")
  bgRain=loadImage("rain.jpeg")
}


function setup() {
  createCanvas(1000,600);
  edges= createEdgeSprites();
  bg=createSprite(500,300,1000,600)
  bg.addImage(bgRain)
  bg.scale=1
  pc=createSprite(50, 400, 50, 50);
  pc.addImage(pcIMG);
  pc.scale=0.3
 
  table=createSprite(500,580,50,50);
  table.addImage(tableIMG);
  table.scale=0.3
  
 obstacleGroup=new Group();
}

function draw() {
  if (gameState==="PLAY"){
   
    //it is a rainy season
  background(bgRain);
//to move the playing character with arrow keys
if(keyDown(RIGHT_ARROW)){
  pc.velocityX=12;
}
if(keyDown(LEFT_ARROW)){
  pc.velocityX=-12;
}
//to make the playing character jump and come down with gravity
if(keyDown(UP_ARROW)){
    pc.velocityY=-12;
 }
 pc.velocityY=pc.velocityY+0.6;

 //to spawn the obstacles on screen
spawnObstacles();
//the playing character does not go below the bottom edge
  pc.collide(edges);  
  
  //whenever  bear touches the egg the score should increase and the should be cracked
if(obstacleGroup.isTouching(pc)){
  score=score+1;
  obstacle.addImage(obstacleIMG3)
  obstacle.scale=0.01
}

//going to different season/level
if (score>50){
  bg.addImage(bgSnow)
}

if (score>200){
  bg.addImage(bgSun)
}

if (score>300){
  bg.addImage(bg1IMG)
  
  gameState="END"
}

  drawSprites();
  text("Score : "+score,900,50)
}
if (gameState==="END"){
   text("you reached the house",500,300)
   pc.visible=false
   table.visible=false
   obstacleGroup.setLifetimeEach(0)
}
 }

function spawnObstacles(){

if(World.frameCount % 120===0){
     if(frameCount===120){
        obstacle=createSprite(500,460,50,50)
        obstacle.addImage(obstacleIMG1)
        obstacle.scale=0.04;
     }
else {
        obstacle=createSprite(500,460,50,50)
        var r = Math.round(random(1,2))
     if(r===1){
        obstacle.addImage(obstacleIMG1)
    }else if(r === 2) 
       {
        obstacle.addImage(obstacleIMG2)
       }

  obstacle.y=Math.round(random (100,500))
 
  obstacle.x=Math.round(random (450,550))
   

  obstacle.scale=0.03
  obstacle.setCollider("circle",0,0,1200)
  
 obstacleGroup.add(obstacle)
 obstacle.lifetime=300;
}
}
}

