import React from 'react';

interface HorizontalCardProps {
  imagePath: string;
  imageAlign: 'left' | 'right';
  altText: string;
  title: string; // Project title
  text: string; // Description of the project
  tags: string[]; // Array of tags for skills or technologies
  buttonPresent: boolean;
  buttonText: string; // Text for the button
  buttonUrl: string; // URL for the button
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ imagePath, imageAlign, altText, title, text, tags, buttonPresent, buttonText, buttonUrl }) => {
  return (
    <div
      style={{
        ...styles.container,
        flexDirection: imageAlign === 'left' ? 'row' : 'row-reverse', // Adjust flex direction based on alignment
      }}
    >
      <img src={imagePath} alt={altText} style={styles.image} />
      <div style={styles.textSection}>
        <h2 style={styles.title}>{title}</h2>
        <div style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <p style={styles.text}>{text}</p>
        {buttonPresent === true ? (
        <a href={buttonUrl} style={styles.button} target="_blank" rel="noopener noreferrer">
          {buttonText}
        </a>
        ) : null }
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '30px',
  },
  image: {
    width: '40%',
    maxWidth: '500px',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
    alignItems: 'center',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  text: {
    margin: '10px 0 10px 0',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#333',
  },

  button: {
    justifyContent: "center",
    display: "inline-block",
    padding: "8px 15px", 
    backgroundColor: "#007BFF",
    color: "#fff", 
    textDecoration: "none",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold", 
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "fit-content",
    marginTop: "10px",
  },
};

export default HorizontalCard;
