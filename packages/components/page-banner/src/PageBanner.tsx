import * as React from 'react';
import { block } from 'bem-cn';

import './PageBanner.css';

export type PageBannerProps = {
  className?: string;
  title?: string;
  description?: string;
  testId?: string;
};

const cnPageBanner = block('VegaPageBanner');

export const PageBanner: React.FC<PageBannerProps> = ({
  className,
  title,
  description,
  testId,
}) => {
  return (
    <header className={cnPageBanner.mix(className)} data-testid={testId && `${testId}:header`}>
      <div className={cnPageBanner('Content')}>
        {title && (
          <h1
            className={cnPageBanner('Title')}
            title={title}
            data-testid={testId && `${testId}:title`}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={cnPageBanner('Description')}
            title={description}
            data-testid={testId && `${testId}:description`}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
};
