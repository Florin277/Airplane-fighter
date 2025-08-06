const ONE_SECOND_MS = 1000;
const SPEED_MS = 30;
const MOVE_AIRPLANE = 15;
const SIZE_IMAGE = 30;
const LEFT_ARROW = 37;
const REIGHT_ARROW = 39;
const  gameBoard= document.getElementById("playArea"); 
const  contex = gameBoard.getContext("2d");
const objectSource = ["Images/airplane2.png", "Images/ball.png", "Images/parachute jumper1.png", "Images/parachute jumper2.png", "Images/stork.png"];
const baseObject = [new Image(), new Image(), new Image(), new Image(), new Image()];
const activeObject = [];
const airplaneImage = new Image();
let xAirplanePos = gameBoard.width / 2;
let yAirplanePos = gameBoard.height - SIZE_IMAGE;
let updateGameBoard;
let updateObject;
let airplaneSpeed;
let speedAirplane = 100;
let speedObject = 1;
let speedGame = 15;
let seconds = 0;
airplaneImage.src = "Images/airplane1.png";

setInterval(function() {++seconds}, ONE_SECOND_MS); 

for (let i = 0; i < 5; ++i) {
  baseObject[i].src = objectSource[i];
}
pushActiveObject();

function pushActiveObject() {
  const imageIndex = Math.floor(Math.random() * 5);
  activeObject.push({
    xObjectPos: Math.random() * (gameBoard.width- SIZE_IMAGE),
    yObjectPos: 0,
    sizeObject: SIZE_IMAGE,
    speed: speedObject,
    img: baseObject[imageIndex],
  })
}

updateObject = setInterval(() => {
  for (let i = 0; i < activeObject.length; ++i) {
    activeObject[i].yObjectPos += activeObject[i].speed;
  }
  if (activeObject[activeObject.length - 1].yObjectPos > SIZE_IMAGE) {
    pushActiveObject();
  }
}, SPEED_MS)

airplaneSpeed = setInterval( () => {
  contex.fillStyle = "black";
  for (let i = speedAirplane; i > 0; --i) {
    let x = Math.random() * contex.canvas.width;
    let y = Math.random() * contex.canvas.height;
    contex.fillRect(x, y, 1, 5);
  }
}, SPEED_MS)

updateGameBoard = setInterval(() => {
  contex.clearRect(0, 0, gameBoard.width, gameBoard.height);
  contex.drawImage(airplaneImage, xAirplanePos, yAirplanePos, SIZE_IMAGE, SIZE_IMAGE);
  for (let obj of activeObject) {
    contex.drawImage(obj.img, obj.xObjectPos, obj.yObjectPos, obj.sizeObject, obj.sizeObject);
    collisionCheck(xAirplanePos, yAirplanePos, obj.xObjectPos, obj.yObjectPos);
  }
},SPEED_MS * 2);

function collisionCheck(planeX, planeY, objectX, objectY) {
  if (planeX < objectX + SIZE_IMAGE && planeX + SIZE_IMAGE > objectX &&
    planeY < objectY + SIZE_IMAGE && planeY + SIZE_IMAGE > objectY) {
    let secondsString = seconds.toString();
    contex.clearRect(0, 0, gameBoard.height, gameBoard.width);
    activeObject.length = 0;
    clearInterval(updateObject);
    clearInterval(updateGameBoard);
    clearInterval(airplaneSpeed);
    document.getElementById('score').innerHTML = "Score: " + secondsString;
  }
}

function moveAirplane(pressArrow) {
  if (pressArrow.keyCode === LEFT_ARROW && xAirplanePos > 0) {
    xAirplanePos -= MOVE_AIRPLANE;
  } else if (pressArrow.keyCode === REIGHT_ARROW && 
    xAirplanePos < gameBoard.width - SIZE_IMAGE - 1 ) {
    xAirplanePos += MOVE_AIRPLANE;
  }
}
document.onkeydown = moveAirplane;







