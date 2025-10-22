import React, { useEffect, useState } from 'react'

interface DifficultySelectProps {
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void
}

/**
 * Difficulty Selection Popup
 * Appears after clicking PLAY button
 */
export default function DifficultySelect({ onSelect }: DifficultySelectProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleSelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Trigger fade-out animation
    setIsVisible(false)
    // Wait for animation to complete before calling onSelect
    setTimeout(() => onSelect(difficulty), 300)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {/* Difficulty Selection Box */}
      <div
        style={{
          background: '#ffffff',
          padding: '3rem 4rem',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.1s ease-in-out'
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: 0,
            fontFamily: 'system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          Select Difficulty
        </h2>

        {/* Difficulty Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            width: '320px'
          }}
        >
          {/* Easy Button */}
          <button
            onClick={() => handleSelect('easy')}
            style={{
              padding: '1.3rem 2rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: '#4CAF50',
              color: 'white',
              border: '3px solid #2e7d32',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
              textTransform: 'uppercase'
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
            Easy
          </button>

          {/* Medium Button */}
          <button
            onClick={() => handleSelect('medium')}
            style={{
              padding: '1.3rem 2rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: '#FF9800',
              color: 'white',
              border: '3px solid #E65100',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
              textTransform: 'uppercase'
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
            Medium
          </button>

          {/* Hard Button */}
          <button
            onClick={() => handleSelect('hard')}
            style={{
              padding: '1.3rem 2rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: '#F44336',
              color: 'white',
              border: '3px solid #C62828',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.background = '#EF5350'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.background = '#F44336'
            }}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  )
}