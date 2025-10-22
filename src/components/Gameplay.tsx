import React, { useEffect, useRef, useState } from 'react'
import { initGame, destroyGame } from '../game/engine'
import RecipeBook from './RecipeBook'

/**
 * Gameplay Component (16:9 ratio)
 * Owns the canvas and manages the game engine lifecycle
 */
export default function Gameplay({ mapData }: { mapData: any }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showRecipeBook, setShowRecipeBook] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const cleanup = initGame(canvas, {
      onRecipeBookClick: () => setShowRecipeBook(true)
    })

    const onResize = () => {}
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cleanup?.()
      destroyGame()
    }
  }, [mapData])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        background: '#eee',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          cursor: 'pointer',
          display: 'block',
        }}
      />

      {showRecipeBook && <RecipeBook onClose={() => setShowRecipeBook(false)} />}
    </div>
  )
}
