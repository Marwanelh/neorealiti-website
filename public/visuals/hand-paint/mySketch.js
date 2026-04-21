// p5.js interface to Google MediaPipe Hand Tracking 
// See https://mediapipe-studio.webapps.google.com/home
// Uses p5.js v.1.8.0 + MediaPipe v.0.10.7
// By Golan Levin, version of 10/29/2023
// Huge thanks to Orr Kislev, who made it work in p5's global mode!
// Based off of: https://editor.p5js.org/golan/sketches/0yyu6uEwM


let mySeed;

let displace = 0;

let brush = { x:0, y:0, px:0, py:0 }

// Don't change the names of these global variables.
let myHandLandmarker;
let handLandmarks;
let handednesses = [];
let myCapture;
let lastVideoTime = -1;
let doFlipHorizontal = true;
let myColor;

let imgCorazon;
let imgCuerpo;
let imgOjos; 
let imgGarabatos;
let imgBuhoAnimado;
let imgSplash;
let imgAmarillo;
let imgVerde;

OPC.toggle('manos', 1);

OPC.select('forma', ["ninguna","corazon","buho","buho-animado","splash","amarillo","verde"]);


// Works best with just one or two sets of landmarks.
const trackingConfig = {
  cpuOrGpuString: "GPU", /* "GPU" or "CPU" */
  maxNumHands: 2,
};
 
//------------------------------------------
async function preload() {
	
  const mediapipe_module = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js');
  HandLandmarker = mediapipe_module.HandLandmarker;
  FilesetResolver = mediapipe_module.FilesetResolver;
  
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.7/wasm"
  );
  
  // Hand Landmark Tracking:
  // https://codepen.io/mediapipe-preview/pen/gOKBGPN
  // https://mediapipe-studio.webapps.google.com/studio/demo/hand_landmarker
	myHandLandmarker = await HandLandmarker.createFromOptions(vision, {
		numHands: trackingConfig.maxNumHands,
		runningMode: "VIDEO",
		baseOptions: {
			delegate: trackingConfig.cpuOrGpuString,
			modelAssetPath:
				"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
		},
	});
	
	imgCorazon = loadImage("/visuals/hand-paint/corazon3d_v2.png");
  imgCuerpo = loadImage("/visuals/hand-paint/cuerpo.png");
	imgOjos   = loadImage("/visuals/hand-paint/ojos.png");
	imgBuhoAnimado = loadImage("/visuals/hand-paint/buho2.gif");
	imgSplash = loadImage("/visuals/hand-paint/splash.gif");
	imgAmarillo = loadImage("/visuals/hand-paint/amarillo.gif");
	imgVerde = loadImage("/visuals/hand-paint/verde.gif");
	
}

//------------------------------------------
async function predictWebcam() {
  let startTimeMs = performance.now();
  if (lastVideoTime !== myCapture.elt.currentTime) {
    if (myHandLandmarker) {
      handLandmarks = myHandLandmarker.detectForVideo(myCapture.elt,startTimeMs);
    }
		
		if (handLandmarks && handLandmarks.landmarks) {
			const nHands = handLandmarks.landmarks.length;
			for (let h = 0; h < nHands; h++) {
				handednesses[h] = handLandmarks.handednesses[h][0].displayName;
			}
		}
		
		// Flip data if requested.
		if (doFlipHorizontal){
			if (handLandmarks && handLandmarks.landmarks) {
				const nHands = handLandmarks.landmarks.length;
				for (let h = 0; h < nHands; h++) {
					let joints = handLandmarks.landmarks[h];
					for (let i = 0; i <= 20; i++) {
						let px = 1.0 - joints[i].x;
						joints[i].x = px;
					}
				}
			}
		}
    lastVideoTime = myCapture.elt.currentTime;
  }
  window.requestAnimationFrame(predictWebcam);
}


//------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
	seed = random(1000);
	strokeCap(ROUND);
	ellipseMode(CENTER);
	rectMode(CENTER);
	imageMode(CENTER);
	myCapture = createCapture(VIDEO);
  myCapture.size(windowWidth, windowHeight);
	myCapture.hide();
	fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  predictWebcam();
  drawVideoBackground();
  drawHandPoints();
}

//------------------------------------------
function drawVideoBackground() {
  push();
	if (doFlipHorizontal){
		translate(width, 0);
		scale(-1, 1);
	}
  tint(255, 255, 255, 150);
  image(myCapture, width/2,height/2, width, height);
  //tint(128);
  pop();
}


//------------------------------------------
// HANDS: 21 2D landmarks per hand, up to maxNumHands at once
// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker#configurations_options
// https://mediapipe-studio.webapps.google.com/studio/demo/hand_landmarker

function drawHandPoints() {
	if (handLandmarks && handLandmarks.landmarks) {
		const nHands = handLandmarks.landmarks.length;
		if (nHands > 0) {
			// Draw lines connecting the joints of the fingers

			let joints;
			
			for (let h = 0; h < nHands; h++) {
				noFill();
				stroke("black");
				joints = handLandmarks.landmarks[h];
				drawConnectors(joints, HANDLANDMARKER_PALM);
				drawConnectors(joints, HANDLANDMARKER_THUMB);
				drawConnectors(joints, HANDLANDMARKER_INDEX_FINGER);
				drawConnectors(joints, HANDLANDMARKER_MIDDLE_FINGER);
				drawConnectors(joints, HANDLANDMARKER_RING_FINGER);
				drawConnectors(joints, HANDLANDMARKER_PINKY);
				
				let whichHand = handednesses[h];
				let px = map(joints[0].x, 0, 1, 0, width);
			  let py = map(joints[0].y, 0, 1, 0, height); 
				fill(0);
				textAlign(CENTER);
			}

			
			for(let h = 0;h < nHands;h++){
				
				joints = handLandmarks.landmarks[h];
				
				let px1 = joints[4].x;
				let py1 = joints[4].y;
				
				px1 = map(px1,0,1,0,width);
				py1 = map(py1,0,1,0,height);
				
				let px2 = joints[8].x;
				let py2 = joints[8].y;
				
				px2 = map(px2,0,1,0,width);
				py2 = map(py2,0,1,0,height);

				let angle = atan2(py2 - py1, px2 - px1);
				
				let mid = createVector((px1 + px2)/2,(py1 + py2)/2);
		
				let dd = dist(px1,py1,px2,py2);

				
				if (h == 0)
				{
					push();
					translate(mid.x,mid.y);
					rotate(angle + PI/2);
					
					if(forma == "buho")
					{
					  image(imgCuerpo,0,0,dd,dd);
            image(imgOjos,0 + displace*cos(frameCount),0 + displace*sin(frameCount),dd,dd);
					}
					if(forma == "corazon")
					{
						image(imgCorazon,0,0,dd,dd);
					}
	
					if (forma == "buho-animado")
					{
						image(imgBuhoAnimado,0,0,dd,dd);
					}
					
					if (forma == "splash")
					{
						image(imgSplash,0,0,dd,dd);
					}
					
					if (forma == "amarillo")
					{
						image(imgAmarillo,0,0,dd,dd);
					}
					
					if (forma == "verde")
					{
						image(imgVerde,0,0,dd,dd);
					}
					
					pop();
					
				}
				
				if (h == 1)
	      {
					
					dd = dist(px1,py1,px2,py2);
				  displace = dd*0.01;
				}
			}
			
		}
	}
}

//------------------------------------------
function drawConnectors(landmarks, connectorSet) {
  if (landmarks) {
    let nConnectors = connectorSet.length;
    for (let i=0; i<nConnectors; i++){
      let index0 = connectorSet[i].start; 
      let index1 = connectorSet[i].end;
      let x0 = map(landmarks[index0].x, 0,1, 0,width);
      let y0 = map(landmarks[index0].y, 0,1, 0,height);
      let x1 = map(landmarks[index1].x, 0,1, 0,width);
      let y1 = map(landmarks[index1].y, 0,1, 0,height);
			if (manos)
			{
				stroke(255,0,0);
				fill(255,0,0);
				circle(x0,y0,10);
				circle(x1,y1,10);
				stroke(0,255,0);
				line(x0,y0, x1,y1); 
			}
    }
  }
}

function mousePressed() {
  saveCanvas('screenshot', 'png');
}



