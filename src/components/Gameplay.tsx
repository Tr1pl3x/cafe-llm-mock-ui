import React, { useEffect, useRef } from 'react'
import { initGame, destroyGame } from '../game/engine'

/**
 * Bottom slice of the game screen — fills 9fr row (16:9)
 * Owns the canvas and game engine lifecycle
 */
export default function Gameplay() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const cleanup = initGame?.(canvas)
    return () => {
      cleanup?.()
      destroyGame?.()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        height: '100%',
        background: '#eee',
        display: 'grid',
        placeItems: 'center',
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
    </div>
  )
}
