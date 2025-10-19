import React from 'react'
import Gameplay from './components/Gameplay'

export default function App() {
  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'100vh', background:'#fff'}}>
      {/* Top bars / other UI can live above this later */}
      <Gameplay />
    </div>
  )
}
