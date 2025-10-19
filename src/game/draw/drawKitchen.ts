import { TILE } from '../constants';
import type { ImgMap } from '../types';

// Counter X: x=1..11 at y=2 AND y=15
const counterX: Array<{tx:number;ty:number}> = [];
for (let x = 1; x < 12; x++) { counterX.push({tx:x,ty:2}); counterX.push({tx:x,ty:15}); }

// Counter Y: y=3..14 at x=0 AND x=12
const counterY: Array<{tx:number;ty:number}> = [];
for (let y = 3; y < 15; y++) { counterY.push({tx:0,ty:y}); counterY.push({tx:12,ty:y}); }

export function drawKitchen(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const imgX = IM.counterX;
  if (imgX) for (const p of counterX) ctx.drawImage(imgX, p.tx*TILE, p.ty*TILE, TILE, TILE);

  const imgY = IM.counterY;
  if (imgY) for (const p of counterY) ctx.drawImage(imgY, p.tx*TILE, p.ty*TILE, TILE, TILE);

  // TL (0,2) / TR (12,2)
  const tl = IM.counterTL, tr = IM.counterTR;
  if (tl) ctx.drawImage(tl, 0*TILE, 2*TILE, TILE, TILE);
  if (tr) ctx.drawImage(tr, 12*TILE, 2*TILE, TILE, TILE);

  // BL (0,15) / BR (12,15)
  const bl = IM.counterBL, br = IM.counterBR;
  if (bl) ctx.drawImage(bl, 0*TILE, 15*TILE, TILE, TILE);
  if (br) ctx.drawImage(br, 12*TILE, 15*TILE, TILE, TILE);
}
