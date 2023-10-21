import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { Box } from 'core/box';
import { MenuSlidingPaneOption } from 'blocks/menu/components/menuSlidingPane/components/menuSlidingPaneOption';
import { Locale, Page } from 'utils/types';
import { MenuSlidingPaneHeader } from 'blocks/menu/components/menuSlidingPane/components/menuSlidingPaneHeader';
import { getTFunction } from 'i18n/tFunction';

export const MenuSlidingPane = ({
  isOpen,
  headline,
}: {
  isOpen: boolean;
  headline: string;
}) => {
  const params = useParams<{ lang: Locale }>();
  const t = getTFunction(params.lang);

  // --- STATE ---

  const [currentPage, setCurrentPage] = useState(Page.HOME);

  // --- MEMOIZED DATA ---

  const menuOptions: {
    page: Exclude<Page, Page.LOGIN | Page.REGISTER>;
    translation: string;
  }[] = useMemo(
    () => [
      { page: Page.CHAT, translation: t('pages.chat.menuOption') },
      { page: Page.HOME, translation: t('pages.home.menuOption') },
      { page: Page.SETTINGS, translation: t('pages.settings.menuOption') },
      { page: Page.HISTORY, translation: t('pages.history.menuOption') },
      { page: Page.STATISTICS, translation: t('pages.statistics.menuOption') },
    ],
    [t]
  );

  // --- CALLBACKS ---

  const handleMenuOptionChange = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  // --- RENDER ---

  return (
    <Box className={`menu-sliding-pane  ${isOpen && 'menu-sliding-pane-open'}`}>
      <MenuSlidingPaneHeader headline={headline} />

      <Box className="menu-sliding-pane-options">
        {menuOptions.map((menuOption) => (
          <MenuSlidingPaneOption
            currentLocale={params.lang}
            isSelected={menuOption.page === currentPage}
            key={menuOption.page}
            menuOption={menuOption}
            onClick={() => handleMenuOptionChange(menuOption.page)}
          />
        ))}
      </Box>
    </Box>
  );
};
