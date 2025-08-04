const  gameBoard= document.getElementById("playArea"); 
const  contex = gameBoard.getContext("2d");
const sizeImage = 30;
const leftArrow = 37;
const reightArrow = 39;
const object = [];
const imageSource = ["Images/airplane2.png", "Images/ball.png", "Images/parachute jumper1.png", "Images/parachute jumper2.png", "Images/stork.png"];
const images = [new Image(), new Image(), new Image(), new Image(), new Image()];
const airplaneImage = new Image();
let xAirplanePos = gameBoard.width / 2;
let yAirplanePos = gameBoard.height - sizeImage;
let updateGameBoard;
let updateObject;
let airplaneSpeed;
let seconds = 0;
airplaneImage.src = "Images/airplane1.png";

setInterval(function(){++seconds},1000); 

for (let i = 0; i < 5; ++i) {
  images[i].src = imageSource[i];
}

airplaneSpeed = setInterval( () => {
  contex.fillStyle = "black";
  for (let i = 15; i > 0; --i) {
    let x = Math.random() * contex.canvas.width;
    let y = Math.random() * contex.canvas.height;
    contex.fillRect(x, y, 1, 3);
  }
}, 50)

function pushObject() {
  const imageIndex = Math.floor(Math.random() * 5);
  object.push({
    xObjectPos: Math.random() * (gameBoard.width - sizeImage),
    yObjectPos: 0,
    speedObject: 5,
    sizeObject: 30,
    img: images[imageIndex],
  })
}

updateGameBoard = setInterval(() => {
  contex.clearRect(0, 0, gameBoard.width, gameBoard.height);
  contex.drawImage(airplaneImage, xAirplanePos, yAirplanePos, sizeImage, sizeImage);
  pushObject();
  for (let obj of object ) {
    contex.drawImage(obj.img, obj.xObjectPos, obj.yObjectPos, obj.sizeObject, obj.sizeObject);
    collisionCheck(xAirplanePos, yAirplanePos, obj.xObjectPos, obj.yObjectPos);
  }
}, 750)

function collisionCheck(planeX, planeY, objectX, objectY) {
  if (planeX < objectX + sizeImage && planeX + sizeImage > objectX &&
    planeY < objectY + sizeImage && planeY + sizeImage > objectY) {
    let secondsString = seconds.toString();
    contex.clearRect(0, 0, gameBoard.height, gameBoard.width);
    contex.font = "350px serif";
    contex.fillText(secondsString, 50, 330);
    clearInterval(updateObject);
    clearInterval(updateGameBoard);
    clearInterval(airplaneSpeed);
  }
}

function moveAirplane(pressArrow) {
  if (pressArrow.keyCode === leftArrow && xAirplanePos > 0) {
    xAirplanePos -= 15;
  } else if (pressArrow.keyCode === reightArrow && 
    xAirplanePos < gameBoard.width - sizeImage - 1 ) {
      xAirplanePos += 15;
    }
  }
document.onkeydown = moveAirplane;

updateObject = setInterval(() => {
  for (let obj of object) {
    obj.yObjectPos += obj.speedObject;
  }
}, 75)





