'use server';

import { cookies } from 'next/headers';

export const deleteCookie = async (cookieName: string) => {
  await cookies().delete(cookieName);
};

export const setCookie = async ({
  httpOnly,
  cookieName,
  value,
}: {
  httpOnly: boolean;
  cookieName: string;
  value: string;
}) => {
  const authCookie = await cookies().set({
    httpOnly,
    name: cookieName,
    value,
  });

  return authCookie;
};
