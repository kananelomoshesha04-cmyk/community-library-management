import { useEffect, useState } from "react";

// This custom hook reads data from Local Storage and saves every change.
export default function useLocalStorage(storageKey, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(storageKey);

      return savedValue === null ? initialValue : JSON.parse(savedValue);
    } catch (error) {
      console.error("Could not read Local Storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error("Could not save to Local Storage:", error);
    }
  }, [storageKey, value]);

  return [value, setValue];
}
