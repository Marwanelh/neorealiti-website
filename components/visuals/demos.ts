export interface Demo {
  id: string
  title: string
  description: string
  category: 'shader' | 'generative' | 'interactive' | 'camera'
  tech: string
  thumbnail: string
  camera: boolean
  html: string
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

const cameraHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{overflow:hidden;background:#000}video{display:none}canvas{display:block}.label{position:fixed;top:16px;left:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}.status{position:fixed;top:16px;right:16px;color:rgba(0,200,215,0.6);font-family:monospace;font-size:10px;letter-spacing:.08em}.ui{position:fixed;bottom:20px;left:0;right:0;display:flex;justify-content:center;gap:12px}.btn{padding:8px 22px;border:1px solid rgba(0,129,151,0.5);background:transparent;color:#00C8DC;font-family:monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .2s}.btn:hover{background:rgba(0,129,151,0.15);border-color:#008197}</style></head><body>
<canvas id="c"></canvas><video id="v" autoplay playsinline muted></video>
<div class="label">Camera Vision · AR Mode</div>
<div class="status" id="st">Loading AR model...</div>
<div class="ui"><button class="btn" id="camBtn">Enable Camera</button><button class="btn" id="fxBtn">Effect: Teal</button></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.21.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface@0.0.7/dist/blazeface.min.js"></script>
<script>
var canvas=document.getElementById('c'),ctx=canvas.getContext('2d'),video=document.getElementById('v');
var stream=null,model=null,active=false,fx=0,faces=[],fc=0;
var effects=['Teal','Night Vision','Holographic'];
canvas.width=innerWidth;canvas.height=innerHeight;
window.addEventListener('resize',function(){canvas.width=innerWidth;canvas.height=innerHeight;});
function setStatus(s){document.getElementById('st').textContent=s;}
blazeface.load().then(function(m){model=m;setStatus('AR ready · Click Enable Camera');}).catch(function(){setStatus('Click Enable Camera');});
document.getElementById('camBtn').addEventListener('click',function(){if(!active){startCam(this);}else{stopCam(this);}});
document.getElementById('fxBtn').addEventListener('click',function(){fx=(fx+1)%3;this.textContent='Effect: '+effects[fx];});
function startCam(btn){
  navigator.mediaDevices.getUserMedia({video:{width:1280,height:720},audio:false}).then(function(s){
    stream=s;video.srcObject=s;video.play();active=true;btn.textContent='Disable Camera';
    setStatus('Camera active'+(model?' · Face tracking ON':''));render();
  }).catch(function(e){setStatus('Camera error: '+e.message);});}
function stopCam(btn){if(stream){stream.getTracks().forEach(function(t){t.stop();});stream=null;}active=false;btn.textContent='Enable Camera';faces=[];placeholder();}
function applyFx(data){
  for(var i=0;i<data.length;i+=4){
    var r=data[i],g=data[i+1],b=data[i+2],l=0.299*r+0.587*g+0.114*b;
    if(fx===0){data[i]=0;data[i+1]=l*0.82;data[i+2]=l*0.94;}
    else if(fx===1){var boost=Math.min(255,l*2.3);data[i]=0;data[i+1]=boost;data[i+2]=boost*0.12;}
    else{data[i]=Math.min(255,l*0.25);data[i+1]=Math.min(255,l*0.95+20);data[i+2]=Math.min(255,l*1.1+15);}}}
function drawFaces(){
  if(!faces.length)return;
  var vw=video.videoWidth||canvas.width,vh=video.videoHeight||canvas.height;
  var sc=Math.max(canvas.width/vw,canvas.height/vh);
  var ox=(canvas.width-vw*sc)/2,oy=(canvas.height-vh*sc)/2;
  ctx.save();
  for(var f=0;f<faces.length;f++){
    var face=faces[f],tl=face.topLeft,br=face.bottomRight,lm=face.landmarks;
    var x1=canvas.width-(tl[0]*sc+ox),y1=tl[1]*sc+oy;
    var x2=canvas.width-(br[0]*sc+ox),y2=br[1]*sc+oy;
    var bx=Math.min(x1,x2),by=y1,bw=Math.abs(x2-x1),bh=y2-y1;
    ctx.strokeStyle='rgba(0,200,215,0.85)';ctx.lineWidth=1;ctx.strokeRect(bx,by,bw,bh);
    ctx.strokeStyle='#00C8DC';ctx.lineWidth=2;
    var cz=14;
    ctx.beginPath();ctx.moveTo(bx,by+cz);ctx.lineTo(bx,by);ctx.lineTo(bx+cz,by);ctx.stroke();
    ctx.beginPath();ctx.moveTo(bx+bw-cz,by);ctx.lineTo(bx+bw,by);ctx.lineTo(bx+bw,by+cz);ctx.stroke();
    ctx.beginPath();ctx.moveTo(bx,by+bh-cz);ctx.lineTo(bx,by+bh);ctx.lineTo(bx+cz,by+bh);ctx.stroke();
    ctx.beginPath();ctx.moveTo(bx+bw-cz,by+bh);ctx.lineTo(bx+bw,by+bh);ctx.lineTo(bx+bw,by+bh-cz);ctx.stroke();
    ctx.fillStyle='rgba(0,200,215,0.8)';ctx.font='9px monospace';ctx.letterSpacing='0.08em';ctx.fillText('FACE DETECTED',bx+2,by-5);
    if(lm){ctx.fillStyle='#00C8DC';for(var l=0;l<lm.length;l++){var lx=canvas.width-(lm[l][0]*sc+ox),ly=lm[l][1]*sc+oy;ctx.beginPath();ctx.arc(lx,ly,3,0,Math.PI*2);ctx.fill();}}
  }ctx.restore();}
function render(){
  if(!active)return;
  ctx.save();ctx.scale(-1,1);ctx.translate(-canvas.width,0);
  var vw=video.videoWidth||canvas.width,vh=video.videoHeight||canvas.height;
  var sc=Math.max(canvas.width/vw,canvas.height/vh);
  var dw=vw*sc,dh=vh*sc,dx=(canvas.width-dw)/2,dy=(canvas.height-dh)/2;
  ctx.drawImage(video,dx,dy,dw,dh);ctx.restore();
  var img=ctx.getImageData(0,0,canvas.width,canvas.height);applyFx(img.data);ctx.putImageData(img,0,0);
  ctx.fillStyle='rgba(0,129,151,0.04)';for(var y=0;y<canvas.height;y+=3)ctx.fillRect(0,y,canvas.width,1);
  var gr=ctx.createRadialGradient(canvas.width/2,canvas.height/2,canvas.height*0.2,canvas.width/2,canvas.height/2,canvas.height*0.8);
  gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,10,15,0.6)');ctx.fillStyle=gr;ctx.fillRect(0,0,canvas.width,canvas.height);
  fc++;if(model&&fc%6===0&&video.readyState===4){model.estimateFaces(video,false).then(function(r){faces=r;}).catch(function(){});}
  drawFaces();requestAnimationFrame(render);}
function placeholder(){
  if(active)return;
  ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle='rgba(0,129,151,0.07)';ctx.lineWidth=1;
  for(var x=0;x<canvas.width;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
  for(var y=0;y<canvas.height;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
  ctx.fillStyle='rgba(0,200,215,0.25)';ctx.font='11px monospace';ctx.textAlign='center';
  ctx.fillText('ENABLE CAMERA TO ACTIVATE AR MODE',canvas.width/2,canvas.height/2);
  requestAnimationFrame(placeholder);}
placeholder();
</script></body></html>`

const voidHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}.label{position:fixed;bottom:16px;left:16px;color:rgba(0,200,215,0.5);font-family:monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}</style></head><body><canvas id="c"></canvas><div class="label">GLSL · Void Portal · Raymarching SDF</div><script>
var c=document.getElementById('c'),gl=c.getContext('webgl')||c.getContext('experimental-webgl'),mouse=[0.5,0.5],start=Date.now();
function resize(){c.width=innerWidth;c.height=innerHeight;gl&&gl.viewport(0,0,c.width,c.height);}
resize();window.addEventListener('resize',resize);
window.addEventListener('mousemove',function(e){mouse[0]=e.clientX/innerWidth;mouse[1]=1.0-e.clientY/innerHeight;});
if(!gl){document.body.innerHTML='<div style="color:#008197;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace">WebGL not supported</div>';}
var vs='attribute vec2 pos;void main(){gl_Position=vec4(pos,0.0,1.0);}';
var fs=[
'precision highp float;',
'uniform float time;uniform vec2 res;uniform vec2 mouse;',
'float sdSphere(vec3 p,float r){return length(p)-r;}',
'float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}',
'float sdBox(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0);}',
'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
'float scene(vec3 p){',
'  vec3 q=p;',
'  q.xz=rot(time*0.3)*q.xz;',
'  q.xy=rot(time*0.2)*q.xy;',
'  float t1=sdTorus(q,vec2(1.2,0.35));',
'  float t2=sdTorus(q.yxz,vec2(0.9,0.2));',
'  float t3=sdTorus(q.xzy,vec2(0.6,0.15));',
'  float s=sdSphere(p,0.4);',
'  return min(min(min(t1,t2),t3),s);}',
'vec3 normal(vec3 p){vec2 e=vec2(0.001,0.0);',
'  return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}',
'void main(){',
'  vec2 uv=(gl_FragCoord.xy-res*0.5)/res.y;',
'  vec2 m=(mouse-0.5)*2.0;',
'  vec3 ro=vec3(m.x*2.0,m.y*1.5,4.0);',
'  vec3 rd=normalize(vec3(uv,-1.2));',
'  float d=0.0,t=0.0;',
'  for(int i=0;i<80;i++){vec3 p=ro+rd*t;d=scene(p);if(d<0.001||t>20.0)break;t+=d;}',
'  vec3 col=vec3(0.0);',
'  if(d<0.001){',
'    vec3 p=ro+rd*t;vec3 n=normal(p);',
'    vec3 l=normalize(vec3(1.0,2.0,3.0));',
'    float diff=max(dot(n,l),0.0);',
'    float spec=pow(max(dot(reflect(-l,n),-rd),0.0),32.0);',
'    float rim=pow(1.0-max(dot(n,-rd),0.0),3.0);',
'    vec3 teal=vec3(0.0,0.51,0.6);vec3 light=vec3(0.0,0.85,0.95);',
'    col=teal*diff+light*spec*0.8+vec3(0.0,0.3,0.4)*rim;',
'    float ao=1.0-t*0.035;col*=ao;',
'  }',
'  float fog=1.0-exp(-t*0.04);col=mix(col,vec3(0.0,0.02,0.04),fog);',
'  col=pow(col,vec3(0.8));',
'  gl_FragColor=vec4(col,1.0);}'].join('\\n');
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
var pos=gl.getAttribLocation(prog,'pos');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
var uT=gl.getUniformLocation(prog,'time'),uR=gl.getUniformLocation(prog,'res'),uM=gl.getUniformLocation(prog,'mouse');
(function draw(){requestAnimationFrame(draw);var t=(Date.now()-start)/1000;gl.uniform1f(uT,t);gl.uniform2f(uR,c.width,c.height);gl.uniform2f(uM,mouse[0],mouse[1]);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);})();
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
  },
  {
    id: 'camera-vision',
    title: 'Camera Vision',
    description: 'Live camera feed with real-time WebGL color grading and AI face detection via BlazeFace. Three visual effects: Teal, Night Vision, Holographic.',
    category: 'camera',
    tech: 'Camera / TF.js',
    thumbnail: 'from-[#000d10] via-[#001a20] to-[#002d36]',
    camera: true,
    html: cameraHtml,
  },
]
