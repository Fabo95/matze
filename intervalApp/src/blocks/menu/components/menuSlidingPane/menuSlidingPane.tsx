import { ReactNode, useCallback, useMemo, useState } from 'react';

import { MenuSlidingPaneHeader } from '@Interval/blocks/menu/components/menuSlidingPane/components/menuSlidingPaneHeader';
import { MenuSlidingPaneOption } from '@Interval/blocks/menu/components/menuSlidingPane/components/menuSlidingPaneOption';
import { Box } from '@Interval/components/core/box';
import { CalendarIcon } from '@Interval/components/icons/calendarIcon';
import { ChartIcon } from '@Interval/components/icons/chartIcon';
import { ClockIcon } from '@Interval/components/icons/clockIcon';
import { SettingsIcon } from '@Interval/components/icons/settingsIcon';
import { LoggedInPage, Page } from '@Interval/utils/types';

export const MenuSlidingPane = ({
  headline,
  isOpen,
}: {
  headline: string;
  isOpen: boolean;
}) => {
  // --- STATE ---

  const [currentPage, setCurrentPage] = useState(Page.HOME);

  // --- MEMOIZED DATA ---

  const pages: LoggedInPage[] = useMemo(
    () => [Page.CHAT, Page.HOME, Page.SETTINGS, Page.HISTORY, Page.STATISTICS],
    [],
  );

  const MENU_OPTION_TO_ICON_MAP: Record<LoggedInPage, ReactNode> = useMemo(
    () => ({
      [Page.CHAT]: <SettingsIcon />,
      [Page.HISTORY]: <CalendarIcon />,
      [Page.HOME]: <ClockIcon />,
      [Page.SETTINGS]: <SettingsIcon />,
      [Page.STATISTICS]: <ChartIcon />,
    }),
    [],
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
