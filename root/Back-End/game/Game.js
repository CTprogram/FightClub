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
                health: 100
            },
            {
                position: {
                    x: 200,
                    y: 200
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                color: 'green',
                health: 100
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
    enemy.position.y = enemy.velocity.y;

    return 0;
}

module.exports = {
    gameLoop, 
    initNewGameState
}


