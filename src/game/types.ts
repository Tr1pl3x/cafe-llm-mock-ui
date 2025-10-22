export type Dir = 'up' | 'down' | 'left' | 'right';

export type SpriteKey =
  // Chef
  | 'front' | 'frontMid' | 'frontMidAlt'
  | 'side'  | 'sideMid'
  | 'back'  | 'backMid'  | 'backMidAlt'
  // Base tiles
  | 'kitchenFloor' | 'kitchenFloorEndSide' | 'kitchenFloorEndBot'
  | 'kitchenWall' | 'kitchenWallEnd'
  | 'DiningWallTop' | 'DiningWallTopEnd' | 'DiningWall' | 'DiningWallEnd' | 'DiningFloor'
  | 'outsideWall' | 'outsideGrass'
  // Ceilings
  | 'ceilingX' | 'ceilingXendRIGHT' | 'ceilingXendLEFT'
  | 'ceilingY' | 'ceilingJoinTL' | 'JoinTL1' | 'JoinTL2'

  //////** KITCHEN   */////

  // Kitchen counters
  | 'counterX0' |'counterX1' 
  | 'counterY' 
  | 'counterCornerTL' |'counterCornerTR' |'counterCornerBL' | 'counterCornerBR'
  |  'counterJoinTL' | 'counterJoinTR' | 'counterJoinBL' | 'counterJoinBR'

  // Stations
  | 'stove'    | 'cuttingboard' | 'bin0'| 'bin1' | 'toaster'
  | 'coffeeMachine1' | 'coffeeMachine2'
  | 'fridge11' | 'fridge12' | 'fridge21' | 'fridge22'| 'fridge31' | 'fridge32'

  // DECOR
  | 'recipeBook' | 'plateTwo'
  | 'knivesSet1'  | 'knivesSet2'

  // TEST
  | 'testFood' | 'milkArmy'
;
export type ImgMap = Partial<Record<SpriteKey, HTMLImageElement>>;

export interface Chef {
  tx: number; ty: number;  // tile coords
  x: number;  y: number;   // pixel coords
  speedTilesPerSec: number;
  moving: boolean;
  targetTx: number; targetTy: number;
  dir: Dir;
  animTimer: number;
  animFrame: 0 | 1;
  animFPS: number;
  path: Array<[number, number]>;
  dest: [number, number] | null;
}
