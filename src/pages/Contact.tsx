import 'bootstrap-icons/font/bootstrap-icons.css';

function Contact() {

    return (
		<div className="flex">
			<h1>Find me here!</h1>
			<div className='socials'>
				<a href="https://www.linkedin.com/in/kevinjin0420/" target="_blank" rel="noopener noreferrer">
					<button className='btn btn-lg btn-secondary'>
						<i className='bi bi-linkedin'></i>
					</button>
				</a>
				<a href="https://github.com/kevinjin420" target="_blank" rel="noopener noreferrer">
					<button className='btn btn-lg btn-secondary'>
						<i className='bi bi-github'></i>
					</button>
				</a>
				<a href="https://www.strava.com/athletes/88052186" target="_blank" rel="noopener noreferrer">
					<button className='btn btn-lg btn-secondary'>
						<i className='bi bi-strava'></i>
					</button>
				</a>
				<a href="mailto:kevinjin0420@gmail.com" target="_blank" rel="noopener noreferrer">
					<button className='btn btn-lg btn-secondary'>
						<i className='bi bi-envelope'></i>
					</button>
				</a>
			</div>
		</div>
    )
  }
  
  export default Contact
  