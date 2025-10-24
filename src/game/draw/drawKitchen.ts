import { TILE } from '../constants';
import type { ImgMap } from '../types';

import { 
  getAllCookTables,
  getAllCookwares,
  getAllFridges,
  getAllRecipeBooks,
  getAllServeTables,
  getAllTrashBins
} from '../../utils/mapUtils';


/** NOTE: Counters of the the kitchen are still hardcoded and not utilising the API.*/

// COUNTER X0 : x=1...11 at y =2 and y =14
const counterX0: Array<{tx:number, ty:number}> =[];
for (let x = 1; x < 12; x++) { counterX0.push({tx:x,ty:2}); counterX0.push({tx:x,ty:14});}

// COUNTER X1 : x=1...11 at y =3 and y =15
const counterX1: Array<{tx:number, ty:number}> =[];
for (let x = 1; x < 12; x++) { counterX1.push({tx:x,ty:3}); counterX1.push({tx:x,ty:15});}

// Counter Y: y=3..14 at x=0 AND x=12
const counterY: Array<{tx:number;ty:number}> = [];
for (let y = 3; y < 15; y++) { counterY.push({tx:0,ty:y}); counterY.push({tx:12,ty:y}); }

function drawKitchenCounter(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const x0 = IM.counterX0;
  if (x0) for (const x of counterX0) ctx.drawImage(x0, x.tx*TILE, x.ty*TILE, TILE, TILE);

  const x1 = IM.counterX1;
  if (x1) for (const x of counterX1) ctx.drawImage(x1, x.tx*TILE, x.ty*TILE, TILE, TILE);

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

  // JOIN  TOP LEFT  (0,14) 
  // JOIN  TOP RIGHT (12,14)
  const jbl = IM.counterJoinBL;
  const jbr = IM.counterJoinBR;
  if ((!jbl) || (!jbr)) throw Error;
  ctx.drawImage(jbl, 0*TILE, 14*TILE, TILE, TILE);
  ctx.drawImage(jbr, 12*TILE, 14*TILE, TILE, TILE);
}


function drawKcStations(ctx: CanvasRenderingContext2D, IM: ImgMap) {
  const AllCookwares = getAllCookwares();
  // STOVE 
  const StovePos = getAllCookwares().frypan ?? [];
  const imgStove = IM.stove;
  if (!imgStove) throw Error;
  ctx.drawImage(imgStove, StovePos[0].x*TILE, StovePos[0].y*TILE, TILE, TILE);

  // COFFEE MACHINE
  const CMPos = getAllCookwares().coffee_machine ?? [];
  const imgCM1 = IM.coffeeMachine1;
  const imgCM2 = IM.coffeeMachine2;
  if ((!imgCM1) || (!imgCM2)) throw Error;
  ctx.drawImage(imgCM1, CMPos[0].x*TILE, CMPos[0].y*TILE, TILE, TILE);
  ctx.drawImage(imgCM2, CMPos[1].x*TILE, CMPos[1].y*TILE, TILE, TILE);

  // cutting board (x = 0, y = 4)
  const CBPos = getAllCookwares().cutting_board ?? [];
  const imgCB = IM.cuttingboard;
  if (!imgCB) throw Error;
  ctx.drawImage(imgCB, CBPos[0].x*TILE, CBPos[0].y*TILE, TILE, TILE);

  const toasterPos = AllCookwares.toaster;
  const imgToaster = IM.toaster;
  if(!imgToaster) throw Error;
  ctx.drawImage(imgToaster, toasterPos[0].x*TILE, toasterPos[0].y*TILE, TILE, TILE);

  // TRASHBIN
  const binPos = getAllTrashBins();
  const imgBin0 = IM.bin0;
  const imgBin1 = IM.bin1;
  if (!imgBin0) throw Error;
  if (!imgBin1) throw Error;
  ctx.drawImage(imgBin0, binPos[0].x*TILE, binPos[0].y*TILE, TILE, TILE);
  ctx.drawImage(imgBin1, binPos[1].x*TILE, binPos[1].y*TILE, TILE, TILE);

  // FRIDGE
  const fridgePos = getAllFridges();
  const images = [
    IM.fridge11, IM.fridge12,
    IM.fridge21, IM.fridge22,
    IM.fridge31, IM.fridge32
  ];

  if (images.some(img => !img)) throw new Error('Fridge images not loaded');
  if (fridgePos.length < images.length) throw new Error('Not enough fridge positions');

  (images as HTMLImageElement[]).forEach((img, i) => {
    const { x, y } = fridgePos[i];
    ctx.drawImage(img, x * TILE, y * TILE, TILE, TILE);
  });

  /* RECIPE BOOK */
  const rbPos = getAllRecipeBooks();
  // (x = 12, y = 3)
  const rb = IM.recipeBook;
  if (!rb) throw Error;
  ctx.drawImage(rb, rbPos[0].x*TILE, rbPos[0].y*TILE, TILE, TILE);

  /* SERVE TABLE */
  const stPos = getAllServeTables();
  const imgServeTable = IM.serveTable;
  if (!imgServeTable) throw Error;
  for ( const st of stPos) {
    ctx.drawImage(imgServeTable, st.x*TILE, st.y*TILE, TILE, TILE);
  }
  /** COOK TABLE */
  const ckPos = getAllCookTables()
  const imgCookTable = IM.cookTable;
  if ( !imgCookTable) throw Error;
  for ( const ck of ckPos) {
    ctx.drawImage(imgCookTable, ck.x*TILE, ck.y*TILE, TILE, TILE);
  }
  
  

}


export function drawKitchen(ctx: CanvasRenderingContext2D, IM: ImgMap) {



  drawKitchenCounter(ctx, IM);
  drawKcStations(ctx, IM);


  

  /**MOCK ARTWORKS */
  
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


  // // KNIVES SET
  // const kf1 = IM.knivesSet1;
  // const kf2 = IM.knivesSet2;
  // if ((!kf1) || (!kf2)) throw Error;
  // ctx.drawImage(kf1, 1*TILE, 2*TILE, TILE, TILE);
  // ctx.drawImage(kf2, 2*TILE, 2*TILE, TILE, TILE);
 
  // /* Two Plate */
  // // (x = 9, y = 2)
  // const pt = IM.plateTwo;
  // if (!pt) throw Error;
  // ctx.drawImage(pt, 1*TILE, 3*TILE, TILE, TILE);
  // ctx.drawImage(pt, 2*TILE, 3*TILE, TILE, TILE);

  // const AllTables = getAllTables();
  // const imgTest = IM.bin1;
  // if(!imgTest) throw Error;
  // for(const x of AllTables) {
  //   ctx.drawImage(imgTest, x.x*TILE, x.y*TILE, TILE, TILE);
  // }
}
