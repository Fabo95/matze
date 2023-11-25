import { useCallback, useEffect, useRef, useState } from 'react';

import { getTFunction } from '@Interval/i18n/tFunction';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams as useParamsNext } from 'next/navigation';
import { Observable, Subject } from 'rxjs';

import { Locale, TFunction } from '@Interval/utils/types';

export const useClientTranslation = (): TFunction => {
  const params = useParams<{ lang: Locale }>();
  return getTFunction(params.lang);
};

export const useParams = <T extends Params = Params>(): T => useParamsNext();

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return { setFalse, setTrue, setValue, toggle, value };
};

type RefType<T> =
  | null
  | [callback: (value: T) => void, observable$: Observable<T>];

export const useReactiveCallback = <T>() => {
  const reactiveRef = useRef<RefType<T>>(null);

  if (!reactiveRef.current) {
    const subject = new Subject<T>();
    const callback = (value: T) => subject.next(value);
    const observable$ = subject.asObservable();

    reactiveRef.current = [callback, observable$];
  }

  return reactiveRef.current;
};

export const useObservable = <T>({
  source$,
  initialState,
  errorHandler,
}: {
  source$: Observable<T>;
  initialState: T;
  errorHandler?: (error: any) => void;
}) => {
  // --- STATE ---

  const [state, setState] = useState(initialState);

  // --- EFFECTS ---

  useObservableSubscription({
    errorHandler,
    nextHandler: setState,
    source$,
  });

  // --- RETURN ---

  return state;
};

export const useObservableSubscription = <T>({
  source$,
  nextHandler,
  errorHandler,
}: {
  source$: Observable<T>;
  nextHandler: (value: T) => void;
  errorHandler?: (error: any) => void;
}) => {
  // --- EFFECTS ---
  useEffect(() => {
    const subscription = source$.subscribe({
      error: errorHandler,
      next: nextHandler,
    });

    // --- RETURN ---

    return () => subscription.unsubscribe();
  }, [errorHandler, nextHandler, source$]);
};
