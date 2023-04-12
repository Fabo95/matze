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
  <Row className="justify-between">
    <UnstyledButton onClick={toggleMenu}>
      <HamburgerIcon />
    </UnstyledButton>

    <Text className="font-semibold">{headline}</Text>

    <Box>Google Login</Box>
  </Row>
);
