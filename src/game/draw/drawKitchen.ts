import { TILE } from '../constants';
import type { ImgMap } from '../types';

// Counter X: x=1..11 at y=2 AND y=15
const counterX: Array<{tx:number;ty:number}> = [];
for (let x = 1; x < 12; x++) { counterX.push({tx:x,ty:3}); counterX.push({tx:x,ty:15}); }

const counterX0: Array<{tx:number, ty:number}> =[];
for (let x = 1; x < 12; x++) { counterX0.push({tx:x,ty:2}); counterX0.push({tx:x,ty:14});}

const counterX1: Array<{tx:number, ty:number}> =[];
for (let x = 1; x < 12; x++) { counterX1.push({tx:x,ty:3}); counterX1.push({tx:x,ty:15});}

// Counter Y: y=3..14 at x=0 AND x=12
const counterY: Array<{tx:number;ty:number}> = [];
for (let y = 3; y < 15; y++) { counterY.push({tx:0,ty:y}); counterY.push({tx:12,ty:y}); }

export function drawKitchen(ctx: CanvasRenderingContext2D, IM: ImgMap) {

  const x0 = IM.counterX0;
  if (x0) for (const x of counterX0) ctx.drawImage(x0, x.tx*TILE, x.ty*TILE, TILE, TILE);

  const x1 = IM.counterX1;
  if (x1) for (const x of counterX1) ctx.drawImage(x1, x.tx*TILE, x.ty*TILE, TILE, TILE);

  // const imgX = IM.counterX;
  // if (imgX) for (const p of counterX) ctx.drawImage(imgX, p.tx*TILE, p.ty*TILE, TILE, TILE);

  const imgY = IM.counterY;
  if (imgY) for (const p of counterY) ctx.drawImage(imgY, p.tx*TILE, p.ty*TILE, TILE, TILE);

  // Corner Top Left (x = 0, y = 2)
  // Corner Top Right (x = 12, y = 2)
  const ctl = IM.counterCornerTL;
  const ctr = IM.counterCornerTR;
  if ((!ctl) || (!ctr)) throw Error;
  ctx.drawImage(ctl, 0*TILE, 2*TILE, TILE, TILE);
  ctx.drawImage(ctr, 12*TILE, 2*TILE, TILE, TILE);

  // JOIN  TOP LEFT  (0,3) 
  // JOIN  TOP RIGHT (12,3)
  const jtl = IM.counterJoinTL, jtr = IM.counterJoinTR;
  if (jtl) ctx.drawImage(jtl, 0*TILE, 3*TILE, TILE, TILE);
  if (jtr) ctx.drawImage(jtr, 12*TILE, 3*TILE, TILE, TILE);

  // Corner Bottom Left  (x = 0, y = 14)
  // Corner Bottom Right (x = 12, y = 14)
  const cbl = IM.counterCornerBL;
  const cbr = IM.counterCornerBR;
  if (cbl) ctx.drawImage(cbl, 0*TILE, 15*TILE, TILE, TILE);
  if (cbr) ctx.drawImage(cbr, 12*TILE, 15*TILE, TILE, TILE)

  const jbl = IM.counterJoinBL;
  const jbr = IM.counterJoinBR;
  if ((!jbl) || (!jbr)) throw Error;
  ctx.drawImage(jbl, 0*TILE, 14*TILE, TILE, TILE);
  ctx.drawImage(jbr, 12*TILE, 14*TILE, TILE, TILE);

  
  // /** Test Food */
  // // (x = 12, y = 9)
  // const tf = IM.testFood;
  // if(!tf) throw Error;
  // ctx.drawImage(tf, 12*TILE, 9*TILE, TILE, TILE);

  // /* Cartons of Milk */
  // // (x = 13, y = 9)
  // const ma = IM.milkArmy;
  // if (!ma) throw Error;
  // ctx.drawImage(ma, 12*TILE, 10*TILE, TILE, TILE);
  
  // /* RECIPE BOOK */
  // // (x = 12, y = 3)
  // const rb = IM.recipeBook;
  // if (!rb) throw Error;
  // ctx.drawImage(rb, 12*TILE, 3*TILE, TILE, TILE);
  
  // /* Two Plate */
  // // (x = 9, y = 2)
  // const pt = IM.plateTwo;
  // if (!pt) throw Error;
  // ctx.drawImage(pt, 9*TILE, 2*TILE, TILE, TILE);
}
