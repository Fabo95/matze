'use client';

import { useCallback, useState } from 'react';

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return { setFalse, setTrue, setValue, toggle, value };
};
