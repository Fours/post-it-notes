import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  function setValue(value: T) {
    setState(value)
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage quota exceeded or sandboxed — state still updates
    }
  }

  return [state, setValue]
}
