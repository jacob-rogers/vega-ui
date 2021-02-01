import { useCallback, useEffect, useRef } from 'react';

type Task<T> = T | null;

type TaskAPI<T> = {
  clear: VoidFunction;
  restart: VoidFunction;
  start: VoidFunction;
  flush: VoidFunction;
  task: Task<T>;
};

type CreateTask<T> = (done: VoidFunction) => T;
type CancelTask<T> = (task: T) => void;

type Options = {
  autostart?: boolean;
};

type Props<T> = {
  skip: boolean;
  callback: VoidFunction;
  createTask: CreateTask<T>;
  cancelTask: CancelTask<T>;
  opts?: Options;
};

// istanbul ignore next
const noop = () => {};

function useTask<T>({ skip, callback, createTask, cancelTask, opts }: Props<T>): TaskAPI<T> {
  const { autostart = true } = opts ?? {};

  const callbackRef = useRef(callback);
  const clearRef = useRef(noop);
  const restartRef = useRef(noop);
  const startRef = useRef(noop);
  const task = useRef<Task<T>>(null);

  callbackRef.current = callback;

  useEffect(() => {
    if (skip) {
      return undefined;
    }

    clearRef.current = (): void => {
      if (typeof task.current === 'number') {
        cancelTask(task.current);
        task.current = null;
      }
    };

    startRef.current = (): void => {
      if (task.current) {
        clearRef.current();
      }

      task.current = createTask(() => {
        callbackRef.current();
      });
    };

    restartRef.current = (): void => {
      clearRef.current();
      startRef.current();
    };

    if (autostart) {
      startRef.current();
    }

    return clearRef.current;
  }, [skip, cancelTask, createTask, autostart]);

  return {
    clear: (): void => {
      clearRef.current();
    },
    flush: (): void => {
      callbackRef.current();
      clearRef.current();
    },
    restart: (): void => {
      restartRef.current();
    },
    start: (): void => {
      startRef.current();
    },
    task: task.current,
  };
}

type TimeoutTask = ReturnType<typeof setTimeout>;

export function useTimeout(
  delay: number,
  callback: VoidFunction,
  opts?: Options,
): TaskAPI<TimeoutTask> {
  const createTask = useCallback<CreateTask<TimeoutTask>>(
    (done) => {
      return setTimeout(done, delay);
    },
    [delay],
  );

  const cancelTask = useCallback<CancelTask<TimeoutTask>>((tiemoutID) => {
    clearTimeout(tiemoutID);
  }, []);

  return useTask({
    // infinity timeout issue: https://github.com/denysdovhan/wtfjs/issues/61
    skip: delay === Infinity,
    callback,
    createTask,
    cancelTask,
    opts,
  });
}

type IntervalTask = ReturnType<typeof setInterval>;

export function useInterval(
  delay: number,
  callback: VoidFunction,
  opts?: Options,
): TaskAPI<IntervalTask> {
  const createTask = useCallback<CreateTask<IntervalTask>>(
    (done) => {
      return setInterval(done, delay);
    },
    [delay],
  );

  const cancelTask = useCallback<CancelTask<IntervalTask>>((intervalID) => {
    clearInterval(intervalID);
  }, []);

  return useTask({
    // infinity timeout issue: https://github.com/denysdovhan/wtfjs/issues/61
    skip: delay === Infinity,
    callback,
    createTask,
    cancelTask,
    opts,
  });
}
