import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "../components/Card";

function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <img
        src="/banner28.png"
        alt="Banner"
        className="w-full h-48 md:h-52 object-cover"
      />
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
            <img
              src="/portrait.png"
              alt="Profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-slate-50 dark:border-slate-900"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">About Me</h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
                Hi, I’m Shengran Jin, but you can call me Kevin! I’m a student
                at the University of Michigan College of Engineering, double
                majoring in Computer Engineering and Data Science. I am expected
                to graduate in 2028.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
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
              { icon: "bi-telephone", tooltip: "(240) 756-8098" },
              {
                href: "mailto:kevinjin0420@gmail.com",
                icon: "bi-envelope",
                tooltip: "kevinjin0420@gmail.com",
              },
            ].map(({ href, icon, tooltip }, i) => (
              <div key={i} className="relative group">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${!href && "cursor-default"} 
                    text-slate-500 dark:text-slate-400 
                    hover:text-sky-500 dark:hover:text-sky-400 transition-colors
                  `}
                >
                  <i className={`bi ${icon} text-2xl md:text-3xl`} />
                </a>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {tooltip}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <Card
              imagePath="/wiring_photo.jpg"
              imageAlign="left"
              altText="Wiring setup"
              text="I'm passionate about hardware, software, and bridging the gap between the two worlds. Beyond studying Computer Engineering and Data Science, I explore Mechanical and Electrical Engineering—building custom wiring for 3D printers and drones, and designing components in Fusion360 and Solidworks"
            />
            <Card
              imagePath="/rover_photo.png"
              imageAlign="left"
              altText="Mars Rover"
              text="I am currently the Teleoperations Lead for the Michigan Mars Rover Team. The Teleoperations subteam is responsible for the frontend and backend that allows the operator to control the rover. A big part of my role is to encourage collaboration, as well as ensure ease of operation while guaranteeing reliability"
            />
            <Card
              imagePath="/bike_photo.jpg"
              imageAlign="left"
              altText="Cycling photo"
              text="I'm an avid cyclist! I grew up cycling in Beijing and have continued ever since attending high school in Bethesda, Maryland. I own a Giant Revolt gravel bike and have clocked nearly 10,000 kilometers on Strava, with 4,100 of those cycled in 2022."
            />
            <Card
              imagePath="/mint_desktop.png"
              imageAlign="left"
              altText="Cycling photo"
              text="I love Linux! I started using Linux during my freshman year of college, and has found the experience incredibly rewarding. I have tried several distributions and desktop environments, and I am currently on Linux Mint XFCE"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
