import React , { useEffect } from 'react';
// @ts-expect-error stupid d.ts not recognized :)))))))))))))))
import { initScene } from '../components/home';

const HomePage: React.FC = () => {
  useEffect(() => {
    const cleanup = initScene();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div>
      <canvas className='webgl'></canvas>
    </div>
  );
};

export default HomePage;
