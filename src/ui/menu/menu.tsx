'use client';

import { useBoolean } from 'utils/hooks';
import { Box } from 'base/box';
import { HamburgerIcon } from 'icons/hamburgerIcon';
import { UnstyledButton } from 'base/unstyledButton';
import { Row } from 'base/row';
import { Heading } from 'base/heading';

export const Menu = ({ headline }: { headline: string }) => {
  const { toggle, value, setFalse } = useBoolean(false);

  return (
    <>
      <Box classNames="min-h-screen" onClick={() => value && setFalse()}>
        <Row classNames="justify-between">
          <UnstyledButton onClick={toggle}>
            <HamburgerIcon />
          </UnstyledButton>

          <Heading>{headline}</Heading>

          <Box>Google Login</Box>
        </Row>
      </Box>
      <Box
        classNames={`transition bg-black-600 w-8/12 rounded-r-lg absolute top-0 left-0 bottom-0 opacity-10 ${
          value ? 'translate-x-[0] opacity-100' : 'translate-x-[-100%]'
        }`}
      >
        <Row classNames="h-40 bg-gradient-to-r from-red-400 to-blue-600">
          ds
        </Row>

        <Row classNames="bg-white"></Row>
      </Box>
    </>
  );
};
