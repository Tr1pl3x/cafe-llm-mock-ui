// src/utils/mapUtils.ts
export type RawMapItem = { x: number; y: number; item_type: string }

export type ParsedMapData = {
  tables: { x: number; y: number }[]
  cookTables: { x: number; y: number }[]
  serveTables: { x: number; y: number }[]
  fridges: { x: number; y: number }[]
  trashBins: { x: number; y: number }[]
  cookware: { kind: string; x: number; y: number }[]
  npcs: { role: string; x: number; y: number }[]
  recipeBooks: { x: number; y: number }[]
}

export type OrganizedMapData = {
  allTables: { x: number; y: number }[]
  allCookTables: { x: number; y: number }[]
  allServeTables: { x: number; y: number }[]
  allFridges: { x: number; y: number }[]
	cookware: Record<string, { x: number; y: number }[]>,
  allTrashBins: { x: number; y: number }[]
  allRecipeBooks: { x: number; y: number }[]
  tileIndex: Record<string, string>
}

type Pos = { x: number; y: number };
type CookwareMap = Record<string, Pos[]>;

/* -------------------------------------------------------------------------- */
/*                               LOCAL STORAGE                                */
/* -------------------------------------------------------------------------- */

let _globalMapData: OrganizedMapData | null = null

export function setGlobalMapData(data: OrganizedMapData) {
  _globalMapData = data
}

export function getGlobalMapData(): OrganizedMapData | null {
  return _globalMapData
}

/** Quick accessors for convenience */
export const getAllTables = () => _globalMapData?.allTables ?? []
export const getAllCookTables = () => _globalMapData?.allCookTables ?? []
export const getAllServeTables = () => _globalMapData?.allServeTables ?? []
export const getAllFridges = () => _globalMapData?.allFridges ?? []
export const getAllRecipeBooks = () => _globalMapData?.allRecipeBooks ?? []
export const getAllTrashBins = () => _globalMapData?.allTrashBins ?? []
export const getAllCookwares = (): CookwareMap => _globalMapData?.cookware ?? {}; 


/* -------------------------------------------------------------------------- */
/*                             MAP TRANSFORMATION                             */
/* -------------------------------------------------------------------------- */


export const parseMapResponse = (items: RawMapItem[]): ParsedMapData => {
  const out: ParsedMapData = {
    tables: [],
    cookTables: [],
    serveTables: [],
    fridges: [],
    trashBins: [],
    cookware: [],
    npcs: [],
    recipeBooks: []
  }

  for (const it of items) {
    const { x } = it
    let { y } = it
    const t = it.item_type

    if (t === 'table') { out.tables.push({ x, y: y + 2 }); continue }
    if (t === 'MapItemType.TABLE:cook_table') { out.cookTables.push({ x, y: y + 2 }); continue }
    if (t === 'MapItemType.TABLE:serve_table') { out.serveTables.push({ x, y: y + 2 }); continue }
    if (t === 'fridge') { out.fridges.push({ x, y: y + 2 }); continue }
    if (t === 'trash_bin') { out.trashBins.push({ x, y: y + 2 }); continue }
    if (t.startsWith('MapItemType.COOKWARE:')) {
      const kind = t.split(':')[1] ?? 'unknown'
      out.cookware.push({ kind, x, y: y + 2 }); continue
    }
    if (t.startsWith('MapItemType.NPC:')) {
      const role = t.split(':')[1] ?? 'unknown'
      out.npcs.push({ role, x, y:y+2 }); continue
    }
    if (t === 'recipe_book') { out.recipeBooks.push({ x, y: y + 2 }); continue }
  }

  return out
}

export const organizeMapData = (parsed: ParsedMapData): OrganizedMapData => {
  const pick = (arr?: { x: number; y: number }[]) =>
    (arr ?? []).map(({ x, y }) => ({ x, y }))

  const allTables      = pick(parsed.tables)
  const allCookTables  = pick(parsed.cookTables)
  const allServeTables = pick(parsed.serveTables)

	/** TAKING OUT ALL THE COOKWARES OUT OF THE RESPONSE JSON BODY */
	const cookwareByKind: Record<string, Pos[]> = (parsed.cookware ?? [])
  .reduce((acc, { kind, x, y }) => {
    (acc[kind] ??= []).push({ x:x, y:y +2 });
    return acc;
  }, {} as Record<string, Pos[]>);

	// SORTING OUT THE COFFEE MACHINE ONLY TO MATCH THE ARTWORK IN THE ENGINE
	let CMNewPos = {x: cookwareByKind.coffee_machine[0].x, y:cookwareByKind.coffee_machine[0].y-1};
	cookwareByKind.coffee_machine.splice(0,0,CMNewPos);

	/** SORTING OUT THE FRIDGE TO MATCH THE ARTWORK */
	const allFridges= pick(parsed.fridges)
	const xs = [...new Set(allFridges.map(f => f.x))].sort((a, b) => a - b);
	const rowsToAdd = 2;

	const startY = Math.min(...allFridges.map(f => f.y)) - rowsToAdd;
	const endY   = Math.max(...allFridges.map(f => f.y));

	const newFridges = [];
	for (let y = startY; y <= endY; y++) {
		for (const x of xs) newFridges.push({ x, y });
	}
	allFridges.splice(0, allFridges.length, ...newFridges);

	/** RECIPE BOOK */
  const allRecipeBooks = pick(parsed.recipeBooks)
	
	/** SORTING OUT THE TRASHBIN TO MATCH THE ARTWORK */
  const allTrashBins   = pick(parsed.trashBins)
  allTrashBins.splice(0,0 ,{x:allTrashBins[0].x, y:allTrashBins[0].y -1});

  const tileIndex: Record<string, string> = {}
  const index = (items: { x: number; y: number }[], label: string) =>
    items.forEach(({ x, y }) => (tileIndex[`${x},${y}`] = label))

  index(allTables, 'table')
  index(allCookTables, 'cook_table')
  index(allServeTables, 'serve_table')
  index(allFridges, 'fridge')
  index(allTrashBins, 'trash_bin')
  index(allRecipeBooks, 'recipe_book')

  const organized: OrganizedMapData = {
		allTables,
		allCookTables,
		allServeTables,
		allFridges,
		allTrashBins,
		allRecipeBooks,
		cookware: cookwareByKind,
		tileIndex
}

  // store globally
  setGlobalMapData(organized)
  return organized
}
