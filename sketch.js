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

var rope,stone,ground;
var stone_con;
var zombie,sadZombie;
var button;
var rock; 


function preload()
{

  rock = loadImage("stone.png");
  zombieImg = loadImage("zombie.png");
  
  sadZombie = loadImage("sad_zombie.png");
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg("cut_btn.jpg");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  zombie = createSprite(180,620,50,50);
 zombie.scale = 0.06;
zombie.addImage("normal",zombieImg);
zombie.addImage("sad",sadZombie);
zombie.changeImage("normal");

  
  rope = new Rope(7,{x:245,y:50});
  ground = new Ground(200,690,600,60);
  
stone = Bodies.circle(300,300,20);
  Composite.add(rope.body,stone);

 stone_con = new Link(rope,stone);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  if(stone != null){
    image(rock,stone.position.x,stone.position.y,70,70);
  }

 rope.show();
 ground.display();
 
 if(collide(stone, zombie) == true){
zombie.changeImage("sad");
 }

 Engine.update(engine);

 drawSprites();
}

function drop()
{
  rope.break();
  stone_con.detach();
stone_con = null; 
}

function collide(body, sprite){

if(body != null){
var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);

if(d <= 80){
World.remove(world, stone);
stone = null;
return true;
}

else{
return false;
}
}

}

