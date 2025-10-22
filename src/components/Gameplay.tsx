import React, { useEffect, useRef, useState } from 'react'
import { initGame, destroyGame } from '../game/engine'
import RecipeBook from './RecipeBook'

/**
 * Gameplay Component (16:9 ratio)
 * Owns the canvas and manages the game engine lifecycle
 */
export default function Gameplay() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showRecipeBook, setShowRecipeBook] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    
    // Pass callback to handle recipe book tile clicks
    const cleanup = initGame(canvas, {
      onRecipeBookClick: () => {
        console.log('Recipe book clicked!')
        setShowRecipeBook(true)
      }
    })

    const onResize = () => {
      // Canvas fills the 16:9 wrapper
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cleanup?.()
      destroyGame()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        background: '#eee',
        display: 'grid',
        placeItems: 'center',
        position: 'relative' // IMPORTANT: for absolute positioning of overlay
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          cursor: 'pointer',
          display: 'block'
        }}
      />
      
      {/* Recipe Book Overlay */}
      {showRecipeBook && (
        <RecipeBook onClose={() => setShowRecipeBook(false)} />
      )}
    </div>
  )
}