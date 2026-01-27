export interface ModelConfig {
  urdfPath: string
  position: [number, number, number]
  rotation: [number, number, number]
}

export interface SectionTarget {
  name: string
  label?: string
  description?: string
  camera: { x: number; y: number; z: number }
  lookAt: { x: number; y: number; z: number }
  model?: ModelConfig
}

export interface Branch {
  name: string
  color: string
  accent: string
  sections: SectionTarget[]
}

export const BRANCH_SPACING = 800

const BRANCH_DEFINITIONS: Branch[] = [
  {
    name: 'Intro',
    color: '#1a1a2e',
    accent: '#e94560',
    sections: [
      {
        name: 'hero',
        label: 'Kevin J.',
        camera: { x: 0, y: 200, z: 600 },
        lookAt: { x: 0, y: 0, z: 0 },
        model: {
          urdfPath: '/urdf/rover/rover.urdf',
          position: [0, -35, 0],
          rotation: [0, -Math.PI / 3, 0],
        },
      },
      {
        name: 'welcome',
        label: 'Welcome to my website',
        camera: { x: 0, y: 80, z: 350 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
    ],
  },
  {
    name: 'About',
    color: '#16213e',
    accent: '#0f94d2',
    sections: [
      {
        name: 'hardware',
        label: 'Hardware & Software',
        description:
          "I'm passionate about hardware, software, and bridging the gap between the two worlds. Beyond studying Computer Engineering and Data Science, I explore Mechanical and Electrical Engineering\u2014building custom wiring for 3D printers and drones, and designing components in Fusion360 and Solidworks",
        camera: { x: -200, y: 70, z: 220 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
      {
        name: 'mrover',
        label: 'Mars Rover Team',
        description:
          'I am currently the Teleoperations Lead for the Michigan Mars Rover Team. The Teleoperations subteam is responsible for the frontend and backend that allows the operator to control the rover. A big part of my role is to encourage collaboration, as well as ensure ease of operation while guaranteeing reliability',
        camera: { x: 0, y: 70, z: 220 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
      {
        name: 'cycling',
        label: 'Cycling',
        description:
          "I'm an avid cyclist! I grew up cycling in Beijing and have continued ever since attending high school in Bethesda, Maryland. I own a Giant Revolt gravel bike and have clocked nearly 10,000 kilometers on Strava, with 4,100 of those cycled in 2022.",
        camera: { x: 200, y: 70, z: 220 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
      {
        name: 'linux',
        label: 'Linux',
        description:
          'I love Linux! I started using Linux during my freshman year of college, and has found the experience incredibly rewarding. I have tried several distributions and desktop environments, and I am currently on Linux Mint XFCE',
        camera: { x: 400, y: 70, z: 220 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
    ],
  },
  {
    name: 'Projects',
    color: '#0a0a14',
    accent: '#e94560',
    sections: [
      {
        name: 'mrover-gui',
        label: 'Michigan Mars Rover Team',
        description:
          'Developed the frontend interface using Vue.js, Bootstrap, and JavaScript for the ground station control system. Integrated and tested software with the Python and C++ based ROS2 backend.',
        camera: { x: -150, y: 70, z: 200 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
      {
        name: 'fpv-drone',
        label: 'FPV Drone Build',
        description:
          'Built a 5-inch FPV drone from scratch, learning to solder components, design vibration-dampening housings in Fusion360, and configure flight software via serial ports and LUA scripting.',
        camera: { x: 150, y: 70, z: 200 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
    ],
  },
  {
    name: 'Contact',
    color: '#1a1a2e',
    accent: '#e94560',
    sections: [
      {
        name: 'contact',
        label: 'Get in Touch',
        camera: { x: 0, y: 100, z: 300 },
        lookAt: { x: 0, y: 20, z: 0 },
      },
    ],
  },
]

function offsetSections(sections: SectionTarget[], yOffset: number): SectionTarget[] {
  return sections.map((s) => ({
    ...s,
    camera: { ...s.camera, y: s.camera.y + yOffset },
    lookAt: { ...s.lookAt, y: s.lookAt.y + yOffset },
    model: s.model
      ? {
          ...s.model,
          position: [s.model.position[0], s.model.position[1] + yOffset, s.model.position[2]] as [
            number,
            number,
            number,
          ],
        }
      : undefined,
  }))
}

export const BRANCHES: Branch[] = BRANCH_DEFINITIONS.map((branch, i) => ({
  ...branch,
  sections: offsetSections(branch.sections, -BRANCH_SPACING * i),
}))

export const ALL_SECTIONS = BRANCHES.flatMap((b) => b.sections)
export const TOTAL_SECTIONS = ALL_SECTIONS.length

export function getAllModels(): { section: SectionTarget; branchIndex: number }[] {
  const models: { section: SectionTarget; branchIndex: number }[] = []
  BRANCHES.forEach((branch, branchIndex) => {
    branch.sections.forEach((section) => {
      if (section.model) {
        models.push({ section, branchIndex })
      }
    })
  })
  return models
}
