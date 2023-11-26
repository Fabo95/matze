'use client';

import { MenuHeader } from '@Interval/components/blocks/menu/components/menuHeader';
import { MenuSlidingPane } from '@Interval/components/blocks/menu/components/menuSlidingPane/menuSlidingPane';
import { BackgroundBlur } from '@Interval/components/core/backgroundBlur';
import { Box } from '@Interval/components/core/box';
import { useBoolean } from '@Interval/utils/hooks';

export const MenuBlock = ({ headline }: { headline: string }) => {
  // --- STATE ---

  const {
    setFalse: closeMenu,
    toggle: toggleMenu,
    value: isOpen,
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
