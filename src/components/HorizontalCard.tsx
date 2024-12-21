import React from 'react';

interface HorizontalCardProps {
    imagePath: string;
    imageAlign: 'left' | 'right';
    altText: string;
    text: string;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ imagePath, imageAlign, altText, text }) => {
  return (
    <div
      style={{
        ...styles.container,
        flexDirection: imageAlign === 'left' ? 'row' : 'row-reverse', // Adjust flex direction based on alignment
      }}
    >
      <img src={imagePath} alt={altText} style={styles.image} />
      <p style={styles.text}>{text}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem', // Adds space between the image and the paragraph
    margin: '30px'
  },
  image: {
    width: '40%', // Let the image take up the full width of its container
    maxWidth: '500px', // Limit the maximum width for better control
    height: 'auto', // Maintain aspect ratio
    objectFit: 'cover',
    borderRadius: '8px', // Optional: rounded corners
  },
  text: {
    margin: 0,
    fontSize: '1rem',
    lineHeight: 1.5,
    justifyContent: 'center', // Centers text horizontally
  },
};

export default HorizontalCard;
