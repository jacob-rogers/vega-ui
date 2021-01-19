# @gpn-prototypes/vega-page-banner

Компонент "Баннер страницы"

<img src="docs/page-banner.jpg" />

### Примеры использования

```jsx
import { PageBanner } from '@gpn-prototypes/vega-ui';
export const MyComponent = () => {
  return <PageBanner className="page-teaser" title="Заголовок" description="Описание" />;
};
```

### API

```ts
type PageBannerProps = {
  className?: string;
  title?: string;
  description?: string;
};
```
