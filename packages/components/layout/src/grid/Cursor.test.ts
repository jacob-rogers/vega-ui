import { Cursor } from './Cursor';

describe('Cursor', () => {
  let cursor: Cursor;

  beforeEach(() => {
    cursor = Cursor.create();
  });

  test('указывает на корень по умолчанию', () => {
    expect(cursor.index()).toBe(0);
  });

  test('clone', () => {
    const clone = cursor.clone();
    expect(cursor).not.toBe(clone);
    expect(cursor.index()).toBe(clone.index());

    clone.to(1);
    expect(cursor.index()).not.toBe(clone.index());
  });

  test('left', () => {
    expect(cursor.left()).toBe(1);
    expect(cursor.to(1).left()).toBe(3);
  });

  test('right', () => {
    expect(cursor.right()).toBe(2);
    expect(cursor.to(2).right()).toBe(6);
  });

  describe('isRight / isLeft', () => {
    test('корень не должен быть ни правым ни левым', () => {
      cursor.to(0);
      expect(cursor.isLeft()).toBe(false);
      expect(cursor.isRight()).toBe(false);
    });
    test('указывает на левого потомка', () => {
      cursor.to(1);
      expect(cursor.isRight()).toBe(false);
      expect(cursor.isLeft()).toBe(true);
    });
    test('указывает на правого потомка', () => {
      cursor.to(2);
      expect(cursor.isRight()).toBe(true);
      expect(cursor.isLeft()).toBe(false);
    });
  });

  test('parent', () => {
    cursor.to(1);
    expect(cursor.parent()).toBe(0);
    cursor.to(2);
    expect(cursor.parent()).toBe(0);
  });

  test('sibling', () => {
    cursor.to(1);
    expect(cursor.sibling()).toBe(2);
    cursor.to(2);
    expect(cursor.sibling()).toBe(1);
  });

  describe('перемещение курсора', () => {
    test('к левому потомку', () => {
      cursor.to(0);
      expect(cursor.toLeft().index()).toBe(1);
      expect(cursor.index()).toBe(0);
    });
    test('к правому потомку', () => {
      cursor.to(0);
      expect(cursor.toRight().index()).toBe(2);
      expect(cursor.index()).toBe(0);
    });
    test('к родителю', () => {
      cursor.to(1);
      expect(cursor.toParent().index()).toBe(0);
      expect(cursor.index()).toBe(1);
    });
    test('к соседнему элементу', () => {
      cursor.to(1);
      expect(cursor.toSibling().index()).toBe(2);
      expect(cursor.index()).toBe(1);
    });
  });
});
