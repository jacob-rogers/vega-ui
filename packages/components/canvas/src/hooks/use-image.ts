import { useEffect, useState } from 'react';

export const useImage = (
  src: string,
): [HTMLImageElement | null, (image: HTMLImageElement) => void] => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const updateImage = (e: Event): void => {
    if (e.target instanceof HTMLImageElement) {
      setImage(e.target);
    }
  };

  useEffect(() => {
    const windowImage = new Image();
    windowImage.addEventListener('load', updateImage);
    windowImage.src = src;
    return (): void => {
      windowImage.removeEventListener('load', updateImage);
    };
  }, [src]);

  return [image, setImage];
};
