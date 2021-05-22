var birdimg,bird;
var pimg,p,pG;
var pimg2,p2,p2G;
var goimg,go;
var setimg,set;
var bkimg,bk;
var iwall;
var coin,coinimg,coinG;
var apple,appleimg,appleG;
var coin1,coinimg1,coing1;
var backs;
var die;
var a
score=3
cscore=0
hscore=0;
PLAY=0;
END=1
gameState="PLAY";


function preload(){
  bkimg=loadImage("bg1.jpg");
  birdimg=loadImage("angry.png");
  pimg=loadImage("pipes.png");
  pimg2=loadImage("pipes2.png");
  goimg=loadImage("gameOver.png");
  setimg=loadImage("reset.png");
  appleimg=loadImage("fruit2.png");
  coinimg=loadImage("cash.png")  
  coinimg1=loadImage("cash.png")
  backs=loadSound("funk-game-31145.mp3");
 
  a=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600,400);
   go=createSprite(300,100);
  go.addImage("g",goimg);
   
  
  bk=createSprite(300,300,20,20);
  bk.addImage("b",bkimg)
  bk.scale=3
 
  bird=createSprite(200,200,20,20);
  bird.addImage("d",birdimg);
  bird.scale=0.2
   set=createSprite(0,0);
  set.addImage("s",setimg)
  set.scale=0.4
  set.visible=false
  
  bird.setCollider("circle", 20,30,150)
  //bird.debug=true
 
 pG=new Group();
  p2G=new Group();
  appleG=new Group();
  coinG=new Group();
 coing1=new Group();
  backs.loop();
 
}

function draw() {
  background(220);
  
  
 
  if(gameState==="PLAY"){
   
set.visible=false
   go.visible=false
    bird.visible=true
    
    if(frameCount%500===0){
      score=score-1
    }
    
    if(keyDown("space")||touches.width<0){
      bird.velocityY=-4
      touches=[]
     
    }
    bird.velocityY=bird.velocityY+0.5;
    bk.velocityX=-4
    
    if(bk.x<0){
      bk.x=bk.width/3
    }
    
    
    if(coinG.isTouching(bird)){
      coinG.destroyEach()
      cscore=cscore+1
      a.play();
    }
    
    if(appleG.isTouching(bird)){
      appleG.destroyEach();
       score=score+1
      a.play();
     
    }
     
    
    if(pG.isTouching(bird)){
      pG.setVelocityXEach(0)
    gameState="END"
    }
     if(p2G.isTouching(bird)){
      p2G.setVelocityXEach(0)
    gameState="END"
    }
    
    if(coinG.isTouching(bird)){
      coinG.destroyEach();
    }
    
    
    if(bird.y>500)
     {
       gameState="END"
     }
    
     if(bird.y<0)
     {
       gameState="END"
     }
    if(score===0){
      gameState="END"
    }
    
     pipes();
  pipes2();
    applef();
    coinf();
    

  }
  if(gameState==="END"){
    pG.setLifetimeEach(0);
     p2G.setLifetimeEach(0);
    coinG.setLifetimeEach(0);
    appleG.setLifetimeEach(0)
    bird.y=200
    
    go.visible=true
        go.depth=bk.depth;
    go.depth=go.depth+1 
    set.x=300
    set.y=200
   set.visible=true
    bird.visible=false
    if(mousePressedOver(set)||touches.width>0){
      reset();
     touches=[]
    }
    if(bk.x<0){
      bk.x=bk.width/3
    }
  }
  
  
 

  drawSprites();
  
  stroke("black")
  strokeWeight(5)
  fill("orange")
  textSize(30);
  text("food="+score,230,50);
  
  stroke("black")
  strokeWeight(5)
  fill("yellow")
  textSize(30)
  text("score="+cscore,50,50)
  text("highscore="+hscore,400,50)
  
}

function pipes(){
if(frameCount%100===0){
 var p=createSprite(630,330,10,10);
  p.addImage("p1",pimg);
  p.scale=0.4;
  p.y=Math.round(random(340,400));
  p.velocityX=-4;
    p.lifetime = 200;
  pG.add(p)

}
}

function pipes2(){
  if(frameCount%130 ===0){
      p2=createSprite(630,330,40,40);
  p2.addImage("p12",pimg2);
  p2.scale=0.4;
  p2.y=Math.round(random(10,90));
  p2.velocityX=-4;
      p2.lifetime = 200;
    p2G.add(p2);
}
  
}

function applef(){
  if(frameCount%480===0){
    apple=createSprite(630,200);
    apple.addImage(appleimg);
    apple.y=Math.round(random(50,350));
    apple.velocityX=-4;
    apple.scale=0.3
     apple.lifetime = 200;
    appleG.add(apple);
     
  }
}

function coinf(){
  if(frameCount%120===0){
    var coin=createSprite(630,200);
    coin.addImage(coinimg);
    coin.y=Math.round(random(50,350));
    coin.velocityX=-4;
    coin.scale=0.1;
    coin.lifetime = 200;
    coinG.add(coin)
  }
}


function reset(){
  gameState="PLAY"
  if(cscore>hscore){
    hscore=cscore;
  }
  cscore=0
  score=3
}

 