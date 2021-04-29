var DarkBeast, DBWImg, DBS_Img, DBJImg;
var Bullet, BulletImg;
var Ground, Background, groundImg;
var Rock1, Rock2, Rock3, Rock4, Rock5, Rock6, Rock7, Rock8, Rock9, rocks, RocksGroup;
var ZombiesGroup, zombies, Zomb1, Zomb2, Zomb3, Zomb4, BloodySkull, BloodySImg;
var DragonGroup, dragons, Dragon1, Dragon2, Dragon3;
var Coins;
var gameState = "play";
var GameOver, gameoverImg, Restart, restartImg;

function preload(){

    DBWImg = loadAnimation("DBW1.png", "DBW2.png", "DBW3.png", "DBW4.png", "DBW5.png", "DBW6.png", "DBW7.png", "DBW8.png");
    DBJImg = loadAnimation("DBJ1.png", "DBJ2.png", "DBJ3.png", "DBJ4.png");
    DBS_Img = loadAnimation("DBS1.png", "DBS2.png", "DBS3.png", "DBS4.png", "DBS5.png", "DBS6.png");

    BulletImg = loadImage("Bullet.png")

    groundImg = loadImage("Background.jpg");
    gameoverImg = loadImage("Game Over.png");
    restartImg = loadImage("Restart.png");

    Rock1 = loadImage("Rock1.png");
    Rock2 = loadImage("Rock2.png");
    Rock3 = loadImage("Rock3.png");
    Rock4 = loadImage("Rock4.png");
    Rock5 = loadImage("Rock5.png");
    Rock6 = loadImage("Rock6.png");
    Rock7 = loadImage("Rock7.png");
    Rock8 = loadImage("Rock8.png");
    Rock9 = loadImage("Rock9.png");

    Zomb1 = loadAnimation("Z1(1.1).png", "Z1(1.2).png", "Z1(1.3).png", "Z1(1.4).png", "Z1(1.5).png", "Z1(1.6).png", "Z1(1.7).png", "Z1(1.8).png", "Z1(1.9).png", "Z1(1.10).png", "Z1(1.11).png", "Z1(1.12).png", "Z1(1.13).png", "Z1(1.14).png", "Z1(1.15).png", "Z1(1.16).png");
    Zomb2 = loadAnimation("Z1(2.1).png", "Z1(2.2).png", "Z1(2.3).png", "Z1(2.4).png", "Z1(2.5).png", "Z1(2.6).png", "Z1(2.7).png", "Z1(2.8).png", "Z1(2.9).png", "Z1(2.10).png", "Z1(2.11).png", "Z1(2.12).png", "Z1(2.13).png", "Z1(2.14).png", "Z1(2.15).png", "Z1(2.16).png");
    Zomb3 = loadAnimation("Z1(3.1).png", "Z1(3.2).png", "Z1(3.3).png", "Z1(3.4).png", "Z1(3.5).png", "Z1(3.6).png", "Z1(3.7).png", "Z1(3.8).png", "Z1(3.9).png", "Z1(3.10).png", "Z1(3.11).png", "Z1(3.12).png", "Z1(3.13).png", "Z1(3.14).png", "Z1(3.15).png", "Z1(3.16).png"); 
    BloodySImg = loadAnimation("ZBS(1).png", "ZBS(2).png", "ZBS(3).png", "ZBS(4).png", "ZBS(5).png", "ZBS(6).png", "ZBS(7).png", "ZBS(8).png", "ZBS(9).png", "ZBS(10).png", "ZBS(11).png", "ZBS(12).png");
}

function setup() {
    createCanvas(1000,500);

    DarkBeast = createSprite(100,390,50,80);
    DarkBeast.addAnimation("walking", DBWImg);
    DarkBeast.addAnimation("jumping", DBJImg);
    DarkBeast.addAnimation("shooting", DBS_Img);
    DarkBeast.scale = 1;

    Bullet = createSprite(140,380,10,5);
    Bullet.addImage(BulletImg);
    Bullet.scale = 0.03;
    Bullet.visible = false;

    Ground = createSprite(500,470,1000,20);
    Ground.shapeColor="gold";
    Ground.visible = false;

    Background = createSprite(1000,230,1100,20);
    Background.addImage(groundImg);
    Background.scale = 1.5;
    Background.x = Background.width/2;

    Background.depth = DarkBeast.depth;
    DarkBeast.depth = DarkBeast.depth + 1;

    GameOver = createSprite(500,200,50,50);
    GameOver.addImage(gameoverImg);
    GameOver.scale = 0.8;
    GameOver.visible = false;

    Restart = createSprite(500,350,50,50);
    Restart.addImage(restartImg);
    Restart.scale = 0.5;
    Restart.visible = false;

    RocksGroup = createGroup();
    ZombiesGroup = createGroup();
    BloodyGroup = createGroup();

    Coins = 0;

    DarkBeast.setCollider("rectangle",-10,0,60,120);
}

function draw() {
    background(rgb(236, 214, 159));

    Background.velocityX = -3;

    if (gameState === "play") {

        if (Background.x < 0){
                Background.x = Background.width/2;
              }        

        if(keyDown("space") && DarkBeast.y >= 390) {
                DarkBeast.velocityY = -12;
                DarkBeast.changeAnimation("jumping", DBJImg);
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        } 

        if(DarkBeast.y < 280){
                DarkBeast.changeAnimation("walking", DBWImg);
        }

            DarkBeast.velocityY = DarkBeast.velocityY + 0.5
            DarkBeast.collide(Ground);
           
        if(keyDown("enter")) {
               DarkBeast.changeAnimation("shooting", DBS_Img);
               Bullet.velocityX = 20;
               Bullet.visible = true;
        } 

        if(keyWentUp("enter")){
                DarkBeast.changeAnimation("walking", DBWImg);
        }

        if(ZombiesGroup.isTouching(Bullet)){
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
                ZombiesGroup.destroyEach();
                Coins = Coins+100;
        }

        if(BloodyGroup.isTouching(Bullet)){
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
                BloodyGroup.destroyEach();
                Coins = Coins+500;
        }

        if(RocksGroup.isTouching(Bullet)){
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        }
        
        if(Bullet.x > 1000) {
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        } 

        Zombies();
        Rocks();

        if(RocksGroup.isTouching(DarkBeast) || ZombiesGroup.isTouching(DarkBeast) || BloodyGroup.isTouching(DarkBeast)){
            gameState = "end"
        }
        
    }

    if (gameState === "end") {

        DarkBeast.destroy();
        Bullet.destroy();
        Background.destroy();
        RocksGroup.destroyEach();
        ZombiesGroup.destroyEach();
        BloodyGroup.destroyEach();
        
        GameOver.visible = true;
        Restart.visible = true;

        if(mousePressedOver(Restart)){
           reset();
        }
   }

    drawSprites();
    textscore();
}

function Rocks(){
    if (frameCount % 200 === 0){
      var rocks = createSprite(1100,420,50,50);
       var rand = Math.round(random(1,9));
       switch(rand) {
         case 1: rocks.addImage(Rock1);
                 break;
         case 2: rocks.addImage(Rock2);
                 break;
         case 3: rocks.addImage(Rock3);
                 break;
         case 4: rocks.addImage(Rock4);
                 break;
         case 5: rocks.addImage(Rock5);
                 break;
         case 6: rocks.addImage(Rock6);
                 break;
         case 7: rocks.addImage(Rock7);
                 break;
         case 8: rocks.addImage(Rock8);
                 break;
         case 9: rocks.addImage(Rock9);
                 break;
         default: break;
       }
       rocks.scale = 0.5;
       rocks.velocityX = -6;
       rocks.lifetime = 1100;
       rocks.depth = Background.depth + 1;
       RocksGroup.add(rocks);

       rocks.setCollider("circle",0,10,70);
}}

function Zombies() {
     if (frameCount % 500 === 0) {
        var zombies = createSprite(1100,410,50,10);
        zombies.addAnimation("zom1", Zomb1);
        zombies.addAnimation("zom2", Zomb2);
        zombies.addAnimation("zom3", Zomb3);
        var rand = Math.round(random(1,3));
        switch(rand) {
                case 1: zombies.changeAnimation("zom1", Zomb1);
                        break;
                case 2: zombies.changeAnimation("zom2", Zomb2);
                        break;
                case 3: zombies.changeAnimation("zom3", Zomb3);
                        break;
                default: break;
        }

        zombies.scale = 1.5;
        zombies.velocityX = -5;
        zombies.lifetime = 1100;
        ZombiesGroup.add(zombies);
     }

        if (frameCount % 1300 === 0) {
            var BloodySkull = createSprite(1095,400,50,10);
            BloodySkull.shapeColor = "Black";
            BloodySkull.addAnimation("BloodySkull", BloodySImg);
            BloodySkull.scale = 2;
            BloodySkull.velocityX = -5;
            BloodyGroup.add(BloodySkull);
        } 
}

function textscore(){
        strokeWeight(3);
        stroke(0);
        fill(rgb(239, 235, 54));
        textSize(28);
        text("Coins: "+Coins,25,35);  
}     

function reset(){
    gameState = "play";
    GameOver.visible = false;
    Restart.visible = false;
    
    RocksGroup.destroyEach();
    ZombiesGroup.destroyEach();
    BloodyGroup.destroyEach();

    DarkBeast = createSprite(100,390,50,80);
    DarkBeast.addAnimation("walking", DBWImg);
    DarkBeast.addAnimation("jumping", DBJImg);
    DarkBeast.addAnimation("shooting", DBS_Img);
    DarkBeast.scale = 1;

    Bullet = createSprite(140,380,10,5);
    Bullet.addImage(BulletImg);
    Bullet.scale = 0.03;
    Bullet.visible = false;

    Ground = createSprite(500,470,1000,20);
    Ground.shapeColor="gold";
    Ground.visible = false;

    Background = createSprite(1000,230,1100,20);
    Background.addImage(groundImg);
    Background.scale = 1.5;
    Background.x = Background.width/2;

    Background.depth = DarkBeast.depth;
    DarkBeast.depth = DarkBeast.depth + 1;

    GameOver = createSprite(500,200,50,50);
    GameOver.addImage(gameoverImg);
    GameOver.scale = 0.8;
    GameOver.visible = false;

    Restart = createSprite(500,350,50,50);
    Restart.addImage(restartImg);
    Restart.scale = 0.5;
    Restart.visible = false;

    RocksGroup = createGroup();
    ZombiesGroup = createGroup();
    Zombie1G = createGroup();
    BloodyGroup = createGroup();
    Bl1G = createGroup();

    Coins = 0;

    DarkBeast.setCollider("rectangle",-10,0,60,120);
}