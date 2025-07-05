import Card from '../components/Card';
import roverPhoto from '../assets/rover_photo.png';
// import Three from '../components/three';
// import RoverThree from '../components/rover-three';

function Projects() {
	return (
		<div className="flex flex-col items-center h-screen bg-blue-950">
			<h1 className="font-bold mb-4 text-6xl text-white p-3 pt-5">My Projects</h1>
			<div>
				<Card
				imagePath={roverPhoto}
				imageAlign="left"
				altText="MRover"
				title="Michigan Mars Rover Team"
				text="Developed the frontend interface using Vue.js, Bootstrap, and JavaScript. Integrated and tested with Python and C++ backend. "
				tags={['Vue.js', 'Javascript', 'Bootstrap', 'Python', 'C++']}
				buttonText='View Github Repo'
				buttonUrl="https://github.com/umrover/mrover-ros2/"
				/>
			</div>
			{/* <div>
				<Three />
				<RoverThree />
			</div> */}
		</div>
	)
}

export default Projects