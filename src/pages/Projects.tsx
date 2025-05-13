import Card from '../components/Card';
import dronePhoto from '../assets/drone_photo.jpg';
import roverPhoto from '../assets/rover_photo.png';
import Three from '../components/three';
import RoverThree from '../components/rover-three';

function Projects() {
	return (
		<div className="flex flex-col items-center">
		<h1 className="font-bold mb-4">My Projects</h1>
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
		<div>
			<Card
			imagePath={dronePhoto}
			imageAlign="right"
			altText="Drone"
			title="FPV Drone Build"
			text="Built an FPV drone from scratch, learning soldering, designing vibration-dampening housings in Fusion360, and configuring communication via serial ports and LUA scripting. The drone has captured scenic footage and contributed to a high school film production."
			tags={['Soldering', 'CAD', 'LUA', 'Video Production']}
			/>
		</div>
		<div>
			<Three />
			<RoverThree />
		</div>
		</div>
	)
}

export default Projects