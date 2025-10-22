import React, { useEffect, useState } from 'react'

interface RecipeBookProps {
  onClose: () => void
}

/**
 * RecipeBook Component - Overlay that appears when clicking the recipe book in-game
 * Shows on top of the gameplay canvas with smooth fade animations
 * 16:9 ratio to match recipe book images
 */
export default function RecipeBook({ onClose }: RecipeBookProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = [
    '/assets/recipe-book/recipe-book-1.png',
    '/assets/recipe-book/recipe-book-2.png',
    '/assets/recipe-book/recipe-book-3.png'
  ]

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    // Trigger fade-out animation
    setIsVisible(false)
    // Wait for animation to complete before actually closing
    setTimeout(() => onClose(), 300)
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={handleClose}
    >
      {/* Recipe Book Container - 16:9 ratio */}
      <div
        style={{
          position: 'relative',
          width: '85%',
          aspectRatio: '16 / 9',
          backgroundImage: `url(${pages[currentPage]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s ease-in-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Top Right) */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            width: '48px',
            height: '48px',
            transition: 'transform 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <img
            src="/assets/ui/cross-button.png"
            alt="Close"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              pointerEvents: 'none'
            }}
          />
        </button>

        {/* Previous Page Button - Fixed position, hidden on first page */}
        {currentPage > 0 && (
          <button
            onClick={handlePrevPage}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: 'calc(1rem + 48px + 0.5rem)', // Right position + next button width + gap
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              width: '48px',
              height: '48px',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <img
              src="/assets/ui/prev-page.png"
              alt="Previous Page"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                pointerEvents: 'none'
              }}
            />
          </button>
        )}

        {/* Next Page Button - Fixed position, hidden on last page */}
        {currentPage < pages.length - 1 && (
          <button
            onClick={handleNextPage}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              width: '48px',
              height: '48px',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <img
              src="/assets/ui/next-page.png"
              alt="Next Page"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                pointerEvents: 'none'
              }}
            />
          </button>
        )}

        {/* Recipe Book Content - Add your recipes here later */}
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '3rem',
            boxSizing: 'border-box',
            overflow: 'auto'
          }}
        >
          {/* Content will go here */}
        </div>
      </div>
    </div>
  )
}