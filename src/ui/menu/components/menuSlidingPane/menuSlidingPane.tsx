import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Box } from 'common/box';
import { MenuSlidingPaneOption } from 'ui/menu/components/menuSlidingPane/components/menuSlidingPaneOption';
import { Page } from 'utils/types';
import { MenuSlidingPaneHeader } from 'ui/menu/components/menuSlidingPane/components/menuSlidingPaneHeader';

export const MenuSlidingPane = ({
  isOpen,
  headline,
  menuOptions,
}: {
  isOpen: boolean;
  headline: string;
  menuOptions: { translation: string; page: Page }[];
}) => {
  // --- STATE ---

  const [currentPage, setCurrentPage] = useState(Page.HOME);

  const params = useParams();

  // --- CALLBACKS ---

  const handleMenuOptionChange = (page: Page) => {
    setCurrentPage(page);
  };

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
