'use server';

import { cookies } from 'next/headers';

export const deleteCookie = async (cookieName: string) => {
  await cookies().delete(cookieName);
};

export const setCookie = async ({
  cookieName,
  httpOnly,
  value,
}: {
  cookieName: string;
  httpOnly: boolean;
  value: string;
}) => {
  const authCookie = await cookies().set({
    httpOnly,
    value,
    name: cookieName,
  });

  return authCookie;
};
