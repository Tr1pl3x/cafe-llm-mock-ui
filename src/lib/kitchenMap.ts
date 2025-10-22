export type RawMapItem = { x: number; y: number; item_type: string }

export type ItemKind = 'TABLE' | 'FRIDGE' | 'TRASH_BIN' | 'COOKWARE' | 'NPC' | 'UNKNOWN'

export interface MapItem {
  x: number
  y: number
  kind: ItemKind
  subtype?: string
  rawType: string
}

export interface KitchenMap {
  items: MapItem[]
  byKind: Record<ItemKind, MapItem[]>
  byCoord: Record<string, MapItem[]>
}

function parseItemType(raw: string): { kind: ItemKind; subtype?: string } {
  const lower = raw.toLowerCase()
  if (lower === 'table') return { kind: 'TABLE' }
  if (lower === 'fridge') return { kind: 'FRIDGE' }
  if (lower === 'trash_bin') return { kind: 'TRASH_BIN' }

  const match = /^mapitemtype\.(\w+):([\w_]+)$/i.exec(raw)
  if (match) {
    const [, type, sub] = match
    const t = type.toUpperCase()
    if (t === 'TABLE') return { kind: 'TABLE', subtype: sub }
    if (t === 'COOKWARE') return { kind: 'COOKWARE', subtype: sub }
    if (t === 'NPC') return { kind: 'NPC', subtype: sub }
  }
  return { kind: 'UNKNOWN' }
}

export function buildKitchenMap(raw: RawMapItem[]): KitchenMap {
  const items: MapItem[] = raw.map(({ x, y, item_type }) => {
    const { kind, subtype } = parseItemType(item_type)
    const yAdjusted = kind === 'TABLE' ? y + 2 : y
    return { x, y: yAdjusted, kind, subtype, rawType: item_type }
  })

  const byKind: KitchenMap['byKind'] = {
    TABLE: [],
    FRIDGE: [],
    TRASH_BIN: [],
    COOKWARE: [],
    NPC: [],
    UNKNOWN: [],
  }

  const byCoord: Record<string, MapItem[]> = {}
  for (const it of items) {
    byKind[it.kind].push(it)
    const key = `${it.x},${it.y}`
    if (!byCoord[key]) byCoord[key] = []
    byCoord[key].push(it)
  }

  return { items, byKind, byCoord }
}

export async function fetchKitchenMap(baseUrl = 'http://127.0.0.1:8000'): Promise<KitchenMap> {
  const res = await fetch(`${baseUrl}/map/kitchen`, {
    headers: { accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Failed to fetch kitchen map: ${res.status}`)
  const data = (await res.json()) as RawMapItem[]
  return buildKitchenMap(data)
}
