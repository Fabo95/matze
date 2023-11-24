'use client';

import { MenuHeader } from 'components/blocks/menu/components/menuHeader';
import { MenuSlidingPane } from 'components/blocks/menu/components/menuSlidingPane/menuSlidingPane';
import { BackgroundBlur } from 'components/core/backgroundBlur';
import { Box } from 'components/core/box';
import { useBoolean } from 'utils/hooks';

export const MenuBlock = ({ headline }: { headline: string }) => {
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
