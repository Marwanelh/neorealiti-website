import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'images', 'visuals')
mkdirSync(OUT_DIR, { recursive: true })

// All non-camera demo IDs
const DEMOS = [
  { id: 'teal-plasma',        wait: 2500 },
  { id: 'particle-storm',     wait: 2500 },
  { id: 'neural-flow',        wait: 3000 },
  { id: 'void-portal',        wait: 3000 },
  { id: 'void-tunnel',        wait: 2500 },
  { id: 'accretion',          wait: 3000 },
  { id: 'matter-chaos',       wait: 2500 },
  { id: 'domain-warp',        wait: 2500 },
  { id: 'point-cloud',        wait: 2500 },
  { id: 'cloth-sim',          wait: 3000 },
  { id: 'fluvia',             wait: 4000 },
  { id: 'dont-touch-me',      wait: 3000 },
  { id: 'color-boxes-3d',     wait: 3000 },
  { id: 'lunar-lander',       wait: 3500 },
  { id: 'sound-reactive-art', wait: 3000 },
  { id: 'generative-lines',   wait: 2000 },
  { id: 'paint-particles',    wait: 3000 },
  { id: 'circles-squares',    wait: 3000 },
  { id: 'typewriter-art',     wait: 3500 },
  { id: 'spherical-text',     wait: 3000 },
  { id: 'nodes-network',      wait: 4000 },
  { id: 'philosophy-text',    wait: 4000 },
  { id: 'terrain-3d',         wait: 4000 },
  { id: 'fluvia-terrain',     wait: 5000 },
]

const BASE = 'http://localhost:3000'
const W = 1280
const H = 720

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: W, height: H } })

  for (const { id, wait } of DEMOS) {
    const url = `${BASE}/api/visuals/${id}`
    console.log(`📸 ${id} — ${url}`)
    const page = await context.newPage()
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 15000 })
      await page.waitForTimeout(wait)
      const out = join(OUT_DIR, `${id}.png`)
      await page.screenshot({ path: out, type: 'png', fullPage: false })
      console.log(`   ✓ saved ${id}.png`)
    } catch (e) {
      console.warn(`   ✗ ${id} failed: ${e.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('\nDone! Screenshots in public/images/visuals/')
}

run().catch(console.error)
