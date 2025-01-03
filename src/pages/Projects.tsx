import '../App.css';
import ProjectCard from '../components/ProjectCard';
import dronePhoto from '../assets/drone_photo.jpg';
import roverPhoto from '../assets/rover_photo.png';



function Projects() {


  return (
    <div className="min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Here are some projects that I've worked on in my spare time!</h2>
      <div>
        <ProjectCard
          imagePath={roverPhoto}
          imageAlign="left"
          altText="Drone"
          title="MRover Teleoprations"
          text="Developing the frontend service for smooth and intuitive operation and remote control of the Rover, using Vue.js and JavaScript with Python and C++ for backend integration. "
          tags={['Vue.js', 'Javascript', 'Python', 'C++']}
          buttonPresent={true}
          buttonText='View Github Repo'
          buttonUrl="https://github.com/umrover/mrover-ros2/wiki"
        />
      </div>
      <div>
        <ProjectCard
          imagePath={dronePhoto}
          imageAlign="right"
          altText="Drone"
          title="FPV Drone Build"
          text="Built an FPV drone from scratch, learning soldering, designing vibration-dampening housings in Fusion360, and configuring communication via serial ports and LUA scripting. The drone has captured scenic footage and contributed to a high school film production."
          tags={['Soldering', 'CAD', 'LUA', 'Video Production']}
          buttonPresent={false}
          buttonText='none'
          buttonUrl='none'
        />
      </div>
    </div>
  )
}

export default Projects