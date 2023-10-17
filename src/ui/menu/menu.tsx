'use client';

import { useBoolean } from 'utils/hooks';
import { BackgroundBlur } from 'core/backgroundBlur';
import { MenuSlidingPane } from 'ui/menu/components/menuSlidingPane/menuSlidingPane';
import { MenuHeader } from 'ui/menu/components/menuHeader';
import { Box } from 'core/box';

export const Menu = ({ headline }: { headline: string }) => {
  // --- STATE ---

  const {
    toggle: toggleMenu,
    value: isOpen,
    setFalse: closeMenu,
  } = useBoolean(false);

  // --- RENDER ---

  return (
    <Box className="menu">
      <MenuHeader headline={headline} toggleMenu={toggleMenu} />

      <BackgroundBlur handleUnblur={closeMenu} isBlurred={isOpen} />

      <MenuSlidingPane headline={headline} isOpen={isOpen} />
    </Box>
  );
};
