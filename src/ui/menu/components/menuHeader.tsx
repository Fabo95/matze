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
  <Row className="align-items-center justify-content-space-between">
    <UnstyledButton className="background-transparent" onClick={toggleMenu}>
      <HamburgerIcon />
    </UnstyledButton>

    <Text className="text-xl font-semibold">{headline}</Text>

    <Box>Google Login</Box>
  </Row>
);
