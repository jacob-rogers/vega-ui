import { HotkeyData } from './types';

export const hotkeys: HotkeyData[] = [
  {
    keys: [['ЛКМ']],
    description: 'Выделение области',
  },
  {
    keys: [['Shift', 'ЛКМ']],
    description: 'Выделение нескольких элементов',
  },
  {
    keys: [['H']],
    description: 'Переключение режима "лапка" и "стрелка"',
  },
  {
    keys: [['Ctrl', '0']],
    description: 'Возврат масштаба к 100%',
  },
  {
    keys: [['Ctrl', '+']],
    description: 'Увеличение масштаба',
  },
  {
    keys: [['Ctrl', '-']],
    description: 'Уменьшение масштаба',
  },
  {
    keys: [['Ctrl', 'Scroll']],
    description: 'Изменение масштаба',
  },
  {
    keys: [['Alt', 'Scroll']],
    description: 'Горизонтальная прокрутка',
  },
  {
    keys: [['←'], ['→'], ['↑'], ['↓'], ['Зажать колеcо мыши'], ['Пробел', 'ЛКМ']],
    description: 'Перемещение по канвасу / Перемещение выделенного элемента',
  },
];
