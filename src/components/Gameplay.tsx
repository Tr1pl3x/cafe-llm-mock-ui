import React, { useEffect, useRef } from 'react'
import { initGame, destroyGame } from '../game/engine'

/**
 * This is the "Gameplay Component" box from your layout.
 * It owns the canvas and starts/stops the game engine.
 */
export default function Gameplay() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const cleanup = initGame(canvas) // start engine

    // Resize handling (fill the box 16:9 like your prototype)
    const onResize = () => {
      // parent is a 16:9 box via CSS; canvas fills it with width/height 100%
      // (canvas' internal size is fixed in engine)
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
        width: '60vw',
        aspectRatio: '16 / 9',
        maxHeight: '90vh',
        background: '#eee',
        display: 'grid',
        placeItems: 'center'
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
    </div>
  )
}
