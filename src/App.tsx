import React, { useState } from 'react'
import MenuHeader from './components/MenuHeader'
import Menu from './components/Menu'
import Header from './components/GameHeader'
import Gameplay from './components/Gameplay'
import DifficultySelect from './components/DifficultySelect'

type Screen = 'menu' | 'game'
type Difficulty = 'easy' | 'medium' | 'hard'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu')
  const [showDifficultySelect, setShowDifficultySelect] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)

  const handlePlayClick = () => {
    setShowDifficultySelect(true)
  }

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    setShowDifficultySelect(false)
    setCurrentScreen('game')
    console.log(`Difficulty selected: ${selectedDifficulty}`)
  }

  const handleTestLLMClick = () => console.log('TEST LLM clicked - to be implemented')
  const handleLeaderboardClick = () => console.log('Leaderboard clicked - to be implemented')

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#f0f0f0',
      }}
    >
      <div
        style={{
          aspectRatio: '16 / 11',
          width: 'min(94vw, calc(94vh * (16 / 12)))',
          height: 'auto',
          maxHeight: '94vh',
          display: 'grid',
          gridTemplateRows: '2fr 9fr',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        {currentScreen === 'menu' ? (
          <>
            <MenuHeader />
            <Menu
              onPlayClick={handlePlayClick}
              onTestLLMClick={handleTestLLMClick}
              onLeaderboardClick={handleLeaderboardClick}
            />
          </>
        ) : (
          <>
            <Header />
            <Gameplay />
          </>
        )}
      </div>

      {/* Difficulty Selection Popup */}
      {showDifficultySelect && (
        <DifficultySelect onSelect={handleDifficultySelect} />
      )}
    </div>
  )
}