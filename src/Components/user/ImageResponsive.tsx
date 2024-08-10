import React, { useState } from 'react';
import {Card, Skeleton} from "@nextui-org/react";


interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={` relative h-500px  ${className || ''}`}>
      {isLoading && (
        <Card className="w-full h-500px object-cover  space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
        </Card>)}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto object-cover  transition-opacity duration-300 rounded-3xl ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ResponsiveImage;
