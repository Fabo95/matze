import { Row } from 'base/row';
import { UnstyledButton } from 'base/unstyledButton';
import { HamburgerIcon } from 'icons/hamburgerIcon';
import { Box } from 'base/box';
import { Text } from 'base/text';

export const MenuHeader = ({
  toggleMenu,
  headline,
}: {
  toggleMenu: () => void;
  headline: string;
}) => (
  <Row className="items-center justify-between">
    <UnstyledButton onClick={toggleMenu}>
      <HamburgerIcon className="stroke-white-full" />
    </UnstyledButton>

    <Text className="text-xl font-semibold">{headline}</Text>

    <Box>Google Login</Box>
  </Row>
);
