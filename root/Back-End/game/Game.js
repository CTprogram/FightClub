const { GAME_SCREEN_HEIGHT, GRAVITY } = require("../utils/constants");

function initNewGameState() {
    return {
        players : [
            {
                position: {
                    x: 0,
                    y: 0
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                color: 'red',
                health: 100, 
                width: 50,
                height: 150,
                onGround: false 
            },
            {
                position: {
                    x: 400,
                    y: 200
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                color: 'green',
                health: 100,
                width: 50,
                height: 150,
                onGround: false 
            }
        ]
    }
}

function gameLoop(state) {
    if(!state) return 0;

    const player = state.players[0];
    const enemy = state.players[1];

    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;
    enemy.position.x += enemy.velocity.x;
    enemy.position.y += enemy.velocity.y;

    if(player.position.y + player.height + player.velocity.y >= GAME_SCREEN_HEIGHT) {
        player.onGround = true;
        player.velocity.y = 0;
    } else {
        player.velocity.y += GRAVITY;
    }


    if(enemy.position.y + enemy.height + enemy.velocity.y >= GAME_SCREEN_HEIGHT) {
        enemy.onGround = true;
        enemy.velocity.y = 0;
    } else {
        enemy.velocity.y += GRAVITY;
    }

    return 0;
}

module.exports = {
    gameLoop, 
    initNewGameState
}


