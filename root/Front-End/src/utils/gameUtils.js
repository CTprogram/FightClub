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
import pOneDeath from "../assets/Fantasy-Warrior/Fantasy-Warrior/Sprites/Death.png";
import pTwoDeath from "../assets/Medieval-King-Pack-2/Sprites/Death.png";

const BG_COLOUR = "#231f20";
let playerOne, playerTwo;
let background;
class Sprite {
  constructor(
    position,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    ctx
  ) {
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
  }

  //Loop through invidual frame of player sprite images
  goThroughFrames(halt = false) {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        if (!halt) this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this.goThroughFrames();
  }
}

class Fighter extends Sprite {
  constructor(
    { position, velocity, attackBox, attacking },
    offset,
    sprites,
    ctx,
    imgSrc,
    scale = 1,
    framesMax = 1
  ) {
    super(position, imgSrc, scale, framesMax, offset, ctx);
    this.velocity = velocity;
    this.width = 50;
    this.height = 50;
    this.lastKey;
    this.attackBox = attackBox;
    this.isDying = false;
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
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }

  update() {
    this.draw();
    this.goThroughFrames(this.isDying);
  }
}

const handleGameState = (gameState, canvas, ctx, initialized) => {
  if (!initialized) {
    playerOne = new Fighter(
      {
        position: { x: 0, y: 200 },
        velocity: { x: 0, y: 0 },
        attackBox: { x: 0, y: 0 },
        attacking: false,
      },
      { x: 300, y: 230 },
      {
        idle: { imgSrc: pOneIdleImage, framesMax: 10 },
        run: { imgSrc: pOneRunImage, framesMax: 8 },
        jump: { imgSrc: pOneJumpImage, framesMax: 3 },
        fall: { imgSrc: pOneFallImage, framesMax: 3 },
        attack1: { imgSrc: pOneAttack1Image, framesMax: 7 },
        death: { imgSrc: pOneDeath, framesMax: 7 },
      },
      ctx,
      pOneIdleImage,
      4,
      10
    );
    playerTwo = new Fighter(
      {
        position: { x: 0, y: 200 },
        velocity: { x: 0, y: 0 },
        attackBox: { x: 0, y: 0 },
        attacking: false,
      },
      { x: 300, y: 220 },
      {
        idle: { imgSrc: pTwoIdleImage, framesMax: 8 },
        run: { imgSrc: pTwoRunImage, framesMax: 8 },
        jump: { imgSrc: pTwoJumpImage, framesMax: 2 },
        fall: { imgSrc: pTwoFallImage, framesMax: 2 },
        attack1: { imgSrc: pTwoAttack1Image, framesMax: 4 },
        death: { imgSrc: pTwoDeath, framesMax: 6 },
      },
      ctx,
      pTwoIdleImage,
      4,
      8
    );
    background = new Sprite(
      { x: 0, y: 0 },
      backgroundImage,
      0.5,
      1,
      { x: 0, y: 0 },
      ctx
    );
  }

  playerOne.position = gameState.players[0].position;
  playerOne.velocity = gameState.players[0].velocity;
  playerOne.attackBox = gameState.players[0].attackBox;
  playerOne.attacking = gameState.players[0].attacking;
  playerOne.isDying = gameState.players[0].isDying;
  playerTwo.position = gameState.players[1].position;
  playerTwo.velocity = gameState.players[1].velocity;
  playerTwo.attackBox = gameState.players[1].attackBox;
  playerTwo.attacking = gameState.players[1].attacking;
  playerTwo.isDying = gameState.players[1].isDying;

  //Player one sprite switch up
  if (!playerOne.isDying) {
    if (playerOne.attacking) {
      playerOne.switchSprite("attack1");
    } else {
      if (playerOne.velocity.y > 0) {
        playerOne.switchSprite("jump");
      } else if (playerOne.velocity.y < 0) {
        playerOne.switchSprite("fall");
      } else {
        if (playerOne.velocity.x != 0) {
          playerOne.switchSprite("run");
        } else {
          playerOne.switchSprite("idle");
        }
      }
    }
  } else {
    playerOne.switchSprite("death");
  }

  //Player two sprite switch up
  if (!playerTwo.isDying) {
    if (playerTwo.attacking) {
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
  } else {
    playerTwo.switchSprite("death");
  }

  requestAnimationFrame(() =>
    paintGame(gameState, canvas, playerOne, playerTwo, ctx, background)
  );
};

const paintGame = (state, canvas, playerOne, playerTwo, ctx) => {
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.3;
  background.update();
  ctx.globalAlpha = 1;
  playerOne.update();
  playerTwo.update();
};

export { handleGameState, Sprite, Fighter };
