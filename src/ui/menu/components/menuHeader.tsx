import { Row } from 'common/row';
import { UnstyledButton } from 'common/unstyledButton';
import { HamburgerIcon } from 'icons/hamburgerIcon';
import { Box } from 'common/box';
import { Text } from 'common/text';

export const MenuHeader = ({
  toggleMenu,
  headline,
}: {
  toggleMenu: () => void;
  headline: string;
}) => (
  <Row className="menu-header">
    <UnstyledButton
      className="menu-header-hamburger-button"
      onClick={toggleMenu}
    >
      <HamburgerIcon />
    </UnstyledButton>

    <Text className="menu-header-headline">{headline}</Text>

    <Box>Google Login</Box>
  </Row>
);
