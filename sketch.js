var spaceJet1, spaceJet2;
var spaceJet1Img, spaceJet2Img;
var ball,ballImg;
var jet1Score = 0;
var jet2Score = 0;
var ballGroup;
var goal, goal1, goalImage;
var gameState = "serve";
var planeSound;
var scoreSound;
var clappingSound;
var space_img;

function preload(){
  spaceJet1Img = loadImage("spaceship.png");
  spaceJet2Img = loadImage("spaceship.png");

  ballImg = loadImage("whiteball.png");
  planeSound = loadSound("crashSound.mp3");
  scoreSound = loadSound("score_sound.mp3");
  clappingSound = loadSound("clapping_sound.mp3");

  goalImage = loadImage("GoalImg/GoalImage.png");

  space_img = loadImage("space_img.png");
}

function setup() {
  createCanvas(400,400);
  spaceJet1 = createSprite(100, 320, 50, 50);
  spaceJet1.addImage(spaceJet1Img);
  spaceJet1.scale = 0.7;

  spaceJet2 = createSprite(300, 320, 50, 50);
  spaceJet2.addImage(spaceJet2Img);
  spaceJet2.scale = 0.7;

  goal = createSprite(100, 50, 50, 50);
  goal.shapeColor = "black";
  goal.addImage(goalImage);
  goal.scale = 0.3;

  goal1 = createSprite(290, 50, 50, 50);
  goal1.shapeColor = "black";
  goal1.addImage(goalImage);
  goal1.scale = 0.3;

  ballGroup = new Group();
}

function draw() {
  background(space_img); 

  textSize(20);
  fill("white");
  text(jet1Score, 95, 370);
  text(jet2Score, 300, 370);
  
  line(200, 450, 200, 240);

  if(keyIsDown(UP_ARROW)){
    // spaceJet1.velocityX = 1;
    // spaceJet1.velocityY = -2;
    spaceJet1.y=spaceJet1.y-6;
  }

  if(keyIsDown(DOWN_ARROW)){
    // spaceJet1.velocityX = 1;
    // spaceJet1.velocityY = 2;
    spaceJet1.y = spaceJet1.y+4;
  }

  if(spaceJet1.isTouching(goal) ){
    scoreSound.play();
    jet1Score = jet1Score+2;
    spaceJet1.x = 100;
    spaceJet1.y = 320;
  }

  if(spaceJet2.isTouching(goal1) ){
    scoreSound.play();
    jet2Score = jet2Score+2;
    spaceJet2.x = 300;
    spaceJet2.y = 320;
  }
  
  if (keyDown("w")) {
    spaceJet2.y = spaceJet2.y - 6;
  }

  if (keyDown("s")) {
    spaceJet2.y = spaceJet2.y + 4;
  }

  spawnballs()

  if (spaceJet1.isTouching(ballGroup)) {
    planeSound.play();
    jet1Score = jet1Score - 1;
    spaceJet1.x = 100;
    spaceJet1.y = 320;
  }

  if (spaceJet2.isTouching(ballGroup)) {
    planeSound.play();
    jet2Score = jet2Score - 1;
    spaceJet2.x = 300;
    spaceJet2.y = 320;
  }

  if(jet1Score >= 5|| jet2Score >= 5 ){
    gameState = "End";
  }

  if(gameState === "End"){
    ballGroup.destroyEach();
    if(jet1Score >= 5 ){
      clappingSound.play();
      text("SPACEJET1 WON", 100, 150);
    }
    if(jet2Score >= 5){
      clappingSound.play();
      text("SPACEJET2 WON", 100, 150);
    }
    reset();
  }

  drawSprites();
}

function spawnballs(){
  if (World.frameCount%10 === 0) {
    ball = createSprite(200, 200, 30, 30);
    ball.y = Math.round(random(10, 200));
    ball.addImage(ballImg);
    ball.scale = 0.2;
    var rand = Math.round(random(1, 2));
    if (rand === 1) {
      ball.x = 0;
      ball.velocityX = 3;
    } else {
      ball.x = 400;
      ball.velocityX = -3;
    }
    ballGroup.add(ball);
  }
}

function reset(){
  jet1Score = 0;
  jet2Score = 0;
  spaceJet1.x = 100;
  spaceJet1.y = 320;
  spaceJet2.x = 300;
  spaceJet2.y = 320;
}