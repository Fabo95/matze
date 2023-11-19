import { ReactNode, startTransition } from 'react';

import { UnstyledButton } from 'core/unstyledButton';
import { handleLogout } from 'serverAction/serverActions';

type LogOutProps = { children: ReactNode };

export const LogOut = ({ children }: LogOutProps) => (
  <UnstyledButton
    onClick={() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      startTransition(() => handleLogout());
    }}
  >
    {children}
  </UnstyledButton>
);