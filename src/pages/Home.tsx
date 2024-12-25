import portrait from '../assets/portrait.png';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <img
          src={portrait}
          alt="Profile"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginRight: '20px',
          }}
        />
      <div className="flex-grow container mx-auto px-4 pt-20"> 
      <h2 className="text-center mb-6">Hi, I'm Kevin! Welcome to my personal site!</h2>
      <div className="homebuttons flex justify-center gap-4 mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/about')}
        >
          About
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => navigate('/projects')}
        >
          Projects
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => navigate('/resume')}
        >
          Resume
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => navigate('/contact')}
        >
          Contact
        </button>
      </div>
      </div>
    </div>
  )
}

export default Home
