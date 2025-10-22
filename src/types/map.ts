// src/types/map.ts
export type RawMapItem = { x: number; y: number; item_type: string }

export type ParsedMapData = {
  tables: { x: number; y: number }[]
  cookTables: { x: number; y: number }[]
  serveTables: { x: number; y: number }[]
  fridges: { x: number; y: number }[]
  trashBins: { x: number; y: number }[]
  cookware: { kind: string; x: number; y: number }[]
  npcs: { role: string; x: number; y: number }[]
  recipeBooks: { x: number; y: number }[]   // NEW
}

export const parseMapResponse = (items: RawMapItem[]): ParsedMapData => {
  const out: ParsedMapData = {
    tables: [],
    cookTables: [],
    serveTables: [],
    fridges: [],
    trashBins: [],
    cookware: [],
    npcs: [],
    recipeBooks: [], // NEW
  }

  for (const it of items) {
    const { x } = it
    let { y } = it
    const t = it.item_type

    // border/basic tables (+2 y offset to match frontend grid)
    if (t === 'table') {
      out.tables.push({ x, y: y + 2 })
      continue
    }

    // specialized tables
    if (t === 'MapItemType.TABLE:cook_table') { out.cookTables.push({ x, y:y + 2 }); continue }
    if (t === 'MapItemType.TABLE:serve_table') { out.serveTables.push({ x, y:y + 2 }); continue }

    // appliances / storage
    if (t === 'fridge') { out.fridges.push({ x, y:y + 2 }); continue }
    if (t === 'trash_bin') { out.trashBins.push({ x, y:y + 2 }); continue }

    // cookware (e.g., coffee_machine, cutting_board, frypan, toaster)
    if (t.startsWith('MapItemType.COOKWARE:')) {
      const kind = t.split(':')[1] ?? 'unknown'
      out.cookware.push({ kind, x, y:y + 2 })
      continue
    }

    // NPCs (e.g., MapItemType.NPC:NPCType.CHEF)
    if (t.startsWith('MapItemType.NPC:')) {
      const role = t.split(':')[1] ?? 'unknown'
      out.npcs.push({ role, x, y:y + 2 })
      continue
    }

    // NEW: recipe book
    if (t === 'recipe_book') {
      out.recipeBooks.push({ x, y:y + 2 })
      continue
    }

    // unknowns ignored for now
  }
  return out
}
