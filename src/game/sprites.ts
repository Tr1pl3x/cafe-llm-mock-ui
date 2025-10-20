import type { SpriteKey } from './types';

export const SPRITES: Record<SpriteKey, string> = {
  // Chef frames
  front:       '/assets/chef/front.png',
  frontMid:    '/assets/chef/front-midwalk.png',
  frontMidAlt: '/assets/chef/front-midwalk-alt.png',
  side:        '/assets/chef/side.png',
  sideMid:     '/assets/chef/side-midwalk.png',
  back:        '/assets/chef/back.png',
  backMid:     '/assets/chef/back-midwalk.png',
  backMidAlt:  '/assets/chef/back-midwalk-alt.png',

  // Base tiles
  kitchenFloor: '/assets/base/kitchen-floor.png',
  kitchenFloorEndBot:'/assets/base/kitchen-floor-end-bot.png',
  kitchenFloorEndSide:'/assets/base/kitchen-floor-end-side.png',
  kitchenWall:  '/assets/base/kitchen-wall.png',
  kitchenWallEnd: 'assets/base/kitchen-wall-end.png',
  DiningWallTop:'/assets/base/interior-wall-1.png',
  DiningWallTopEnd:'/assets/base/interior-wall-1-end.png',
  DiningWall:   '/assets/base/interior-wall-2.png',
  DiningWallEnd:   '/assets/base/interior-wall-2-end.png',
  DiningFloor:  '/assets/base/dining-floor.png',
  outsideWall:  '/assets/outside/outside-wall.png',
  outsideGrass: '/assets/outside/outside-grass.png',

  // Ceilings
  ceilingX:         '/assets/ceiling/x.png',
  ceilingXendRIGHT: '/assets/ceiling/x-end-right.png',
  ceilingXendLEFT:  '/assets/ceiling/x-end-left.png',
  ceilingY:         '/assets/ceiling/y.png',
  ceilingJoinTL:    '/assets/ceiling/join-top-left.png',
  JoinTL1:          '/assets/ceiling/join-lt-1.png',
  JoinTL2:          '/assets/ceiling/join-lt-2.png',

  // Kitchen counters
  counterX: '/assets/kitchen/counter/counter-X.png',
  counterX0: '/assets/kitchen/counter/counter-X-0.png',
  counterX1: '/assets/kitchen/counter/counter-X-1.png',
  counterY: '/assets/kitchen/counter/counter-Y.png',
  counterBR:'/assets/kitchen/counter/counter-BR.png',
  counterBL:'/assets/kitchen/counter/counter-BL.png',
  counterCornerTL:'/assets/kitchen/counter/counter-corner-TL.png',
  counterCornerTR:'/assets/kitchen/counter/counter-corner-TR.png',
  counterJoinTL:'/assets/kitchen/counter/counter-join-TL.png',
  counterJoinTR:'/assets/kitchen/counter/counter-join-TR.png',
  counterCornerBL: 'assets/kitchen/counter/counter-corner-BL.png',
  counterCornerBR: 'assets/kitchen/counter/counter-corner-BR.png',
  counterJoinBL: 'assets/kitchen/counter/counter-join-BL.png',
  counterJoinBR: 'assets/kitchen/counter/counter-join-BR.png',

  recipeBook:'assets/kitchen/receipe-book.png',
  plateTwo: 'assets/kitchen/plate-two.png',

  // Test Food
  testFood:'/assets/test-food.png',
  milkArmy:'/assets/milk-army.png'
};

export function loadImages<K extends string>(
  map: Record<K, string>
): Promise<Record<K, HTMLImageElement>> {
  const entries = Object.entries(map) as Array<[K, string]>;
  return Promise.all(
    entries.map(([k, src]) =>
      new Promise<[K, HTMLImageElement]>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve([k, img]);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      })
    )
  ).then(pairs => Object.fromEntries(pairs) as Record<K, HTMLImageElement>);
}
