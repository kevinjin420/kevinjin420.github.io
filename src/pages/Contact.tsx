import 'bootstrap-icons/font/bootstrap-icons.css';

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-3xl font-bold mb-8">Find me here!</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://www.linkedin.com/in/kevinjin0420/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-xl transition cursor-pointer">
            <i className="bi bi-linkedin"></i>
          </button>
        </a>

        <a
          href="https://github.com/kevinjin420"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="text-white bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-full text-xl transition cursor-pointer">
            <i className="bi bi-github"></i>
          </button>
        </a>

        <a
          href="https://www.strava.com/athletes/88052186"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="text-white bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full text-xl transition cursor-pointer">
            <i className="bi bi-strava"></i>
          </button>
        </a>

        <a
          href="mailto:kevinjin0420@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="text-white bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-xl transition cursor-pointer">
            <i className="bi bi-envelope"></i>
          </button>
        </a>
      </div>
    </div>
  )
}

export default Contact
