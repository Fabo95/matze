import { LogOut } from '@Interval/components/core/logOut';
import { Row } from '@Interval/components/core/row';
import { Text } from '@Interval/components/core/text';
import { UnstyledButton } from '@Interval/components/core/unstyledButton';
import { HamburgerIcon } from '@Interval/components/icons/hamburgerIcon';
import { LogOutIcon } from '@Interval/components/icons/logOutIcon';

export const MenuHeader = ({
  headline,
  toggleMenu,
}: {
  headline: string;
  toggleMenu: () => void;
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
