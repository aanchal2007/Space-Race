var spaceJet1, spaceJet2;
var spaceJet1Img, spaceJet2Img;
var ball,ballImg;
var jet1Score = 0;
var jet2Score = 0;
var ballGroup;

function preload(){
  spaceJet1Img = loadImage("spaceship.png");
  spaceJet2Img = loadImage("spaceship.png");

  ballImg = loadImage("whiteball.png");
}

function setup() {
  createCanvas(400,400);
  spaceJet1 = createSprite(100, 320, 50, 50);
  spaceJet1.addImage(spaceJet1Img);
  spaceJet1.scale = 0.7;

  spaceJet2 = createSprite(300, 320, 50, 50);
  spaceJet2.addImage(spaceJet2Img);
  spaceJet2.scale = 0.7;

  ballGroup = new Group();
}

function draw() {
  background("grey"); 

  textSize(20);
  fill("white");
  text(jet1Score, 95, 370);
  text(jet2Score, 300, 370);
  
  line(200, 450, 200, 240);

  if(keyIsDown(UP_ARROW)){
    // spaceJet1.velocityX = 0;
    // spaceJet1.velocityY = -2;
    spaceJet1.y=spaceJet1.y-1;
  }

  if(keyIsDown(DOWN_ARROW)){
    // spaceJet1.velocityX = 0;
    // spaceJet1.velocityY = 2;
    spaceJet1.y = spaceJet1.y+1;
  }
  
  if (keyDown("w")) {
    spaceJet2.y = spaceJet2.y - 1;
  }

  if (keyDown("s")) {
    spaceJet2.y = spaceJet2.y + 1;
  }

  spawnballs()

  if (spaceJet1.isTouching(ballGroup)) {
    jet1Score = jet1Score - 1;
    spaceJet1.x = 100;
    spaceJet1.y = 320;
  }

  if (spaceJet2.isTouching(ballGroup)) {
    jet2Score = jet2Score - 1;
    spaceJet2.x = 300;
    spaceJet2.y = 320;
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