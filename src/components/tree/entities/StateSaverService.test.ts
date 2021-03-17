import { StateSaverService } from './StateSaverService';

describe('ScreenSaverService', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('устанавливает и добавляет к ключам значение projectId', () => {
    const stateSaverService = new StateSaverService();

    const projectIds = ['test-1', 'test-2', 'test-3'];

    projectIds.forEach((id) => {
      stateSaverService.setProjectId(id);

      const mockHiddenElements = ['mock id 1', 'mock id 2'];

      stateSaverService.setHiddenElements(mockHiddenElements);

      expect(stateSaverService.getHiddenElements()).toStrictEqual(mockHiddenElements);
    });
  });

  test('Проставляет значения без savedScreenId', () => {
    const stateSaverService = new StateSaverService();

    const mockHiddenElements = ['mock id 1', 'mock id 2'];

    stateSaverService.setHiddenElements(mockHiddenElements);

    expect(stateSaverService.getHiddenElements()).toStrictEqual(mockHiddenElements);
  });
});
