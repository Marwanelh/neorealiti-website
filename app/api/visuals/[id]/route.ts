import { demos } from '@/components/visuals/demos'
import { NextResponse } from 'next/server'

// Full control bridge for non-camera demos — pause/resume/speed/reset via postMessage
const CONTROL_BRIDGE = `
<script>
(function(){
  /* Neo Control Bridge v2 */
  var _raf = window.requestAnimationFrame.bind(window);
  var _dn  = Date.now.bind(Date);

  var paused  = false;
  var speed   = 1;
  var pending = [];

  /* Fixed virtual-time accumulator — advances at speed× real time */
  var vt = _dn(), prevReal = _dn();
  Date.now = function(){
    var r = _dn();
    if (!paused) vt += (r - prevReal) * speed;
    prevReal = r;
    return vt;
  };

  /* rAF interception for pause */
  window.requestAnimationFrame = function(fn){
    if (paused){ pending.push(fn); return 0; }
    return _raf(fn);
  };
  function resume(){
    var q = pending.splice(0);
    q.forEach(function(fn){ _raf(fn); });
  }

  /* postMessage API from parent controls panel */
  window.addEventListener('message', function(e){
    if (!e.data || e.data._src !== 'neo') return;
    var d = e.data;
    if (d.paused  !== undefined){ var was=paused; paused=d.paused; if(was&&!paused) resume(); }
    if (d.speed   !== undefined) speed = d.speed;
    if (d.reset)                 location.reload();
    if (d.ctrl) Object.assign(window.__neo_ctrl, d.ctrl);
  });

  window.__neo_ctrl = {};
  window.__neo = {
    get paused(){ return paused; },
    get speed(){  return speed; },
  };
})();
</script>
`

// Minimal bridge for camera/ML demos — no RAF/Date.now override that breaks MediaPipe/ML5
const CAMERA_BRIDGE = `
<script>
(function(){
  /* Neo Camera Bridge — reset only, no timing overrides */
  window.addEventListener('message', function(e){
    if (!e.data || e.data._src !== 'neo') return;
    if (e.data.reset) location.reload();
    if (e.data.ctrl) Object.assign(window.__neo_ctrl||{}, e.data.ctrl);
  });
  window.__neo_ctrl = {};
  window.__neo = { paused: false, speed: 1 };
})();
</script>
`

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const demo = demos.find(d => d.id === params.id)
  if (!demo) {
    return new NextResponse('Demo not found', { status: 404 })
  }

  // Camera demos get a minimal bridge — no RAF/Date.now override that breaks ML5/MediaPipe
  const bridge = demo.camera ? CAMERA_BRIDGE : CONTROL_BRIDGE

  // Inject bridge before </body>
  const html = demo.html.includes('</body>')
    ? demo.html.replace('</body>', bridge + '</body>')
    : demo.html + bridge

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      // Fully permissive for demo sandbox
      'Content-Security-Policy':
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob: mediastream:; frame-ancestors 'self'",
      'Permissions-Policy': 'camera=*, microphone=*',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  })
}
