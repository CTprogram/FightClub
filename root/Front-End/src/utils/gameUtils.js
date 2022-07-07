const BG_COLOUR = "#231f20";
class Sprite {
  constructor({ position, velocity, attackBox, attacking }, ctx) {
    this.position = position;
    this.velocity = velocity;
    this.attackBox = attackBox;
    this.attacking = attacking;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.position.x, this.position.y, 50, 150);

    if (this.attacking) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
  }
}

const handleGameState = (gameState, canvas, ctx) => {
  // gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState, canvas, ctx));
};

const paintGame = (state, canvas, ctx) => {
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const player = new Sprite(state.players[0], ctx);
  const enemy = new Sprite(state.players[1], ctx);
  player.draw();
  enemy.draw();
};
export { handleGameState };
