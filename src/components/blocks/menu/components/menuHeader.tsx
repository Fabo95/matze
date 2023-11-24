import { Row } from 'components/core/row';
import { UnstyledButton } from 'components/core/unstyledButton';
import { HamburgerIcon } from 'components/icons/hamburgerIcon';
import { Text } from 'components/core/text';
import { LogOutIcon } from 'components/icons/logOutIcon';
import { LogOut } from 'components/core/logOut';

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
