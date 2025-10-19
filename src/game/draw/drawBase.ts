import { TILE, TILES_X } from '../constants';
import type { ImgMap } from '../types';

/** Kitchen floor: (x=0..12, y=2..15) */
function drawKitchenFloor(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const img = IM.kitchenFloor; if (!img) return;
  for (let y = 2; y < 16; y++)
    for (let x = 0; x < 13; x++)
      ctx.drawImage(img, x*TILE, y*TILE, TILE, TILE);
}

/** Kitchen wall: (x=0..12, y=0..1) */
function drawKitchenWall(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const imgKitchenWall = IM.kitchenWall; 
  if (!imgKitchenWall) throw Error;
  for (let y = 0; y < 2; y++)
    for (let x = 0; x < 13; x++)
      ctx.drawImage(imgKitchenWall, x*TILE, y*TILE, TILE, TILE);

  const imgKitchenWallEnd = IM.kitchenWallEnd;
  if (!imgKitchenWallEnd) throw Error;
  ctx.drawImage(imgKitchenWallEnd, 12*TILE, 0*TILE, TILE, TILE);
  ctx.drawImage(imgKitchenWallEnd, 12*TILE, 1*TILE, TILE, TILE);
}

/** Dining walls: top rows (x=13..31, y=0..1) */
function drawDiningWall(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const top = IM.DiningWallTop;
  const mid = IM.DiningWall;
  if (!top || !mid) return;
  for (let x = 13; x < TILES_X; x++) ctx.drawImage(top, x*TILE, 0, TILE, TILE);
  for (let x = 13; x < TILES_X; x++) ctx.drawImage(mid, x*TILE, 1*TILE, TILE, TILE);

  const topEnd = IM.DiningWallTopEnd;
  const midEnd = IM.DiningWallEnd;
  if (!topEnd || !midEnd) throw Error;
  ctx.drawImage(topEnd, 13*TILE, 0*TILE, TILE, TILE);
  ctx.drawImage(midEnd, 13*TILE, 1*TILE, TILE, TILE);
}

/** Dining floor: (x=13..31, y=2..11) */
function drawDiningFloor(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const img = IM.DiningFloor; if (!img) return;
  for (let y = 2; y < 12; y++)
    for (let x = 13; x < TILES_X; x++)
      ctx.drawImage(img, x*TILE, y*TILE, TILE, TILE);
}

/** Exterior walls & grass (two bands, per your mapping) */
function drawExterior(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const wall = IM.outsideWall; const grass = IM.outsideGrass;
  if (wall) {
    // (x=13..31, y=12..13)
    for (let y = 12; y < 14; y++)
      for (let x = 13; x < TILES_X; x++)
        ctx.drawImage(wall, x*TILE, y*TILE, TILE, TILE);
    // (x=0..12, y=16..17)
    for (let y = 16; y < 18; y++)
      for (let x = 0; x < 13; x++)
        ctx.drawImage(wall, x*TILE, y*TILE, TILE, TILE);
  }
  if (grass) {
    // (x=13..31, y=14..17)
    for (let y = 14; y < 18; y++)
      for (let x = 13; x < TILES_X; x++)
        ctx.drawImage(grass, x*TILE, y*TILE, TILE, TILE);
  }
}

export function drawBase(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  drawKitchenWall(ctx, IM);
  drawKitchenFloor(ctx, IM);
  drawDiningWall(ctx, IM);
  drawDiningFloor(ctx, IM);
  drawExterior(ctx, IM);
}
