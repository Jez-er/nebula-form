import { watch as vueWatch, WatchStopHandle } from 'vue'

export function createWatch<T extends object>(values: T) {
  const watchers = new Map<keyof T | string, WatchStopHandle>()

  function watch<K extends keyof T>(
    name: K | '*',
    callback: (
      value: K extends '*' ? T : T[K],
      oldValue: K extends '*' ? T : T[K]
    ) => void,
    options?: { deep?: boolean; immediate?: boolean }
  ): () => void {
    if (watchers.has(name)) {
      watchers.get(name)!()
      watchers.delete(name)
    }

    let unwatch: WatchStopHandle

    if (name === '*') {
      unwatch = vueWatch(
        () => JSON.parse(JSON.stringify(values)),
        (newVal, oldVal) => {
          callback(newVal as any, oldVal as any)
        },
        {
          deep: options?.deep !== false,
          immediate: options?.immediate || false,
        }
      )
    } else {
      unwatch = vueWatch(
        () => (values as any)[name],
        (newVal, oldVal) => {
          callback(newVal as any, oldVal as any)
        },
        {
          deep: options?.deep || false,
          immediate: options?.immediate || false,
        }
      )
    }

    watchers.set(name, unwatch)
    return () => {
      if (watchers.has(name)) {
        watchers.get(name)!()
        watchers.delete(name)
      }
    }
  }

  return {
    watch
  }
}