(function() {
    // Getting DOM elements and storing it
    var dPlayArea = document.getElementById('play-area'),
        dStart = document.getElementById('start'),
        dInfo = document.getElementById('info'),
        dPlayer = document.getElementById('player'),
        dCurrentScore = document.getElementById('score');
    // Creating variables to store intervals used across
    var bgInterval, playerInterval, gameInterval, obstacleInterval = [];
    // Flag to determine whether the game is over
    var gameOver = false, score = 0;
    // Getting the computed style of player and storing it
    var playerStyle = getComputedStyle(dPlayer, null);
    var playerLeft = playerStyle.getPropertyValue('left');
    var playerWidth = playerStyle.getPropertyValue('width');
    var playerHeight = playerStyle.getPropertyValue('height');

    playerLeft = parseInt(playerLeft, 10);
    playerWidth = parseInt(playerWidth, 10);
    playerWidth = playerWidth + playerLeft;
    playerHeight = parseInt(playerHeight, 10); 

    // Function which moves the background
    function moveBackGround() {
        var x = 0;
        bgInterval = setInterval(function() {
            x -= 1;
            dPlayArea.style.backgroundPosition = x + 'px 0px';
        }, 60);
    }
    // Function which listens to space bar and changes the position of player
    window.addEventListener('keypress', function(event) {
        var topVal, goingUp;
        if (event.which === 32) {
            topVal = 50;
            goingUp = true;
            dPlayer.style.top = topVal + '%';
            playerInterval = setInterval(function() {
                if (goingUp) {
                    topVal--;
                    dPlayer.style.top = topVal + '%';
                    if (topVal < 30) {
                        goingUp = false;
                    }
                } else {
                    topVal++;
                    dPlayer.style.top = topVal + '%';
                    if (topVal >= 50) {
                        clearInterval(playerInterval);
                    }
                }
            }, 30);
        }
    });
    // Function to reset the game once the game is over and restarted.
    function resetGame() {
        var oldObstacles = document.getElementsByClassName('obstacle');
        while (oldObstacles[0]) {
            oldObstacles[0].parentNode.removeChild(oldObstacles[0]);
        }
        dPlayer.style.top = '50%';
        dCurrentScore.innerHTML = '0';
        score = 0;
    }
    // Function to create obstacles
    function createObstacles() {
        if (!gameOver) {
            var obstacle = document.createElement('div');
            obstacle.innerHTML = 'O';
            obstacle.className += 'obstacle';
            dPlayArea.appendChild(obstacle);
            var left = '95';
            var interval = setInterval(function() {
                if (left > -2) {
                    left -= 1;
                    obstacle.style.left = left + '%';
                    playerStyle = getComputedStyle(dPlayer, null);
                    var playerTop = playerStyle.getPropertyValue('top');
                    playerTop = parseInt(playerTop, 10);

                    var obstacleStyle = getComputedStyle(obstacle, null);
                    var obstacleTop = obstacleStyle.getPropertyValue('top');
                    var obstacleLeft = obstacleStyle.getPropertyValue('left');
                    obstacleTop = parseInt(obstacleTop, 10);
                    obstacleLeft = parseInt(obstacleLeft, 10);
                    if (obstacleLeft >= playerLeft && obstacleLeft <= playerWidth && playerTop + playerHeight >= obstacleTop) {
                        alert('Game Over\nYou scored ' + score);
                        dInfo.style.display = 'block';
                        for (var i in obstacleInterval) {
                            clearInterval(obstacleInterval[i]);
                        }
                        clearInterval(bgInterval);
                        clearInterval(gameInterval);
                        clearInterval(playerInterval);
                        gameOver = true;
                        resetGame();
                    }
                } else {
                    clearInterval(interval);
                    score++;
                    dCurrentScore.innerHTML = score;
                }
            }, 100);
            obstacleInterval.push(interval);
        }
    }
    // Start the game
    dStart.addEventListener('click', function() {
        gameOver = false;
        dInfo.style.display = 'none';
        moveBackGround();
        gameInterval = setInterval(createObstacles, 4000);
        createObstacles();
    });
})();