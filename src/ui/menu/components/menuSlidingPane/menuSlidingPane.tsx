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
    <Box
      className={`position-absolute-0 z-index-20 width-two-third border-radius-top-left-top-right-0-5 background-white-dark text-color-white-dark transition-duration-300 overflow-hidden ${
        !isOpen && 'translate-x-full-left'
      }`}
    >
      <MenuSlidingPaneHeader headline={headline} />

      <Box className="padding-top-bottom-2">
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
