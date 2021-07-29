const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombieImg1;
var zombie;
var backgroundImg;
var zombieImg2;
var zombieImg3;
var zombieImg4;
var breakButton;


var stones = [];
function preload(){
  zombieImg1 = loadImage("./assets/zombie1.png");
  zombieImg2 = loadImage("./assets/zombie2.png");
  zombieImg3 = loadImage("./assets/zombie3.png");
  zombieImg4 = loadImage("./assets/zombie4.png");

  backgroundImg = loadImage("./assets/background.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(300, height / 2 + 50, 600, 100, "#8d6e63", true);
  rightWall = new Base(width - 300, height / 2 + 50, 600, 100, "#8d6e63", true);

  bridge = new Bridge(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);



  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width/2, height - 110);
  zombie.addAnimation("leftorright ", zombieImg1,zombieImg2, zombieImg1 );
  zombie.addAnimation("righttoleft", zombieImg3, zombieImg4, zombieImg3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;
  breakButton = createButton("");
  breakButton.position(width - 200, height/2 - 50);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  for (var stone of stones) {
    stone.show();
  }
  if(zombie.position.x >= width - 300){
    zombie.velocityX = -10
    zombie.changeAnimation("righttoleft")
  }
  if(zombie.position.x <= 300){
    zombie.velocityX = 10
    zombie.changeAnimation("leftorright")
  }
  drawSprites();
}

function handleButtonPress(){
  jointLink.dettach();
  setTimeout(()=> {
    bridge.break();
  },1500)

}


