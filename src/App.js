import React from 'react'

// Components

import { InventoryProvider } from './contexts/InventoryContext'
import AppScreen from './components/AppScreen'
// import AppState from './components/AppState'

// Assets

import './App.css'

function App() {
  return (
    <div className="App">
      <InventoryProvider>
        <AppScreen />
      </InventoryProvider>
    </div>
  )
}

export default App
