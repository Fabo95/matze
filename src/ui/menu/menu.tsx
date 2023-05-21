'use client';

import { useBoolean } from 'utils/hooks';
import { BackgroundBlur } from 'common/backgroundBlur';
import { MenuSlidingPane } from 'ui/menu/components/menuSlidingPane/menuSlidingPane';
import { MenuHeader } from 'ui/menu/components/menuHeader';
import { Page } from 'utils/types';
import { Box } from 'common/box';

export const Menu = ({
  headline,
  menuOptions,
}: {
  headline: string;
  menuOptions: { translation: string; page: Page }[];
}) => {
  // --- STATE ---

  const {
    toggle: toggleMenu,
    value: isOpen,
    setFalse: closeMenu,
  } = useBoolean(false);

  // --- RENDER ---

  return (
    <Box className="padding-1">
      <MenuHeader headline={headline} toggleMenu={toggleMenu} />

      <BackgroundBlur handleUnblur={closeMenu} isBlurred={isOpen} />

      <MenuSlidingPane
        headline={headline}
        isOpen={isOpen}
        menuOptions={menuOptions}
      />
    </Box>
  );
};
