import React from 'react'

interface MenuProps {
  onPlayClick: () => void
  onTestLLMClick: () => void
  onLeaderboardClick: () => void
}

/**
 * Bottom slice of the menu screen — fills 9fr row (16:9)
 */
export default function Menu({ onPlayClick, onTestLLMClick, onLeaderboardClick }: MenuProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#d1f9ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 4rem)',
          fontWeight: 'bold',
          color: '#2c3e50',
          margin: '0 0 1rem',
          fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        CAFE LLM
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: 'min(62%, 360px)',
        }}
      >
        <button
          onClick={onPlayClick}
          style={{
            padding: '1.1rem 1.4rem',
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            fontWeight: 'bold',
            background: '#4CAF50',
            color: 'white',
            border: '3px solid #2e7d32',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.background = '#66BB6A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = '#4CAF50'
          }}
        >
          PLAY
        </button>

        <button
          onClick={onTestLLMClick}
          style={{
            padding: '1.1rem 1.4rem',
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            fontWeight: 'bold',
            background: '#2196F3',
            color: 'white',
            border: '3px solid #1565C0',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.background = '#42A5F5'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = '#2196F3'
          }}
        >
          TEST LLM
        </button>

        <button
          onClick={onLeaderboardClick}
          style={{
            padding: '1.1rem 1.4rem',
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            fontWeight: 'bold',
            background: '#FF9800',
            color: 'white',
            border: '3px solid #E65100',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.background = '#FFA726'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = '#FF9800'
          }}
        >
          LEADERBOARD
        </button>
      </div>
    </div>
  )
}
