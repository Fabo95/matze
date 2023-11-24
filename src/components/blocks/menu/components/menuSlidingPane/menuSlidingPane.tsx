import { ReactNode, useCallback, useMemo, useState } from 'react';

import { Box } from 'components/core/box';
import { MenuSlidingPaneOption } from 'components/blocks/menu/components/menuSlidingPane/components/menuSlidingPaneOption';
import { LoggedInPage, Page } from 'utils/types';
import { MenuSlidingPaneHeader } from 'components/blocks/menu/components/menuSlidingPane/components/menuSlidingPaneHeader';
import { SettingsIcon } from 'components/icons/settingsIcon';
import { CalendarIcon } from 'components/icons/calendarIcon';
import { ClockIcon } from 'components/icons/clockIcon';
import { ChartIcon } from 'components/icons/chartIcon';

export const MenuSlidingPane = ({
  isOpen,
  headline,
}: {
  isOpen: boolean;
  headline: string;
}) => {
  // --- STATE ---

  const [currentPage, setCurrentPage] = useState(Page.HOME);

  // --- MEMOIZED DATA ---

  const pages: LoggedInPage[] = useMemo(
    () => [Page.CHAT, Page.HOME, Page.SETTINGS, Page.HISTORY, Page.STATISTICS],
    []
  );

  const MENU_OPTION_TO_ICON_MAP: Record<LoggedInPage, ReactNode> = useMemo(
    () => ({
      [Page.CHAT]: <SettingsIcon />,
      [Page.SETTINGS]: <SettingsIcon />,
      [Page.HISTORY]: <CalendarIcon />,
      [Page.HOME]: <ClockIcon />,
      [Page.STATISTICS]: <ChartIcon />,
    }),
    []
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
        {pages.map((page) => (
          <MenuSlidingPaneOption
            icon={MENU_OPTION_TO_ICON_MAP[page]}
            isSelected={page === currentPage}
            key={page}
            page={page}
            onClick={() => handleMenuOptionChange(page)}
          />
        ))}
      </Box>
    </Box>
  );
};
