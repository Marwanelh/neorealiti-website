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

const cameraHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<canvas id="c"></canvas>
<div class="label">Face Mesh · 468 Landmarks · ML5</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startCam()">Enable Camera</button><div class="hint">Camera · Face Mesh · Particles</div></div>
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script><script>
var C=document.getElementById('c'),ctx=C.getContext('2d');
var W=C.width=innerWidth,H=C.height=innerHeight;
window.addEventListener('resize',function(){W=C.width=innerWidth;H=C.height=innerHeight;});
var video=null,faces=[],fm=null,pts=[],frame=0;
var OVAL=[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
var LEYE=[362,382,381,380,374,373,390,249,263,466,388,387,386,385,384,398];
var REYE=[33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246];
var LBROW=[336,296,334,293,300,276,283,282,295,285];
var RBROW=[70,63,105,66,107,55,65,52,53,46];
var NOSE=[168,6,197,195,5,4,1,19,94];
var LOUT=[61,146,91,181,84,17,314,405,321,375,291,409,270,269,267,0,37,39,40,185];
var LIN=[78,95,88,178,87,14,317,402,318,324,308,415,310,311,312,13,82,81,80,191];
function setStatus(s){document.getElementById('st').textContent=s;}
function startCam(){
  document.getElementById('ui').style.display='none';
  navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false}).then(function(stream){
    video=document.createElement('video');
    video.srcObject=stream;video.autoplay=true;video.playsInline=true;video.muted=true;video.style.display='none';
    document.body.appendChild(video);
    video.play().catch(function(){});
    setStatus('Loading face mesh model...');
    fm=ml5.faceMesh({maxFaces:1,refineLandmarks:false,flipHorizontal:true});
    fm.detectStart(video,function(r){faces=r;});
    setStatus('Point camera at your face');
    render();
  }).catch(function(e){setStatus('Camera error: '+e.message);});
}
function drawContour(idxs,kp,dx,dy,sw,sh,close,squig){
  if(!kp||kp.length<1)return;
  ctx.beginPath();
  for(var i=0;i<idxs.length;i++){
    var p=kp[idxs[i]];if(!p)continue;
    var px=dx+p.x*sw,py=dy+p.y*sh;
    if(squig){var s=Math.sin(frame*0.05+i*1.1)*1.8;px+=s;py+=Math.cos(frame*0.04+i*0.9)*1.2;}
    if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  if(close)ctx.closePath();ctx.stroke();
}
function render(){
  requestAnimationFrame(render);frame++;
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  if(video&&video.readyState>=2){
    var vw=video.videoWidth||640,vh=video.videoHeight||480;
    var sc=Math.max(W/vw,H/vh),dw=vw*sc,dh=vh*sc,dx=(W-dw)/2,dy=(H-dh)/2;
    var sw=dw/vw,sh=dh/vh;
    ctx.save();ctx.translate(W,0);ctx.scale(-1,1);ctx.globalAlpha=0.28;ctx.drawImage(video,dx,dy,dw,dh);ctx.globalAlpha=1;ctx.restore();
    ctx.fillStyle='rgba(0,5,12,0.52)';ctx.fillRect(0,0,W,H);
    if(faces&&faces.length>0){
      var face=faces[0],kp=face.keypoints;
      ctx.fillStyle='rgba(0,200,215,0.09)';
      for(var i=0;i<kp.length;i++){var p=kp[i];ctx.beginPath();ctx.arc(dx+p.x*sw,dy+p.y*sh,0.9,0,Math.PI*2);ctx.fill();}
      ctx.lineWidth=1;ctx.shadowBlur=8;ctx.shadowColor='#00C8DC';
      ctx.strokeStyle='rgba(0,200,215,0.75)';drawContour(OVAL,kp,dx,dy,sw,sh,true,false);
      ctx.strokeStyle='rgba(0,200,215,0.65)';drawContour(LEYE,kp,dx,dy,sw,sh,true,true);drawContour(REYE,kp,dx,dy,sw,sh,true,true);
      ctx.strokeStyle='rgba(0,200,215,0.5)';drawContour(LBROW,kp,dx,dy,sw,sh,false,true);drawContour(RBROW,kp,dx,dy,sw,sh,false,true);
      ctx.strokeStyle='rgba(0,180,200,0.4)';drawContour(NOSE,kp,dx,dy,sw,sh,false,false);
      ctx.strokeStyle='rgba(0,230,245,0.8)';drawContour(LOUT,kp,dx,dy,sw,sh,true,false);drawContour(LIN,kp,dx,dy,sw,sh,true,false);
      ctx.shadowBlur=0;
      if(frame%2===0&&Math.random()<0.6){var fp=kp[OVAL[Math.floor(Math.random()*OVAL.length)]];if(fp)pts.push({x:dx+fp.x*sw,y:dy+fp.y*sh,vx:(Math.random()-0.5)*0.7,vy:-Math.random()*1-0.2,life:1,sz:Math.random()*1.8+0.4});}
      setStatus('Face mesh · '+kp.length+' landmarks');
    }else{setStatus('Point camera at your face');}
  }
  for(var pi=pts.length-1;pi>=0;pi--){var pt=pts[pi];pt.x+=pt.vx;pt.y+=pt.vy;pt.vy-=0.012;pt.life-=0.016;if(pt.life<=0){pts.splice(pi,1);continue;}ctx.globalAlpha=pt.life*0.65;ctx.fillStyle='#00C8DC';ctx.beginPath();ctx.arc(pt.x,pt.y,pt.sz*pt.life,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  ctx.fillStyle='rgba(0,100,120,0.025)';for(var sy=0;sy<H;sy+=3)ctx.fillRect(0,sy,W,1);
  var vg=ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.85);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,5,12,0.7)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
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
    var video,lineSpacing=4,squiggleStrength=3,lineWeight=1;
    p.setup=function(){
      p.createCanvas(p.windowWidth,p.windowHeight);
      p.pixelDensity(1);
      video=p.createCapture(p.VIDEO);
      video.size(p.width,p.height);
      video.hide();
      p.stroke(0,150,180);
      p.strokeWeight(lineWeight);
      p.noFill();
    };
    p.windowResized=function(){
      p.resizeCanvas(p.windowWidth,p.windowHeight);
      video.size(p.width,p.height);
    };
    p.draw=function(){
      p.background(0);
      if(video.width===0)return;
      video.loadPixels();
      if(video.pixels.length===0)return;
      var vw=video.width,vh=video.height;
      var noiseScale=0.008;
      for(var y=lineSpacing;y<p.height;y+=lineSpacing){
        p.beginShape();
        for(var x=0;x<p.width;x+=2){
          var mx=vw-1-Math.floor(x*vw/p.width);
          var my=Math.floor(y*vh/p.height);
          mx=p.constrain(mx,0,vw-1);
          my=p.constrain(my,0,vh-1);
          var idx=(my*vw+mx)*4;
          var r=video.pixels[idx];
          var g=video.pixels[idx+1];
          var b2=video.pixels[idx+2];
          var bright=(r*0.299+g*0.587+b2*0.114);
          var nz=p.noise(x*noiseScale,y*noiseScale,p.frameCount*0.01);
          var dy2=p.map(bright,0,255,-squiggleStrength,squiggleStrength)+(nz-0.5)*squiggleStrength;
          var gc=p.map(bright,0,255,50,220);
          var bc=p.map(bright,0,255,80,230);
          p.stroke(0,gc,bc);
          p.vertex(x,y+dy2);
        }
        p.endShape();
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

const liquidBallHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;overflow:hidden}#bg,#ov{position:absolute;top:0;left:0;width:100%;height:100%}#ov{pointer-events:none}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;z-index:10}.status{position:fixed;top:16px;left:50%;transform:translateX(-50%);color:rgba(0,200,215,0.7);font-family:monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;z-index:10}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:20;display:none}.ui.show{display:block}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.4);font-family:monospace;font-size:10px;letter-spacing:.1em;margin-top:12px}</style></head><body>
<canvas id="bg"></canvas><canvas id="ov"></canvas>
<div class="label">MEDIAPIPE · Liquid Ball · Hold both hands up</div>
<div class="status" id="st">Loading MediaPipe...</div>
<div class="ui show" id="ui"><button class="btn" id="startBtn">Enable Camera</button><div class="hint">Camera + MediaPipe hand tracking</div></div>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script>
var bgC=document.getElementById('bg'),bgCtx=bgC.getContext('2d');
var ovC=document.getElementById('ov'),ovCtx=ovC.getContext('2d');
var W=innerWidth,H=innerHeight;
bgC.width=W;bgC.height=H;ovC.width=W;ovC.height=H;
window.addEventListener('resize',function(){
  W=innerWidth;H=innerHeight;
  bgC.width=W;bgC.height=H;ovC.width=W;ovC.height=H;
});
var handResults=null,sphereX=W/2,sphereY=H/2,sphereR=80,sphereAlpha=0,videoEl=null;
var t=0,particles=[];
function setStatus(s){document.getElementById('st').textContent=s;}
function lerp(a,b,f){return a+(b-a)*f;}
function spawnParticles(cx,cy,r){
  if(Math.random()>0.3)return;
  var angle=Math.random()*Math.PI*2;
  var px=cx+Math.cos(angle)*r;
  var py=cy+Math.sin(angle)*r;
  particles.push({x:px,y:py,vx:(Math.random()-0.5)*1.5,vy:-Math.random()*2-0.5,life:1.0,size:Math.random()*3+1});
}
function buildSpherePath(cx,cy,r){
  var pts=96;bgCtx.beginPath();
  for(var i=0;i<=pts;i++){var ang=i/pts*Math.PI*2;var dr=Math.sin(ang*3+t*1.6)*r*0.045+Math.sin(ang*7+t*1.1)*r*0.022+Math.sin(ang*13+t*0.8)*r*0.01;var rr=r+dr;if(i===0)bgCtx.moveTo(cx+Math.cos(ang)*rr,cy+Math.sin(ang)*rr);else bgCtx.lineTo(cx+Math.cos(ang)*rr,cy+Math.sin(ang)*rr);}
  bgCtx.closePath();
}
function drawSphere(cx,cy,r,alpha){
  var sa=alpha||1;bgCtx.save();bgCtx.globalAlpha=sa;
  // Ambient outer glow
  var og=bgCtx.createRadialGradient(cx,cy,r*0.6,cx,cy,r*2.1);
  og.addColorStop(0,'rgba(0,160,200,0.20)');og.addColorStop(0.6,'rgba(0,100,150,0.07)');og.addColorStop(1,'rgba(0,0,0,0)');
  bgCtx.fillStyle=og;bgCtx.beginPath();bgCtx.arc(cx,cy,r*2.1,0,Math.PI*2);bgCtx.fill();
  // Clipped interior
  buildSpherePath(cx,cy,r);bgCtx.save();bgCtx.clip();
  // Dark glass body
  var body=bgCtx.createRadialGradient(cx+r*0.15,cy+r*0.2,0,cx,cy,r*1.05);
  body.addColorStop(0,'rgba(6,38,58,0.92)');body.addColorStop(0.45,'rgba(0,18,32,0.96)');body.addColorStop(0.85,'rgba(0,7,16,0.99)');body.addColorStop(1,'rgba(0,2,8,1.0)');
  bgCtx.fillStyle=body;bgCtx.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);
  // Internal caustic teal glow
  var caus=bgCtx.createRadialGradient(cx+r*0.08,cy+r*0.22,0,cx+r*0.08,cy+r*0.12,r*0.78);
  caus.addColorStop(0,'rgba(0,195,220,0.30)');caus.addColorStop(0.4,'rgba(0,145,185,0.13)');caus.addColorStop(0.8,'rgba(0,75,120,0.05)');caus.addColorStop(1,'rgba(0,0,0,0)');
  bgCtx.fillStyle=caus;bgCtx.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);
  // Animated shimmer (liquid wobble)
  var sw=Math.sin(t*2.3)*0.14,sh2=Math.cos(t*1.8)*0.11;
  var shim=bgCtx.createRadialGradient(cx+r*sw,cy+r*sh2,0,cx+r*sw,cy+r*sh2,r*0.42);
  shim.addColorStop(0,'rgba(0,215,240,0.22)');shim.addColorStop(1,'rgba(0,0,0,0)');
  bgCtx.fillStyle=shim;bgCtx.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);
  // Primary specular highlight (white, upper-left)
  var s1=bgCtx.createRadialGradient(cx-r*0.38,cy-r*0.40,0,cx-r*0.30,cy-r*0.33,r*0.50);
  s1.addColorStop(0,'rgba(255,255,255,1.0)');s1.addColorStop(0.12,'rgba(225,248,255,0.80)');s1.addColorStop(0.35,'rgba(160,225,242,0.32)');s1.addColorStop(0.75,'rgba(60,160,200,0.06)');s1.addColorStop(1,'rgba(0,0,0,0)');
  bgCtx.fillStyle=s1;bgCtx.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);
  // Secondary specular (lower-right, soft)
  var s2=bgCtx.createRadialGradient(cx+r*0.44,cy+r*0.40,0,cx+r*0.44,cy+r*0.40,r*0.20);
  s2.addColorStop(0,'rgba(190,235,255,0.38)');s2.addColorStop(1,'rgba(0,0,0,0)');
  bgCtx.fillStyle=s2;bgCtx.fillRect(cx-r*1.2,cy-r*1.2,r*2.4,r*2.4);
  // Environment reflection band
  var env=bgCtx.createLinearGradient(cx-r*0.9,cy,cx+r*0.9,cy);
  env.addColorStop(0,'rgba(0,0,0,0)');env.addColorStop(0.25,'rgba(0,175,215,0.10)');env.addColorStop(0.5,'rgba(60,205,235,0.18)');env.addColorStop(0.75,'rgba(0,175,215,0.10)');env.addColorStop(1,'rgba(0,0,0,0)');
  bgCtx.fillStyle=env;bgCtx.fillRect(cx-r*1.2,cy-r*0.12,r*2.4,r*0.24);
  bgCtx.restore();
  // Rim glow stroke
  buildSpherePath(cx,cy,r);
  bgCtx.strokeStyle='rgba(0,200,215,0.85)';bgCtx.lineWidth=1.5;bgCtx.shadowBlur=22;bgCtx.shadowColor='rgba(0,200,215,0.9)';bgCtx.stroke();bgCtx.shadowBlur=0;
  bgCtx.restore();
}
function drawParticles(){
  for(var i=particles.length-1;i>=0;i--){
    var p=particles[i];
    p.x+=p.vx;p.y+=p.vy;p.vy-=0.02;p.life-=0.025;
    if(p.life<=0){particles.splice(i,1);continue;}
    bgCtx.globalAlpha=p.life*0.7;
    bgCtx.fillStyle='rgba(0,200,215,1)';
    bgCtx.beginPath();bgCtx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);bgCtx.fill();
    bgCtx.globalAlpha=1;
  }
}
var CONNECTIONS=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
function drawHands(results){
  ovCtx.clearRect(0,0,W,H);
  if(!results||!results.multiHandLandmarks)return;
  results.multiHandLandmarks.forEach(function(landmarks){
    ovCtx.strokeStyle='rgba(0,180,200,0.6)';
    ovCtx.lineWidth=1.5;
    CONNECTIONS.forEach(function(conn){
      var a=landmarks[conn[0]],b=landmarks[conn[1]];
      ovCtx.beginPath();
      ovCtx.moveTo((1-a.x)*W,a.y*H);
      ovCtx.lineTo((1-b.x)*W,b.y*H);
      ovCtx.stroke();
    });
    landmarks.forEach(function(lm){
      ovCtx.fillStyle='rgba(0,200,215,0.9)';
      ovCtx.beginPath();
      ovCtx.arc((1-lm.x)*W,lm.y*H,3,0,Math.PI*2);
      ovCtx.fill();
    });
  });
}
function render(){
  requestAnimationFrame(render);
  t+=0.02;
  if(videoEl&&videoEl.readyState>=2){bgCtx.save();bgCtx.scale(-1,1);bgCtx.translate(-W,0);bgCtx.drawImage(videoEl,0,0,W,H);bgCtx.restore();bgCtx.fillStyle='rgba(0,5,10,0.4)';bgCtx.fillRect(0,0,W,H);}else{bgCtx.fillStyle='rgba(0,0,0,1)';bgCtx.fillRect(0,0,W,H);}
  if(handResults&&handResults.multiHandLandmarks&&handResults.multiHandLandmarks.length>=2){
    var h0=handResults.multiHandLandmarks[0];
    var h1=handResults.multiHandLandmarks[1];
    var p0x=(1-h0[9].x)*W,p0y=h0[9].y*H;
    var p1x=(1-h1[9].x)*W,p1y=h1[9].y*H;
    var midX=(p0x+p1x)/2,midY=(p0y+p1y)/2;
    var dist=Math.sqrt((p1x-p0x)*(p1x-p0x)+(p1y-p0y)*(p1y-p0y));
    var targetR=Math.max(30,Math.min(200,dist*0.35));
    sphereX=lerp(sphereX,midX,0.15);
    sphereY=lerp(sphereY,midY,0.15);
    sphereR+=((targetR)-sphereR)*0.12;
    setStatus('Two hands detected');
    drawSphere(sphereX,sphereY,sphereR);
    spawnParticles(sphereX,sphereY,sphereR);
  } else if(handResults&&handResults.multiHandLandmarks&&handResults.multiHandLandmarks.length===1){
    setStatus('One hand detected - hold both hands up');
    drawSphere(sphereX,sphereY,sphereR);
  } else if(handResults){
    setStatus('Hold both hands up');
    drawSphere(sphereX,sphereY,sphereR*0.95);
    sphereR=lerp(sphereR,80,0.02);
  }
  drawParticles();
  drawHands(handResults);
}
document.getElementById('startBtn').addEventListener('click',function(){
  document.getElementById('ui').classList.remove('show');
  setStatus('Starting camera...');
  navigator.mediaDevices.getUserMedia({video:{width:W,height:H,facingMode:'user'},audio:false}).then(function(stream){
    videoEl=document.createElement('video');
    videoEl.srcObject=stream;videoEl.autoplay=true;videoEl.playsinline=true;videoEl.muted=true;
    videoEl.style.display='none';
    document.body.appendChild(videoEl);
    setStatus('Loading MediaPipe...');
    var hands=new Hands({locateFile:function(f){return 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/'+f;}});
    hands.setOptions({maxNumHands:2,modelComplexity:1,minDetectionConfidence:0.7,minTrackingConfidence:0.5});
    hands.onResults(function(results){handResults=results;});
    hands.initialize().then(function(){
      setStatus('Hold both hands up');
      var camUtil=new Camera(videoEl,{onFrame:async function(){await hands.send({image:videoEl});},width:W,height:H});
      camUtil.start();
      render();
    }).catch(function(e){setStatus('MediaPipe error: '+e.message);render();});
  }).catch(function(e){setStatus('Camera error: '+e.message);render();});
});
bgCtx.fillStyle='#000';bgCtx.fillRect(0,0,W,H);
bgCtx.strokeStyle='rgba(0,129,151,0.07)';bgCtx.lineWidth=1;
for(var gx=0;gx<W;gx+=44){bgCtx.beginPath();bgCtx.moveTo(gx,0);bgCtx.lineTo(gx,H);bgCtx.stroke();}
for(var gy=0;gy<H;gy+=44){bgCtx.beginPath();bgCtx.moveTo(0,gy);bgCtx.lineTo(W,gy);bgCtx.stroke();}
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
      handPose.detectStart(video,function(r){hands=r;});
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
    hp.detectStart(vid,function(r){handsRaw=Array.isArray(r)?r:[];});
    rbSh=createShader(VERT,FRAG);initNodes();ready=true;
    ss('Hold hands up to stretch the ribbon');
  }catch(e){ss('Error: '+e.message);}
}
</script></body></html>`

const asciiCamHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.st{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.btn{padding:10px 26px;border:1px solid rgba(0,129,151,0.6);background:transparent;color:#00C8DC;font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.btn:hover{background:rgba(0,129,151,0.15)}.hint{color:rgba(0,200,215,0.35);font-family:monospace;font-size:10px;margin-top:10px}</style></head><body>
<div class="label">Camera · ASCII Pixel · Teal</div>
<div class="st" id="st">Initialising...</div>
<div class="ui" id="ui"><button class="btn" onclick="startSketch()">Enable Camera</button><div class="hint">Live camera as teal pixel blocks</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script><script>
var TEAL=['#000000','#000c0f','#001418','#002830','#004455','#008197','#00C8DC','#00E5F5'];
var cam=null,camW=320,camH=240,sz=4,scX,scY,stEl=null;
function setup(){
  stEl=document.getElementById('st');
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);noStroke();
  scX=width/camW;scY=height/camH;
}
function draw(){
  if(!cam||cam.width===0)return;
  cam.loadPixels();
  if(!cam.pixels||cam.pixels.length===0)return;
  background(0);
  for(var y=0;y<camH;y+=sz){
    for(var x=0;x<camW;x+=sz){
      var mx=camW-1-x;
      var idx=(y*camW+mx)*4;
      var r=cam.pixels[idx],g=cam.pixels[idx+1],b=cam.pixels[idx+2];
      var lum=(r*0.299+g*0.587+b*0.114)/255;
      var ci=Math.min(TEAL.length-1,Math.floor(lum*(TEAL.length-0.01)));
      fill(TEAL[ci]);
      rect(x*scX,y*scY,sz*scX+1,sz*scY+1);
    }
  }
}
function windowResized(){resizeCanvas(windowWidth,windowHeight);scX=width/camW;scY=height/camH;}
function startSketch(){
  document.getElementById('ui').style.display='none';
  cam=createCapture(VIDEO);cam.size(camW,camH);cam.hide();
  stEl.textContent='Live · ASCII Pixel Mode';
}
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
    hp.detectStart(video,function(r){hands=r;});
    setStatus('Hold up your hands');
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
    id: 'ribbon-warp',
    title: 'Ribbon Warp',
    description: 'ML5.js hand pose drives a Verlet-physics ribbon between your pinched fingers. The band uses a GLSL distortion shader with chromatic aberration and noise warping.',
    category: 'ai-ml',
    tech: 'ML5 / HandPose',
    thumbnail: 'from-[#000510] via-[#001025] to-[#001a40]',
    camera: true,
    html: ribbonWarpHtml,
    hint: 'Enable camera · Pinch thumb + index on each hand · Ribbon connects them',
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
    id: 'neural-ripple',
    title: 'Neural Ripple',
    description: 'ML5.js hand pose feeds into a GLSL ripple shader. Open your palm and circular waves propagate across the live camera feed with chromatic aberration.',
    category: 'ai-ml',
    tech: 'ML5 / HandPose',
    thumbnail: 'from-[#000810] via-[#001020] to-[#001e35]',
    camera: true,
    html: neuralRippleHtml,
    hint: 'Enable camera · Open your palm to launch ripples',
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
  },
]
