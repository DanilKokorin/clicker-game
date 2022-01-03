var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $times = document.querySelector('#title-restart__counter')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var $restart = document.querySelector('#restart')
var $titleRestart = document.querySelector('#title-restart')

var score = 0
var isGameStarted = false
var restart = false

$start.addEventListener('click', startGame)
$restart.addEventListener('click', restartGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}


function startGame() {
  restart = false
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)
  show($restart)

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent)

    if (restart) [
      clearInterval(interval)
    ]
    
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function restartGame () {
  restart = true
  $times.textContent = 3

  show($titleRestart)
  hide($game)

  var intervals = setInterval(function() {
    var times = parseFloat($times.textContent)
    
    if (times <= 0) {
      clearInterval(intervals)
      hide($titleRestart)
      show($game)
      startGame()
    } else {
      $times.textContent = times - 1
    }
  }, 1000)
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
  hide($restart)
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return 
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = '#' + getRandomColor() + getRandomColor() + getRandomColor()
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
  return Math.floor(Math.random() * 10)
}
