import React from "react";

interface CardProps {
  imagePath: string;
  imageAlign: "left" | "right";
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
      className={`flex flex-col md:flex-row max-w-7xl items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
        ${imageAlign === "right" ? "md:flex-row-reverse" : "md:flex-row"} `}
    >
      {/* Image Section */}
      <img
        src={imagePath}
        alt={altText}
        className="w-full md:w-1/2 object-cover rounded-xl"
      />

      {/* Text Section */}
      <div className="w-full md:w-1/2 p-6">
        {title && (
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            {title}
          </h2>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-700 dark:text-gray-300 mb-4">{text}</p>

        {buttonText && buttonUrl && (
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
