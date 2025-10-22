type XY = { x: number; y: number }

export type SegH = { y: number; x1: number; x2: number } // inclusive x1..x2
export type SegV = { x: number; y1: number; y2: number } // inclusive y1..y2
export type Edges = {
  horizontal: { outer: SegH[]; inner: SegH[] }
  vertical:   { outer: SegV[]; inner: SegV[] }
}

export type Corner = {
  x: number
  y: number
  kind: 'outer' | 'inner'
  orientation: 'tl' | 'tr' | 'bl' | 'br'
}

export type EdgeCornerResult = {
  edges: Edges
  outerCorners: Corner[]
  innerCorners: Corner[]
}

/**
 * Analyze occupied tiles (e.g., allTables) to compute:
 *  - stitched horizontal/vertical segments (outer/inner)
 *  - corner points (outer/inner) reported in tile coords
 */
export function analyzeEdgesAndCorners(tiles: XY[]): EdgeCornerResult {
  if (!tiles.length) {
    const empty: Edges = { horizontal: { outer: [], inner: [] }, vertical: { outer: [], inner: [] } }
    return { edges: empty, outerCorners: [], innerCorners: [] }
  }

  /* ------------------------------ setup & bounds ------------------------------ */
  const key = (x: number, y: number) => `${x},${y}`
  const occ = new Set<string>(tiles.map(t => key(t.x, t.y)))

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const { x, y } of tiles) {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }

  // pad by 1 to ensure flood-fill starts in empty space
  const pad = 1
  const W = (maxX - minX + 1) + pad * 2
  const H = (maxY - minY + 1) + pad * 2
  const ox = minX - pad
  const oy = minY - pad

  const inBounds = (gx: number, gy: number) => gx >= 0 && gy >= 0 && gx < W && gy < H
  const toGrid = (x: number, y: number) => ({ gx: x - ox, gy: y - oy })

  /* ------------------------------- flood outside ------------------------------ */
  const outside: boolean[][] = Array.from({ length: H }, () => Array(W).fill(false))
  const q: Array<{ gx: number; gy: number }> = [{ gx: 0, gy: 0 }]
  while (q.length) {
    const { gx, gy } = q.shift()!
    if (!inBounds(gx, gy) || outside[gy][gx]) continue
    const wx = gx + ox, wy = gy + oy
    if (occ.has(key(wx, wy))) continue
    outside[gy][gx] = true
    q.push({ gx: gx + 1, gy })
    q.push({ gx: gx - 1, gy })
    q.push({ gx, gy: gy + 1 })
    q.push({ gx, gy: gy - 1 })
  }
  const isEmpty = (wx: number, wy: number) => !occ.has(key(wx, wy))
  const isOutsideEmpty = (wx: number, wy: number) => {
    const { gx, gy } = toGrid(wx, wy)
    return inBounds(gx, gy) && outside[gy][gx] === true
  }

  /* -------------------------- collect unit tile-edges ------------------------- */
  type UnitH = { y: number; x: number; outer: boolean } // top or bottom edge at tile (x,y) reported at (y,x)
  type UnitV = { x: number; y: number; outer: boolean } // left or right edge at tile (x,y) reported at (x,y)

  const HunitsOuter: UnitH[] = [], HunitsInner: UnitH[] = []
  const VunitsOuter: UnitV[] = [], VunitsInner: UnitV[] = []

  for (const { x, y } of tiles) {
    // Top neighbor empty → top edge on tile (x,y) at y
    if (isEmpty(x, y - 1)) {
      const outer = isOutsideEmpty(x, y - 1)
      ;(outer ? HunitsOuter : HunitsInner).push({ y, x, outer })
    }
    // Bottom neighbor empty → bottom edge reported at tile (x,y) as y (we still report using tile y)
    if (isEmpty(x, y + 1)) {
      const outer = isOutsideEmpty(x, y + 1)
      ;(outer ? HunitsOuter : HunitsInner).push({ y, x, outer })
    }
    // Left neighbor empty → left edge reported at (x,y)
    if (isEmpty(x - 1, y)) {
      const outer = isOutsideEmpty(x - 1, y)
      ;(outer ? VunitsOuter : VunitsInner).push({ x, y, outer })
    }
    // Right neighbor empty → right edge reported at (x,y)
    if (isEmpty(x + 1, y)) {
      const outer = isOutsideEmpty(x + 1, y)
      ;(outer ? VunitsOuter : VunitsInner).push({ x, y, outer })
    }
  }

  /* -------------------- stitch units into inclusive segments ------------------ */
  const stitchH = (units: UnitH[]): SegH[] => {
    const byY = new Map<number, number[]>()
    for (const u of units) {
      const arr = byY.get(u.y) ?? []
      arr.push(u.x)
      byY.set(u.y, arr)
    }
    const out: SegH[] = []
    for (const [y, xs] of byY) {
      xs.sort((a, b) => a - b)
      let start = xs[0], prev = xs[0]
      for (let i = 1; i < xs.length; i++) {
        const x = xs[i]
        if (x === prev + 1) { prev = x; continue }
        out.push({ y, x1: start, x2: prev }) // inclusive
        start = prev = x
      }
      out.push({ y, x1: start, x2: prev })
    }
    return out
  }

  const stitchV = (units: UnitV[]): SegV[] => {
    const byX = new Map<number, number[]>()
    for (const u of units) {
      const arr = byX.get(u.x) ?? []
      arr.push(u.y)
      byX.set(u.x, arr)
    }
    const out: SegV[] = []
    for (const [x, ys] of byX) {
      ys.sort((a, b) => a - b)
      let start = ys[0], prev = ys[0]
      for (let i = 1; i < ys.length; i++) {
        const y = ys[i]
        if (y === prev + 1) { prev = y; continue }
        out.push({ x, y1: start, y2: prev }) // inclusive
        start = prev = y
      }
      out.push({ x, y1: start, y2: prev })
    }
    return out
  }

  const edges: Edges = {
    horizontal: {
      outer: stitchH(HunitsOuter),
      inner: stitchH(HunitsInner),
    },
    vertical: {
      outer: stitchV(VunitsOuter),
      inner: stitchV(VunitsInner),
    },
  }

  /* ----------------------------- detect corners ------------------------------ */
  // Build quick sets for unit edges to test corners locally
  const H_outer = new Set(HunitsOuter.map(u => `${u.x},${u.y}`))
  const H_inner = new Set(HunitsInner.map(u => `${u.x},${u.y}`))
  const V_outer = new Set(VunitsOuter.map(u => `${u.x},${u.y}`))
  const V_inner = new Set(VunitsInner.map(u => `${u.x},${u.y}`))

  const outerCorners: Corner[] = []
  const innerCorners: Corner[] = []

  // Corner is defined at a vertex if *both* perpendicular edges touching that vertex exist
  // and share the same kind (outer or inner). We report corner coordinates in tile grid.
  for (const { x, y } of tiles) {
    // TL vertex at (x, y): needs top edge at H(x,y) and left edge at V(x,y)
    const tlOuter = H_outer.has(`${x},${y}`) && V_outer.has(`${x},${y}`)
    const tlInner = H_inner.has(`${x},${y}`) && V_inner.has(`${x},${y}`)
    if (tlOuter) outerCorners.push({ x, y, kind: 'outer', orientation: 'tl' })
    if (tlInner) innerCorners.push({ x, y, kind: 'inner', orientation: 'tl' })

    // TR vertex at (x+1, y): needs top edge at H(x+1?, y)? -> top edge touches tile (x+1,y) for its left half.
    // Easiest: check top edge at tile (x+1,y) and right edge at tile (x,y)
    const trOuter = H_outer.has(`${x+1},${y}`) && V_outer.has(`${x+1},${y}`)
    const trInner = H_inner.has(`${x+1},${y}`) && V_inner.has(`${x+1},${y}`)
    if (trOuter) outerCorners.push({ x: x+1, y, kind: 'outer', orientation: 'tr' })
    if (trInner) innerCorners.push({ x: x+1, y, kind: 'inner', orientation: 'tr' })

    // BL vertex at (x, y+1): check bottom edge at H(x, y+1) and left edge at V(x, y+1)
    const blOuter = H_outer.has(`${x},${y+1}`) && V_outer.has(`${x},${y+1}`)
    const blInner = H_inner.has(`${x},${y+1}`) && V_inner.has(`${x},${y+1}`)
    if (blOuter) outerCorners.push({ x, y: y+1, kind: 'outer', orientation: 'bl' })
    if (blInner) innerCorners.push({ x, y: y+1, kind: 'inner', orientation: 'bl' })

    // BR vertex at (x+1, y+1): bottom edge at H(x+1, y+1) and right edge at V(x+1, y)
    const brOuter = H_outer.has(`${x+1},${y+1}`) && V_outer.has(`${x+1},${y+1}`)
    const brInner = H_inner.has(`${x+1},${y+1}`) && V_inner.has(`${x+1},${y+1}`)
    if (brOuter) outerCorners.push({ x: x+1, y: y+1, kind: 'outer', orientation: 'br' })
    if (brInner) innerCorners.push({ x: x+1, y: y+1, kind: 'inner', orientation: 'br' })
  }

  // Optional de-dupe (corners can be found from two adjacent tiles)
  const dedupe = (arr: Corner[]) => {
    const seen = new Set<string>()
    return arr.filter(c => {
      const id = `${c.kind}:${c.orientation}:${c.x},${c.y}`
      if (seen.has(id)) return false
      seen.add(id)
      return true
    })
  }

  return {
    edges,
    outerCorners: dedupe(outerCorners),
    innerCorners: dedupe(innerCorners),
  }
}
