import { Row } from 'core/row';
import { UnstyledButton } from 'core/unstyledButton';
import { HamburgerIcon } from 'icons/hamburgerIcon';
import { Text } from 'core/text';
import { LogOutIcon } from 'icons/logOutIcon';
import { LogOut } from 'core/LogOut';

export const MenuHeader = ({
  toggleMenu,
  headline,
}: {
  toggleMenu: () => void;
  headline: string;
}) => (
  <Row className="menu-header">
    <UnstyledButton onClick={toggleMenu}>
      <HamburgerIcon />
    </UnstyledButton>

    <Text className="menu-header-headline">{headline}</Text>

    <LogOut>
      <LogOutIcon />
    </LogOut>
  </Row>
);
