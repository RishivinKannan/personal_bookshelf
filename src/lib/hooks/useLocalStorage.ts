import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: unknown) {
  const json = window.localStorage.getItem(key);
  const store = json ? JSON.parse(json) : defaultValue;
  const [item, setItem] = useState<T>(store);
  !json && window.localStorage.setItem(key, JSON.stringify([]));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(item));
  }, [item, key]);

  return { item, setItem };
}

export default useLocalStorage;
