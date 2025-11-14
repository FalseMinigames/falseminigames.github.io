// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./my-pose-model/";
let predictions = {};

let model, webcam, maxPredictions;
let highestPrediction = 3;

async function init() {
  initGame();

  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 200;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  startGame();
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
  gameProcess();
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  predictions = await model.predict(posenetOutput);

  let highestConfidence = 0;

  for (let i = 0; i < maxPredictions; i++) {
    const confidence = predictions[i].probability.toFixed(2);

    if (confidence > highestConfidence) {
      highestConfidence = confidence;
      highestPrediction = i;
    }

    const classPrediction = predictions[i].className + ": " + confidence;
  }
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}

// 0: Forwards - 1: Right - 2: Left - 3: None
const lerp = (start, end, t) => start * (1 - t) + end * t;
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const beginButton = document.getElementById("beginButton");
const gameCanvas = document.getElementById("gameCanvas");
const flashlight = document.getElementById("flashlight");
const flashgoal = document.getElementById("flashgoal");
const title = document.getElementById("title");


const bots = {
  fox: {
    element: document.getElementById("fox"),
    meter: 0,
    active: 0,
  },
  bear: {
    element: document.getElementById("bear"),
    meter: 0,
    active: 0,
  },
};

const approachChance = 2.5;
const jumpscareThreshold = 500;

function initGame() {
  console.log("Initializing game!");

  beginButton.remove();
}

function startGame() {
  console.log("Beginning game!");

  gameCanvas.style.display = "inline";
}

function gameProcess() {
  const canvasWidth = gameCanvas.offsetWidth;
  const lightOffset = canvasWidth / 3;
  //const canvasHeight = gameCanvas.offsetHeight;

  switch (highestPrediction) {
    case 1: //Right
      flashgoal.style.left = "calc(50% + " + lightOffset + "px)";
      bots.fox.meter -= 15;
      if (bots.fox.meter < 0){
        bots.fox.meter = 0;
        bots.fox.active = 0;
        bots.fox.element.style.height = "0%"
      }
      break;
    case 2: //Left
      flashgoal.style.left = "calc(50% - " + lightOffset + "px)";
      bots.bear.meter -= 15;
      if (bots.bear.meter < 0){
        bots.bear.meter = 0;
        bots.bear.active = 0;
        bots.bear.element.style.height = "0%"
      }
      break;
    default: //None or Forwards
      flashgoal.style.left = "50%";
      break;
  }

  for (const key in bots) {
    const botData = bots[key];

    if (botData.active == 0) {
      const wakeValue = Math.floor(Math.random() * 100);
      if (wakeValue <= approachChance) {
        botData.active = 2 + Math.random() * 3.5
      }
    } else {
      botData.meter += botData.active;
      botData.element.style.height = mapRange(botData.meter, 0, jumpscareThreshold, 0, 70) + "%";

      if (botData.meter >= jumpscareThreshold) {
        gameCanvas.style.display = "none"
        title.textContent = "Perdiste!"
      }
    }
  }

  console.log(flashgoal.offsetLeft);
  flashlight.style.left = lerp(flashlight.offsetLeft, flashgoal.offsetLeft, 0.3) + "px";
}
