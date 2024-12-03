import '../App.css'
import portrait from '../assets/portrait.png';
import banner from '../assets/sky.png';

function About() {

  return (
    <div className="content" >
        {/* banner */}
        <img
          src={banner}
          className='banner'
          alt="Banner"
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
          }}
        />

      {/* pfp and about */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 20px 40px' }}>
        <img
          src={portrait}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginRight: '20px',
          }}
        />
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>About Me</h2>
          <p>
            Hi, I’m Shengran Jin, but call me Kevin! I’m a student at the University of Michigan 
            College of Engineering, double majoring in Computer Engineering and Data Science. 
          </p>
        </div>
      </div>

      {/* Photos Section */}
      <div style={{ margin: '0 20px 40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Gallery</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center'}}>
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#ddd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
              }}
            >
              <span>Photo {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Section */}
      <div style={{ margin: '0 20px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>More About Me</h2>
        <p>
          e
        </p>
      </div>
    </div>
  )
}

export default About