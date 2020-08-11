import { useEffect, useState } from 'react';

export const useImage = (
  src: string,
): [HTMLImageElement | null, (image: HTMLImageElement) => void] => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const windowImage = new Image();
    windowImage.src = src;
    windowImage.addEventListener('load', () => setImage(windowImage));
    return (): void => {
      windowImage.removeEventListener('load', () => setImage(windowImage));
    };
  }, [src]);

  return [image, setImage];
};
