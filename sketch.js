var path,car , gameOver
var player1, player2,player3
var pathImg, carImg, gameOverImg,cycleBell

var yellowCG, orangeCG, blueCG

var oppYellowImg,oppOrangeImg, oppBlueImg

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance = 0;
var restart;

function preload(){
  pathImg = loadImage("Road.png");
  carImg = loadImage("red car.png");
  gameOverImg = loadImage("gameOver.png");
  cycleBell = loadSound("bell.mp3");
  oppYellowImg = loadImage("yellow car.png");
  oppOrangeImg = loadImage("orange car.png");
  oppBlueImg = loadImage ("blue car.png");

}

function setup(){
  createCanvas(1200,300);

  path = createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  car = createSprite(70,150);
  car.addImage(carImg);
  car.scale=0.2;

  gameOver = createSprite(600,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

  yellowCG = new Group();
  orangeCG = new Group();
  blueCG = new Group();

}

function draw(){
  background(0);

  drawSprites();
  textSixe(20);
  fill(255);
  text("Distance:"+distance,900,30);

  if(gameState===PLAY){
    distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  }
    car.y = World.mouseY;

    edges = createEdgeSprites();
    car.collide(edges);

    if(path.x < 0 ){
      path.x = width/2;
    }

    if(keyDown("space")) {
      cycleBell.play();
    }

    var select_oppPlayer = Math.round(random(1,3));
  
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        yellowCar();
      } else if (select_oppPlayer == 2) {
        orangeCar();
      } else {
        blueCar();
      }
    }

    if(yellowCG.isTouching(car)){
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1",oppyellowImg);
     }
     if(orangeCG.isTouching(car)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppOrangeImg);
    }
    if(blueCG.isTouching(car)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppBlueImg);
    }

   else if(gameSate===END){
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 200,200);
  
   }
   path.velocityX = 0;
    car.velocityY = 0;
   car.addAnimation("SahilRunning",carImg);

  yellowCG.setVelocityXEach(0);
   yellowCG.setLifetimeEach(-1);
 
   orangeCG.setVelocityXEach(0);
   orangeCG.setLifetimeEach(-1);
 
   blueCG.setVelocityXEach(0);
   blueCG.setLifetimeEach(-1);

   if(keyDown("UP_ARROW")) {
    reset();
   }
  }
   function yellowCar(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.06;
    player1.velocityX = -(6 + 2*distance/150);
    player1.addAnimation("opponentPlayer1",oppyellowImg);
    player1.setLifetime=170;
    yellowCG.add(player1);
  }
  function blueCar(){
    player2 =createSprite(1100,Math.round(random(50, 250)));
    player2.scale =0.06;
    player2.velocityX = -(6 + 2*distance/150);
    player2.addAnimation("opponentPlayer2",oppBlueImg);
    player2.setLifetime=170;
    blueCG.add(player2);
}
function orangeCar(){
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppOrangeImg);
  player3.setLifetime=170;
  orangeCG.add(player3);
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  car.addAnimation("SahilRunning",carImg);
  
  yellowCG.destroyEach();
  orangeCG.destroyEach();
  blueCG.destroyEach();
  
  distance = 0;
}


