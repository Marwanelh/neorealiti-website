export interface DemoControl {
  id: string
  label: string
  type: 'range' | 'toggle'
  min?: number
  max?: number
  step?: number
  default: number | boolean
  unit?: string
}

export interface Demo {
  id: string
  title: string
  description: string
  category: 'shader' | 'generative' | 'interactive' | 'camera' | 'ai-ml'
  tech: string
  thumbnail: string
  camera: boolean
  html: string
  hint?: string
  controls?: DemoControl[]
  hidden?: boolean
}

const plasmaHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><canvas id="c"></canvas><div class="label">GLSL · Teal Plasma · Move cursor to warp</div><script>
var c=document.getElementById('c'),gl=c.getContext('webgl')||c.getContext('experimental-webgl'),mouse=[0,0],start=Date.now();
function resize(){c.width=innerWidth;c.height=innerHeight;gl&&gl.viewport(0,0,c.width,c.height);}
resize();window.addEventListener('resize',resize);
window.addEventListener('mousemove',function(e){mouse[0]=e.clientX;mouse[1]=e.clientY;});
if(!gl){document.body.innerHTML='<div style="color:#008197;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace">WebGL not supported</div>';}
var vs='attribute vec2 pos;void main(){gl_Position=vec4(pos,0.0,1.0);}';
var fs=[
'precision highp float;',
'uniform float time;uniform vec2 res;uniform vec2 mouse;',
'float plasma(vec2 p,float t){',
'  float v=0.0;',
'  v+=sin(p.x*5.0+t);',
'  v+=sin(p.y*4.0+t*1.1);',
'  v+=sin((p.x+p.y)*3.5+t*0.9);',
'  v+=sin(length(p)*7.0-t*1.8);',
'  return v;}',
'void main(){',
'  vec2 uv=gl_FragCoord.xy/res;',
'  vec2 p=uv*2.0-1.0;p.x*=res.x/res.y;',
'  vec2 m=mouse/res*2.0-1.0;m.x*=res.x/res.y;m.y=-m.y;',
'  float t=time*0.4;',
'  float v=plasma(p,t)+sin(length(p-m)*8.0-t*2.5)*0.6;',
'  v=v*0.25+0.5;',
'  vec3 dark=vec3(0.0,0.02,0.05);',
'  vec3 mid=vec3(0.0,0.51,0.59);',
'  vec3 bright=vec3(0.0,0.78,0.87);',
'  vec3 w=vec3(0.75,1.0,1.0);',
'  vec3 col=mix(dark,mid,smoothstep(0.0,0.45,v));',
'  col=mix(col,bright,smoothstep(0.4,0.75,v));',
'  col=mix(col,w,smoothstep(0.8,1.0,v));',
'  gl_FragColor=vec4(col,1.0);}'].join('\\n');
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));
gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);
var buf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
var pos=gl.getAttribLocation(prog,'pos');
gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
var uT=gl.getUniformLocation(prog,'time'),uR=gl.getUniformLocation(prog,'res'),uM=gl.getUniformLocation(prog,'mouse');
(function draw(){requestAnimationFrame(draw);var t=(Date.now()-start)/1000;gl.uniform1f(uT,t);gl.uniform2f(uR,c.width,c.height);gl.uniform2f(uM,mouse[0],mouse[1]);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);})();
</script></body></html>`

const particleHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{overflow:hidden;background:#000}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><div class="label">THREE.JS · Particle Storm · Move cursor</div><script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script>
var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,2000);
camera.position.z=80;
var renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
document.body.appendChild(renderer.domElement);
window.addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
var count=18000,positions=new Float32Array(count*3),colors=new Float32Array(count*3);
for(var i=0;i<count;i++){
  var i3=i*3,t=Math.random();
  positions[i3]=(Math.random()-0.5)*220;
  positions[i3+1]=(Math.random()-0.5)*220;
  positions[i3+2]=(Math.random()-0.5)*220;
  colors[i3]=t*0.15;colors[i3+1]=0.45+t*0.55;colors[i3+2]=0.55+t*0.45;}
var geo=new THREE.BufferGeometry();
geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
var mat=new THREE.PointsMaterial({size:0.7,vertexColors:true,transparent:true,opacity:0.9,sizeAttenuation:true});
var pts=new THREE.Points(geo,mat);scene.add(pts);
var mouse={x:0,y:0};
window.addEventListener('mousemove',function(e){mouse.x=(e.clientX/innerWidth-0.5)*2;mouse.y=-(e.clientY/innerHeight-0.5)*2;});
var clock=new THREE.Clock();
(function animate(){requestAnimationFrame(animate);var el=clock.getElapsedTime();
pts.rotation.y=el*0.04;pts.rotation.x=el*0.015;
camera.position.x+=(mouse.x*25-camera.position.x)*0.04;
camera.position.y+=(mouse.y*25-camera.position.y)*0.04;
camera.lookAt(scene.position);renderer.render(scene,camera);})();
</script></body></html>`

const flowHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{overflow:hidden;background:#000}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><div class="label">P5.JS · Neural Flow · Move cursor</div><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>
new p5(function(p){
var pars=[],N=900,t=0;
p.setup=function(){p.createCanvas(p.windowWidth,p.windowHeight);p.colorMode(p.HSB,360,100,100,100);p.background(0);for(var i=0;i<N;i++)pars.push({x:p.random(p.width),y:p.random(p.height),life:p.random(80,200),max:p.random(80,200)});};
p.windowResized=function(){p.resizeCanvas(p.windowWidth,p.windowHeight);};
function ang(x,y){var a=p.noise(x*0.003,y*0.003,t*0.004)*p.TWO_PI*2;var dx=x-p.mouseX,dy=y-p.mouseY,d=p.sqrt(dx*dx+dy*dy),inf=p.max(0,1-d/200);return a+inf*p.atan2(dy,dx)*0.4;}
p.draw=function(){p.fill(0,0,0,10);p.noStroke();p.rect(0,0,p.width,p.height);
for(var i=0;i<pars.length;i++){var r=pars[i],a=ang(r.x,r.y),nx=r.x+p.cos(a)*2.2,ny=r.y+p.sin(a)*2.2,lr=r.life/r.max;
p.stroke(p.map(lr,0,1,170,200),p.map(lr,0,1,30,100),p.map(lr,0,1,20,100),p.map(lr,0,0.25,0,70));
p.strokeWeight(1.1);p.line(r.x,r.y,nx,ny);r.x=nx;r.y=ny;r.life--;
if(r.life<=0||r.x<0||r.x>p.width||r.y<0||r.y>p.height)pars[i]={x:p.random(p.width),y:p.random(p.height),life:p.random(80,200),max:p.random(80,200)};}
t++;};});
</script></body></html>`

const cameraHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:10}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<canvas id="c"></canvas>
<div class="label">MediaPipe · Face Mesh · 468 Landmarks</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startCam()">Enable Camera</button><div class="hint">Camera · Face Mesh · Particles</div></div>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script>
var C=document.getElementById('c'),ctx=C.getContext('2d');
var W=C.width=innerWidth,H=C.height=innerHeight;
window.addEventListener('resize',function(){W=C.width=innerWidth;H=C.height=innerHeight;});
var faceResults=null,pts=[],frame=0,videoEl=null;
var OVAL=[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
var LEYE=[362,382,381,380,374,373,390,249,263,466,388,387,386,385,384,398];
var REYE=[33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246];
var LBROW=[336,296,334,293,300,276,283,282,295,285];
var RBROW=[70,63,105,66,107,55,65,52,53,46];
var NOSE=[168,6,197,195,5,4,1,19,94];
var LOUT=[61,146,91,181,84,17,314,405,321,375,291,409,270,269,267,0,37,39,40,185];
var LIN=[78,95,88,178,87,14,317,402,318,324,308,415,310,311,312,13,82,81,80,191];
function setStatus(s){document.getElementById('st').textContent=s;}
function drawContour(idxs,lms,close,squig){
  if(!lms||lms.length<1)return;
  ctx.beginPath();
  for(var i=0;i<idxs.length;i++){
    var p=lms[idxs[i]];if(!p)continue;
    var px=(1-p.x)*W,py=p.y*H;
    if(squig){px+=Math.sin(frame*0.05+i*1.1)*1.8;py+=Math.cos(frame*0.04+i*0.9)*1.2;}
    if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  if(close)ctx.closePath();ctx.stroke();
}
function render(){
  requestAnimationFrame(render);frame++;
  ctx.fillStyle='rgba(0,0,0,0.85)';ctx.fillRect(0,0,W,H);
  if(videoEl&&videoEl.readyState>=2){
    ctx.save();ctx.translate(W,0);ctx.scale(-1,1);ctx.globalAlpha=0.22;ctx.drawImage(videoEl,0,0,W,H);ctx.globalAlpha=1;ctx.restore();
    ctx.fillStyle='rgba(0,5,12,0.48)';ctx.fillRect(0,0,W,H);
  }
  if(faceResults&&faceResults.multiFaceLandmarks&&faceResults.multiFaceLandmarks.length>0){
    var lms=faceResults.multiFaceLandmarks[0];
    ctx.fillStyle='rgba(0,200,215,0.07)';
    for(var i=0;i<lms.length;i++){ctx.beginPath();ctx.arc((1-lms[i].x)*W,lms[i].y*H,0.8,0,Math.PI*2);ctx.fill();}
    ctx.lineWidth=1;ctx.shadowBlur=8;ctx.shadowColor='#00C8DC';
    ctx.strokeStyle='rgba(0,200,215,0.80)';drawContour(OVAL,lms,true,false);
    ctx.strokeStyle='rgba(0,200,215,0.65)';drawContour(LEYE,lms,true,true);drawContour(REYE,lms,true,true);
    ctx.strokeStyle='rgba(0,200,215,0.50)';drawContour(LBROW,lms,false,true);drawContour(RBROW,lms,false,true);
    ctx.strokeStyle='rgba(0,180,200,0.40)';drawContour(NOSE,lms,false,false);
    ctx.strokeStyle='rgba(0,230,245,0.85)';drawContour(LOUT,lms,true,false);drawContour(LIN,lms,true,false);
    ctx.shadowBlur=0;
    if(frame%2===0&&Math.random()<0.6){var fp=lms[OVAL[Math.floor(Math.random()*OVAL.length)]];if(fp)pts.push({x:(1-fp.x)*W,y:fp.y*H,vx:(Math.random()-0.5)*0.7,vy:-Math.random()*1-0.2,life:1,sz:Math.random()*1.8+0.4});}
    setStatus('Face mesh · 468 landmarks');
  }else if(videoEl){setStatus('Point camera at your face');}
  for(var pi=pts.length-1;pi>=0;pi--){var pt=pts[pi];pt.x+=pt.vx;pt.y+=pt.vy;pt.vy-=0.012;pt.life-=0.016;if(pt.life<=0){pts.splice(pi,1);continue;}ctx.globalAlpha=pt.life*0.65;ctx.fillStyle='#00C8DC';ctx.beginPath();ctx.arc(pt.x,pt.y,pt.sz*pt.life,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  ctx.fillStyle='rgba(0,100,120,0.02)';for(var sy=0;sy<H;sy+=3)ctx.fillRect(0,sy,W,1);
  var vg=ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.85);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,5,12,0.65)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
}
function startCam(){
  document.getElementById('ui').style.display='none';
  setStatus('Loading MediaPipe face mesh...');
  var fm=new FaceMesh({locateFile:function(f){return 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'+f;}});
  fm.setOptions({maxNumFaces:1,refineLandmarks:true,minDetectionConfidence:0.5,minTrackingConfidence:0.5});
  fm.onResults(function(r){faceResults=r;});
  fm.initialize().then(function(){
    setStatus('Point camera at your face');
    navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false}).then(function(stream){
      videoEl=document.createElement('video');
      videoEl.srcObject=stream;videoEl.autoplay=true;videoEl.playsInline=true;videoEl.muted=true;
      videoEl.style.cssText='position:absolute;left:-9999px';
      document.body.appendChild(videoEl);
      videoEl.play().catch(function(){});
      var camUtil=new Camera(videoEl,{onFrame:async function(){await fm.send({image:videoEl});},width:640,height:480});
      camUtil.start();
      render();
    }).catch(function(e){setStatus('Camera error: '+e.message);});
  }).catch(function(e){setStatus('Model error: '+e.message);});
}
ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='rgba(0,129,151,0.07)';ctx.lineWidth=1;
for(var gx=0;gx<W;gx+=44){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
for(var gy=0;gy<H;gy+=44){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
ctx.fillStyle='rgba(0,200,215,0.25)';ctx.font='11px monospace';ctx.textAlign='center';
ctx.fillText('ENABLE CAMERA TO ACTIVATE FACE MESH',W/2,H/2);
</script></body></html>`

const voidHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}</style></head><body><canvas id="c"></canvas><script>
var c=document.getElementById('c'),gl=c.getContext('webgl')||c.getContext('experimental-webgl'),mouse=[0.5,0.5],start=Date.now();
function resize(){c.width=innerWidth;c.height=innerHeight;gl&&gl.viewport(0,0,c.width,c.height);}
resize();window.addEventListener('resize',resize);
window.addEventListener('mousemove',function(e){mouse[0]=e.clientX/innerWidth;mouse[1]=1.0-e.clientY/innerHeight;});
if(!gl){document.body.innerHTML='<div style="color:#008197;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace">WebGL not supported</div>';}else{
var vs='attribute vec2 pos;void main(){gl_Position=vec4(pos,0.0,1.0);}';
var fs=[
'precision highp float;',
'uniform float time;uniform vec2 res;uniform vec2 mouse;',
'float sdSphere(vec3 p,float r){return length(p)-r;}',
'float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}',
'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
'float scene(vec3 p){',
'  vec3 q=p;float spd=time*0.22;',
'  q.xz=rot(spd)*q.xz;q.xy=rot(spd*0.65)*q.xy;',
'  float t1=sdTorus(q,vec2(1.5,0.22));',
'  float t2=sdTorus(q.yxz,vec2(1.05,0.16));',
'  float t3=sdTorus(q.xzy,vec2(0.65,0.11));',
'  float s=sdSphere(p,0.32);',
'  return min(min(min(t1,t2),t3),s);}',
'vec3 normal(vec3 p){vec2 e=vec2(0.001,0.0);',
'  return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}',
'vec3 starField(vec3 rd){',
'  vec3 col=mix(vec3(0.0,0.008,0.02),vec3(0.005,0.0,0.015),rd.y*0.5+0.5);',
'  for(float i=1.0;i<=3.0;i++){',
'    vec3 f=floor(rd*7.0*i);',
'    float h=fract(sin(dot(f,vec3(127.1,311.7,74.7)))*43758.5);',
'    col+=vec3(0.7,0.9,1.0)*pow(h,32.0)*0.6/i;}',
'  return col;}',
'void main(){',
'  vec2 uv=(gl_FragCoord.xy-res*0.5)/res.y;',
'  vec2 m=(mouse-0.5)*2.0;',
'  float theta=m.x*1.6+time*0.06;',
'  float phi=m.y*0.7;',
'  float camR=4.2;',
'  vec3 ro=vec3(sin(theta)*cos(phi)*camR,sin(phi)*2.0+0.3,cos(theta)*cos(phi)*camR);',
'  vec3 ta=vec3(0.0,0.0,0.0);',
'  vec3 fwd=normalize(ta-ro);',
'  vec3 right=normalize(cross(vec3(0.0,1.0,0.0),fwd));',
'  vec3 up=cross(fwd,right);',
'  vec3 rd=normalize(uv.x*right+uv.y*up+1.3*fwd);',
'  float dist=0.0,tt=0.0;',
'  for(int i=0;i<100;i++){',
'    vec3 p=ro+rd*tt;dist=scene(p);',
'    if(dist<0.0008||tt>20.0)break;tt+=dist*0.88;}',
'  vec3 col=starField(rd);',
'  if(dist<0.0008){',
'    vec3 p=ro+rd*tt;vec3 n=normal(p);',
'    vec3 l1=normalize(vec3(2.0,3.0,4.0));',
'    vec3 l2=normalize(vec3(-1.5,-1.0,1.5));',
'    float diff=max(dot(n,l1),0.0);',
'    float diff2=max(dot(n,l2),0.0)*0.2;',
'    float spec=pow(max(dot(reflect(-l1,n),-rd),0.0),90.0);',
'    float nDotV=abs(dot(n,-rd));',
'    float rim=pow(1.0-nDotV,2.8);',
'    float fresnel=pow(1.0-nDotV,4.0);',
'    vec3 darkC=vec3(0.0,0.06,0.14);',
'    vec3 midC=vec3(0.0,0.38,0.52);',
'    vec3 cyanC=vec3(0.0,0.82,1.0);',
'    vec3 whiteC=vec3(0.6,1.0,1.0);',
'    vec3 surfCol=darkC*(0.1+diff2);',
'    surfCol+=midC*diff*0.8;',
'    surfCol+=whiteC*spec*1.8;',
'    surfCol+=cyanC*rim*3.0;',
'    surfCol+=cyanC*fresnel*0.6;',
'    float pulseSphere=length(p)<0.34?sin(time*2.2)*0.5+0.5:0.0;',
'    surfCol+=cyanC*pulseSphere*1.5;',
'    float ao=exp(-tt*0.018);surfCol*=ao;',
'    float glow=smoothstep(0.05,0.0,dist);',
'    surfCol+=cyanC*glow*0.4;',
'    col=surfCol;}',
'  float fog=1.0-exp(-tt*0.028);',
'  col=mix(col,starField(rd)*0.4,fog);',
'  col=pow(max(col,0.0),vec3(0.82));',
'  gl_FragColor=vec4(col,1.0);}'].join("\\n");
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
var pos=gl.getAttribLocation(prog,'pos');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
var uT=gl.getUniformLocation(prog,'time'),uR=gl.getUniformLocation(prog,'res'),uM=gl.getUniformLocation(prog,'mouse');
(function draw(){requestAnimationFrame(draw);var t=(Date.now()-start)/1000;gl.uniform1f(uT,t);gl.uniform2f(uR,c.width,c.height);gl.uniform2f(uM,mouse[0],mouse[1]);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);})();}
<\/script></body></html>`

const voidTunnelHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><div class="label">P5.JS · Void Tunnel · Mouse X: twist · Mouse Y: speed</div><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>
new p5(function(p){
  p.setup=function(){
    p.createCanvas(p.windowWidth,p.windowHeight);
    p.rectMode(p.CENTER);
    p.noFill();
  };
  p.windowResized=function(){p.resizeCanvas(p.windowWidth,p.windowHeight);};
  p.draw=function(){
    p.background(0,50);
    p.translate(p.width/2,p.height/2);
    var numShapes=150;
    var maxDist=p.dist(0,0,p.width/2,p.height/2)*1.5;
    var twist=p.map(p.mouseX,0,p.width,0,0.2);
    var morphSpeed=p.map(p.mouseY,0,p.height,0.02,0.1);
    var morphState=p.sin(p.frameCount*morphSpeed);
    for(var i=numShapes;i>0;i--){
      p.push();
      var size=p.map(i,0,numShapes,0,maxDist*2);
      var angle=p.frameCount*0.01+(i*twist);
      p.rotate(angle);
      var weight=p.map(i,0,numShapes,0.5,4);
      p.strokeWeight(weight);
      var brightness=p.map(i,0,numShapes,0,255);
      var g=p.map(brightness,0,255,30,210);
      var b=p.map(brightness,0,255,50,230);
      p.stroke(0,g,b);
      var morph=p.map(morphState,-1,1,0,1);
      var cornerRadius=size/2*morph;
      p.rect(0,0,size,size,cornerRadius);
      p.pop();
    }
  };
});
</script></body></html>`

const accretionHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><canvas id="c"></canvas><div class="label">GLSL · Accretion Nebula · Fractal Raymarching</div><script>
var c=document.getElementById('c'),gl=c.getContext('webgl')||c.getContext('experimental-webgl'),start=Date.now();
function resize(){c.width=innerWidth;c.height=innerHeight;gl&&gl.viewport(0,0,c.width,c.height);}
resize();window.addEventListener('resize',resize);
if(!gl){document.body.innerHTML='<div style="color:#008197;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace">WebGL not supported</div>';}
var vs='attribute vec2 pos;varying vec2 vTexCoord;void main(){vTexCoord=pos*0.5+0.5;gl_Position=vec4(pos,0.0,1.0);}';
var fs=[
'#ifdef GL_ES',
'precision highp float;',
'#endif',
'uniform vec2 iResolution;',
'uniform float iTime;',
'varying vec2 vTexCoord;',
'float tanh_approx(float x){x=clamp(x,-3.0,3.0);float x2=x*x;return x*(27.0+x2)/(27.0+9.0*x2);}',
'void main(){',
'  vec2 uv=vTexCoord*2.0-1.0;',
'  uv.x*=iResolution.x/iResolution.y;',
'  const int MAX_STEPS=20;',
'  const int NOISE_ITER=7;',
'  float rayDepth=0.0;float stepDist=0.0;',
'  vec4 finalColor=vec4(0.0);',
'  vec3 rayDir=normalize(vec3(uv,1.0));',
'  for(int step=0;step<MAX_STEPS;step++){',
'    vec3 pos=rayDepth*rayDir+0.1;',
'    float angle=atan(pos.y/0.2,pos.x)*2.0;',
'    float radius=length(pos.xy)-5.0-rayDepth*0.2;',
'    float height=pos.z/3.0;',
'    pos=vec3(angle,height,radius);',
'    for(int n=1;n<=NOISE_ITER;n++){',
'      float ns=float(n);',
'      vec3 ni=pos.yzx*ns+iTime+0.3*float(step);',
'      pos+=sin(ni)/ns;',
'    }',
'    vec3 surf=0.4*cos(pos)-0.4;',
'    stepDist=length(vec4(surf,pos.z));',
'    rayDepth+=stepDist;',
'    float cp=pos.x+float(step)*0.4+rayDepth;',
'    vec4 cpat=vec4(6.0,1.0,9.0,0.0);',
'    finalColor+=(1.0+cos(cp+cpat))/stepDist;',
'  }',
'  vec4 c2=finalColor*finalColor/400.0;',
'  c2.r=tanh_approx(c2.r);c2.g=tanh_approx(c2.g);c2.b=tanh_approx(c2.b);c2.a=1.0;',
'  gl_FragColor=c2;',
'}'].join('\\n');
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));
gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);
var buf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
var pos=gl.getAttribLocation(prog,'pos');
gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
var uT=gl.getUniformLocation(prog,'iTime'),uR=gl.getUniformLocation(prog,'iResolution');
(function draw(){requestAnimationFrame(draw);var t=(Date.now()-start)/1000;gl.uniform1f(uT,t);gl.uniform2f(uR,c.width,c.height);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);})();
</script></body></html>`

const squiggleCamHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;display:none}.ui.show{display:block}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.4);font-family:monospace;font-size:10px;letter-spacing:.1em;margin-top:12px}</style></head><body>
<div class="label">P5.JS · Squiggle Cam · Camera required</div>
<div class="ui show" id="ui"><button class="btn" id="startBtn">Start Camera</button><div class="hint">Camera access required</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>
var started=false;
document.getElementById('startBtn').addEventListener('click',function(){
  document.getElementById('ui').classList.remove('show');
  startSketch();
});
function startSketch(){
  new p5(function(p){
    var video,off,offCtx,VW=320,VH=180,lineSpacing=9,strength=4,frame=0,px=null;
    p.setup=function(){
      p.createCanvas(p.windowWidth,p.windowHeight);
      p.pixelDensity(1);p.noFill();
      video=p.createCapture({video:{facingMode:'user',width:{ideal:640},height:{ideal:360}},audio:false});
      video.elt.setAttribute('playsinline','');video.elt.muted=true;video.hide();
      off=document.createElement('canvas');off.width=VW;off.height=VH;
      offCtx=off.getContext('2d',{willReadFrequently:true});
    };
    p.windowResized=function(){p.resizeCanvas(p.windowWidth,p.windowHeight);};
    p.draw=function(){
      if(!video||!video.elt||video.elt.readyState<2)return;
      frame++;
      if(frame%2===0){
        offCtx.save();offCtx.translate(VW,0);offCtx.scale(-1,1);offCtx.drawImage(video.elt,0,0,VW,VH);offCtx.restore();
        px=offCtx.getImageData(0,0,VW,VH).data;
      } else return;
      var W=p.width,H=p.height;
      var ctx2d=p.drawingContext;
      ctx2d.fillStyle='#000';ctx2d.fillRect(0,0,W,H);
      ctx2d.lineWidth=0.9;
      for(var y=lineSpacing;y<H-lineSpacing;y+=lineSpacing){
        var cy=Math.floor(y/H*VH);cy=Math.min(VH-1,cy);
        var ridx=(cy*VW+Math.floor(VW/2))*4;
        var rb=(px[ridx]*0.299+px[ridx+1]*0.587+px[ridx+2]*0.114);
        ctx2d.strokeStyle='rgb(0,'+Math.floor(50+rb*0.67)+','+Math.floor(80+rb*0.59)+')';
        ctx2d.beginPath();
        for(var x=0;x<W;x+=5){
          var cx=Math.floor(x/W*VW);cx=Math.min(VW-1,cx);
          var idx=(cy*VW+cx)*4;
          var bright=(px[idx]*0.299+px[idx+1]*0.587+px[idx+2]*0.114);
          var dy2=(bright/255-0.5)*strength*2.2;
          if(x===0)ctx2d.moveTo(x,y+dy2);else ctx2d.lineTo(x,y+dy2);
        }
        ctx2d.stroke();
      }
    };
  });
}
</script></body></html>`

const opticalFlowHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body>
<div class="label">P5.JS · Optical Flow · Camera required</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>
new p5(function(p){
  var video,prevPixels=[],particles=[];
  var calcW=320,calcH=240,GRID_STEP=8,maxParticles=3000;
  var cW,cH,scaleX,scaleY;
  p.setup=function(){
    cW=p.windowWidth;cH=p.windowHeight;
    p.createCanvas(cW,cH);
    p.pixelDensity(1);p.noStroke();
    scaleX=cW/calcW;scaleY=cH/calcH;
    video=p.createCapture(p.VIDEO);
    video.size(calcW,calcH);
    video.hide();
    p.colorMode(p.HSB,360,100,100,100);
  };
  p.draw=function(){
    if(video&&video.width>0){p.colorMode(p.RGB);p.push();p.translate(p.width,0);p.scale(-1,1);p.tint(0,140,160,130);p.image(video,0,0,p.width,p.height);p.noTint();p.pop();p.colorMode(p.HSB,360,100,100,100);}
    p.fill(0,0,0,18);p.noStroke();p.rect(0,0,p.width,p.height);
    if(video.width>0){
      video.loadPixels();
      if(video.pixels.length>0){
        if(prevPixels.length>0)calculateFlow(prevPixels,video.pixels);
        prevPixels=new Uint8ClampedArray(video.pixels);
      }
    }
    for(var i=particles.length-1;i>=0;i--){
      var pt=particles[i];
      pt.x+=pt.vx;pt.y+=pt.vy;pt.vx*=0.9;pt.vy*=0.9;pt.life-=0.04;
      drawParticle(pt);
      if(pt.life<=0)particles.splice(i,1);
    }
  };
  function calculateFlow(oldP,newP){
    for(var y=GRID_STEP;y<calcH-GRID_STEP;y+=GRID_STEP){
      for(var x=GRID_STEP;x<calcW-GRID_STEP;x+=GRID_STEP){
        var idx=(y*calcW+x)*4;
        var gx=newP[idx+5]-newP[idx-3];
        var gy=newP[idx+calcW*4+1]-newP[idx-calcW*4+1];
        var gt=oldP[idx+1]-newP[idx+1];
        var u=0,v=0;
        var den=gx*gx+gy*gy;
        if(den>0){var t2=-gt/den;u=gx*t2;v=gy*t2;}
        var mag=Math.abs(u)+Math.abs(v);
        if(mag>10&&mag<100&&particles.length<maxParticles){
          particles.push(makeParticle(x*scaleX,y*scaleY,-u*scaleX,v*scaleY));
        }
      }
    }
  }
  function makeParticle(x,y,vx,vy){
    var r=p.random(0.5,1.5);
    var pvx=vx*r,pvy=vy*r;
    var life=1.0;
    var speed=Math.sqrt(pvx*pvx+pvy*pvy);
    var h=p.map(p.constrain(speed,0,20),0,20,195,170);
    return {x:x,y:y,vx:pvx,vy:pvy,life:life,h:h};
  }
  function drawParticle(pt){
    p.push();
    p.translate(p.width,0);p.scale(-1,1);
    p.noStroke();
    p.fill(pt.h,85,100,pt.life*100);
    var speed=Math.sqrt(pt.vx*pt.vx+pt.vy*pt.vy);
    var sz=Math.max(0.8,pt.life*2.5);
    p.rect(pt.x,pt.y,sz,sz);
    p.pop();
  }
  p.windowResized=function(){cW=p.windowWidth;cH=p.windowHeight;p.resizeCanvas(cW,cH);scaleX=cW/calcW;scaleY=cH/calcH;};
});
</script></body></html>`

const liquidBallHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;overflow:hidden}canvas{display:block;width:100%;height:100%;position:absolute;top:0;left:0}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;z-index:10}.status{position:fixed;top:16px;left:50%;transform:translateX(-50%);color:rgba(0,200,215,0.7);font-family:monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;z-index:10}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:20;display:none}.ui.show{display:block}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.4);font-family:monospace;font-size:10px;letter-spacing:.1em;margin-top:12px}</style></head><body>
<canvas id="c"></canvas>
<div class="label">GLSL · Liquid Glass Ball · MediaPipe</div>
<div class="status" id="st">Loading...</div>
<div class="ui show" id="ui"><button class="btn" id="startBtn">Enable Camera</button><div class="hint">Camera · Hold both hands up · GLSL glass sphere</div></div>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script>
var VS='attribute vec2 aPos;varying vec2 vUV;void main(){vUV=aPos*.5+.5;gl_Position=vec4(aPos,0.,1.);}';
var FS='precision highp float;varying vec2 vUV;uniform sampler2D uVideo;uniform vec2 uRes;uniform vec4 uSphere;uniform float uTime;uniform float uVideoAspect;void main(){vec2 px=vUV*uRes;float cAsp=uRes.x/uRes.y;vec2 bgUV=vUV;if(cAsp>uVideoAspect){float s=uVideoAspect/cAsp;bgUV.y=.5+(vUV.y-.5)*s;}else{float s=cAsp/uVideoAspect;bgUV.x=.5+(vUV.x-.5)*s;}vec4 bg=texture2D(uVideo,clamp(vec2(1.-bgUV.x,bgUV.y),0.,1.));vec2 sc=uSphere.xy;float sr=uSphere.z;float alpha=uSphere.w;if(alpha<.005){gl_FragColor=bg;return;}vec2 d=px-sc;float ang=atan(d.y,d.x);float wob=sr*(sin(ang*5.+uTime*1.8)*.04+sin(ang*9.+uTime*2.6)*.02+sin(ang*13.+uTime*1.2)*.01);float dist=length(d);float effR=sr+wob;if(dist<effR){vec2 n2=d/effR;float nz=sqrt(max(0.,1.-dot(n2,n2)));vec3 N=normalize(vec3(n2.x,-n2.y,nz));vec3 V=vec3(0.,0.,1.);float fres=pow(clamp(1.-dot(N,V),0.,1.),2.5);vec3 refDir=refract(-V,N,1./1.45);vec2 rUV=bgUV+refDir.xy*.20;float ca=.008;float rr=texture2D(uVideo,clamp(vec2(1.-(rUV.x+ca*refDir.x),rUV.y),0.,1.)).r;float gg=texture2D(uVideo,clamp(vec2(1.-rUV.x,rUV.y),0.,1.)).g;float bb=texture2D(uVideo,clamp(vec2(1.-(rUV.x-ca*refDir.x),rUV.y),0.,1.)).b;vec3 refBg=vec3(rr,gg,bb);float ig=1.-dist/effR;float caus=(sin(ig*18.-uTime*3.)*.5+.5)*ig*.15;vec3 teal=vec3(0.,.78,.90)*ig*.5+vec3(0.,caus*.8,caus);vec2 hlPos=vec2(-.38,-.38);float hl=exp(-dot(n2-hlPos,n2-hlPos)*22.);float hl2=exp(-dot(n2-hlPos,n2-hlPos)*180.);vec3 gc=mix(refBg,vec3(.03,.08,.12),fres*.6)+teal+vec3(.55,.72,.80)*hl+vec3(1.)*hl2;gl_FragColor=vec4(mix(bg.rgb,gc,alpha),1.);}else if(dist<effR+4.){float rim=1.-(dist-effR)/4.;gl_FragColor=vec4(mix(bg.rgb,vec3(0.,.78,.90),rim*.8*alpha),1.);}else{float aura=max(0.,1.-(dist-effR)/(sr*.35));gl_FragColor=vec4(bg.rgb+vec3(0.,.78,.9)*aura*aura*.12*alpha,1.);}}';
var canvas=document.getElementById('c');
var W=innerWidth,H=innerHeight;
canvas.width=W;canvas.height=H;
window.addEventListener('resize',function(){W=innerWidth;H=innerHeight;canvas.width=W;canvas.height=H;if(gl)gl.viewport(0,0,W,H);});
function setStatus(s){document.getElementById('st').textContent=s;}
var gl=canvas.getContext('webgl')||canvas.getContext('experimental-webgl');
if(!gl){setStatus('WebGL not supported');throw 0;}
function mkShader(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){setStatus('Shader err: '+gl.getShaderInfoLog(s));}return s;}
var prog=gl.createProgram();
gl.attachShader(prog,mkShader(gl.VERTEX_SHADER,VS));
gl.attachShader(prog,mkShader(gl.FRAGMENT_SHADER,FS));
gl.linkProgram(prog);
if(!gl.getProgramParameter(prog,gl.LINK_STATUS)){setStatus('Link err: '+gl.getProgramInfoLog(prog));}
gl.useProgram(prog);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
var aPosL=gl.getAttribLocation(prog,'aPos');
gl.enableVertexAttribArray(aPosL);gl.vertexAttribPointer(aPosL,2,gl.FLOAT,false,0,0);
var uVideoL=gl.getUniformLocation(prog,'uVideo');
var uResL=gl.getUniformLocation(prog,'uRes');
var uSphereL=gl.getUniformLocation(prog,'uSphere');
var uTimeL=gl.getUniformLocation(prog,'uTime');
var uVideoAspectL=gl.getUniformLocation(prog,'uVideoAspect');
var tex=gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D,tex);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
var t=0,sphereX=W/2,sphereY=H/2,sphereR=80,sphereAlpha=0;
var handResults=null,videoEl=null;
function lerp(a,b,f){return a+(b-a)*f;}
function render(){
  requestAnimationFrame(render);t+=0.016;
  if(videoEl&&videoEl.readyState>=2){
    gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,videoEl);
  }
  if(handResults&&handResults.multiHandLandmarks&&handResults.multiHandLandmarks.length>=2){
    var h0=handResults.multiHandLandmarks[0],h1=handResults.multiHandLandmarks[1];
    var p0x=(1-h0[9].x)*W,p0y=h0[9].y*H,p1x=(1-h1[9].x)*W,p1y=h1[9].y*H;
    var dx=p1x-p0x,dy=p1y-p0y;
    var targetR=Math.max(30,Math.min(220,Math.sqrt(dx*dx+dy*dy)*0.35));
    sphereX=lerp(sphereX,(p0x+p1x)/2,.15);
    sphereY=lerp(sphereY,(p0y+p1y)/2,.15);
    sphereR+=(targetR-sphereR)*.12;
    sphereAlpha=lerp(sphereAlpha,1,.10);
    setStatus('Two hands · Glass sphere active');
  }else if(handResults&&handResults.multiHandLandmarks&&handResults.multiHandLandmarks.length===1){
    sphereAlpha=lerp(sphereAlpha,.4,.08);
    setStatus('One hand · Hold both hands up');
  }else if(handResults){
    sphereAlpha=lerp(sphereAlpha,0,.09);
    sphereR=lerp(sphereR,80,.02);
    setStatus('Hold both hands up');
  }
  gl.viewport(0,0,W,H);
  gl.uniform2f(uResL,W,H);
  gl.uniform4f(uSphereL,sphereX,H-sphereY,sphereR,sphereAlpha);
  gl.uniform1f(uTimeL,t);
  gl.uniform1f(uVideoAspectL,videoEl&&videoEl.videoWidth?videoEl.videoWidth/videoEl.videoHeight:4/3);
  gl.uniform1i(uVideoL,0);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}
document.getElementById('startBtn').addEventListener('click',function(){
  document.getElementById('ui').classList.remove('show');
  setStatus('Starting camera...');
  navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false}).then(function(stream){
    videoEl=document.createElement('video');
    videoEl.srcObject=stream;videoEl.autoplay=true;videoEl.playsInline=true;videoEl.muted=true;
    videoEl.style.display='none';document.body.appendChild(videoEl);
    videoEl.play().catch(function(){});
    videoEl.addEventListener('loadedmetadata',function(){setStatus('Camera: '+videoEl.videoWidth+'\xd7'+videoEl.videoHeight+' \u2022 Loading MediaPipe\u2026');});
    setStatus('Loading MediaPipe...');
    var hands=new Hands({locateFile:function(f){return 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/'+f;}});
    hands.setOptions({maxNumHands:2,modelComplexity:1,minDetectionConfidence:0.7,minTrackingConfidence:0.5});
    hands.onResults(function(results){handResults=results;});
    hands.initialize().then(function(){
      setStatus('Hold both hands up');
      var busy=false;
      (function sendFrame(){requestAnimationFrame(sendFrame);if(busy||videoEl.readyState<2)return;busy=true;hands.send({image:videoEl}).then(function(){busy=false;}).catch(function(){busy=false;});})();
    }).catch(function(e){setStatus('MediaPipe error: '+e.message);});
  }).catch(function(e){setStatus('Camera error: '+e.message);});
});
render();
</script></body></html>`

const neuralRippleHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<div class="label">ML5 · Neural Ripple · Hand Pose + GLSL</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startSketch()">Enable Camera</button><div class="hint">Open your hand to trigger ripples</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script><script>
var VERT='attribute vec3 aPosition;attribute vec2 aTexCoord;uniform mat4 uModelViewMatrix;uniform mat4 uProjectionMatrix;varying vec2 vTexCoord;void main(){vTexCoord=aTexCoord;gl_Position=uProjectionMatrix*uModelViewMatrix*vec4(aPosition,1.0);}';
var FRAG='precision highp float;varying vec2 vTexCoord;uniform sampler2D tex0;uniform vec2 uResolution;uniform vec2 uVideoSize;uniform float uTime;uniform vec3 uWaves[40];uniform int uWaveCount;void main(){vec2 uv=vTexCoord;vec2 p=uv*2.0-1.0;float aspect=uResolution.x/uResolution.y;p.x*=aspect;vec2 td=vec2(0.0);float ta=0.0;for(int i=0;i<40;i++){if(i>=uWaveCount)break;vec3 w=uWaves[i];vec2 c=w.xy*2.0-1.0;c.x*=aspect;vec2 d=p-c;float dist=length(d);float age=w.z;float r=age*0.9+0.1*sin(age*6.0);float ww=0.05+age*0.12;float dd=dist-r;float mask=smoothstep(ww,0.0,abs(dd));float str=1.0-age/2.5;float rip=sin(dd*30.0)*mask*str;vec2 dir=(dist>0.001)?normalize(d):vec2(0.0);td+=dir*rip*0.05;ta+=abs(rip);}vec2 duv=uv-td;vec2 ratio=uResolution/uVideoSize;float sc=max(ratio.x,ratio.y);vec2 off=(uResolution-uVideoSize*sc)*0.5;vec2 vu=(duv*uResolution-off)/(uVideoSize*sc);vu.x=1.0-vu.x;if(vu.x<0.0||vu.x>1.0||vu.y<0.0||vu.y>1.0){gl_FragColor=vec4(0.0,0.0,0.0,1.0);}else{float r2=texture2D(tex0,vu+td*0.01).r;float g=texture2D(tex0,vu).g;float b=texture2D(tex0,vu-td*0.01).b;vec3 col=vec3(r2,g,b);col+=vec3(ta*0.15);gl_FragColor=vec4(col,1.0);}}';
function setStatus(s){document.getElementById('st').textContent=s;}
function startSketch(){
  document.getElementById('ui').style.display='none';
  setStatus('Loading...');
  new p5(function(p){
    var video,handPose,hands=[],ripples=[],ripSh,wellPos,wellVel,wellTarget;
    var eF=0.08,damp=0.75,maxR=40;
    p.setup=async function(){
      p.createCanvas(p.windowWidth,p.windowHeight,p.WEBGL);
      p.noStroke();
      video=p.createCapture(p.VIDEO);video.size(640,480);video.hide();
      handPose=await ml5.handPose({flipped:true});
      handPose.detectStart(video.elt,function(r){hands=r;});
      ripSh=p.createShader(VERT,FRAG);
      wellPos=p.createVector(0.5,0.5);wellVel=p.createVector(0,0);wellTarget=p.createVector(0.5,0.5);
      setStatus('Open your hand to create ripples');
    };
    p.windowResized=function(){p.resizeCanvas(p.windowWidth,p.windowHeight);};
    function dSq(a,b){return (a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y);}
    function isOpen(h){
      var w=h.wrist;
      var ti=[h.index_finger_tip,h.middle_finger_tip,h.ring_finger_tip,h.pinky_finger_tip];
      var mi=[h.index_finger_mcp,h.middle_finger_mcp,h.ring_finger_mcp,h.pinky_finger_mcp];
      var o=0;for(var i=0;i<4;i++)if(dSq(ti[i],w)>dSq(mi[i],w)*1.8)o++;return o>=3;
    }
    function physics(){
      var vw=video.width||640,vh=video.height||480;
      var sc=Math.max(p.width/vw,p.height/vh);
      var ox=(p.width-vw*sc)*0.5,oy=(p.height-vh*sc)*0.5;
      var cnt=0,active=false,cx=0,cy=0;
      for(var i=0;i<hands.length;i++){
        var h=hands[i],k=h.middle_finger_mcp;
        if(k){cx+=k.x*sc+ox;cy+=k.y*sc+oy;cnt++;}
        if(isOpen(h))active=true;
      }
      if(cnt>0)wellTarget.set(cx/cnt/p.width,cy/cnt/p.height);
      var f=p5.Vector.sub(wellTarget,wellPos);f.mult(eF);wellVel.add(f);wellVel.mult(damp);wellPos.add(wellVel);
      if(active&&cnt>0&&p.frameCount%8===0)ripples.push({x:wellPos.x,y:wellPos.y,age:0});
    }
    p.draw=function(){
      p.background(0);
      if(!video.width)return;
      physics();
      for(var i=ripples.length-1;i>=0;i--){ripples[i].age+=0.015;if(ripples[i].age>2.5)ripples.splice(i,1);}
      if(ripples.length>maxR)ripples.shift();
      p.shader(ripSh);
      ripSh.setUniform('tex0',video);
      ripSh.setUniform('uResolution',[p.width,p.height]);
      ripSh.setUniform('uVideoSize',[video.width||640,video.height||480]);
      ripSh.setUniform('uTime',p.millis()*0.001);
      var data=new Array(maxR*3).fill(0);
      for(var j=0;j<ripples.length;j++){data[j*3]=ripples[j].x;data[j*3+1]=ripples[j].y;data[j*3+2]=ripples[j].age;}
      ripSh.setUniform('uWaves',data);
      ripSh.setUniform('uWaveCount',ripples.length);
      p.plane(p.width,p.height);
      if(p.frameCount%30===0)setStatus(hands.length>0?'Hand detected · Open palm for ripples':'Show your hand to the camera');
    };
  });
}
</script></body></html>`

const ribbonWarpHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<div class="label">ML5 · Ribbon Warp · Hand Pose + GLSL</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startSketch()">Enable Camera</button><div class="hint">Hold two hands up · A ribbon connects them</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script><script>
var VERT='precision highp float;attribute vec3 aPosition;attribute vec2 aTexCoord;uniform mat4 uProjectionMatrix;uniform mat4 uModelViewMatrix;varying vec2 vTexCoord;varying vec4 vScreenPos;void main(){vTexCoord=aTexCoord;vec4 pos=uProjectionMatrix*uModelViewMatrix*vec4(aPosition,1.0);vScreenPos=pos;gl_Position=pos;}';
var FRAG='precision highp float;uniform sampler2D tex0;uniform float uTime;varying vec2 vTexCoord;varying vec4 vScreenPos;float hash21(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}float noise2(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1.0,0.0)),f.x),mix(hash21(i+vec2(0.0,1.0)),hash21(i+vec2(1.0,1.0)),f.x),f.y);}void main(){vec2 suv=(vScreenPos.xy/vScreenPos.w)*0.5+0.5;suv.y=1.0-suv.y;float t=uTime;float n=noise2(suv*3.2+vec2(t*0.08,-t*0.06));float distort=sin((suv.x*10.0+n*2.2)+t*2.0)*0.010+sin((suv.y*5.0-n*1.6)-t*1.0)*0.010;float r=texture2D(tex0,suv+vec2(distort+0.006,0.0)).r;float g=texture2D(tex0,suv+vec2(distort,0.0)).g;float b=texture2D(tex0,suv+vec2(distort-0.006,0.0)).b;vec3 col=vec3(r,g,b);col+=vec3(0.10,0.28,0.55)*abs(distort)*9.0;float edge=smoothstep(0.0,0.12,vTexCoord.y)*smoothstep(1.0,0.88,vTexCoord.y);gl_FragColor=vec4(col,edge*0.92);}';
var hp=null,vid=null,rbSh=null,handsRaw=[],handsSmoothed=[],NC=40,nodes=[],ready=false,stEl=null;
function ss(s){if(stEl)stEl.textContent=s;}
function coverRect(vw,vh,cw,ch){var s=Math.max(cw/vw,ch/vh);return{w:vw*s,h:vh*s};}
function m2s(x,y,vw,vh,dw,dh){return createVector((x/vw-0.5)*dw,(y/vh-0.5)*dh,0);}
function initNodes(){nodes=[];for(var i=0;i<NC;i++)nodes.push({pos:createVector(0,0,0),old:createVector(0,0,0),pinned:false});}
function updSmooth(dt){
  var a=1.0-Math.pow(0.7,dt*60.0);
  var vw=vid&&vid.elt&&vid.elt.videoWidth?vid.elt.videoWidth:640;
  var obs=(handsRaw||[]).filter(function(h){return h&&h.keypoints&&h.keypoints.length>=21;}).map(function(h){var w=h.keypoints[0];return{h:h,s:h.handedness||(w.x<vw*0.5?'Left':'Right')};}).sort(function(a,b){return a.s<b.s?-1:1;});
  if(handsSmoothed.length!==obs.length){handsSmoothed=obs.map(function(o){return{kp:o.h.keypoints.map(function(k){return{x:k.x,y:k.y};})};});return;}
  for(var i=0;i<obs.length;i++){var src=obs[i].h,dst=handsSmoothed[i];for(var j=0;j<21;j++){var k=src.keypoints[j],kk=dst.kp[j];kk.x+=(k.x-kk.x)*a;kk.y+=(k.y-kk.y)*a;}}
}
function intNodes(dt){var gv=createVector(0,0.8*dt*60,0);for(var i=0;i<NC;i++){var n=nodes[i];if(n.pinned){n.old.set(n.pos);continue;}var vx=(n.pos.x-n.old.x)*0.92,vy=(n.pos.y-n.old.y)*0.92;n.old.set(n.pos);n.pos.x+=vx;n.pos.y+=vy;n.pos.add(gv);}}
function solveCon(its,rl){for(var k=0;k<its;k++){for(var i=0;i<NC-1;i++){var n1=nodes[i],n2=nodes[i+1],dx=n2.pos.x-n1.pos.x,dy=n2.pos.y-n1.pos.y,d2=dx*dx+dy*dy;if(d2<1e-4)continue;var d=Math.sqrt(d2),diff=(d-rl)/d,ox=dx*0.5*diff,oy=dy*0.5*diff;if(!n1.pinned){n1.pos.x+=ox;n1.pos.y+=oy;}if(!n2.pinned){n2.pos.x-=ox;n2.pos.y-=oy;}}}}
function setup(){createCanvas(windowWidth,windowHeight,WEBGL);pixelDensity(1);noStroke();textureMode(NORMAL);stEl=document.getElementById('st');}
function draw(){
  if(!ready||!vid||!vid.elt||vid.elt.readyState<2)return;
  var dt=constrain(deltaTime/1000,1/120,1/15);
  var vw=vid.elt.videoWidth||640,vh=vid.elt.videoHeight||480;
  var cov=coverRect(vw,vh,width,height),dw=cov.w,dh=cov.h;
  updSmooth(dt);
  resetShader();background(0);
  push();translate(0,0,-800);scale(-1,1,1);texture(vid);plane(dw,dh);pop();
  var tA=null,tB=null;
  if(handsSmoothed.length>0){var h1=handsSmoothed[0];tA=m2s((h1.kp[4].x+h1.kp[8].x)*0.5,(h1.kp[4].y+h1.kp[8].y)*0.5,vw,vh,dw,dh);}
  if(handsSmoothed.length>1){var h2=handsSmoothed[1];tB=m2s((h2.kp[4].x+h2.kp[8].x)*0.5,(h2.kp[4].y+h2.kp[8].y)*0.5,vw,vh,dw,dh);}
  if(tA){nodes[0].pos.set(tA);nodes[0].old.set(tA);nodes[0].pinned=true;}else{nodes[0].pinned=false;}
  if(tB){nodes[NC-1].pos.set(tB);nodes[NC-1].old.set(tB);nodes[NC-1].pinned=true;}else{nodes[NC-1].pinned=false;}
  intNodes(dt);solveCon(10,15);
  shader(rbSh);rbSh.setUniform('tex0',vid);rbSh.setUniform('uTime',millis()/1000);
  var gl2=drawingContext;gl2.enable(gl2.BLEND);gl2.blendFunc(gl2.SRC_ALPHA,gl2.ONE_MINUS_SRC_ALPHA);gl2.disable(gl2.DEPTH_TEST);
  beginShape(TRIANGLE_STRIP);
  for(var i=0;i<NC-1;i++){var p0=nodes[i].pos,p1=nodes[i+1].pos,ddx=p1.x-p0.x,ddy=p1.y-p0.y,d=Math.max(0.0001,Math.sqrt(ddx*ddx+ddy*ddy)),tx=ddx/d,ty=ddy/d,nx=-ty,ny=tx,u=i/(NC-1),w2=(28+(0.5+0.5*Math.sin(i*0.55+millis()*0.006))*16);vertex(p0.x-nx*w2,p0.y-ny*w2,0,u,0);vertex(p0.x+nx*w2,p0.y+ny*w2,0,u,1);}
  endShape();gl2.enable(gl2.DEPTH_TEST);
  if(frameCount%30===0)ss(handsSmoothed.length>0?handsSmoothed.length+' hand(s) · Ribbon active':'Hold hands up to stretch the ribbon');
}
function windowResized(){resizeCanvas(windowWidth,windowHeight);}
async function startSketch(){
  document.getElementById('ui').style.display='none';ss('Starting camera...');
  try{
    vid=createCapture({video:{facingMode:'user',width:{ideal:1280},height:{ideal:720},frameRate:{ideal:30,max:30}},audio:false});
    vid.elt.setAttribute('playsinline','');vid.elt.muted=true;vid.hide();
    ss('Loading hand pose...');
    await new Promise(function(res,rej){var t0=performance.now();(function tick(){if(vid.elt&&vid.elt.readyState>=2&&(vid.elt.videoWidth||0)>0)return res();if(performance.now()-t0>15000)return rej(new Error('timeout'));requestAnimationFrame(tick);})();});
    hp=await ml5.handPose({flipped:true,maxHands:2});
    hp.detectStart(vid.elt,function(r){handsRaw=Array.isArray(r)?r:[];});
    rbSh=createShader(VERT,FRAG);initNodes();ready=true;
    ss('Hold hands up to stretch the ribbon');
  }catch(e){ss('Error: '+e.message);}
}
</script></body></html>`

const asciiCamHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<canvas id="c"></canvas>
<div class="label">Camera · ASCII Art · Teal Characters</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startSketch()">Enable Camera</button><div class="hint">Live camera feed as ASCII art</div></div>
<script>
var C=document.getElementById('c'),ctx=C.getContext('2d');
var W=C.width=innerWidth,H=C.height=innerHeight;
window.addEventListener('resize',function(){W=C.width=innerWidth;H=C.height=innerHeight;});
var CHARS=['@','#','S','%','?','*','+',';',':',',',' '];
var COLS=['#00E5F5','#00C8DC','#00A8BE','#008197','#006070','#004455','#002830','#001418','#000c0f','#000407','#000000'];
var video=null,offscreen=null,offCtx=null,camW=160,camH=120,charW=8,charH=14,ready=false;
function setStatus(s){document.getElementById('st').textContent=s;}
function startSketch(){
  document.getElementById('ui').style.display='none';
  setStatus('Starting camera...');
  navigator.mediaDevices.getUserMedia({video:{width:320,height:240,facingMode:'user'},audio:false}).then(function(stream){
    video=document.createElement('video');
    video.srcObject=stream;video.autoplay=true;video.playsInline=true;video.muted=true;
    video.style.cssText='position:absolute;left:-9999px';
    document.body.appendChild(video);
    video.play().catch(function(){});
    offscreen=document.createElement('canvas');offscreen.width=camW;offscreen.height=camH;
    offCtx=offscreen.getContext('2d',{willReadFrequently:true});
    video.addEventListener('canplay',function(){ready=true;setStatus('Live · ASCII Art Mode');},{once:true});
    setTimeout(function(){ready=true;},1500);
    requestAnimationFrame(render);
  }).catch(function(e){setStatus('Camera error: '+e.message);});
}
function render(){
  requestAnimationFrame(render);
  if(!ready||!video||video.readyState<2){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);return;}
  // Draw scaled-down mirrored frame to offscreen
  offCtx.save();offCtx.translate(camW,0);offCtx.scale(-1,1);offCtx.drawImage(video,0,0,camW,camH);offCtx.restore();
  var pixels=offCtx.getImageData(0,0,camW,camH).data;
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  // Calculate how many columns/rows fit
  var cols=Math.floor(W/charW),rows=Math.floor(H/charH);
  ctx.font='bold '+charH+'px monospace';ctx.textBaseline='top';
  for(var row=0;row<rows;row++){
    for(var col=0;col<cols;col++){
      // Map col/row to camera coords
      var cx=Math.floor(col/cols*camW),cy=Math.floor(row/rows*camH);
      var idx=(cy*camW+cx)*4;
      var r=pixels[idx],g=pixels[idx+1],b=pixels[idx+2];
      var lum=(r*0.299+g*0.587+b*0.114)/255;
      var ci=Math.min(CHARS.length-1,Math.floor((1-lum)*CHARS.length));
      var cci=Math.min(COLS.length-1,Math.floor((1-lum)*COLS.length));
      ctx.fillStyle=COLS[cci];
      ctx.fillText(CHARS[ci],col*charW,row*charH);
    }
  }
}
ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(0,200,215,0.25)';ctx.font='11px monospace';ctx.textAlign='center';
ctx.fillText('ENABLE CAMERA TO ACTIVATE ASCII MODE',W/2,H/2);
</script></body></html>`

const handEnergyHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<canvas id="c"></canvas>
<div class="label">ML5 · Hand Energy · Hand Pose</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startCam()">Enable Camera</button><div class="hint">Camera · Hand Pose · ML5.js</div></div>
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script><script>
var C=document.getElementById('c'),ctx=C.getContext('2d');
var W=C.width=innerWidth,H=C.height=innerHeight;
window.addEventListener('resize',function(){W=C.width=innerWidth;H=C.height=innerHeight;});
var video=null,hands=[],hp=null,pts=[],frame=0;
var TIPS=[4,8,12,16,20];
var CONNS=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
function setStatus(s){document.getElementById('st').textContent=s;}
function startCam(){
  document.getElementById('ui').style.display='none';
  navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false}).then(function(stream){
    video=document.createElement('video');
    video.srcObject=stream;video.autoplay=true;video.playsInline=true;video.muted=true;video.style.display='none';
    document.body.appendChild(video);
    video.play().catch(function(){});
    setStatus('Loading hand pose model...');
    hp=ml5.handPose({flipped:true});
    var hpStarted=false;
    function startHP(){if(hpStarted)return;hpStarted=true;hp.detectStart(video,function(r){hands=r;});setStatus('Hold up your hands');}
    video.addEventListener('canplay',startHP,{once:true});
    video.addEventListener('loadeddata',startHP,{once:true});
    setTimeout(startHP,1200);
    render();
  }).catch(function(e){setStatus('Camera error: '+e.message);});
}
function mapX(x,vw,dw,dx){return dx+(x/vw)*dw;}
function mapY(y,vh,dh,dy){return dy+(y/vh)*dh;}
function render(){
  requestAnimationFrame(render);frame++;
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  if(video&&video.readyState>=2){
    var vw=video.videoWidth||640,vh=video.videoHeight||480;
    var sc=Math.max(W/vw,H/vh),dw=vw*sc,dh=vh*sc,dx=(W-dw)/2,dy=(H-dh)/2;
    var sw=dw/vw,sh=dh/vh;
    ctx.save();ctx.translate(W,0);ctx.scale(-1,1);ctx.globalAlpha=0.2;ctx.drawImage(video,dx,dy,dw,dh);ctx.globalAlpha=1;ctx.restore();
    ctx.fillStyle='rgba(0,3,8,0.6)';ctx.fillRect(0,0,W,H);
    for(var hi=0;hi<hands.length;hi++){
      var hand=hands[hi],kp=hand.keypoints;
      if(!kp||kp.length<21)continue;
      var mx=mapX,my=mapY;
      // Draw skeleton
      ctx.strokeStyle='rgba(0,150,180,0.4)';ctx.lineWidth=1;
      for(var ci=0;ci<CONNS.length;ci++){
        var a=kp[CONNS[ci][0]],b=kp[CONNS[ci][1]];
        ctx.beginPath();ctx.moveTo(mx(a.x,vw,dw,dx),my(a.y,vh,dh,dy));ctx.lineTo(mx(b.x,vw,dw,dx),my(b.y,vh,dh,dy));ctx.stroke();
      }
      // Draw joints
      ctx.fillStyle='rgba(0,200,215,0.5)';
      for(var ji=0;ji<kp.length;ji++){ctx.beginPath();ctx.arc(mx(kp[ji].x,vw,dw,dx),my(kp[ji].y,vh,dh,dy),2,0,Math.PI*2);ctx.fill();}
      // Energy beams between fingertips
      for(var ti=0;ti<TIPS.length;ti++){
        for(var tj=ti+1;tj<TIPS.length;tj++){
          var ta=kp[TIPS[ti]],tb=kp[TIPS[tj]];
          var ax=mx(ta.x,vw,dw,dx),ay=my(ta.y,vh,dh,dy);
          var bx=mx(tb.x,vw,dw,dx),by=my(tb.y,vh,dh,dy);
          var dist=Math.sqrt((bx-ax)*(bx-ax)+(by-ay)*(by-ay));
          if(dist<200){
            var alpha=Math.max(0,(1-dist/200)*0.6);
            var grad=ctx.createLinearGradient(ax,ay,bx,by);
            grad.addColorStop(0,'rgba(0,200,215,'+alpha+')');
            grad.addColorStop(0.5,'rgba(0,230,240,'+(alpha*1.4)+')');
            grad.addColorStop(1,'rgba(0,200,215,'+alpha+')');
            ctx.strokeStyle=grad;ctx.lineWidth=1;
            ctx.shadowBlur=12;ctx.shadowColor='#00C8DC';
            ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke();
            ctx.shadowBlur=0;
            if(Math.random()<0.15){var t2=Math.random();pts.push({x:ax+(bx-ax)*t2,y:ay+(by-ay)*t2,vx:(Math.random()-0.5)*1.2,vy:-Math.random()*1.5-0.3,life:1,sz:Math.random()*2+0.5});}
          }
        }
      }
      // Bright fingertip dots
      ctx.shadowBlur=16;ctx.shadowColor='#00C8DC';
      for(var ti2=0;ti2<TIPS.length;ti2++){
        var tp=kp[TIPS[ti2]];
        ctx.fillStyle='rgba(0,230,245,0.9)';
        ctx.beginPath();ctx.arc(mx(tp.x,vw,dw,dx),my(tp.y,vh,dh,dy),4,0,Math.PI*2);ctx.fill();
      }
      ctx.shadowBlur=0;
    }
    setStatus(hands.length>0?'Hand energy · '+hands.length+' hand'+(hands.length>1?'s':''):'Hold up your hands');
  }
  for(var pi=pts.length-1;pi>=0;pi--){var pt=pts[pi];pt.x+=pt.vx;pt.y+=pt.vy;pt.vy-=0.015;pt.life-=0.02;if(pt.life<=0){pts.splice(pi,1);continue;}ctx.globalAlpha=pt.life*0.7;ctx.fillStyle='#00C8DC';ctx.beginPath();ctx.arc(pt.x,pt.y,pt.sz*pt.life,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  ctx.fillStyle='rgba(0,100,120,0.02)';for(var sy=0;sy<H;sy+=3)ctx.fillRect(0,sy,W,1);
  var vg=ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.85);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,5,12,0.65)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
}
ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='rgba(0,129,151,0.07)';ctx.lineWidth=1;
for(var gx=0;gx<W;gx+=44){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
for(var gy=0;gy<H;gy+=44){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
ctx.fillStyle='rgba(0,200,215,0.25)';ctx.font='11px monospace';ctx.textAlign='center';
ctx.fillText('ENABLE CAMERA TO ACTIVATE HAND TRACKING',W/2,H/2);
</script></body></html>`

const clothHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.hint{position:fixed;top:16px;left:50%;transform:translateX(-50%);color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;letter-spacing:.08em}</style></head><body>
<canvas id="c"></canvas>
<div class="label">CANVAS 2D · Cloth Physics · Verlet Integration</div>
<div class="hint">Click &amp; drag the cloth · Wind shifts automatically</div>
<script>var C=document.getElementById('c'),ctx=C.getContext('2d');
var W=C.width=innerWidth,H=C.height=innerHeight;
var COLS=28,ROWS=18,pts=[],cons=[],dragIdx=-1,frame=0;
function init(){
  var sep=Math.min(W/(COLS+2),(H-90)/(ROWS+2));
  var ox=(W-COLS*sep)/2,oy=68;
  pts=[];cons=[];
  for(var r=0;r<=ROWS;r++){for(var c=0;c<=COLS;c++){var px=ox+c*sep,py=oy+r*sep;pts.push({x:px,y:py,ox:px,oy:py,pinned:(r===0&&c%4===0),sep:sep});}}
  for(var r=0;r<=ROWS;r++){for(var c=0;c<=COLS;c++){var i=r*(COLS+1)+c;if(c<COLS)cons.push({a:i,b:i+1,l:sep});if(r<ROWS)cons.push({a:i,b:i+COLS+1,l:sep});}}
}
init();
window.addEventListener('resize',function(){W=C.width=innerWidth;H=C.height=innerHeight;init();});
C.addEventListener('mousedown',function(e){var bx=e.clientX,by=e.clientY,best=Infinity,bi=-1;for(var i=0;i<pts.length;i++){var p=pts[i],d=(p.x-bx)*(p.x-bx)+(p.y-by)*(p.y-by);if(d<best){best=d;bi=i;}}if(best<2500)dragIdx=bi;});
C.addEventListener('mousemove',function(e){if(dragIdx>=0){pts[dragIdx].x=e.clientX;pts[dragIdx].y=e.clientY;pts[dragIdx].ox=e.clientX;pts[dragIdx].oy=e.clientY;}});
C.addEventListener('mouseup',function(){dragIdx=-1;});
C.addEventListener('touchstart',function(e){e.preventDefault();var t=e.touches[0],bx=t.clientX,by=t.clientY,best=Infinity,bi=-1;for(var i=0;i<pts.length;i++){var p=pts[i],d=(p.x-bx)*(p.x-bx)+(p.y-by)*(p.y-by);if(d<best){best=d;bi=i;}}if(best<4000)dragIdx=bi;},{passive:false});
C.addEventListener('touchmove',function(e){e.preventDefault();var t=e.touches[0];if(dragIdx>=0){pts[dragIdx].x=t.clientX;pts[dragIdx].y=t.clientY;pts[dragIdx].ox=t.clientX;pts[dragIdx].oy=t.clientY;}},{passive:false});
C.addEventListener('touchend',function(){dragIdx=-1;});
function update(){
  frame++;
  var wind=Math.sin(frame*0.009)*0.24+Math.sin(frame*0.031)*0.09;
  for(var i=0;i<pts.length;i++){var p=pts[i];if(p.pinned||i===dragIdx)continue;var vx=(p.x-p.ox)*0.976,vy=(p.y-p.oy)*0.976;p.ox=p.x;p.oy=p.y;p.x+=vx+wind;p.y+=vy+0.30;}
  for(var k=0;k<7;k++){for(var j=0;j<cons.length;j++){var cn=cons[j],pa=pts[cn.a],pb=pts[cn.b],dx=pb.x-pa.x,dy=pb.y-pa.y,d=Math.sqrt(dx*dx+dy*dy)||0.001,diff=(d-cn.l)/d*0.5,ox2=dx*diff,oy2=dy*diff;if(!pa.pinned&&cn.a!==dragIdx){pa.x+=ox2;pa.y+=oy2;}if(!pb.pinned&&cn.b!==dragIdx){pb.x-=ox2;pb.y-=oy2;}}}
}
function draw(){
  requestAnimationFrame(draw);
  ctx.fillStyle='rgba(0,0,0,0.30)';ctx.fillRect(0,0,W,H);
  update();
  for(var j=0;j<cons.length;j++){
    var cn=cons[j],pa=pts[cn.a],pb=pts[cn.b],dx=pb.x-pa.x,dy=pb.y-pa.y;
    var strain=Math.min(1,Math.max(0,(Math.sqrt(dx*dx+dy*dy)-cn.l)/cn.l*6));
    ctx.strokeStyle='rgba('+(Math.floor(strain*55))+','+(Math.floor(155+strain*90))+','+(Math.floor(175+strain*80))+','+(0.50+strain*0.45)+')';
    ctx.lineWidth=0.7+strain*0.9;ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.stroke();
  }
  ctx.fillStyle='rgba(0,230,245,0.9)';
  for(var i=0;i<pts.length;i++){var p=pts[i];if(p.pinned){ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fill();}}
}
draw();
</script></body></html>`

const matterPhysicsHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;z-index:10}.hint{position:fixed;top:16px;left:50%;transform:translateX(-50%);color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;letter-spacing:.08em;z-index:10}</style></head><body>
<div class="label">MATTER.JS · Physics Chaos · 2D Rigid Bodies</div>
<div class="hint">Click &amp; drag bodies · They collide and stack</div>
<script src="https://unpkg.com/matter-js@0.18.0/build/matter.min.js"></script><script>
var M=Matter,En=M.Engine,Rd=M.Render,Ru=M.Runner,Bd=M.Bodies,Cp=M.Composite,MC=M.MouseConstraint,Ms=M.Mouse,Ev=M.Events;
var engine=En.create({gravity:{y:1.1}});
var W=innerWidth,H=innerHeight;
var render=Rd.create({element:document.body,engine:engine,options:{width:W,height:H,wireframes:false,background:'#000',pixelRatio:Math.min(devicePixelRatio,2)}});
Rd.run(render);Ru.run(Ru.create(),engine);
var COLS=['#00C8DC','#00A8BE','#008197','#006378','#005060','#00E0F5','#004a5e'];
function makeWalls(){
  Cp.add(engine.world,[
    Bd.rectangle(W/2,H+28,W*3,56,{isStatic:true,render:{fillStyle:'#001520',strokeStyle:'rgba(0,200,215,0.2)',lineWidth:1}}),
    Bd.rectangle(-28,H/2,56,H*3,{isStatic:true,render:{fillStyle:'#000c14'}}),
    Bd.rectangle(W+28,H/2,56,H*3,{isStatic:true,render:{fillStyle:'#000c14'}})
  ]);
}
makeWalls();
var spawnCount=0;
function spawnShape(){
  spawnCount++;
  var x=90+Math.random()*(W-180),col=COLS[Math.floor(Math.random()*COLS.length)];
  var r=14+Math.random()*26,t=spawnCount%5,b;
  var opts={restitution:0.42+Math.random()*0.28,friction:0.08+Math.random()*0.18,frictionAir:0.008,render:{fillStyle:col,strokeStyle:'rgba(0,200,215,0.25)',lineWidth:1}};
  if(t===0)b=Bd.circle(x,-40,r,opts);
  else if(t===1)b=Bd.rectangle(x,-40,r*2.2,r*1.6,opts);
  else if(t===2)b=Bd.polygon(x,-40,5+Math.floor(Math.random()*4),r,opts);
  else if(t===3)b=Bd.trapezoid(x,-40,r*2.6,r*1.3,0.25+Math.random()*0.25,opts);
  else b=Bd.polygon(x,-40,3,r,opts);
  Cp.add(engine.world,b);
  var bods=Cp.allBodies(engine.world).filter(function(bb){return !bb.isStatic;});
  if(bods.length>90){for(var i=0;i<3;i++)Cp.remove(engine.world,bods[i]);}
}
var si=setInterval(spawnShape,320);
var mouse=Ms.create(render.canvas),mc=MC.create(engine,{mouse:mouse,constraint:{stiffness:0.18,render:{visible:false,strokeStyle:'rgba(0,200,215,0.5)'}}});
Cp.add(engine.world,mc);
window.addEventListener('resize',function(){W=innerWidth;H=innerHeight;render.canvas.width=W;render.canvas.height=H;render.options.width=W;render.options.height=H;Rd.lookAt(render,{min:{x:0,y:0},max:{x:W,y:H}});});
</script></body></html>`

const domainWarpHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><canvas id="c"></canvas><div class="label">GLSL · Domain Warp · Organic Fractal Field · Move cursor</div>
<script>var c=document.getElementById('c'),gl=c.getContext('webgl')||c.getContext('experimental-webgl'),mouse=[0.5,0.5],start=Date.now();
function resize(){c.width=innerWidth;c.height=innerHeight;gl&&gl.viewport(0,0,c.width,c.height);}
resize();window.addEventListener('resize',resize);
window.addEventListener('mousemove',function(e){mouse[0]=e.clientX/innerWidth;mouse[1]=1-e.clientY/innerHeight;});
if(!gl){document.body.innerHTML='<div style="color:#008197;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace">WebGL not supported</div>';}else{
var vs='attribute vec2 pos;void main(){gl_Position=vec4(pos,0.0,1.0);}';
var fs=[
'precision highp float;',
'uniform float time;uniform vec2 res;uniform vec2 mouse;',
'vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.0+2.0*fract(sin(p)*43758.5453);}',
'float gnoise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);',
'  return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),',
'             mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}',
'float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<6;i++){v+=a*gnoise(p);p=p*2.1+vec2(3.1,7.4);a*=0.5;}return v;}',
'void main(){',
'  vec2 uv=gl_FragCoord.xy/res;',
'  vec2 p=uv*2.0-1.0;p.x*=res.x/res.y;',
'  vec2 m=(mouse-0.5)*2.0;m.x*=res.x/res.y;',
'  float t=time*0.11;',
'  vec2 q=vec2(fbm(p+vec2(t*0.28,t*0.14)),fbm(p+vec2(-t*0.13,t*0.22)));',
'  vec2 r=vec2(fbm(p+1.9*q+vec2(1.7+t*0.12,9.2+t*0.08)),fbm(p+1.9*q+vec2(8.3-t*0.09,2.8+t*0.11)));',
'  vec2 s=vec2(fbm(p+3.5*r+m*0.5+vec2(3.1,0.9)+t*0.07),fbm(p+3.5*r+m*0.5+vec2(7.5,4.3)-t*0.06));',
'  float f=fbm(p+3.8*s);',
'  f=clamp(f*0.5+0.5,0.0,1.0);',
'  vec3 dark=vec3(0.0,0.02,0.06);vec3 mid=vec3(0.0,0.36,0.52);',
'  vec3 bright=vec3(0.0,0.78,0.94);vec3 white=vec3(0.72,0.98,1.0);',
'  vec3 col=mix(dark,mid,smoothstep(0.18,0.52,f));',
'  col=mix(col,bright,smoothstep(0.50,0.80,f));',
'  col=mix(col,white,smoothstep(0.84,0.98,f));',
'  col*=0.88+0.12*sin(f*38.0+time*0.7);',
'  float vig=1.0-smoothstep(0.55,1.42,length(p));col*=vig;',
'  gl_FragColor=vec4(pow(col,vec3(0.85)),1.0);}'].join("\\n");
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
var pos=gl.getAttribLocation(prog,'pos');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
var uT=gl.getUniformLocation(prog,'time'),uR=gl.getUniformLocation(prog,'res'),uM=gl.getUniformLocation(prog,'mouse');
(function draw(){requestAnimationFrame(draw);var t=(Date.now()-start)/1000;gl.uniform1f(uT,t);gl.uniform2f(uR,c.width,c.height);gl.uniform2f(uM,mouse[0],mouse[1]);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);})();}
</script></body></html>`

const pointCloudHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;z-index:10}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em;z-index:10}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:20}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<div class="label">P5.JS · 3D Point Cloud · Camera Feed in WEBGL</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startSketch()">Enable Camera</button><div class="hint">Camera feed rendered as 3D depth map</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script><script>
function setStatus(s){document.getElementById('st').textContent=s;}
function startSketch(){
  document.getElementById('ui').style.display='none';
  setStatus('Starting camera...');
  new p5(function(p){
    var vid,off,step=6,rx=0,ry=0,targetRx=0,targetRy=0,ready=false;
    p.setup=async function(){
      p.createCanvas(p.windowWidth,p.windowHeight,p.WEBGL);
      p.pixelDensity(1);
      vid=p.createCapture({video:{facingMode:'user',width:{ideal:320},height:{ideal:240}},audio:false});
      vid.elt.setAttribute('playsinline','');vid.elt.muted=true;vid.hide();
      setStatus('Loading point cloud...');
      await new Promise(function(res,rej){var t0=performance.now();(function tick(){if(vid.elt&&vid.elt.readyState>=2&&(vid.elt.videoWidth||0)>0)return res();if(performance.now()-t0>12000)return rej(new Error('timeout'));requestAnimationFrame(tick);})();});
      off=p.createGraphics(vid.elt.videoWidth,vid.elt.videoHeight);
      ready=true;setStatus('3D Point Cloud · Move to see depth');
    };
    p.mouseMoved=function(){targetRx=p.map(p.mouseY,0,p.height,-0.6,0.6);targetRy=p.map(p.mouseX,0,p.width,-0.8,0.8);};
    p.windowResized=function(){p.resizeCanvas(p.windowWidth,p.windowHeight);};
    p.draw=function(){
      if(!ready)return;
      p.background(0);
      rx+=(targetRx-rx)*0.05;ry+=(targetRy-ry)*0.05;
      p.rotateX(rx);p.rotateY(ry);
      off.image(vid,0,0,off.width,off.height);off.loadPixels();
      var vw=off.width,vh=off.height;
      var scale=Math.min(p.width/vw,p.height/vh)*1.1;
      var t=p.millis()/1000;
      p.noStroke();
      for(var y=0;y<vh;y+=step){
        for(var x=0;x<vw;x+=step){
          var idx=(y*vw+x)*4;
          var r=off.pixels[idx],g=off.pixels[idx+1],b=off.pixels[idx+2];
          var bright=(r*0.299+g*0.587+b*0.114)/255;
          var px=(x-vw/2)*scale*(vw>320?0.5:1);
          var py=(y-vh/2)*scale*(vh>240?0.5:1);
          var pz=(bright-0.5)*120+Math.sin(t+bright*8)*5;
          var alpha=Math.floor(100+bright*155);
          var cr=Math.floor(bright*60),cg=Math.floor(130+bright*120),cb=Math.floor(160+bright*95);
          p.fill(cr,cg,cb,alpha);
          p.push();p.translate(px,py,pz);p.box(scale*(step-1)*0.72);p.pop();
        }
      }
    };
  });
}
</script></body></html>`

const fabricCamHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;display:none}.ui.show{display:block}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.4);font-family:monospace;font-size:10px;letter-spacing:.1em;margin-top:12px}</style></head><body>
<div class="label">ML5 · Hand Pose · Tearable Cloth</div>
<div class="st" id="st">Loading...</div>
<div class="ui show" id="ui"><button class="btn" id="startBtn">Enable Camera</button><div class="hint">Pinch to grab · Swipe fast to tear</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script><script>
function setStatus(t){var e=document.getElementById('st');if(e)e.textContent=t;}
document.getElementById('startBtn').addEventListener('click',function(){
  document.getElementById('ui').style.display='none';
  new p5(function(s){
    var COLS=50,ROWS=38,ITER=4,GRAV=0.35,DAMP=0.92,TEAR=3.2,MINV=40,GRIP=55,HEAL=0.06;
    var pts=[],cons=[],tris=[],detHands=[];
    var hs={L:{grip:false,grabbed:[],hasPrev:false,px:0,py:0},R:{grip:false,grabbed:[],hasPrev:false,px:0,py:0}};
    var vid,hp,simW,simH;
    s.setup=async function(){
      s.createCanvas(s.windowWidth,s.windowHeight,s.WEBGL);
      setStatus('Starting camera...');
      vid=s.createCapture(s.VIDEO);vid.hide();
      setStatus('Loading hand model...');
      hp=await ml5.handPose({flipped:true});
      hp.detectStart(vid.elt,function(r){detHands=r;});
      setStatus('Show hands \xB7 Pinch to grab \xB7 Swipe to tear');
      calcDims();buildGrid();
    };
    s.windowResized=function(){s.resizeCanvas(s.windowWidth,s.windowHeight);calcDims();buildGrid();};
    function calcDims(){var ar=640/480,ca=s.width/s.height;simW=ca>ar?s.width:s.height*ar;simH=ca>ar?s.width/ar:s.height;}
    function buildGrid(){
      pts=[];cons=[];tris=[];
      var grid=[],x0=-simW/2,y0=-simH/2,dx=simW/(COLS-1),dy=simH/(ROWS-1);
      for(var r=0;r<ROWS;r++){var row=[];for(var c=0;c<COLS;c++){var px=x0+c*dx,py=y0+r*dy;pts.push({x:px,y:py,ox:px,oy:py,pvx:px,pvy:py,u:1-(c/(COLS-1)),v:r/(ROWS-1),pinned:r===0,grabbed:false});row.push(pts.length-1);}grid.push(row);}
      for(var r=0;r<ROWS;r++){for(var c=0;c<COLS;c++){var ai=grid[r][c];if(c<COLS-1)addC(ai,grid[r][c+1]);if(r<ROWS-1)addC(ai,grid[r+1][c]);if(c<COLS-1&&r<ROWS-1){addC(ai,grid[r+1][c+1]);addC(grid[r][c+1],grid[r+1][c]);}}}
      for(var r=0;r<ROWS-1;r++){for(var c=0;c<COLS-1;c++){var tl=grid[r][c],tr=grid[r][c+1],bl=grid[r+1][c],br=grid[r+1][c+1];tris.push({n:[tl,tr,br],c:[fC(tl,tr),fC(tr,br),fC(tl,br)]});tris.push({n:[tl,br,bl],c:[fC(tl,br),fC(bl,br),fC(tl,bl)]});}}
    }
    function addC(ai,bi){var a=pts[ai],b=pts[bi],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy,d=Math.sqrt(d2);cons.push({ai:ai,bi:bi,d:d,d2:d2,tear2:d2*TEAR*TEAR,active:true});}
    function fC(ai,bi){for(var i=0;i<cons.length;i++){var c=cons[i];if((c.ai===ai&&c.bi===bi)||(c.ai===bi&&c.bi===ai))return c;}return null;}
    function segInt(ax,ay,bx,by,cx,cy,dx2,dy2){function cr(ox,oy,ex,ey,fx,fy){return(ex-ox)*(fy-oy)-(ey-oy)*(fx-ox);}var d1=cr(ax,ay,bx,by,cx,cy),d2=cr(ax,ay,bx,by,dx2,dy2),d3=cr(cx,cy,dx2,dy2,ax,ay),d4=cr(cx,cy,dx2,dy2,bx,by);return d1*d2<0&&d3*d4<0;}
    function procHands(){
      var vw=vid.width||640,vh=vid.height||480,ar=vw/vh,ca=s.width/s.height;
      var fW=ca>ar?s.width:s.height*ar,fH=ca>ar?s.width/ar:s.height;
      var vis={L:false,R:false},anyGrip=false;
      for(var hi=0;hi<detHands.length;hi++){
        var hand=detHands[hi],side=hand.handedness==='Left'?'L':'R';vis[side]=true;
        var H=hs[side],idx=hand.keypoints[8],thu=hand.keypoints[4],mid=hand.keypoints[12],pin=hand.keypoints[20],wri=hand.keypoints[0];
        var dP2=(idx.x-thu.x)*(idx.x-thu.x)+(idx.y-thu.y)*(idx.y-thu.y);
        var dM2=(mid.x-wri.x)*(mid.x-wri.x)+(mid.y-wri.y)*(mid.y-wri.y);
        var dPi2=(thu.x-pin.x)*(thu.x-pin.x)+(thu.y-pin.y)*(thu.y-pin.y);
        var t=vw*0.08,f=vw*0.22,isPinch=dP2<t*t,isFist=dM2<f*f;
        var rx=(idx.x+thu.x)/2,ry=(idx.y+thu.y)/2;
        if(isFist&&!isPinch){rx=mid.x;ry=mid.y;}
        var wx=(rx/vw-0.5)*fW,wy=(ry/vh-0.5)*fH;
        var gR=Math.max(Math.sqrt(dPi2),GRIP)*(fW/vw);
        if(H.hasPrev&&!isPinch&&!isFist){var dvx=wx-H.px,dvy=wy-H.py;if(dvx*dvx+dvy*dvy>MINV*MINV){for(var ci=0;ci<cons.length;ci++){var cn=cons[ci];if(!cn.active)continue;var pa=pts[cn.ai],pb=pts[cn.bi];if(segInt(H.px,H.py,wx,wy,pa.x,pa.y,pb.x,pb.y))cn.active=false;}}}
        if(isPinch||isFist){anyGrip=true;if(!H.grip){H.grabbed=[];var gR2=gR*gR;for(var pi=0;pi<pts.length;pi++){var pt=pts[pi],ddx=pt.x-wx,ddy=pt.y-wy;if(ddx*ddx+ddy*ddy<gR2){pt.grabbed=true;H.grabbed.push({i:pi,ox:ddx,oy:ddy});}}if(H.grabbed.length>0)H.grip=true;}else{for(var gi=0;gi<H.grabbed.length;gi++){var g=H.grabbed[gi],pt=pts[g.i];pt.x+=(wx+g.ox-pt.x)*0.85;pt.y+=(wy+g.oy-pt.y)*0.85;}}}else{for(var gi=0;gi<H.grabbed.length;gi++)pts[H.grabbed[gi].i].grabbed=false;H.grabbed=[];H.grip=false;}
        H.px=wx;H.py=wy;H.hasPrev=true;
      }
      for(var side in hs){if(!vis[side]){var H=hs[side];for(var gi=0;gi<H.grabbed.length;gi++)pts[H.grabbed[gi].i].grabbed=false;H.grabbed=[];H.grip=false;H.hasPrev=false;}}
      return anyGrip;
    }
    s.draw=function(){
      s.background(7,8,15);
      if(!vid||!vid.width)return;
      var anyGrip=procHands();
      for(var pi=0;pi<pts.length;pi++){var pt=pts[pi];if(pt.pinned||pt.grabbed)continue;var vx=pt.x-pt.pvx,vy=pt.y-pt.pvy,sp=vx*vx+vy*vy;if(sp>2025){var m=Math.sqrt(sp);vx=(vx/m)*45;vy=(vy/m)*45;}vx*=DAMP;vy*=DAMP;pt.pvx=pt.x;pt.pvy=pt.y;pt.x+=vx;pt.y+=vy+GRAV;if(!anyGrip){pt.x+=(pt.ox-pt.x)*HEAL;pt.y+=(pt.oy-pt.y)*HEAL;}}
      if(!anyGrip){for(var ci=0;ci<cons.length;ci++){var cn=cons[ci];if(!cn.active){var pa=pts[cn.ai],pb=pts[cn.bi],dx=pb.x-pa.x,dy=pb.y-pa.y,thr=cn.d*1.5;if(dx*dx+dy*dy<thr*thr)cn.active=true;}}}
      for(var it=0;it<ITER;it++){for(var ci=0;ci<cons.length;ci++){var cn=cons[ci];if(!cn.active)continue;var pa=pts[cn.ai],pb=pts[cn.bi],dx=pb.x-pa.x,dy=pb.y-pa.y,d2=dx*dx+dy*dy;if(d2>cn.tear2){cn.active=false;continue;}if(d2===0)continue;var dm=Math.sqrt(d2),ratio=(dm-cn.d)/dm,ox=dx*0.5*ratio,oy=dy*0.5*ratio;if(!pa.pinned&&!pa.grabbed){pa.x+=ox;pa.y+=oy;}if(!pb.pinned&&!pb.grabbed){pb.x-=ox;pb.y-=oy;}}}
      s.noStroke();s.textureMode(s.NORMAL);s.texture(vid);
      s.beginShape(s.TRIANGLES);
      for(var ti=0;ti<tris.length;ti++){var tri=tris[ti];if(tri.c[0]&&tri.c[1]&&tri.c[2]&&tri.c[0].active&&tri.c[1].active&&tri.c[2].active){for(var ni=0;ni<3;ni++){var pt=pts[tri.n[ni]];s.vertex(pt.x,pt.y,0,pt.u,pt.v);}}}
      s.endShape();
      setStatus(detHands.length>0?'Hands detected \xB7 Pinch to grab \xB7 Swipe fast to tear':'Show hands \xB7 Pinch to grab cloth');
    };
  });
});
</script></body></html>`

const handBridgeHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#07080F;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;display:none}.ui.show{display:block}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.4);font-family:monospace;font-size:10px;letter-spacing:.1em;margin-top:12px}</style></head><body>
<div class="label">ML5 · Hand Bridge · Physics</div>
<div class="st" id="st">Loading...</div>
<div class="ui show" id="ui"><button class="btn" id="startBtn">Enable Camera</button><div class="hint">Hold up one hand · Thumb and index control bridge ends</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js"></script>
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script><script>
function setStatus(t){var e=document.getElementById('st');if(e)e.textContent=t;}
document.getElementById('startBtn').addEventListener('click',function(){
  document.getElementById('ui').style.display='none';
  new p5(function(s){
    var E=Matter,engine,bParts=[],bCons=[],balls=[],hands=[],vid,hp,hpStarted=false;
    var TEAL=[0,200,215],BALL_R=8;
    s.setup=function(){
      s.createCanvas(s.windowWidth,s.windowHeight);
      setStatus('Starting camera...');
      engine=E.Engine.create();engine.world.gravity.y=2;
      vid=s.createCapture(s.VIDEO);vid.size(640,480);vid.hide();
      hp=ml5.handPose({maxHands:1,flipped:true});
      function startHP(){if(hpStarted)return;hpStarted=true;hp.detectStart(vid.elt,function(r){hands=r;});setStatus('Show thumb + index to hold bridge');}
      vid.elt.addEventListener('canplay',startHP,{once:true});
      vid.elt.addEventListener('loadeddata',startHP,{once:true});
      setTimeout(startHP,1500);
      buildBridge();
    };
    s.windowResized=function(){s.resizeCanvas(s.windowWidth,s.windowHeight);E.Composite.clear(engine.world);bParts=[];bCons=[];balls=[];buildBridge();};
    function buildBridge(){
      var n=18,r=10,y=s.height*0.55;
      for(var i=0;i<n;i++){var x=s.width/2+s.map(i,0,n-1,-140,140);var b=E.Bodies.circle(x,y,r,{restitution:0.6,friction:0.3});bParts.push(b);E.Composite.add(engine.world,b);}
      bParts[0].isStatic=true;bParts[n-1].isStatic=true;
      for(var i=0;i<n-1;i++){var c=E.Constraint.create({bodyA:bParts[i],bodyB:bParts[i+1],length:22,stiffness:0.9,damping:0.1});bCons.push(c);E.Composite.add(engine.world,c);}
    }
    s.draw=function(){
      s.background(7,8,15);
      if(vid&&vid.width){s.push();s.translate(s.width,0);s.scale(-1,1);s.tint(255,18);s.image(vid,0,0,s.width,s.height);s.noTint();s.pop();}
      if(s.frameCount%55===0){var bx=s.width/2+s.random(-120,120),ball=E.Bodies.circle(bx,-10,BALL_R,{restitution:0.55,friction:0.2});balls.push(ball);E.Composite.add(engine.world,ball);}
      if(hands.length>0){
        var h=hands[0],sx=s.width/640,sy=s.height/480;
        var tx=h.keypoints[4].x*sx,ty=h.keypoints[4].y*sy;
        var ix=h.keypoints[8].x*sx,iy=h.keypoints[8].y*sy;
        E.Body.setPosition(bParts[0],{x:tx,y:ty});E.Body.setVelocity(bParts[0],{x:0,y:0});
        E.Body.setPosition(bParts[bParts.length-1],{x:ix,y:iy});E.Body.setVelocity(bParts[bParts.length-1],{x:0,y:0});
        setStatus('Bridge active \xB7 Move hand to control');
      } else { setStatus('Show thumb + index finger to hold the bridge'); }
      E.Engine.update(engine,1000/60);
      s.stroke(0,200,215,210);s.strokeWeight(3);s.noFill();
      for(var i=0;i<bCons.length;i++){var c=bCons[i];s.line(c.bodyA.position.x,c.bodyA.position.y,c.bodyB.position.x,c.bodyB.position.y);}
      s.fill(0,180,215,200);s.noStroke();
      for(var i=0;i<bParts.length;i++){var b=bParts[i];s.push();s.translate(b.position.x,b.position.y);s.circle(0,0,20);s.pop();}
      var tealColors=[[0,200,215],[0,160,185],[0,230,245],[0,128,151]];
      for(var i=balls.length-1;i>=0;i--){var b=balls[i];var tc=tealColors[i%4];s.fill(tc[0],tc[1],tc[2],200);s.noStroke();s.push();s.translate(b.position.x,b.position.y);s.circle(0,0,BALL_R*2);s.pop();if(b.position.y>s.height+30){E.Composite.remove(engine.world,b);balls.splice(i,1);}}
    };
  });
});
</script></body></html>`

const fluviaHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:#323232;color:#fff;overflow:hidden}canvas{display:block;border:1px solid #666;outline:none}.tp-dfwv{width:300px!important}</style>
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.min.js"></script>
<script type="module">
import{Pane}from'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js';
window.Tweakpane={Pane};window.__tpReady=true;
</script></head><body>
<script>
var VERT='attribute vec3 aPosition;attribute vec2 aTexCoord;uniform mat4 uProjectionMatrix;uniform mat4 uModelViewMatrix;uniform sampler2D uHeightMap;uniform float uHeightScale;varying vec2 vTexCoord;void main(){vTexCoord=aTexCoord;float h=texture2D(uHeightMap,vTexCoord).r;vec3 pos=aPosition;pos.z+=h*uHeightScale;gl_Position=uProjectionMatrix*uModelViewMatrix*vec4(pos,1.0);}';
var FRAG='precision mediump float;varying vec2 vTexCoord;uniform sampler2D uTexture;void main(){gl_FragColor=texture2D(uTexture,vTexCoord);}';
var CM={"cividis":{"r":[-0.008973,-0.384689,15.42921,-58.977031,102.370492,-83.187239,25.77607],"g":[0.136756,0.639494,0.385562,-1.404197,2.600914,-2.14075,0.688122],"b":[0.29417,2.982654,-22.36376,74.863561,-121.303164,93.974216,-28.262533]},"greyscale":{"r":[0,1,0,0,0,0,0],"g":[0,1,0,0,0,0,0],"b":[0,1,0,0,0,0,0]},"inferno":{"r":[0.000214,0.105874,11.617115,-41.709277,77.157454,-71.287667,25.092619],"g":[0.001635,0.566364,-3.947723,17.457724,-33.415679,32.55388,-12.222155],"b":[-0.03713,4.117926,-16.257323,44.645117,-82.253923,73.588132,-23.11565]},"magma":{"r":[-0.002067,0.250486,8.345901,-27.666969,52.170684,-50.758572,18.664253],"g":[-0.000688,0.694455,-3.596031,14.253853,-27.944584,29.05388,-11.490027],"b":[-0.009548,2.495287,0.329057,-13.646583,12.881091,4.269936,-5.570769]},"mako":{"r":[0.032987,1.620032,-5.833466,19.26673,-48.335836,57.794682,-23.67438],"g":[0.013232,0.848348,-1.651402,8.153931,-12.79364,8.555513,-2.172825],"b":[0.040283,0.292971,12.702365,-44.241782,65.176477,-47.319049,14.259791]},"plasma":{"r":[0.064053,2.142438,-2.653255,6.094711,-11.065106,9.974645,-3.623823],"g":[0.024812,0.244749,-7.461101,42.308428,-82.644718,71.408341,-22.914405],"b":[0.5349,0.742966,3.108382,-28.491792,60.093584,-54.020563,18.193381]},"rocket":{"r":[-0.003174,1.947267,-6.401815,30.376433,-57.268147,44.789992,-12.453563],"g":[0.037717,-0.476821,15.073064,-81.403784,173.768416,-158.313952,52.250665],"b":[0.112123,0.400542,6.253872,-21.55099,14.869938,11.402042,-10.648435]},"turbo":{"r":[0.080545,7.00898,-66.727306,228.660253,-334.841257,220.424075,-54.09554],"g":[0.069393,3.147611,-4.927799,25.101273,-69.296265,67.510842,-21.578703],"b":[0.219622,7.655918,-10.16298,-91.680678,288.708703,-305.386975,110.735079]},"viridis":{"r":[0.274455,0.107708,-0.327241,-4.599932,6.203736,4.751787,-5.432077],"g":[0.005768,1.39647,0.214814,-5.758238,14.153965,-13.749439,4.641571],"b":[0.332664,1.386771,0.091977,-19.291809,56.6563,-65.32,26.272108]}};
</script>
<script>
class Quaternion{constructor(x=0,y=0,z=0,w=1){this.x=x;this.y=y;this.z=z;this.w=w;}
static fromAxisAngle(axis,angle){const s=Math.sin(angle*0.5);return new Quaternion(axis.x*s,axis.y*s,axis.z*s,Math.cos(angle*0.5));}
static fromEuler(pitch,yaw){const qY=Quaternion.fromAxisAngle({x:0,y:0,z:1},yaw);const qP=Quaternion.fromAxisAngle({x:1,y:0,z:0},pitch);return qY.multiply(qP);}
multiply(q){return new Quaternion(this.x*q.w+this.w*q.x+this.y*q.z-this.z*q.y,this.y*q.w+this.w*q.y+this.z*q.x-this.x*q.z,this.z*q.w+this.w*q.z+this.x*q.y-this.y*q.x,this.w*q.w-this.x*q.x-this.y*q.y-this.z*q.z);}
applyToVector(v){const{x,y,z}=v;const{x:qx,y:qy,z:qz,w:qw}=this;const ix=qw*x+qy*z-qz*y,iy=qw*y+qz*x-qx*z,iz=qw*z+qx*y-qy*x,iw=-qx*x-qy*y-qz*z;return{x:ix*qw+iw*-qx+iy*-qz-iz*-qy,y:iy*qw+iw*-qy+iz*-qx-ix*-qz,z:iz*qw+iw*-qz+ix*-qy-iy*-qx};}
normalise(){const l=Math.sqrt(this.x**2+this.y**2+this.z**2+this.w**2);if(l>0){this.x/=l;this.y/=l;this.z/=l;this.w/=l;}return this;}}
</script>
<script>
class Terrain{constructor(m){this.m=m;const{terrainSize}=m.params;this.size=terrainSize;this.area=terrainSize*terrainSize;this.heightMap=new Float32Array(this.area);this.originalHeightMap=new Float32Array(this.area);this.bedrockMap=new Float32Array(this.area);this.sedimentMap=new Float32Array(this.area);this.dischargeMap=new Float32Array(this.area);this.dischargeTrack=new Float32Array(this.area);this.momentumX=new Float32Array(this.area);this.momentumY=new Float32Array(this.area);this.momentumXTrack=new Float32Array(this.area);this.momentumYTrack=new Float32Array(this.area);this.sharedNormal={x:0,y:0,z:0};}
getIndex(x,y){return y*this.size+x;}
getHeight(x,y){const{size,heightMap}=this;if(x<0||x>=size||y<0||y>=size)return 0;return heightMap[y*size+x];}
updateTotalHeight(i){this.heightMap[i]=this.bedrockMap[i]+this.sedimentMap[i];}
getMapBounds(a){let mn=Infinity,mx=-Infinity;for(let i=0;i<a.length;i++){if(a[i]<mn)mn=a[i];if(a[i]>mx)mx=a[i];}return{min:mn,max:mx};}
getSurfaceNormal(x,y){const{size,heightMap,sharedNormal}=this;const{heightScale}=this.m.params;const w=x>0?y*size+(x-1):y*size+x,e=x<size-1?y*size+(x+1):y*size+x,n=y>0?(y-1)*size+x:y*size+x,s=y<size-1?(y+1)*size+x:y*size+x;const dx=(heightMap[w]-heightMap[e])*heightScale,dz=(heightMap[n]-heightMap[s])*heightScale,dy=1;const mag=Math.sqrt(dx*dx+dy*dy+dz*dz);sharedNormal.x=dx/mag;sharedNormal.y=dy/mag;sharedNormal.z=dz/mag;return sharedNormal;}
getDischarge(i){return this.codyErf(0.4*this.dischargeMap[i]);}
codyErf(x){const ax=Math.abs(x);if(ax>9.3)return x>0?1:-1;let r;if(ax<=0.84375){const xs=x*x,p=[3.1611237438705656,113.86415415105016,377.485237685302,3209.3775891384695,0.18577770618460315],q=[23.601290953873412,244.55303442692948,1287.1751860847748,2844.2368334391706];r=x*((((p[4]*xs+p[0])*xs+p[1])*xs+p[2])*xs+p[3])/((((xs+q[0])*xs+q[1])*xs+q[2])*xs+q[3]);}else if(ax<=4){const p=[0.5641884969886701,8.883149794388376,66.11542093743808,298.63513819740013,881.9522212417691,1712.0476126340706,2051.0783778260715,1230.3393547979972,2.1531153547440385e-8],q=[15.744926110709835,117.6939508913125,537.1811018620099,1621.3895745386784,3290.7992357334596,4362.61909014206,3439.3676741437216,1230.3393548037443];const nn=(((((((p[8]*ax+p[0])*ax+p[1])*ax+p[2])*ax+p[3])*ax+p[4])*ax+p[5])*ax+p[6])*ax+p[7];const dd=(((((((ax+q[0])*ax+q[1])*ax+q[2])*ax+q[3])*ax+q[4])*ax+q[5])*ax+q[6])*ax+q[7];r=1-Math.exp(-x*x)*(nn/dd);if(x<0)r=-r;}else{r=x>0?1:-1;}return r;}
generate(){const{noiseScale,noiseOctaves,amplitudeFalloff}=this.m.params;const{size,area,heightMap,originalHeightMap,bedrockMap}=this;this.reset();const offsets=Array.from({length:noiseOctaves},()=>({x:random(100000),y:random(100000)}));for(let i=0;i<area;i++){const x=i%size,y=(i/size)|0;let amp=1,freq=noiseScale/100,nv=0;for(let o=0;o<noiseOctaves;o++){nv+=noise(x*freq+offsets[o].x,y*freq+offsets[o].y)*amp;freq*=2;amp*=amplitudeFalloff;}heightMap[i]=Math.pow(nv,1.2);}const{min,max}=this.getMapBounds(heightMap);const range=max-min||1;for(let i=0;i<area;i++){const norm=(heightMap[i]-min)/range;heightMap[i]=norm;bedrockMap[i]=norm;originalHeightMap[i]=norm;}}
reset(){const{heightMap,bedrockMap,originalHeightMap,sedimentMap,dischargeMap,dischargeTrack,momentumX,momentumY,momentumXTrack,momentumYTrack}=this;[heightMap,bedrockMap].forEach(m=>m.set(originalHeightMap));[sedimentMap,dischargeMap,dischargeTrack,momentumX,momentumY,momentumXTrack,momentumYTrack].forEach(m=>m.fill(0));}}
</script>
<script>
class Solver{constructor(m){this.m=m;const S2=Math.SQRT2;this.neighbours=[{x:-1,y:-1,distance:S2},{x:-1,y:0,distance:1},{x:-1,y:1,distance:S2},{x:0,y:-1,distance:1},{x:0,y:1,distance:1},{x:1,y:-1,distance:S2},{x:1,y:0,distance:1},{x:1,y:1,distance:S2}];}
updateDischargeMap(){const{learningRate}=this.m.params;const{area,dischargeMap,dischargeTrack,momentumX,momentumXTrack,momentumY,momentumYTrack}=this.m.terrain;const inv=1-learningRate;for(let i=0;i<area;i++){dischargeMap[i]=inv*dischargeMap[i]+learningRate*dischargeTrack[i];momentumX[i]=inv*momentumX[i]+learningRate*momentumXTrack[i];momentumY[i]=inv*momentumY[i]+learningRate*momentumYTrack[i];}}
hydraulicErosion(){const{dropletsPerFrame,maxAge,minVolume,precipitationRate,gravity,momentumTransfer,entrainment,depositionRate,evaporationRate,sedimentErosionRate,bedrockErosionRate}=this.m.params;const{terrain}=this.m;const{size,heightMap,sedimentMap,bedrockMap,dischargeTrack,momentumXTrack,momentumYTrack,momentumX,momentumY,dischargeMap}=terrain;dischargeTrack.fill(0);momentumXTrack.fill(0);momentumYTrack.fill(0);for(let d=0;d<dropletsPerFrame;d++){let x=random(size)|0,y=random(size)|0;if(terrain.getHeight(x,y)<0.1)continue;let vx=0,vy=0,sediment=0,age=0,volume=precipitationRate;while(age<maxAge&&volume>=minVolume){const fx=x|0,fy=y|0;if(fx<0||fx>=size||fy<0||fy>=size)break;const idx=terrain.getIndex(fx,fy);const hs=heightMap[idx];const normal=terrain.getSurfaceNormal(fx,fy);vx+=(gravity*normal.x)/volume;vy+=(gravity*normal.z)/volume;const pmX=momentumX[idx],pmY=momentumY[idx],pmM=Math.sqrt(pmX*pmX+pmY*pmY);if(pmM>0){const sp=Math.sqrt(vx*vx+vy*vy);if(sp>0){const al=(pmX*vx+pmY*vy)/(pmM*sp),tr=(momentumTransfer*al)/(volume+dischargeMap[idx]);vx+=tr*pmX;vy+=tr*pmY;}}const fs=Math.sqrt(vx*vx+vy*vy);if(fs>0){const mg=Math.SQRT2/fs;vx*=mg;vy*=mg;}x+=vx;y+=vy;dischargeTrack[idx]+=volume;momentumXTrack[idx]+=volume*vx;momentumYTrack[idx]+=volume*vy;const isOut=(x<0||x>=size||y<0||y>=size);const he=isOut?hs-0.002:terrain.getHeight(x|0,y|0);const tc=Math.max(0,(1+entrainment*terrain.getDischarge(idx))*(hs-he));const def=tc-sediment;if(def>0){const fs2=Math.min(sedimentMap[idx],def*sedimentErosionRate);sedimentMap[idx]-=fs2;let ae=fs2;const rd=def-(fs2/sedimentErosionRate);if(rd>0){const fb=rd*bedrockErosionRate;bedrockMap[idx]-=fb;ae+=fb;}sediment+=ae;}else{const dep=-def*depositionRate;sedimentMap[idx]+=dep;sediment-=dep;}terrain.updateTotalHeight(idx);const ev=1-evaporationRate;volume*=ev;sediment*=ev;if(isOut)break;this.thermalErosion(x,y);age++;}}}
thermalErosion(x,y){const{terrain}=this.m;const{size,heightMap,sedimentMap,bedrockMap}=terrain;const{maxHeightDiff,settlingRate}=this.m.params;const cx=x|0,cy=y|0;if(cx<0||cx>=size||cy<0||cy>=size)return;const ci=terrain.getIndex(cx,cy),ch=heightMap[ci];for(let i=0;i<this.neighbours.length;i++){const{x:nx,y:ny,distance:dist}=this.neighbours[i];const bx=cx+nx,by=cy+ny;if(bx<0||bx>=size||by<0||by>=size)continue;const ni=terrain.getIndex(bx,by),nh=heightMap[ni],diff=ch-nh;if(diff===0)continue;const exc=Math.abs(diff)-dist*maxHeightDiff;if(exc<=0)continue;const tr=(settlingRate*exc)/2,si=diff>0?ci:ni,ti=diff>0?ni:ci;heightMap[si]-=tr;heightMap[ti]+=tr;let rem=tr;const fs=Math.min(rem,sedimentMap[si]);sedimentMap[si]-=fs;rem-=fs;if(rem>0)bedrockMap[si]-=rem;sedimentMap[ti]+=tr;}}}
</script>
<script>
class Camera{constructor(m){this.m=m;this.target={yaw:0,pitch:0.8,zoom:750};this.current={yaw:0,pitch:0.8,zoom:750};this.quaternion=new Quaternion();this.gesture={orbit:null,pinch:null};this.lerpWeight=0.25;}
update(){const{current,target,lerpWeight}=this;current.yaw=lerp(current.yaw,target.yaw,lerpWeight);current.pitch=lerp(current.pitch,target.pitch,lerpWeight);current.zoom=lerp(current.zoom,target.zoom,lerpWeight);this.quaternion=Quaternion.fromEuler(current.pitch,current.yaw).normalise();}
getEyePosition(){return this.quaternion.applyToVector({x:0,y:this.current.zoom,z:0});}
getUpVector(){return this.quaternion.applyToVector({x:0,y:0,z:-1});}
getViewDirection(){return this.quaternion.applyToVector({x:0,y:1,z:0});}
handleWheel(e){this.target.zoom=max(20,this.target.zoom+e.delta*0.5);}
handlePointer(){let pts=touches.length>0?touches:[];if(pts.length===0&&mouseIsPressed)pts=[{x:mouseX,y:mouseY}];const c=pts.length;if(c===1)this.handleOrbit(pts[0]);else if(c===2)this.handlePinch(pts[0],pts[1]);else{this.gesture.orbit=null;this.gesture.pinch=null;}}
handleOrbit(t){const{gesture,target}=this;if(!gesture.orbit){gesture.orbit={x:t.x,y:t.y};gesture.pinch=null;return;}const dx=(t.x-gesture.orbit.x)*0.007,dy=(t.y-gesture.orbit.y)*0.007;target.yaw+=dx;target.pitch=constrain(target.pitch+dy,-1.56,1.56);gesture.orbit.x=t.x;gesture.orbit.y=t.y;}
handlePinch(t1,t2){const{gesture,target}=this;const d=dist(t1.x,t1.y,t2.x,t2.y);if(!gesture.pinch){gesture.pinch={distance:d};gesture.orbit=null;return;}target.zoom=max(20,target.zoom/(d/gesture.pinch.distance));gesture.pinch.distance=d;}}
</script>
<script>
class FluviaRenderer{constructor(m){this.m=m;this.canvas3D=createGraphics(width,height,WEBGL);this.terrainShader=this.canvas3D.createShader(m.shaders.vert,m.shaders.frag);const{size}=m.terrain;this.canvas2D=createImage(size,size);this.heightMapTexture=createImage(size,size);this.lut=new Uint8ClampedArray(256*3);this.currentColourMap='';}
reinitialise(){const{size}=this.m.terrain;this.canvas2D=createImage(size,size);this.heightMapTexture=createImage(size,size);}
updateLUT(cm){if(this.currentColourMap===cm)return;const cd=this.m.colourMaps[cm];if(!cd)return;this.currentColourMap=cm;const ch=['r','g','b'];for(let i=0;i<256;i++){const t=i/255;for(let c=0;c<3;c++){const co=cd[ch[c]];let v=0;for(let j=co.length-1;j>=0;j--)v=v*t+co[j];this.lut[i*3+c]=constrain(v*255,0,255);}}}
generateTextures(is3D){const{params,terrain,camera,statistics}=this.m;const{surfaceMap,lightDir,flatColour,steepColour,sedimentColour,waterColour,skyColour,specularIntensity}=params;const{size,area,heightMap,originalHeightMap,sedimentMap,dischargeMap}=terrain;if(surfaceMap!=='composite')this.updateLUT(params.colourMap||'viridis');const lM=Math.sqrt(lightDir.x**2+lightDir.y**2+lightDir.z**2)||1;const lX=lightDir.x/lM,lY=lightDir.y/lM,lZ=lightDir.z/lM;let vX=0,vY=1,vZ=0;if(is3D){const v=camera.getViewDirection();vX=v.x;vY=v.y;vZ=v.z;}const bounds=this.calculateBounds(surfaceMap);this.canvas2D.loadPixels();this.heightMapTexture.loadPixels();for(let i=0;i<area;i++){const idx=i<<2,hV=heightMap[i],hB=(hV*255)|0;this.heightMapTexture.pixels[idx]=hB;this.heightMapTexture.pixels[idx+1]=hB;this.heightMapTexture.pixels[idx+2]=hB;this.heightMapTexture.pixels[idx+3]=255;let r,g,b;if(surfaceMap==='composite'){const x=i%size,y=(i/size)|0;const nm=terrain.getSurfaceNormal(x,y);const dot=nm.x*lX+nm.y*lY+nm.z*lZ,diff=Math.max(0,dot),sW=nm.y*0.5+0.5;const shR=diff+(skyColour.r*0.000588)*sW,shG=diff+(skyColour.g*0.000588)*sW,shB=diff+(skyColour.b*0.000588)*sW;const st=1-nm.y;r=(nm.y*flatColour.r+st*steepColour.r)*shR;g=(nm.y*flatColour.g+st*steepColour.g)*shG;b=(nm.y*flatColour.b+st*steepColour.b)*shB;const sed=sedimentMap[i];if(sed>0){const a=Math.min(1,sed*5);r=(1-a)*r+a*sedimentColour.r*shR;g=(1-a)*g+a*sedimentColour.g*shG;b=(1-a)*b+a*sedimentColour.b*shB;}const dis=terrain.getDischarge(i);if(dis>0){const a=Math.min(1,dis),s=Math.max(0.3,1-dis*0.25);r=(1-a)*r+a*waterColour.r*s*shR;g=(1-a)*g+a*waterColour.g*s*shG;b=(1-a)*b+a*waterColour.b*s*shB;if(is3D){const hX=lX+vX,hY=lY+vY,hZ=lZ+vZ,hM=Math.sqrt(hX*hX+hY*hY+hZ*hZ)||1;const ndh=Math.max(0,(nm.x*hX+nm.y*hY+nm.z*hZ)/hM);const sp=Math.pow(ndh,120)*(specularIntensity||255)*a;r=Math.min(255,r+sp);g=Math.min(255,g+sp);b=Math.min(255,b+sp);}}}else{let v2=0;if(surfaceMap==='height')v2=(hV-bounds.min)/bounds.range;else if(surfaceMap==='slope')v2=1-terrain.getSurfaceNormal(i%size,(i/size)|0).y;else if(surfaceMap==='discharge')v2=terrain.getDischarge(i);else if(surfaceMap==='sediment')v2=(sedimentMap[i]-bounds.min)/bounds.range;else if(surfaceMap==='delta')v2=0.5+(hV-originalHeightMap[i])*10;const lI=constrain((v2*255)|0,0,255)*3;r=this.lut[lI];g=this.lut[lI+1];b=this.lut[lI+2];}this.canvas2D.pixels[idx]=r;this.canvas2D.pixels[idx+1]=g;this.canvas2D.pixels[idx+2]=b;this.canvas2D.pixels[idx+3]=255;}this.canvas2D.updatePixels();this.heightMapTexture.updatePixels();}
calculateBounds(mode){const{statistics}=this.m;if(mode==='height'){const{min,max}=statistics.heightBounds;return{min,range:(max-min)||1};}if(mode==='discharge')return{min:0,range:statistics.peakDischarge||1};if(mode==='sediment'){const{min,max}=statistics.sedimentBounds;return{min,range:(max-min)||1};}return{min:0,range:1};}
render(){const is3D=this.m.params.displayMethod==='3D';this.generateTextures(is3D);if(is3D)this.render3D();else this.render2D();this.renderOverlay();}
render2D(){image(this.canvas2D,0,0,width,height);}
render3D(){const{canvas3D,terrainShader,heightMapTexture,canvas2D}=this;const{terrain,params,camera}=this.m;const eye=camera.getEyePosition(),up=camera.getUpVector();canvas3D.background(params.skyColour.r,params.skyColour.g,params.skyColour.b);canvas3D.push();canvas3D.resetMatrix();canvas3D.perspective(PI/3,width/height,0.1,30000);canvas3D.camera(eye.x,eye.y,eye.z,0,0,0,up.x,up.y,up.z);canvas3D.noStroke();canvas3D.shader(terrainShader);terrainShader.setUniform('uHeightMap',heightMapTexture);terrainShader.setUniform('uTexture',canvas2D);terrainShader.setUniform('uHeightScale',params.heightScale);const pS=terrain.size*2;canvas3D.plane(pS,pS,terrain.size-1,terrain.size-1);canvas3D.pop();image(canvas3D,0,0,width,height);}
renderOverlay(){if(this.m.params.renderStats)this.renderStats();if(this.m.params.renderLegend)this.renderLegend();}
renderStats(){push();const{statistics,params}=this.m;fill(255);textSize(15);textAlign(LEFT,TOP);const lines=['FPS: '+statistics.fps.toFixed(2),'Time: '+statistics.simulationTime.toFixed(2)+'s','Display: '+params.displayMethod,'Surface: '+params.surfaceMap,'Elev: '+statistics.minElevation.toFixed(3)+' - '+statistics.maxElevation.toFixed(3),'Discharge: '+statistics.peakDischarge.toFixed(3),'Rugosity: '+statistics.rugosity.toFixed(3)];text(lines.join('\n'),20,20);pop();}
renderLegend(){if(this.m.params.surfaceMap==='composite')this.renderCompositeLegend();else this.renderDataLegend();}
renderCompositeLegend(){push();const{flatColour,steepColour,sedimentColour,waterColour}=this.m.params;const items=[{l:'Flat',c:flatColour},{l:'Steep',c:steepColour},{l:'Sediment',c:sedimentColour},{l:'Water',c:waterColour}];textSize(14);textAlign(LEFT,CENTER);items.forEach((item,i)=>{const y=15+i*28;fill(item.c.r,item.c.g,item.c.b);stroke(255,200);strokeWeight(1);rect(width-110,y,20,20);fill(255);noStroke();text(item.l,width-82,y+10);});pop();}
renderDataLegend(){push();const{surfaceMap,colourMap}=this.m.params;this.updateLUT(colourMap||'viridis');const x=width-15,y1=15,y2=height-15,w=20,h=y2-y1;const grad=drawingContext.createLinearGradient(0,y1,0,y2);for(let i=0;i<=10;i++){const t=i/10,idx2=(((1-t)*255)|0)*3;grad.addColorStop(t,'rgb('+this.lut[idx2]+','+this.lut[idx2+1]+','+this.lut[idx2+2]+')');}drawingContext.strokeStyle='rgba(255,255,255,0.78)';drawingContext.lineWidth=1;drawingContext.fillStyle=grad;drawingContext.fillRect(x-w,y1,w,h);drawingContext.strokeRect(x-w,y1,w,h);const b=this.calculateBounds(surfaceMap);const labels=[{v:b.min+b.range,y:y1},{v:b.min+b.range/2,y:y1+h/2},{v:b.min,y:y2}];fill(255);textSize(11);textAlign(RIGHT,CENTER);labels.forEach(lb=>{text(lb.v.toFixed(3),x-w-6,lb.y);stroke(255,100);line(x-w-3,lb.y,x-w,lb.y);});pop();}
resize(){const s=min(windowWidth,windowHeight);if(this.canvas3D)this.canvas3D.resizeCanvas(s,s);}}
</script>
<script>
class Analyser{constructor(m){this.m=m;this.simulationStartTime=performance.now();this.reinitialise();}
reinitialise(){const{area}=this.m.terrain;const st=this.m.statistics;this.simulationStartTime=performance.now();this.lastAnalysisTime=performance.now();this.prevTotalSediment=0;this.prevTotalBedrock=0;st.simulationTime=0;st.frameCounter=0;st.heightHistogram=new Int32Array(256);st.normHistogram=new Float32Array(256);st.rugosity=0;st.drainageDensity=0;st.sedimentFlux=0;st.erosionRate=0;st.hydraulicResidence=0;st.totalWater=0;st.totalSediment=0;st.totalBedrock=0;st.maxElevation=0;st.minElevation=0;st.avgElevation=0;st.elevationStdDev=0;st.peakDischarge=0;st.activeWaterCover=0;st.slopeComplexity=0;st.heightBounds={min:0,max:0};st.sedimentBounds={min:0,max:0};st.dischargeBounds={min:0,max:0};}
update(){const{statistics,params}=this.m;statistics.fps=frameRate();statistics.frameCounter++;statistics.simulationTime=(performance.now()-this.simulationStartTime)/1000;if(params.running)this.runAnalysis();}
runAnalysis(){const{terrain,statistics,params}=this.m;const{area,size,heightMap,bedrockMap,sedimentMap,dischargeMap}=terrain;const{heightScale,evaporationRate}=params;let tw=0,ts2=0,tb=0,rc=0,tsa=0,mn=Infinity,mx=-Infinity,se=0,sq=0,ms=Infinity,xs=-Infinity,md=0,sl=0;statistics.heightHistogram.fill(0);const ct=performance.now();const dt=(ct-this.lastAnalysisTime)/1000||0.016;for(let i=0;i<area;i++){const h=heightMap[i],s=sedimentMap[i],b=bedrockMap[i],d=dischargeMap[i];tw+=d;ts2+=s;tb+=b;se+=h;sq+=h*h;if(h<mn)mn=h;if(h>mx)mx=h;if(s<ms)ms=s;if(s>xs)xs=s;if(d>md)md=d;if(d>0.05)rc++;const bn=Math.min(255,Math.max(0,(h*255)|0));statistics.heightHistogram[bn]++;const x=i%size,y=(i/size)|0;if(x<size-1&&y<size-1){const sa=this._calcCellSA(x,y,terrain,heightScale);tsa+=sa;sl+=(sa-1);}}statistics.minElevation=mn;statistics.maxElevation=mx;statistics.heightBounds={min:mn,max:mx};statistics.sedimentBounds={min:ms,max:xs};statistics.dischargeBounds={min:0,max:md};statistics.peakDischarge=md;statistics.avgElevation=se/area;const vr=(sq/area)-(statistics.avgElevation**2);statistics.elevationStdDev=Math.sqrt(Math.max(0,vr));statistics.totalWater=tw;statistics.totalSediment=ts2;statistics.totalBedrock=tb;statistics.rugosity=tsa/area;statistics.slopeComplexity=sl/area;statistics.drainageDensity=(rc/area)*100;statistics.activeWaterCover=rc;statistics.sedimentFlux=(ts2-this.prevTotalSediment)/dt;statistics.erosionRate=(this.prevTotalBedrock-tb)/dt;statistics.hydraulicResidence=tw/(evaporationRate*area+1e-6);this._normaliseHistogram();this.prevTotalSediment=ts2;this.prevTotalBedrock=tb;this.lastAnalysisTime=ct;}
_normaliseHistogram(){const{heightHistogram,normHistogram}=this.m.statistics;let mx=0;for(let i=0;i<256;i++)if(heightHistogram[i]>mx)mx=heightHistogram[i];for(let i=0;i<256;i++)normHistogram[i]=mx>0?heightHistogram[i]/mx:0;}
_calcCellSA(x,y,t,sc){const{size,heightMap}=t;const i=y*size+x;const h00=heightMap[i]*sc,h10=heightMap[i+1]*sc,h01=heightMap[i+size]*sc,h11=heightMap[i+size+1]*sc;const dx=(h10-h00+h11-h01)*0.5,dy=(h01-h00+h11-h10)*0.5;return Math.sqrt(1+dx*dx+dy*dy);}
getAverageHeightInRegion(nx,ny,ns){const{size,heightMap}=this.m.terrain;const sx=(nx*size)|0,sy=(ny*size)|0,edge=(ns*size)|0;let sum=0,cnt=0;for(let y=sy;y<sy+edge&&y<size;y++)for(let x=sx;x<sx+edge&&x<size;x++){sum+=heightMap[y*size+x];cnt++;}return cnt>0?sum/cnt:0;}}
</script>
<script>
class Media{constructor(m){this.m=m;this.mediaRecorder=null;this.recordedChunks=[];this.isRecording=false;this.importInput=document.createElement('input');this.importInput.type='file';this.importInput.accept='image/*';this.importInput.style.display='none';this.importInput.addEventListener('change',(e)=>{const f=e.target.files[0];if(f)this.handleImport(f);});document.body.appendChild(this.importInput);}
openImportDialog(){this.importInput.value='';this.importInput.click();}
handleImport(file){if(!file?.type.startsWith('image'))return;const reader=new FileReader();reader.onload=(e)=>{const src=e.target.result;loadImage(src,(img)=>{try{const{terrain}=this.m;const{size,area,heightMap,bedrockMap,originalHeightMap,sedimentMap}=terrain;if(!img)throw new Error('null');img.resize(size,size);img.loadPixels();const{pixels}=img;if(!pixels||pixels.length<area*4)throw new Error('incomplete');for(let i=0;i<area;i++){const idx=i<<2;const br=(0.2126*pixels[idx]+0.7152*pixels[idx+1]+0.0722*pixels[idx+2])/255;heightMap[i]=bedrockMap[i]=originalHeightMap[i]=br;sedimentMap[i]=0;}terrain.reset();}catch(err){console.error('Import failed:',err);}});};reader.readAsDataURL(file);}
startRecording(){if(this.isRecording)return;const sc=_renderer.elt;if(!sc)return;this.recordedChunks=[];const types=['video/webm;codecs=vp8','video/mp4','video/webm'];const st=types.find(t=>MediaRecorder.isTypeSupported(t));if(!st)return;try{const stream=sc.captureStream(60);this.mediaRecorder=new MediaRecorder(stream,{mimeType:st,videoBitsPerSecond:8000000});this.mediaRecorder.ondataavailable=(e)=>{if(e.data.size>0)this.recordedChunks.push(e.data);};this.mediaRecorder.onstop=()=>{const blob=new Blob(this.recordedChunks,{type:st});const ext=st.includes('mp4')?'mp4':'webm';const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='fluvia_recording.'+ext;a.click();};this.mediaRecorder.start();this.isRecording=true;}catch(err){this.stopRecording();}}
stopRecording(){if(!this.mediaRecorder||!this.isRecording)return;this.mediaRecorder.stop();this.isRecording=false;this.recordedChunks=[];}
exportImage(){try{save(_renderer,'fluvia_export.png');}catch(err){console.error(err);}}}
</script>
<script>
class GUI{constructor(m){this.m=m;const{name,version,author}=m.metadata;this.pane=new Tweakpane.Pane({title:name+' '+version+' by '+author,expanded:false});this.setupTabs();}
setupTabs(){const tabs=this.pane.addTab({pages:[{title:'General'},{title:'Erosion'},{title:'Visuals'},{title:'Media'}]});const[general,erosion,visuals,media]=tabs.pages;this.createGeneralTab(general);this.createErosionTab(erosion);this.createVisualTab(visuals);this.createMediaTab(media);}
createGeneralTab(page){const{params}=this.m;page.addButton({title:'Generate Terrain'}).on('click',()=>this.m.generate());page.addButton({title:'Reset Terrain'}).on('click',()=>this.m.reset());page.addBlade({view:'separator'});page.addBinding(params,'running',{label:'Running'});page.addBinding(params,'dropletsPerFrame',{label:'Droplets/Frame',min:0,max:512,step:1});page.addBinding(params,'maxAge',{label:'Max Age',min:128,max:512,step:1});const gen=page.addFolder({title:'Generation'});gen.addBinding(params,'terrainSize',{label:'Size',options:{'128x128':128,'256x256':256,'512x512':512}});gen.addBinding(params,'noiseScale',{label:'Scale',min:0.1,max:5});gen.addBinding(params,'noiseOctaves',{label:'Octaves',min:1,max:12,step:1});}
createErosionTab(page){const{params}=this.m;const h=page.addFolder({title:'Hydraulic'});[{key:'sedimentErosionRate',label:'Sediment Erosion',min:0,max:0.2},{key:'bedrockErosionRate',label:'Bedrock Erosion',min:0,max:0.2},{key:'depositionRate',label:'Deposition',min:0,max:0.2},{key:'evaporationRate',label:'Evaporation',min:0.001,max:1,step:0.001},{key:'precipitationRate',label:'Precipitation',min:0,max:5},{key:'entrainment',label:'Entrainment',min:0,max:10},{key:'gravity',label:'Gravity',min:0.1,max:5},{key:'momentumTransfer',label:'Momentum',min:0,max:4}].forEach(s=>h.addBinding(params,s.key,s));const t=page.addFolder({title:'Thermal'});t.addBinding(params,'maxHeightDiff',{label:'Max Delta H',min:0.01,max:1});t.addBinding(params,'settlingRate',{label:'Settling',min:0,max:1});}
createVisualTab(page){const{params,colourMaps}=this.m;page.addBinding(params,'displayMethod',{label:'Display',options:{'3D':'3D','2D':'2D'}});page.addBinding(params,'surfaceMap',{label:'Surface',options:{Composite:'composite','Height Map':'height',Slope:'slope',Discharge:'discharge',Sediment:'sediment',Delta:'delta'}});const cmo=Object.keys(colourMaps).reduce((o,n)=>{o[n.charAt(0).toUpperCase()+n.slice(1)]=n;return o;},{});page.addBinding(params,'colourMap',{options:cmo,label:'Colour Map'});page.addBinding(params,'heightScale',{label:'Height Scale',min:1,max:256});const ov=page.addFolder({title:'Overlay'});ov.addBinding(params,'renderStats',{label:'Stats'});ov.addBinding(params,'renderLegend',{label:'Legend'});const li=page.addFolder({title:'Lighting'});li.addBinding(params,'lightDir',{label:'Direction',x:{min:-100,max:100},y:{min:-100,max:100},z:{min:-100,max:100}});li.addBinding(params,'specularIntensity',{label:'Specular',min:0.01,max:1024});const cl=page.addFolder({title:'Colours'});['sky','flat','steep','sediment','water'].forEach(t2=>{cl.addBinding(params,t2+'Colour',{label:t2.charAt(0).toUpperCase()+t2.slice(1)});});}
createMediaTab(page){const{media}=this.m;const imp=page.addFolder({title:'Import'});imp.addButton({title:'Import Heightmap'}).on('click',()=>media.openImportDialog());const exp=page.addFolder({title:'Export'});const btn=exp.addButton({title:'Start Recording'});let rec=false;btn.on('click',()=>{if(rec){media.stopRecording();btn.title='Start Recording';rec=false;}else{media.startRecording();btn.title='Stop Recording';rec=true;}});exp.addButton({title:'Export Image'}).on('click',()=>media.exportImage());}}
</script>
<script>
class Manager{constructor(assets){const{metadata,vertShader,fragShader,colourMaps}=assets;this.metadata=metadata;this.shaders={vert:vertShader,frag:fragShader};this.colourMaps=colourMaps;this.params={running:true,dropletsPerFrame:256,maxAge:500,minVolume:0.01,terrainSize:256,noiseScale:0.6,noiseOctaves:8,amplitudeFalloff:0.6,sedimentErosionRate:0.1,bedrockErosionRate:0.1,depositionRate:0.1,evaporationRate:0.001,precipitationRate:1,entrainment:1,gravity:1,momentumTransfer:1,learningRate:0.1,maxHeightDiff:0.01,settlingRate:0.8,renderStats:true,renderLegend:true,displayMethod:'3D',heightScale:100,surfaceMap:'composite',colourMap:'viridis',lightDir:{x:50,y:50,z:-50},specularIntensity:100,skyColour:{r:173,g:183,b:196},steepColour:{r:115,g:115,b:95},flatColour:{r:50,g:81,b:33},sedimentColour:{r:201,g:189,b:117},waterColour:{r:92,g:133,b:142}};this.statistics={fps:0,frameCounter:0,simulationTime:0,heightHistogram:new Int32Array(256),normHistogram:new Float32Array(256),minElevation:0,maxElevation:0,avgElevation:0,elevationStdDev:0,heightBounds:{min:0,max:0},totalWater:0,totalSediment:0,totalBedrock:0,sedimentBounds:{min:0,max:0},peakDischarge:0,activeWaterCover:0,drainageDensity:0,dischargeBounds:{min:0,max:0},hydraulicResidence:0,rugosity:0,slopeComplexity:0,sedimentFlux:0,erosionRate:0};this.terrain=new Terrain(this);this.solver=new Solver(this);this.camera=new Camera(this);this.renderer=new FluviaRenderer(this);this.analyser=new Analyser(this);this.media=new Media(this);this.gui=new GUI(this);this.terrain.generate();}
update(){const{solver,camera,analyser,params}=this;if(params.running){solver.hydraulicErosion();solver.updateDischargeMap();}camera.update();analyser.update();}
draw(){this.renderer.render();}
generate(){if(this.terrain.size!==this.params.terrainSize)this.reinitialise();else this.terrain.generate();this.analyser.reinitialise();}
reset(){this.terrain.reset();this.analyser.reinitialise();}
reinitialise(){this.terrain=new Terrain(this);this.solver=new Solver(this);this.renderer.reinitialise();this.terrain.generate();}
handleWheel(e){if(this.canvasInteraction(e))this.camera.handleWheel(e);}
handlePointer(e){if(this.canvasInteraction(e))this.camera.handlePointer(e);}
canvasInteraction(e){if(!e?.target||typeof e.target.closest!=='function')return false;return this.params.displayMethod==='3D'&&!e.target.closest('.tp-dfwv')&&e.target.tagName==='CANVAS';}}
</script>
<script>
p5.disableFriendlyErrors=true;
var manager,initialized=false;
var metadata={name:'Fluvia',version:'v4.5',author:'@eanutt1272'};
function setup(){
  var s=min(windowWidth,windowHeight);
  createCanvas(s,s);
  noSmooth();pixelDensity(1);
  background(50);fill(200);noStroke();textAlign(CENTER,CENTER);textSize(14);
  text('Initialising terrain simulation...',width/2,height/2);
}
function draw(){
  if(!initialized){
    if(window.__tpReady){
      try{manager=new Manager({metadata:metadata,vertShader:VERT,fragShader:FRAG,colourMaps:CM});initialized=true;}
      catch(e){background(50);fill(255,100,100);textSize(12);textAlign(CENTER,CENTER);text('Error: '+e.message,width/2,height/2);}
    }
    return;
  }
  manager.update();manager.draw();
}
function mouseWheel(e){if(manager)return manager.handleWheel(e);}
function mouseDragged(e){if(manager)return manager.handlePointer(e);}
function touchStarted(e){if(manager)return manager.handlePointer(e);}
function touchMoved(e){if(manager)return manager.handlePointer(e);}
function touchEnded(e){if(manager)return manager.handlePointer(e);}
function windowResized(){var s=min(windowWidth,windowHeight);resizeCanvas(s,s);if(manager)manager.resize();}
</script>
</body></html>`

const faceRiotHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(255,0,80,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(255,0,80,0.7);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(255,0,80,0.6);background:transparent;color:#ff0050;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(255,0,80,0.15)}.hint{color:rgba(255,0,80,0.4);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<canvas id="c"></canvas>
<div class="label">MediaPipe · Face Riot · 468 Landmarks</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startSketch()">Enable Camera</button><div class="hint">Face mesh with cyberpunk glitch effects</div></div>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script>
var C=document.getElementById('c'),ctx=C.getContext('2d');
var W=C.width=innerWidth,H=C.height=innerHeight;
window.addEventListener('resize',function(){W=C.width=innerWidth;H=C.height=innerHeight;});
function ss(t){document.getElementById('st').textContent=t;}

// Face mesh connection groups from MediaPipe
var LIPS=[[61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]];
var FACE=[[10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]];
var LBROW=[[55,107],[107,66],[66,105],[105,63],[63,70]];
var RBROW=[[285,336],[336,296],[296,334],[334,293],[293,300]];
var NOSE=[[168,6],[6,197],[197,195],[195,5],[5,4],[4,1],[1,19],[19,94],[94,2],[2,164],[164,0],[0,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,200]];
var LEYE=[[33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]];
var REYE=[[362,382],[382,381],[381,380],[380,374],[374,373],[373,390],[390,249],[249,263],[362,398],[398,384],[384,385],[385,386],[386,387],[387,388],[388,466],[466,263]];

var landmarks=[];
var glitchT=0,glitchActive=false,glitchTimer=0;
var scanY=0;
var errorMessages=['FACE_LOCK_FAILED','SYS_OVERRIDE','MESH_CORRUPT','ID_BREACH','NET_INTRUSION','PROTOCOL_ERROR','SIGNAL_LOST','DATA_MISMATCH','AUTH_NULL','CORE_DUMP'];
var floatTexts=[];
var hueShift=0;
var videoEl=null;

function startSketch(){
  document.getElementById('ui').style.display='none';
  ss('Requesting camera...');
  var faceMesh=new FaceMesh({locateFile:function(f){return 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'+f;}});
  faceMesh.setOptions({maxNumFaces:1,refineLandmarks:true,minDetectionConfidence:0.5,minTrackingConfidence:0.5});
  faceMesh.onResults(function(r){
    landmarks=r.multiFaceLandmarks&&r.multiFaceLandmarks.length>0?r.multiFaceLandmarks[0]:[];
  });
  videoEl=document.createElement('video');
  videoEl.setAttribute('playsinline','');videoEl.muted=true;videoEl.style.display='none';document.body.appendChild(videoEl);
  navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false}).then(function(stream){
    videoEl.srcObject=stream;videoEl.autoplay=true;
    videoEl.play().then(function(){
      ss('Face Riot Active');render();
      var busy=false;
      (function sendFrame(){requestAnimationFrame(sendFrame);if(busy||videoEl.readyState<2)return;busy=true;faceMesh.send({image:videoEl}).then(function(){busy=false;}).catch(function(){busy=false;});})();
    }).catch(function(e){ss('Error: '+e.message);});
  }).catch(function(e){ss('Error: '+e.message);});
}

function mapX(x){return x*W;}
function mapY(y){return y*H;}

function addFloat(txt,x,y){floatTexts.push({t:txt,x:x,y:y,life:1,vx:(Math.random()-0.5)*0.5,vy:-Math.random()*0.8-0.2,size:8+Math.random()*8});}

function drawConnections(conns,col,lw,alpha){
  if(!landmarks.length)return;
  ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.globalAlpha=alpha;
  ctx.beginPath();
  for(var i=0;i<conns.length;i++){
    var a=landmarks[conns[i][0]],b=landmarks[conns[i][1]];
    if(!a||!b)continue;
    ctx.moveTo(mapX(a.x),mapY(a.y));ctx.lineTo(mapX(b.x),mapY(b.y));
  }
  ctx.stroke();ctx.globalAlpha=1;
}

function drawLandmarks(color,r,alpha){
  if(!landmarks.length)return;
  ctx.fillStyle=color;ctx.globalAlpha=alpha;
  for(var i=0;i<landmarks.length;i++){
    var p=landmarks[i];
    ctx.beginPath();ctx.arc(mapX(p.x),mapY(p.y),r,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;
}

function render(){
  requestAnimationFrame(render);
  var t=performance.now()*0.001;
  hueShift=(hueShift+0.5)%360;

  // Dark background with slight trail
  ctx.fillStyle='rgba(0,0,0,0.85)';ctx.fillRect(0,0,W,H);

  // Scan line
  scanY=(scanY+1.5)%H;
  ctx.fillStyle='rgba(255,0,80,0.04)';ctx.fillRect(0,scanY,W,2);
  ctx.fillStyle='rgba(255,0,80,0.015)';ctx.fillRect(0,0,W,scanY);

  // CRT scanlines
  ctx.fillStyle='rgba(0,0,0,0.12)';
  for(var sy=0;sy<H;sy+=4){ctx.fillRect(0,sy,W,2);}

  // Glitch trigger
  glitchTimer--;
  if(glitchTimer<=0){glitchActive=Math.random()<0.3;glitchTimer=Math.floor(Math.random()*60)+20;if(glitchActive&&landmarks.length)addFloat(errorMessages[Math.floor(Math.random()*errorMessages.length)],Math.random()*W*0.6+W*0.2,Math.random()*H*0.5+H*0.1);}

  if(landmarks.length){
    // Glitch offset
    var gx=glitchActive?(Math.random()-0.5)*8:0,gy=glitchActive?(Math.random()-0.5)*4:0;
    ctx.save();ctx.translate(gx,gy);

    // Draw face mesh layers
    // Cyan base connections
    drawConnections(FACE,'rgba(0,255,200,0.6)',0.8,1);
    drawConnections(LEYE,'rgba(0,200,255,0.8)',1,1);
    drawConnections(REYE,'rgba(0,200,255,0.8)',1,1);
    drawConnections(LBROW,'rgba(255,200,0,0.7)',1,1);
    drawConnections(RBROW,'rgba(255,200,0,0.7)',1,1);
    drawConnections(NOSE,'rgba(180,0,255,0.7)',0.8,1);
    drawConnections(LIPS,'rgba(255,0,80,0.9)',1.2,1);

    // Magenta overlay with hue shift when glitching
    if(glitchActive){
      ctx.save();ctx.translate(3,0);
      drawConnections(FACE,'rgba(255,0,80,0.3)',1,1);
      ctx.restore();
      ctx.save();ctx.translate(-3,0);
      drawConnections(FACE,'rgba(0,255,255,0.3)',1,1);
      ctx.restore();
    }

    // Landmark dots
    drawLandmarks('rgba(0,255,200,0.9)',1.2,1);
    // Key points highlighted
    var keyPts=[1,4,6,9,10,152,234,454,33,263];
    ctx.fillStyle='rgba(255,0,80,1)';ctx.globalAlpha=0.9;
    for(var ki=0;ki<keyPts.length;ki++){var kp=landmarks[keyPts[ki]];if(kp){ctx.beginPath();ctx.arc(mapX(kp.x),mapY(kp.y),3,0,Math.PI*2);ctx.fill();}}
    ctx.globalAlpha=1;

    ctx.restore();

    // Coordinate readout for nose tip
    var nose=landmarks[1];
    if(nose){
      ctx.fillStyle='rgba(0,255,200,0.6)';ctx.font='9px monospace';
      ctx.fillText('FACE_X:'+nose.x.toFixed(3)+' Y:'+nose.y.toFixed(3)+' Z:'+nose.z.toFixed(3),10,H-30);
    }
  } else {
    // No face - show searching text
    ctx.fillStyle='rgba(255,0,80,0.5)';ctx.font='11px monospace';ctx.textAlign='center';
    ctx.fillText('SCANNING FOR BIOMETRIC INPUT...',W/2,H/2);
    ctx.textAlign='left';
    // Animated grid
    ctx.strokeStyle='rgba(255,0,80,0.1)';ctx.lineWidth=0.5;
    var gsize=40;
    for(var gx2=0;gx2<W;gx2+=gsize){ctx.beginPath();ctx.moveTo(gx2,0);ctx.lineTo(gx2,H);ctx.stroke();}
    for(var gy2=0;gy2<H;gy2+=gsize){ctx.beginPath();ctx.moveTo(0,gy2);ctx.lineTo(W,gy2);ctx.stroke();}
  }

  // Floating error text
  ctx.font='10px monospace';
  for(var fi=floatTexts.length-1;fi>=0;fi--){
    var ft=floatTexts[fi];
    ft.x+=ft.vx;ft.y+=ft.vy;ft.life-=0.015;
    if(ft.life<=0){floatTexts.splice(fi,1);continue;}
    ctx.globalAlpha=ft.life;ctx.fillStyle='#ff0050';
    ctx.font=ft.size+'px monospace';ctx.fillText(ft.t,ft.x,ft.y);
  }
  ctx.globalAlpha=1;

  // Corner HUD
  ctx.fillStyle='rgba(255,0,80,0.6)';ctx.font='9px monospace';
  ctx.fillText('FACE_RIOT_v2 // LANDMARKS:'+landmarks.length,10,14);
  ctx.fillText('STATUS:'+(landmarks.length?'LOCKED':'SEARCHING'),10,26);

  // Glitch bar
  if(glitchActive){
    var bh=3+Math.random()*8;var by=Math.random()*H;
    ctx.fillStyle='rgba(255,0,80,0.4)';ctx.fillRect(0,by,W,bh);
    // RGB split on a random horizontal slice
    var sliceY=Math.floor(Math.random()*H);
    var sliceH=Math.floor(Math.random()*6)+2;
    ctx.save();
    try{var img=ctx.getImageData(0,sliceY,W,sliceH);}catch(e){}
    ctx.restore();
  }
}
</script></body></html>`

export const demos: Demo[] = [
  {
    id: 'teal-plasma',
    title: 'Teal Plasma',
    description: 'GPU-rendered plasma field built in GLSL. Every pixel computed on the graphics card — move your cursor to warp the interference pattern.',
    category: 'shader',
    tech: 'GLSL / WebGL',
    thumbnail: 'from-[#001418] via-[#003d4a] to-[#008197]',
    camera: false,
    html: plasmaHtml,
    hint: 'Move cursor to warp the plasma field',
    controls: [
      { id: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1, unit: '×' },
    ],
  },
  {
    id: 'particle-storm',
    title: 'Particle Storm',
    description: '18,000 particles suspended in three-dimensional space. Mouse movement controls camera rotation — revealing depth and structure in the chaos.',
    category: 'interactive',
    tech: 'Three.js',
    thumbnail: 'from-[#000d10] via-[#002a33] to-[#005f73]',
    camera: false,
    html: particleHtml,
    hint: 'Move cursor to orbit the particle cloud',
    controls: [
      { id: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1, unit: '×' },
    ],
  },
  {
    id: 'neural-flow',
    title: 'Neural Flow',
    description: 'Perlin noise flow field rendered with 900 autonomous agents. Each particle follows invisible force vectors — the cursor bends the field.',
    category: 'generative',
    tech: 'p5.js',
    thumbnail: 'from-[#000810] via-[#001f28] to-[#00414F]',
    camera: false,
    html: flowHtml,
    hint: 'Move cursor to bend the flow field',
  },
  {
    id: 'void-portal',
    title: 'Void Portal',
    description: 'Raymarched 3D geometry using Signed Distance Functions. Three nested tori and a sphere — entirely computed per pixel in GLSL. Move cursor to orbit.',
    category: 'shader',
    tech: 'GLSL / Raymarching',
    thumbnail: 'from-[#000508] via-[#001520] to-[#003346]',
    camera: false,
    html: voidHtml,
    hint: 'Move cursor to orbit the structure',
    controls: [
      { id: 'speed', label: 'Rotation Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1, unit: '×' },
    ],
  },
  {
    id: 'void-tunnel',
    title: 'Void Tunnel',
    description: '150 concentric shapes morphing between perfect squares and circles. Mouse X warps the dimensional twist, Mouse Y controls the pulse speed.',
    category: 'generative',
    tech: 'p5.js',
    thumbnail: 'from-[#000005] via-[#001a00] to-[#003300]',
    camera: false,
    html: voidTunnelHtml,
    hint: 'Mouse X = twist · Mouse Y = speed',
  },
  {
    id: 'accretion',
    title: 'Accretion Nebula',
    description: 'Fractal raymarching through a procedural space nebula. 20-step raymarch with 7 layers of noise — every pixel computed on the GPU in real time.',
    category: 'shader',
    tech: 'GLSL / Raymarching',
    thumbnail: 'from-[#050005] via-[#1a0030] to-[#300050]',
    camera: false,
    html: accretionHtml,
    hint: 'GPU fractal nebula — just watch',
    controls: [
      { id: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1, unit: '×' },
    ],
  },
  {
    id: 'matter-chaos',
    title: 'Physics Chaos',
    description: 'Matter.js 2D rigid body physics — circles, rectangles, polygons and trapezoids rain down in teal tones. Click and drag any shape to fling it around.',
    category: 'interactive',
    tech: 'Matter.js',
    thumbnail: 'from-[#000810] via-[#001220] to-[#002035]',
    camera: false,
    html: matterPhysicsHtml,
    hint: 'Click and drag any shape · They collide and stack',
  },
  {
    id: 'domain-warp',
    title: 'Domain Warp',
    description: 'Four layers of domain-warped fractal Brownian motion computed entirely on the GPU. Move your cursor to shift the flow — no two frames are ever the same.',
    category: 'shader',
    tech: 'GLSL / WebGL',
    thumbnail: 'from-[#000308] via-[#001020] to-[#002038]',
    camera: false,
    html: domainWarpHtml,
    hint: 'Move cursor to warp the fractal field',
    controls: [
      { id: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1, unit: '×' },
    ],
  },
  {
    id: 'camera-vision',
    title: 'Camera Vision',
    description: 'Live camera feed with ML5.js face mesh tracking — 468 landmarks mapped in real time. Full wireframe face with squiggly eye/brow contours and floating particles.',
    category: 'camera',
    tech: 'ML5 / FaceMesh',
    thumbnail: 'from-[#000d10] via-[#001a20] to-[#002d36]',
    camera: true,
    html: cameraHtml,
    hint: 'Click "Enable Camera" — face mesh activates automatically',
  },
  {
    id: 'squiggle-cam',
    title: 'Squiggle Cam',
    description: 'Your camera feed transformed into organic teal line art. Pixel brightness bends each scan line — the brighter the light, the more it bends.',
    category: 'camera',
    tech: 'p5.js / Camera',
    thumbnail: 'from-[#000a0a] via-[#001520] to-[#002030]',
    camera: true,
    html: squiggleCamHtml,
    hint: 'Click "Start Camera" — move in front of the lens',
  },
  {
    id: 'optical-flow',
    title: 'Optical Flow',
    description: 'Motion detection turned into particle art. Every movement spawns teal particles that trace the path of motion across the camera frame.',
    category: 'camera',
    tech: 'p5.js / Optical Flow',
    thumbnail: 'from-[#000308] via-[#000d20] to-[#001530]',
    camera: true,
    html: opticalFlowHtml,
    hint: 'Wave your hands in front of the camera',
  },
  {
    id: 'liquid-ball',
    title: 'Liquid Ball',
    description: 'Hold both hands up to summon a liquid teal sphere between them. The ball reacts to your hand distance — squeeze to compress, spread to expand.',
    category: 'camera',
    tech: 'MediaPipe / Canvas',
    thumbnail: 'from-[#000810] via-[#001525] to-[#002535]',
    camera: true,
    html: liquidBallHtml,
    hint: 'Enable camera · Hold both hands up · Squeeze to compress',
  },
  {
    id: 'ascii-teal',
    title: 'ASCII Pixel',
    description: 'Your live camera feed quantised into a teal pixel-block grid. Eight brightness levels map to eight tones — from deep black to electric cyan.',
    category: 'camera',
    tech: 'p5.js / Camera',
    thumbnail: 'from-[#000a0a] via-[#001a20] to-[#003040]',
    camera: true,
    html: asciiCamHtml,
    hint: 'Enable camera · Move closer or farther for more detail',
  },
  {
    id: 'point-cloud',
    title: '3D Point Cloud',
    description: 'Your live camera feed rendered as a 3D depth map in p5.js WEBGL. Each pixel becomes a floating voxel — brightness drives depth. Orbit with your mouse.',
    category: 'camera',
    tech: 'p5.js / WEBGL',
    thumbnail: 'from-[#000a10] via-[#001520] to-[#002535]',
    camera: true,
    html: pointCloudHtml,
    hint: 'Enable camera · Move mouse to orbit the 3D cloud',
  },
  {
    id: 'fabric-grab',
    title: 'Tearable Cloth',
    description: 'Your live camera feed mapped as a physics cloth. Pinch your fingers to grab and drag the fabric — swing your hand fast to tear it apart. The cloth self-heals when you drop it.',
    category: 'ai-ml',
    tech: 'ML5 / HandPose / Verlet',
    thumbnail: 'from-[#000810] via-[#001525] to-[#002540]',
    camera: true,
    html: fabricCamHtml,
    hint: 'Enable camera · Pinch to grab · Swipe fast to tear the cloth',
    hidden: true,
  },
  {
    id: 'face-riot',
    title: 'Face Riot',
    description: '468 facial landmarks tracked live via MediaPipe FaceMesh. Cyan mesh overlays your face with cyberpunk glitch effects, chromatic aberration, scan lines, and floating error text.',
    category: 'ai-ml',
    tech: 'MediaPipe / FaceMesh',
    thumbnail: 'from-[#150008] via-[#300015] to-[#1a0010]',
    camera: true,
    html: faceRiotHtml,
    hint: 'Enable camera · Face the screen · Watch the glitch mesh activate',
  },
  {
    id: 'ribbon-warp',
    title: 'Ribbon Warp',
    description: 'ML5.js hand pose drives a Verlet-physics ribbon between your pinched fingers. The band uses a GLSL distortion shader with chromatic aberration and noise warping.',
    category: 'ai-ml',
    tech: 'ML5 / HandPose',
    thumbnail: 'from-[#000510] via-[#001025] to-[#001a40]',
    camera: true,
    html: ribbonWarpHtml,
    hint: 'Enable camera · Pinch thumb + index on each hand · Ribbon connects them',
    hidden: true,
    },
  {
    id: 'neural-ripple',
    title: 'Neural Ripple',
    description: 'ML5.js hand pose feeds into a GLSL ripple shader. Open your palm and circular waves propagate across the live camera feed with chromatic aberration.',
    category: 'ai-ml',
    tech: 'ML5 / HandPose',
    thumbnail: 'from-[#000810] via-[#001020] to-[#001e35]',
    camera: true,
    html: neuralRippleHtml,
    hint: 'Enable camera · Open your palm to launch ripples',
    hidden: true,
    },
  {
    id: 'hand-energy',
    title: 'Hand Energy',
    description: 'ML5.js hand pose detection maps 21 landmarks in real time. Energy beams form between your fingertips — the closer they get, the brighter the arc.',
    category: 'ai-ml',
    tech: 'ML5 / HandPose',
    thumbnail: 'from-[#000a10] via-[#001a25] to-[#002d40]',
    camera: true,
    html: handEnergyHtml,
    hint: 'Enable camera · Hold hands up · Bring fingertips close',
    hidden: true,
    },
  {
    id: 'cloth-sim',
    title: 'Cloth Simulation',
    description: 'Verlet physics cloth hanging from pinned anchor points. Gravity and procedural wind pull each particle — click and drag anywhere on the fabric to interact.',
    category: 'interactive',
    tech: 'Canvas 2D / Verlet',
    thumbnail: 'from-[#000a0f] via-[#001825] to-[#002840]',
    camera: false,
    html: clothHtml,
    hint: 'Click and drag the cloth to tear and pull it',
    hidden: true,
    },
  {
    id: 'hand-bridge',
    title: 'Hand Bridge',
    description: 'Your thumb and index finger hold the two ends of a Matter.js physics bridge. Teal balls rain down and bounce on it — move your hand to swing the bridge.',
    category: 'ai-ml',
    tech: 'ML5 / Matter.js',
    thumbnail: 'from-[#000a15] via-[#001a30] to-[#003050]',
    camera: true,
    html: handBridgeHtml,
    hint: 'Enable camera · Hold up one hand · Thumb + index control bridge ends',
    hidden: true,
    },
  {
    id: 'fluvia',
    title: 'Fluvia',
    description: 'Real-time hydraulic and thermal erosion simulation on a procedural 3D terrain. 256 droplets per frame carve valleys, deposit sediment, and form river networks. Drag to orbit, scroll to zoom.',
    category: 'generative',
    tech: 'p5.js / GLSL / Tweakpane',
    thumbnail: 'from-[#1a1408] via-[#2d3320] to-[#1a2d1a]',
    camera: false,
    html: fluviaHtml,
    hint: 'Drag to orbit · Scroll to zoom · Use panel to tweak erosion parameters',
    hidden: true,
    },
]
