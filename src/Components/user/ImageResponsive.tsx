import React from 'react';


interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}


const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-cover ${className || ''}`}
    />
  );
};


export default ResponsiveImage;
