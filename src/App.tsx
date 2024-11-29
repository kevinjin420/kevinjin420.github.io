import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 pt-20"> {/* Added padding-top and container */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-center mb-6">Vite + React (running)</h1>
        <div className="card flex flex-col items-center">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
