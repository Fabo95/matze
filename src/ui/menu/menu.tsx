'use client';

import { useBoolean } from 'utils/hooks';
import { MenuBackgroundBlur } from 'ui/menu/components/menuBackgroundBlur';
import { MenuSlidingPane } from 'ui/menu/components/menuSlidingPane';
import { MenuHeader } from 'ui/menu/components/menuHeader';

export const Menu = ({ headline }: { headline: string }) => {
  const {
    toggle: toggleMenu,
    value: isOpen,
    setFalse: closeMenu,
  } = useBoolean(false);

  // --- CALLBACKS ---

  return (
    <>
      <MenuHeader headline={headline} toggleMenu={toggleMenu} />

      <MenuBackgroundBlur handleUnblur={closeMenu} isBlurred={isOpen} />

      <MenuSlidingPane headline={headline} isOpen={isOpen} />
    </>
  );
};
