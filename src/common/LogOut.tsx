import { ReactNode, startTransition } from 'react';

import { UnstyledButton } from 'common/unstyledButton';
import { handleLogout } from 'serverAction/serverActions';

type LogOutProps = { children: ReactNode };

export const LogOut = ({ children }: LogOutProps) => (
  <UnstyledButton
    className="unstyled-button-transparent"
    onClick={() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      startTransition(() => handleLogout());
    }}
  >
    {children}
  </UnstyledButton>
);