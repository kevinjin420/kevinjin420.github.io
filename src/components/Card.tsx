import React from 'react';
import './Card.css';

interface CardProps {
  imagePath: string;
  imageAlign: 'left' | 'right';
  altText: string;
  text: string;

  title?: string;
  tags?: string[];
  buttonText?: string;
  buttonUrl?: string;
}

const Card: React.FC<CardProps> = ({
  imagePath,
  imageAlign,
  altText,
  text,
  title,
  tags,
  buttonText,
  buttonUrl,
}) => {
  return (
    <div
      className="horizontal-card"
      style={{ flexDirection: imageAlign === 'left' ? 'row' : 'row-reverse' }}
    >
      <img className="card-image" src={imagePath} alt={altText} />
      <div className="card-text-section">
        {title && <h2 className="card-title">{title}</h2>}

        {tags && tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="card-text">{text}</p>

        {buttonText && buttonUrl && (
          <a
            href={buttonUrl}
            className="card-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
