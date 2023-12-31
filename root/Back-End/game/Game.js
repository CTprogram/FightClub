const e = require("express");
const {
  GAME_SCREEN_HEIGHT,
  GRAVITY,
  GROUND_OFFSET,
  ENEMY_GROUND_OFFSET,
  PLAYER_GROUND_OFFSET,
} = require("../utils/constants");

//Makes a game board with initial game properties.
function initNewGameState() {
  return {
    players: [
      {
        position: {
          x: 0,
          y: 0,
        },
        velocity: {
          x: 0,
          y: 0,
        },
        color: "red",
        health: 100,
        width: 50,
        height: 170,
        onGround: false,
        attacking: false,
        attackBox: {
          position: {
            x: 0,
            y: 0,
          },
          width: 225,
          height: 50,
          offset: 0,
        },
        isDying: false,
      },
      {
        position: {
          x: 400,
          y: 200,
        },
        velocity: {
          x: 0,
          y: 0,
        },
        color: "green",
        health: 100,
        width: 50,
        height: 200,
        onGround: false,
        attacking: false,
        attackBox: {
          position: {
            x: 0,
            y: 0,
          },
          width: 250,
          height: 50,
          offset: 250,
        },
        isDying: false,
      },
    ],
    timeLeft: 90,
  };
}

function gameLoop(state) {
  if (!state) return 0;

  const player = state.players[0];
  const enemy = state.players[1];
  let winner;

  //Players movement
  player.position.x += player.velocity.x;
  player.position.y += player.velocity.y;
  enemy.position.x += enemy.velocity.x;
  enemy.position.y += enemy.velocity.y;

  //Attack Box Movement
  player.attackBox.position.x = player.position.x - player.attackBox.offset;
  player.attackBox.position.y = player.position.y;
  enemy.attackBox.position.x = enemy.position.x - enemy.attackBox.offset;
  enemy.attackBox.position.y = enemy.position.y;

  //Game boundaries
  if (
    player.position.y +
      player.height +
      player.velocity.y +
      PLAYER_GROUND_OFFSET >=
    GAME_SCREEN_HEIGHT
  ) {
    player.onGround = true;
    player.velocity.y = 0;
  } else {
    player.velocity.y += GRAVITY;
  }

  if (
    enemy.position.y + enemy.height + enemy.velocity.y + ENEMY_GROUND_OFFSET >=
    GAME_SCREEN_HEIGHT
  ) {
    enemy.onGround = true;
    enemy.velocity.y = 0;
  } else {
    enemy.velocity.y += GRAVITY;
  }

  //Collision
  if (successfulAttack({ attacker: player, attacked: enemy })) {
    enemy.health -= 10 / 14.5;
  }

  if (successfulAttack({ attacker: enemy, attacked: player })) {
    player.health -= 10 / 8.5;
  }

  return getWinner(player, enemy, state.timeLeft);
}

function successfulAttack({ attacker, attacked }) {
  return (
    attacker.attackBox.position.x + attacker.attackBox.width >=
      attacked.position.x &&
    attacker.attackBox.position.x <= attacked.position.x + attacked.width &&
    attacker.attackBox.position.y + attacker.attackBox.height >=
      attacked.position.y &&
    attacker.attackBox.position.y <= attacked.position.y + attacked.height &&
    attacker.attacking
  );
}

function getWinner(player, enemy, timeLeft) {
  //Kill
  if ((player.health <= 0 || enemy.health <= 0) && timeLeft > 0) {
    if (player.health > 0) {
      enemy.isDying = true;
      return 1;
    } else {
      if (player.health <= 0 && enemy.health <= 0) return 3;
      player.isDying = true;
      return 2;
    }
  } else if (timeLeft <= 0) {
    //Time up
    if (player.health > enemy.health) {
      return 1;
    } else {
      return player.health === enemy.health ? 3 : 2;
    }
  } else {
    return 0;
  }
}

module.exports = {
  gameLoop,
  initNewGameState,
};
