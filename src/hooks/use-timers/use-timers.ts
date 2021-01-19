import { useEffect, useRef } from 'react';

type Options = {
  autostart?: boolean;
};

type Task = number | null | NodeJS.Timeout;

type ReturnAPI = {
  clear: () => void;
  restart: () => void;
  start: () => void;
  task: Task;
};

type Props = {
  callback: () => void;
  delay: number;
  createTask: typeof setInterval | typeof setTimeout;
  cancelTask: typeof clearInterval | typeof clearTimeout;
  opts: Options;
};

const useTask = ({ callback, delay, createTask, cancelTask, opts }: Props): ReturnAPI => {
  const callbackRef = useRef(callback);
  const clearRef = useRef(() => {});
  const restartRef = useRef(() => {});
  const startRef = useRef(() => {});

  callbackRef.current = callback;
  const task = useRef<Task>(null);

  useEffect(() => {
    if (delay === Infinity) {
      // infinity timeout issue: https://github.com/denysdovhan/wtfjs/issues/61
      return undefined;
    }

    clearRef.current = (): void => {
      if (typeof task.current === 'number') {
        cancelTask(task.current);
      }
    };

    startRef.current = (): void => {
      if (task.current) {
        clearRef.current();
      }

      task.current = createTask(() => {
        callbackRef.current();
      }, delay);
    };

    restartRef.current = (): void => {
      clearRef.current();
      startRef.current();
    };

    if (opts.autostart) {
      startRef.current();
    }

    return clearRef.current;
  }, [cancelTask, delay, createTask, opts.autostart]);

  return {
    clear: (): void => {
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
};

export const useTimeout = (
  delay: number,
  callback: () => void,
  opts: Options = { autostart: true },
): ReturnType<typeof useTask> => {
  return useTask({
    delay,
    callback,
    createTask: setTimeout,
    cancelTask: clearTimeout,
    opts,
  });
};

export const useInterval = (
  delay: number,
  callback: () => void,
  opts: Options = { autostart: true },
): ReturnType<typeof useTask> => {
  return useTask({
    delay,
    callback,
    createTask: setInterval,
    cancelTask: clearInterval,
    opts,
  });
};
