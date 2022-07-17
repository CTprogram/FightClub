import pOneIdleImage from "../assets/Fantasy-Warrior/Fantasy-Warrior/Sprites/Idle.png";
import pOneRunImage from "../assets/Fantasy-Warrior/Fantasy-Warrior/Sprites/Run.png";
import pOneJumpImage from "../assets/Fantasy-Warrior/Fantasy-Warrior/Sprites/Jump.png";
import pOneFallImage from "../assets/Fantasy-Warrior/Fantasy-Warrior/Sprites/Fall.png";
import pTwoIdleImage from "../assets/Medieval-King-Pack-2/Sprites/Idle_flipped.png";
import pTwoRunImage from "../assets/Medieval-King-Pack-2/Sprites/Run_flipped.png";
import pTwoJumpImage from "../assets/Medieval-King-Pack-2/Sprites/Jump_flipped.png";
import pTwoFallImage from "../assets/Medieval-King-Pack-2/Sprites/Fall_flipped.png";
import pOneAttack1Image from "../assets/Fantasy-Warrior/Fantasy-Warrior/Sprites/Attack1.png";
import pTwoAttack1Image from "../assets/Medieval-King-Pack-2/Sprites/Attack1_flipped.png";
import backgroundImage from "../assets/background.png";

const BG_COLOUR = "#231f20";
let init = false;
let playerOne, playerTwo;
let background;
class Sprite {
  constructor(position, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, ctx) {
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
    this.width = 50;
    this.height = 50;
    this.scale = scale;
    this.ctx = ctx;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
    // if (this.attacking) {
    //   this.ctx.fillStyle = "green";
    //   this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    // }
  }

  goThroughFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this.goThroughFrames();
  }
}

class Fighter extends Sprite {
  // constructor({ position, velocity, attackBox, attacking }, ctx) {
  //   this.position = position;
  //   this.velocity = velocity;
  //   this.attackBox = attackBox;
  //   this.attacking = attacking;
  //   this.ctx = ctx;
  // }
  constructor({ position, velocity, attackBox, attacking }, offset, sprites, ctx, imgSrc, scale = 1, framesMax = 1) {
    super(position, imgSrc, scale, framesMax, offset, ctx);

    this.velocity = velocity;
    this.width = 50;
    this.height = 50;
    this.lastKey;
    this.attackBox = attackBox;

    this.attacking = attacking;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }
  switchSprite(sprite) {
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        console.log('attacking sprite');
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }

  update() {
    this.draw();
    this.goThroughFrames();
  }
}

const handleGameState = (gameState, canvas, ctx) => {
  if (!init) {
    playerOne = new Fighter(
      { position: { x: 0, y: 200 }, velocity: { x: 0, y: 0 }, attackBox: { x: 0, y: 0 }, attacking: false },
      { x: 300, y: 230 },
      { 
        idle: { imgSrc: pOneIdleImage, framesMax: 10 }, 
        run: { imgSrc: pOneRunImage, framesMax: 8 }, 
        jump: { imgSrc: pOneJumpImage, framesMax: 3 }, 
        fall: { imgSrc: pOneFallImage, framesMax: 3 },
        attack1: { imgSrc: pOneAttack1Image, framesMax: 7 }
      },
      ctx,
      pOneIdleImage,
      4,
      10
    );
    playerTwo = new Fighter(
      { position: { x: 0, y: 200 }, velocity: { x: 0, y: 0 }, attackBox: { x: 0, y: 0 }, attacking: false },
      { x: 300, y: 220 },
      { 
        idle: { imgSrc: pTwoIdleImage, framesMax: 8 }, 
        run: { imgSrc: pTwoRunImage, framesMax: 8 }, 
        jump: { imgSrc: pTwoJumpImage, framesMax: 2 }, 
        fall: { imgSrc: pTwoFallImage, framesMax: 2 },
        attack1: { imgSrc: pTwoAttack1Image, framesMax: 4 }, 
      },
      ctx,
      pTwoIdleImage,
      4,
      8
    );
    background = new Sprite(
      {x: 0, y:0},
      backgroundImage,
      0.5,
      1,
      {x:0, y:0},
      ctx
    );
    init = true;
  }
  playerOne.position = gameState.players[0].position;
  playerOne.velocity = gameState.players[0].velocity;
  playerOne.attackBox = gameState.players[0].attackBox;
  playerOne.attacking = gameState.players[0].attacking;
  playerTwo.position = gameState.players[1].position;
  playerTwo.velocity = gameState.players[1].velocity;
  playerTwo.attackBox = gameState.players[1].attackBox;
  playerTwo.attacking = gameState.players[1].attacking;

  if(playerOne.attacking) {
    console.log('attacking');
    playerOne.switchSprite("attack1");
  } else {
    if (playerOne.velocity.y > 0) {
      playerOne.switchSprite("jump");
      console.log("jump");
    } else if (playerOne.velocity.y < 0) {
      playerOne.switchSprite("fall");
      console.log("fall");
    } else {
      if (playerOne.velocity.x != 0) {
        playerOne.switchSprite("run");
        console.log("run");
      } else {
        playerOne.switchSprite("idle");
        console.log("idle");
      }
    }
  }

  if(playerTwo.attacking){
    playerTwo.switchSprite("attack1");
  } else {
    if (playerTwo.velocity.y > 0) {
      playerTwo.switchSprite("jump");
    } else if (playerTwo.velocity.y < 0) {
      playerTwo.switchSprite("fall");
    } else {
      if (playerTwo.velocity.x != 0) {
        playerTwo.switchSprite("run");
      } else {
        playerTwo.switchSprite("idle");
      }
    }
  }

  // gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState, canvas, playerOne, playerTwo, ctx, background));
};

const paintGame = (state, canvas, playerOne, playerTwo, ctx) => {
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // const player = new Sprite(state.players[0], ctx);
  // const enemy = new Sprite(state.players[1], ctx);
  // player.draw();
  // enemy.draw();
  ctx.globalAlpha = 0.3;
  background.update();

  ctx.globalAlpha = 1;
  playerOne.update();

  // ctx.fillStyle = "blue";
  // ctx.fillRect(state.players[1].position.x, state.players[1].position.y, state.players[1].width, state.players[1].height);
  // if(playerTwo.attacking) {
  //   ctx.fillStyle = "green";
  //   ctx.fillRect(state.players[1].attackBox.position.x, state.players[1].attackBox.position.y, state.players[1].attackBox.width, state.players[1].attackBox.height);
  // }
  playerTwo.update();
};
export { handleGameState, Sprite, Fighter };
