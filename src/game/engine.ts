import { TILE, TILES_X, TILES_Y, W, H } from './constants';
import type { Chef, ImgMap } from './types';
import { SPRITES, loadImages } from './sprites';
import { drawBase } from './draw/drawBase';
import { drawCeiling } from './draw/drawCeiling';
import { drawKitchen } from './draw/drawKitchen';
import { drawChef } from './draw/drawChef';
import { getAllRecipeBooks } from '../utils/mapUtils';

let ctx: CanvasRenderingContext2D | null = null;
let IM: ImgMap = {};
let raf = 0;

const chef: Chef = {
  tx: Math.floor(TILES_X / 2),
  ty: Math.floor(TILES_Y / 2),
  x: 0, y: 0,
  speedTilesPerSec: 3,
  moving: false,
  targetTx: 0, targetTy: 0,
  dir: 'down',
  animTimer: 0, animFrame: 0, animFPS: 8,
  path: [], dest: null
};
chef.x = chef.tx * TILE; chef.y = chef.ty * TILE;

function clampTile(nx: number, ny: number): [number, number] {
  return [
    Math.max(0, Math.min(TILES_X - 1, nx)),
    Math.max(0, Math.min(TILES_Y - 1, ny))
  ];
}

function enqueuePathTo(destTx: number, destTy: number) {
  const [gx, gy] = clampTile(destTx, destTy);
  chef.path.length = 0;
  let x = chef.tx, y = chef.ty;
  const dx = Math.sign(gx - x), dy = Math.sign(gy - y);
  while (x !== gx) { x += dx; chef.path.push([x, y]); }
  while (y !== gy) { y += dy; chef.path.push([x, y]); }
  chef.dest = [gx, gy];
  stepNextTarget();
}

function stepNextTarget() {
  if (chef.path.length === 0) { chef.moving = false; chef.dest = null; return; }
  const [nx, ny] = chef.path.shift()!;
  chef.targetTx = nx; chef.targetTy = ny; chef.moving = true;
  chef.dir = (nx > chef.tx) ? 'right' :
            (nx < chef.tx) ? 'left'  :
            (ny < chef.ty) ? 'up'    : 'down';
}

function drawGrid() {
  if (!ctx) return;
  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#d6d6d6';
  for (let x = 0; x <= W; x += TILE) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += TILE) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}

/**
 * drawWorld
 * Accepts mapData but intentionally ignores it for now (as requested).
 * Existing drawing remains unchanged.
 */
function drawWorld() {
  if (!ctx) throw Error;
  // mapData is intentionally unused for now
  drawBase(ctx, IM);
  drawCeiling(ctx, IM);
  drawKitchen(ctx, IM);
}

let last = performance.now();
function loop(now: number) {
  raf = requestAnimationFrame(loop);
  if (!ctx) return;

  const dt = (now - last) / 1000; last = now;

  if (chef.moving) {
    const speed = chef.speedTilesPerSec * TILE;
    const txPx = chef.targetTx * TILE;
    const tyPx = chef.targetTy * TILE;
    const dx = txPx - chef.x;
    const dy = tyPx - chef.y;
    const dist = Math.hypot(dx, dy);

    if (dist <= speed * dt) {
      chef.x = txPx; chef.y = tyPx;
      chef.tx = chef.targetTx; chef.ty = chef.targetTy;
      chef.moving = false; chef.animFrame = 0;
      stepNextTarget();
    } else {
      chef.x += (dx / dist) * speed * dt;
      chef.y += (dy / dist) * speed * dt;
      chef.animTimer += dt;
      if (chef.animTimer >= 1 / chef.animFPS) {
        chef.animTimer = 0;
        chef.animFrame = chef.animFrame ? 0 : 1;
      }
    }
  }

  drawGrid();
  drawWorld(); // <-- pass the stored mapData through each frame

  if (chef.dest) {
    ctx.fillStyle = 'rgba(30,144,255,0.25)';
    ctx.fillRect(chef.dest[0]*TILE, chef.dest[1]*TILE, TILE, TILE);
    ctx.strokeStyle = '#1e90ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(chef.dest[0]*TILE, chef.dest[1]*TILE, TILE, TILE);
  }

  drawChef(ctx, IM, chef);
}

interface GameOptions {
  onRecipeBookClick?: () => void;
  mapData?: any | null; // <-- add mapData to options
}

export function initGame(canvas: HTMLCanvasElement, options?: GameOptions) {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('2D context not available');
  ctx = context;
  canvas.width = W; canvas.height = H;
  ctx.imageSmoothingEnabled = false;

  const onClick = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    const scaleX = canvas.width / r.width;
    const scaleY = canvas.height / r.height;
    const cx = (e.clientX - r.left) * scaleX;
    const cy = (e.clientY - r.top) * scaleY;
    const tx = Math.floor(cx / TILE);
    const ty = Math.floor(cy / TILE);
    console.log(`(x = ${tx}, y = ${ty})`);
    
    const rbPos = getAllRecipeBooks();
    // Check if clicking on recipe book tile (12, 13)
    if (tx === rbPos[0].x && ty === rbPos[0].y && options?.onRecipeBookClick) {
      options.onRecipeBookClick();
    } else {
      // Normal movement
      enqueuePathTo(tx, ty);
    }
  };
  canvas.addEventListener('click', onClick);

  loadImages(SPRITES).then(imgs => {
    IM = imgs;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  });

  return () => {
    canvas.removeEventListener('click', onClick);
    cancelAnimationFrame(raf);
  };
}

export function destroyGame() {
  cancelAnimationFrame(raf);
  ctx = null;
}
