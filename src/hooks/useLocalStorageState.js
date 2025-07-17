import { useEffect, useState } from 'react';

function useLocalStorageState(initialState , key) {
  const [value, setValue] = useState(function () {
    const storageValues = localStorage.getItem(key);
    return JSON.parse(storageValues) || initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );

  return [value, setValue];
}

export default useLocalStorageState;
