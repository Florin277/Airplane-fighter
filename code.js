const ONE_SECOND_MS = 1000;
const SPEED_MS = 30;
const MOVE_AIRPLANE = 15;
const SIZE_IMAGE = 150;
const SIZE_PROECTIL = 25;
const LEFT_ARROW = 37;
const REIGHT_ARROW = 39;
const SHIFT_TASTE = 16;
const  gameBoard= document.getElementById("playArea"); 
const  contex = gameBoard.getContext("2d");
const fallingObjects = [new Image(), new Image(), new Image(), new Image(), new Image()];
const imagePaths = ["Images/airplane2.png", "Images/ball.png", "Images/parachute jumper1.png", "Images/parachute jumper2.png", "Images/stork.png"];
const airplaneImage = new Image();
const projectilImage = new Image();
document.getElementById('score').innerHTML = "Player score";

function startGame() {
  const activeObject = [];
  const projectileLaunch = [];
  let xAirplanePos = gameBoard.width / 2;
  let yAirplanePos = gameBoard.height - SIZE_IMAGE;
  let updateGameBoard;
  let updateObject;
  let updateProjectile;
  let airplaneSpeed;
  projectilImage.src = "Images/projectil.png";
  airplaneImage.src = "Images/airplane1.png";
  let speedAirplane = 100;
  let speedObject = 3;
  let speedProjectil = 10;
  let objectsRemoved = 0;
  document.getElementById('score').innerHTML = "Player score";
  for (let i = 0; i < 5; ++i) {
    fallingObjects[i].src = imagePaths[i];
  }
  
  function pushActiveObject() {
    const imageIndex = Math.floor(Math.random() * 5);
    activeObject.push({
      xObjectPos: Math.random() * (gameBoard.width- SIZE_IMAGE),
      yObjectPos: -SIZE_IMAGE,
      sizeObject: SIZE_IMAGE,
      speed: speedObject,
      img: fallingObjects[imageIndex],
    })
  }

  function pushProjectil() {
    projectileLaunch.push( {
      xProjectilPos: xAirplanePos + ((SIZE_IMAGE - SIZE_PROECTIL) / 2),
      yProjectilPos: yAirplanePos,
      sizeProjectil: SIZE_PROECTIL,
      speedProjectil: speedProjectil,
      image: projectilImage,
    })
  }
  
  updateObject = setInterval(() => {
    for (let i = 0; i < activeObject.length; ++i) {
      activeObject[i].yObjectPos += activeObject[i].speed;
    }
    if (activeObject.length === 0 || activeObject[activeObject.length - 1].yObjectPos > SIZE_IMAGE / 2)  {
      pushActiveObject();
    }
    if (objectsRemoved % 3 === 0 && objectsRemoved) {
      speedObject += 0.001;
    }
  }, SPEED_MS)

  updateProjectile = setInterval(() => {
    for (let i = 0; i < projectileLaunch.length; ++i) {
      projectileLaunch[i].yProjectilPos -= projectileLaunch[i].speedProjectil;
    }
  }, SPEED_MS)  
  
  airplaneSpeed = setInterval( () => {
    contex.fillStyle = "black";
    for (let i = speedAirplane; i > 0; --i) {
      let x = Math.random() * contex.canvas.width;
      let y = Math.random() * contex.canvas.height;
      contex.fillRect(x, y, 1, 5);
    }
  }, SPEED_MS * 3)
  
  updateGameBoard = setInterval(() => {
    contex.clearRect(0, 0, gameBoard.width, gameBoard.height);
    contex.drawImage(airplaneImage, xAirplanePos, yAirplanePos, SIZE_IMAGE, SIZE_IMAGE);
    for (let j = 0; j < activeObject.length; ++j) {
      contex.drawImage(activeObject[j].img, activeObject[j].xObjectPos, activeObject[j].yObjectPos, activeObject[j].sizeObject, activeObject[j].sizeObject);
      let colision = 0;
      for (let i = 0; i < projectileLaunch.length; ++i) {
        contex.drawImage(projectileLaunch[i].image, projectileLaunch[i].xProjectilPos, projectileLaunch[i].yProjectilPos, projectileLaunch[i].sizeProjectil, projectileLaunch[i].sizeProjectil);
        if (projectilCollisionCheck(activeObject[j].xObjectPos, activeObject[j].yObjectPos, projectileLaunch[i].xProjectilPos, projectileLaunch[i].yProjectilPos)) {
          ++objectsRemoved;
          projectileLaunch.splice(i, 1);
          i = projectileLaunch.length;
          colision = 1;
        }
      }
      airplaneCollisionCheck(xAirplanePos, yAirplanePos, activeObject[j].xObjectPos, activeObject[j].yObjectPos);
      if (colision) {
         activeObject.splice(j, 1);
      }
    }
  }, SPEED_MS);
  
  function airplaneCollisionCheck(planeX, planeY, objectX, objectY) {
    if (planeX < objectX + SIZE_IMAGE && planeX + SIZE_IMAGE > objectX &&
      planeY < objectY + SIZE_IMAGE && planeY + SIZE_IMAGE > objectY) {
      let playerScore = objectsRemoved.toString();
      clearInterval(updateObject);
      clearInterval(updateGameBoard);
      clearInterval(airplaneSpeed);
      clearInterval(updateProjectile);
      document.getElementById('score').innerHTML =  playerScore;
    }
  }
  
  function projectilCollisionCheck(xObject, yObject, projectilX, projectilY) {
    if (xObject < projectilX + SIZE_PROECTIL && xObject + SIZE_IMAGE > projectilX &&
       yObject + SIZE_IMAGE > projectilY) {
      return 1;
    }
    return 0;
  }
  
  function moveAirplaneAndLaunch(pressArrow) {
    if (pressArrow.keyCode === LEFT_ARROW && xAirplanePos > 0) {
      xAirplanePos -= MOVE_AIRPLANE;
    } else if (pressArrow.keyCode === REIGHT_ARROW && 
      xAirplanePos < gameBoard.width - SIZE_IMAGE - 1 ) {
      xAirplanePos += MOVE_AIRPLANE;
    }
    if (pressArrow.keyCode === SHIFT_TASTE) {
      pushProjectil();
    }
  }

  document.onkeydown = moveAirplaneAndLaunch;
}
document.getElementById('reset').addEventListener("click", startGame);