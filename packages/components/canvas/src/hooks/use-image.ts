import { useEffect, useState } from 'react';

type Status = 'loading' | 'loaded' | 'failed';

type State = {
  image?: HTMLImageElement;
  status: Status;
};

const defaultState: State = { image: undefined, status: 'loading' };

export const useImage = (
  src: string,
  crossOrigin?: string,
): [HTMLImageElement | undefined, Status] => {
  const [state, setState] = useState(defaultState);

  const { image, status } = state;

  useEffect(() => {
    const img = document.createElement('img');

    const onLoad = (): void => {
      setState({ image: img, status: 'loaded' });
    };

    const onError = (): void => {
      setState({ image: undefined, status: 'failed' });
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    img.src = src;

    return (): void => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, crossOrigin]);

  return [image, status];
};
