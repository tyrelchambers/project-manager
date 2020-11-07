import { useState } from "react";

const useStorage = (key = "", initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = ({ value, temp = false }) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (!temp) {
        window.localStorage.setItem(key, valueToStore);
      } else {
        window.sessionStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useStorage;
