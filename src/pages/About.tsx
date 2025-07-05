import portrait from '../assets/portrait.png';
import ume from '../assets/banner28.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from '../components/Card';
import bikePhoto from '../assets/bike_photo.jpg';
import wiringPhoto from '../assets/wiring_photo.jpg';
import roverPhoto from '../assets/rover_photo.png';

function About() {
  return (
    <div className="flex flex-col items-center w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Banner */}
      <img
        src={ume}
        alt="Banner"
        className="w-full h-[210px] object-cover"
      />

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 px-6 mt-6 max-w-5xl">
        <img
          src={portrait}
          alt="Profile"
          className="w-[150px] h-[150px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Hi, I’m Shengran Jin, but call me Kevin! I’m a student at the University of Michigan 
            College of Engineering, double majoring in Computer Engineering and Data Science. 
            I am expected to graduate by 2028. 
          </p>
        </div>
      </div>

      {/* Socials */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 mb-10">
        {/* Tooltip Wrapper */}
        {[
          {
            href: "https://www.linkedin.com/in/kevinjin0420/",
            icon: "bi-linkedin",
            tooltip: "LinkedIn",
          },
          {
            href: "https://github.com/kevinjin420",
            icon: "bi-github",
            tooltip: "GitHub",
          },
          {
            icon: "bi-telephone",
            tooltip: "(240) 756-8098",
          },
          {
            href: "mailto:kevinjin0420@gmail.com",
            icon: "bi-envelope",
            tooltip: "Email kevinjin0420@gmail.com",
          },
        ].map(({ href, icon, tooltip }, i) => (
          <div key={i} className="relative group">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                <i className={`bi ${icon} text-3xl hover:text-blue-800 transition cursor-pointer`} />
              </a>
            ) : (
              <i className={`bi ${icon} text-3xl`} />
            )}
            <span className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              {tooltip}
            </span>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-10 px-4 pb-20 max-w-5xl w-full">
        <Card
          imagePath={wiringPhoto}
          imageAlign="left"
          altText="Wiring setup"
          text="I'm passionate for both hardware and software development, and beyond my coursework and personal projects in Computer Engineering and Data Science, I also possess interests and knowledge in Mechanical and Electrical engineering. I've built custom wiring for my 3D printers and drones, and also use Fusion360 and Solidworks to build, test, and manufacture supporting components via a 3D printer."
        />
        <Card
          imagePath={roverPhoto}
          imageAlign="right"
          altText="Mars Rover"
          text="I'm a member of the Michigan Mars Rover Team, a student organization at the University of Michigan that designs, builds, and tests a Mars rover to compete in the University Rover Challenge. I am currently working on the Software team, designing and building the frontend service for smooth and intuitive operation and remote control of the Rover. My time on the team has been incredibly rewarding, and has taught me a lot about collaborative coding."
        />
        <Card
          imagePath={bikePhoto}
          imageAlign="left"
          altText="Cycling photo"
          text="I'm an avid cyclist! I have cycled throughout my childhood growing up in Beijing, China, and have been cycling in the US ever since high school, which I attended in Bethesda, Maryland. I own a Giant Revolt gravel bike, and have clocked nearly 10,000 kilometers on Strava, with 4,100 kilometers cycled in 2022."
        />
      </div>
    </div>
  );
}

export default About;
