import { demos } from '@/components/visuals/demos'
import { NextResponse } from 'next/server'

// Injected into every demo — provides pause/resume/reset/speed controls via postMessage
const CONTROL_BRIDGE = `
<script>
(function(){
  /* Neo Control Bridge v1 */
  var _raf = window.requestAnimationFrame.bind(window);
  var _dn  = Date.now.bind(Date);

  var paused  = false;
  var speed   = 1;
  var pending = [];

  /* Accumulated virtual time for Date.now override (affects GLSL demos) */
  var acc = 0, last = _dn();
  Date.now = function(){
    var real = _dn(), d = real - last; last = real;
    if (!paused) acc += d * speed;
    return last - d + acc; /* virtual now */
  };

  /* rAF interception for pause (affects all animation loops) */
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
    /* Demo-specific control values stored on window.__neo_ctrl */
    if (d.ctrl) Object.assign(window.__neo_ctrl, d.ctrl);
  });

  /* Expose state for demos that want to read it */
  window.__neo_ctrl = {};
  window.__neo = {
    get paused(){ return paused; },
    get speed(){  return speed; },
  };
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

  // Inject control bridge before </body>
  const html = demo.html.includes('</body>')
    ? demo.html.replace('</body>', CONTROL_BRIDGE + '</body>')
    : demo.html + CONTROL_BRIDGE

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
