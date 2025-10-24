import React, { useState } from 'react'
import MenuHeader from './components/MenuHeader'
import Menu from './components/Menu'
import Header from './components/GameHeader'
import Gameplay from './components/Gameplay'
import { getKitchenMapOrganized } from './api/map'
import type { OrganizedMapData } from './utils/mapUtils'

type Screen = 'menu' | 'game'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu')
  const [mapData, setMapData] = useState<OrganizedMapData | null>(null)
  const [loadingMap, setLoadingMap] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handlePlayClick = async () => {
    setLoadingMap(true)
    try {
      const organized = await getKitchenMapOrganized()
      setMapData(organized)
      setCurrentScreen('game')
    } catch (err: any) {
      console.error(err)
      showToast('Failed to load kitchen map')
      setCurrentScreen('menu')
    } finally {
      setLoadingMap(false)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f0f0f0' }}>
      <div style={{
        aspectRatio: '16 / 11',
        width: 'min(94vw, calc(94vh * (16 / 12)))',
        maxHeight: '94vh',
        display: 'grid',
        gridTemplateRows: '2fr 9fr',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        background: '#ffffff',
        position: 'relative'
      }}>
        {currentScreen === 'menu' ? (
          <>
            <MenuHeader />
            <Menu
              onPlayClick={handlePlayClick}
              onTestLLMClick={() => console.log('TEST LLM clicked')}
              onLeaderboardClick={() => console.log('Leaderboard clicked')}
            />
          </>
        ) : (
          <>
            <Header />
            <Gameplay mapData={mapData} />
          </>
        )}

        {loadingMap && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
            display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700
          }}>Loading kitchen map…</div>
        )}

        {toast && (
          <div role="alert"
            onClick={() => setToast(null)}
            style={{
              position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
              background: '#ffebee', color: '#b71c1c', border: '2px solid #ef9a9a',
              borderRadius: 10, padding: '10px 14px', fontWeight: 700,
              boxShadow: '0 6px 24px rgba(0,0,0,.15)', cursor: 'pointer', zIndex: 9999
            }}
          >
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}
