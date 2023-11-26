import { useCallback, useEffect, useRef, useState } from 'react';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams as useParamsNext } from 'next/navigation';
import { Observable, Subject } from 'rxjs';

import { getTFunction } from '@Interval/i18n/tFunction';
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
  errorHandler,
  initialState,
  source$,
}: {
  errorHandler?: (error: any) => void;
  initialState: T;
  source$: Observable<T>;
}) => {
  // --- STATE ---

  const [state, setState] = useState(initialState);

  // --- EFFECTS ---

  useObservableSubscription({
    errorHandler,
    source$,
    nextHandler: setState,
  });

  // --- RETURN ---

  return state;
};

export const useObservableSubscription = <T>({
  errorHandler,
  nextHandler,
  source$,
}: {
  errorHandler?: (error: any) => void;
  nextHandler: (value: T) => void;
  source$: Observable<T>;
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
