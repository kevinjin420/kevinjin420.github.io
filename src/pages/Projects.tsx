import React from 'react';
import Card from '../components/Card';

const ProjectPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        
        <h1 className="mb-12 text-center text-4xl font-bold text-slate-800 dark:text-slate-200 sm:text-5xl">
          My Projects
        </h1>

        <div className="flex flex-col gap-12 sm:gap-16">
          <Card
            imagePath="/mrover-gui.png"
            imageAlign="left"
            altText="MRover"
            title="Michigan Mars Rover Team"
            text="Developed the frontend interface using Vue.js, Bootstrap, and JavaScript for the ground station control system. Integrated and tested software with the Python and C++ based ROS2 backend."
            tags={['Vue.js', 'JavaScript', 'Bootstrap', 'Python', 'C++']}
            buttonText="View GitHub Repo"
            buttonUrl="https://github.com/umrover/mrover-ros2/"
          />
          <Card
            imagePath="/drone_photo.jpg"
            imageAlign="right"
            altText="Drone"
            title="FPV Drone Build"
            text="Built a 5-inch FPV drone from scratch, learning to solder components, design vibration-dampening housings in Fusion360, and configure flight software via serial ports and LUA scripting."
            tags={['Soldering', 'CAD', 'LUA', 'Video Production']}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;