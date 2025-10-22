import React from 'react'

/**
 * Top slice of the game screen — fills 3fr row (16:3)
 * Will host Food Queue and In-Game Info later
 */
export default function Header() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#00e5ff', // cyan
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Blank for now */}
    </div>
  )
}
