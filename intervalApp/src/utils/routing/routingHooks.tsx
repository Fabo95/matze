"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import {
    ReadonlyURLSearchParams,
    useParams as useParamsNext,
    usePathname as usePathnameNext,
    useSearchParams as useSearchParamsNext,
} from "next/dist/client/components/navigation";
import { useRouter as useRouterNext } from "next/navigation";

export const useParams = <T extends Params = Params>(): T => useParamsNext();

export const useSearchParams = (): ReadonlyURLSearchParams => useSearchParamsNext();

export const useRouter = () => useRouterNext();

export const usePathname = (): string => usePathnameNext();
