var playArea = document.getElementById('play-area');
function moveBackGround() {
    var x = 0;
    setInterval(function() {
        x -= 1;
        playArea.style.backgroundPosition = x + 'px 0px';
    }, 60);
}
var player = document.getElementById('player');
window.addEventListener('keypress', function(event){
  if(event.which === 32) {
    player.style.top = '40%';
    setTimeout(function() {
      player.style.top = '50%';
    }, 500)
  }
  console.log('key pressed', event);
});

function createObstacles() {
  var obstacle = document.createElement('div');
  obstacle.innerHTML = 'O';
  obstacle.className += 'obstacle';
  playArea.appendChild(obstacle);
}
moveBackGround();
createObstacles();