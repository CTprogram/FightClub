const BG_COLOUR = "#231f20";
class Sprite {
  constructor({ position, velocity }, ctx) {
    this.position = position;
    this.velocity = velocity;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.position.x, this.position.y, 50, 150);
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
  player.draw();
};
export { handleGameState };
