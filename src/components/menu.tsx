'use client';

import { useBoolean } from 'utils/hooks';
import { Box } from 'components/box';
import { HamburgerIcon } from 'icons/hamburgerIcon';
import { UnstyledButton } from 'components/unstyledButton';
import { Row } from 'components/row';
import { Heading } from 'components/heading';

export const Menu = ({ headline }: { headline: string }) => {
  const { toggle, value } = useBoolean(false);

  return (
    <Box>
      <Row classNames="justify-between">
        <UnstyledButton onClick={toggle}>
          <HamburgerIcon />
        </UnstyledButton>

        <Heading>{headline}</Heading>

        <Box>Google Login</Box>
      </Row>

      <Box classNames=" w-8/12 0 rounded-r-lg min-h-screen">
        <Row classNames="bg-white"></Row>

        <Row classNames="bg-white"></Row>
      </Box>
    </Box>
  );
};
