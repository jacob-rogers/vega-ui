import { ScreenSaverService } from './ScreenSaverService';

describe('ScreenSaverService', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('saverScreenId: устанавливает и добавляет к ключам', () => {
    const screenSaverService = new ScreenSaverService();

    const savedScreenIds = ['test-1', 'test-2', 'test-3', undefined];

    savedScreenIds.forEach((id) => {
      screenSaverService.setSavedScreenId(id);

      screenSaverService.setCanvasScale(1);
      screenSaverService.setCanvasScrollPosition({ x: 1, y: 1 });

      expect(screenSaverService.getCanvasScale()).toStrictEqual('1');
      expect(screenSaverService.getCanvasScrollPosition()).toStrictEqual(
        JSON.stringify({ x: 1, y: 1 }),
      );
    });
  });

  test('Проставляет значения без savedScreenId', () => {
    const screenSaverService = new ScreenSaverService();

    const position = { x: 0, y: 0 };

    screenSaverService.setCanvasScrollPosition(position);
    screenSaverService.setCanvasScale(1);

    expect(screenSaverService.getCanvasScrollPosition()).toStrictEqual(JSON.stringify(position));
    expect(screenSaverService.getCanvasScale()).toStrictEqual('1');
  });
});
