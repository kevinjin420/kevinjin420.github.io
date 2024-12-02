import { useState } from 'react'
import Navbar from '../components/Navbar'
// import About from "./pages/about";
// import Projects from "./pages/projects";
// import { Route, Switch } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0)

  return (

    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 pt-20"> 
      <h1 className="text-center mb-6">Hi, I'm Kevin, </h1>
        <h1 className="text-center mb-6">Welcome to my site!</h1>
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

export default Home
