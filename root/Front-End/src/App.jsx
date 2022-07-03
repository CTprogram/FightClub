import { useEffect, useState } from 'react'
import logo from './logo.svg'
import Game from './components/game/Game';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Game/>
    </div>
  )
}

export default App
