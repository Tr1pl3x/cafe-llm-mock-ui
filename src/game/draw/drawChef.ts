import { TILE } from '../constants';
import type { Chef, ImgMap } from '../types';

const SCALE_SPRITE = 1.2 as const;

function frame(IM: ImgMap, chef: Chef): HTMLImageElement | null {
  if (!chef.moving) return IM.front ?? null;
  switch (chef.dir) {
    case 'right': return (chef.animFrame ? IM.sideMid : IM.side) ?? null;
    case 'left':  return (chef.animFrame ? IM.sideMid : IM.side) ?? null;
    case 'up':    return (chef.animFrame ? IM.backMidAlt : IM.backMid) ?? null;
    case 'down':  return (chef.animFrame ? IM.frontMidAlt : IM.frontMid) ?? null;
  }
}

export function drawChef(ctx: CanvasRenderingContext2D, IM: ImgMap, chef: Chef) {
  const img = frame(IM, chef);
  if (!img) return;

  const w = TILE * SCALE_SPRITE;
  const h = TILE * 1.5 * SCALE_SPRITE;

  if (chef.dir === 'left' && chef.moving) {
    ctx.save();
    ctx.translate(chef.x + TILE, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, (TILE - w) / 2, chef.y - (h - TILE), w, h);
    ctx.restore();
  } else {
    ctx.drawImage(img, chef.x + (TILE - w) / 2, chef.y - (h - TILE), w, h);
  }

  // Force front idle frame after movement
  if (!chef.moving && img !== IM.front && IM.front) {
    ctx.drawImage(IM.front, chef.x + (TILE - w) / 2, chef.y - (h - TILE), w, h);
  }
}
