import React, { useState } from 'react'
import MenuHeader from './components/MenuHeader'
import Menu from './components/Menu'
import Header from './components/Header'
import Gameplay from './components/Gameplay'

type Screen = 'menu' | 'game'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu')

  const handlePlayClick = () => setCurrentScreen('game')
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
      {/* 16:12 outer box that scales to fit the viewport without scrolling */}
      <div
        style={{
          aspectRatio: '16 / 11',
          width: 'min(94vw, calc(94vh * (16 / 12)))',
          height: 'auto',
          maxHeight: '94vh',
          display: 'grid',
          gridTemplateRows: '2fr 9fr', // header/menuHeader (16:2) + body (16:9)
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
    </div>
  )
}
