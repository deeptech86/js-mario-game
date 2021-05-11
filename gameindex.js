score = 0;

playaudio = new Audio("./sound/music.mp3");
audiogo = new Audio("./sound/gameover.mp3");
setTimeout(() => {
  playaudio.play();
}, 1000);

document.onkeydown = function (e) {
  cross = true;
  mario = document.querySelector(".mario");
  dino = document.querySelector(".obstacle");

  mario_x = parseInt(
    window.getComputedStyle(mario, null).getPropertyValue("left")
  );
  // console.log("keycode is " + e.keyCode);
  if (e.keyCode == 38 || e.keyCode == 32) {
    mario = document.querySelector(".mario");
    mario.classList.add("animateMario");
    setTimeout(() => {
      mario.classList.remove("animateMario");
    }, 700);
  }

  if (e.keyCode == 39) {
    mario = document.querySelector(".mario");

    mario.style.left = mario_x + 112 + "px";

    if (mario_x > 1188) {
      mario.style.left = 1300 + "px";
    }
  }

  if (e.keyCode == 37) {
    // console.log("left value of mario :" + mario_x);
    mario = document.querySelector(".mario");

    mario.style.left = mario_x - 112 + "px";
    if (mario_x < -19) {
      mario.style.left = -20 + "px";
    }
  }

  setInterval(() => {
    // mario = document.querySelector(".mario");
    // dino = document.querySelector(".obstacle");
    gameOver = document.querySelector(".gameOver");

    mario_x = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario_y = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("bottom")
    );

    dino_x = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino_y = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("bottom")
    );
    //Computes the diiferences in the positions of mario and Dino
    offset_x = Math.abs(mario_x - dino_x);
    offset_y = Math.abs(mario_y - dino_y);

    //Compute a collision or increase score
    if (offset_x < 93 && offset_y < 52) {
      // alert("Game Over");
      dino.classList.remove("animatedino");
      gameOver.style.visibility = "visible";
      updateScore(score);
      audiogo.play();
      setTimeout(() => {
        audiogo.pause();
        playaudio.pause();
      }, 1000);
    }
    // Increase score on successful jump //&& offset_x < 120
    else if (cross && offset_x < 75) {
      score += 1;
      console.log("score is:" + score);

      updateScore(score);
      cross = false;
      setInterval(() => {
        cross = true;
      }, 1000);

      //Increase Dino speed
      setInterval(() => {
        dinoAniSpeed = parseFloat(
          window
            .getComputedStyle(dino, null)
            .getPropertyValue("animation-duration")
        );
        dinoAniSpeed = dinoAniSpeed - 0.01;
        dino.style.animationDuration = dinoAniSpeed + "s";
      }, 500);
    }
  }, 10);
};

function updateScore(score) {
  scorecard = document.querySelector(".scorecard");
  scorecard.innerHTML = "your Score is :" + score;
}

function restartGame() {
  document.location.reload();
}
// restartbtn = document.querySelector("#btn");
