import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export function useLocalStorage(
  key: string,
  def: string
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ?? def;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
