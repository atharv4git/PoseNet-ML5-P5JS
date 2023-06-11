let capture;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose, skeleton;

function setup() {
    var cnv = createCanvas(1200, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    capture = createCapture(VIDEO);
    capture.hide();
    
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
    cnv.position(x, y);
    background(13, 58, 182);
    
}

function windowResized() {
    centerCanvas();
  }

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('Model has loaded');
}

function draw() {
  // Draw the webcam image
  image(capture, 0, 0);

  if (singlePose) {
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      const { x, y } = singlePose.keypoints[i].position;
      // Check if the point is within the canvas boundaries
      if (x >= 0 && x < width && y >= 0 && y < height) {
        fill(100,100,100);
        ellipse(x, y, 10);
      }
    }

    stroke(255);
    strokeWeight(2);
    for (let j = 0; j < skeleton.length; j++) {
      const [p1, p2] = skeleton[j];
      const x1 = p1.position.x;
      const y1 = p1.position.y;
      const x2 = p2.position.x;
      const y2 = p2.position.y;

      // Check if both points are within the canvas boundaries
      if (x1 >= 0 && x1 < width && y1 >= 0 && y1 < height && x2 >= 0 && x2 < width && y2 >= 0 && y2 < height) {
        line(x1, y1, x2, y2);
      }
    }
  }
}
