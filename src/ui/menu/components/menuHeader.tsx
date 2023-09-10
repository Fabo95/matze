import { Row } from 'common/row';
import { UnstyledButton } from 'common/unstyledButton';
import { HamburgerIcon } from 'icons/hamburgerIcon';
import { Text } from 'common/text';
import { LogOutIcon } from 'icons/logOutIcon';
import { LogOut } from 'common/LogOut';

export const MenuHeader = ({
  toggleMenu,
  headline,
}: {
  toggleMenu: () => void;
  headline: string;
}) => (
  <Row className="menu-header">
    <UnstyledButton
      className="unstyled-button-transparent"
      onClick={toggleMenu}
    >
      <HamburgerIcon />
    </UnstyledButton>

    <Text className="menu-header-headline">{headline}</Text>

    <LogOut>
      <LogOutIcon />
    </LogOut>
  </Row>
);
