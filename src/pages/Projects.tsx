import React , { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
// @ts-expect-error stupid d.ts not recognized :)))))))))))))))
import { initScene } from '../components/projects';

const ProjectPage: React.FC = () => {
  useEffect(() => {
    const cleanup = initScene();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div>
			<div id="loader" className="fixed top-0 left-0 w-screen h-screen bg-black text-white flex items-center justify-center text-2xl z-50">
        <PacmanLoader color="#ffffff" size={50} />
			</div>
      <canvas className='webgl'></canvas>
    </div>
  );
};

export default ProjectPage;