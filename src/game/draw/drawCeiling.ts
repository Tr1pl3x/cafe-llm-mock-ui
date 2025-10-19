import { TILE, TILES_X, TILES_Y } from '../constants';
import type { ImgMap } from '../types';

// Precompute coordinate lists (from your mappings)
const ceilingX: Array<{tx:number;ty:number}> = [];
for (let x = 0; x < TILES_X; x++) ceilingX.push({ tx: x, ty: 0 });
for (let x = 0; x < 13; x++)      ceilingX.push({ tx: x, ty: 16 });
for (let x = 13; x < TILES_X; x++) ceilingX.push({ tx: x, ty: 12 });

const ceilingY: Array<{tx:number;ty:number}> = [];
for (let y = 13; y < 16; y++) ceilingY.push({ tx: 13, ty: y });

const cxEndRight = [{tx:12,ty:0},{tx:TILES_X-1,ty:0},{tx:TILES_X-1,ty:12}];
const cxEndLeft  = [{tx:0,ty:0},{tx:0,ty:16},{tx:13,ty:0}];

export function drawCeiling(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const imgX = IM.ceilingX;
  if (imgX) for (const p of ceilingX) ctx.drawImage(imgX, p.tx*TILE, p.ty*TILE, TILE, TILE);

  const imgY = IM.ceilingY;
  if (imgY) for (const p of ceilingY) ctx.drawImage(imgY, p.tx*TILE, p.ty*TILE, TILE, TILE);

  const endR = IM.ceilingXendRIGHT;
  if (endR) for (const p of cxEndRight) ctx.drawImage(endR, p.tx*TILE, p.ty*TILE, TILE, TILE);

  const endL = IM.ceilingXendLEFT;
  if (endL) for (const p of cxEndLeft) ctx.drawImage(endL, p.tx*TILE, p.ty*TILE, TILE, TILE);

  const joinTL = IM.ceilingJoinTL;
  if (joinTL) ctx.drawImage(joinTL, 13*TILE, 12*TILE, TILE, TILE);

  const tl1 = IM.JoinTL1, tl2 = IM.JoinTL2;
  if (tl1) ctx.drawImage(tl1, 13*TILE, 16*TILE, TILE, TILE);
  if (tl2) ctx.drawImage(tl2, 13*TILE, 17*TILE, TILE, TILE);
}
