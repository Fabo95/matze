import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Box } from 'base/box';
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
      className={`absolute bottom-0 left-0 right-0 top-0 z-20 w-8/12 overflow-hidden rounded-r-lg bg-white-full text-white-full duration-300 ${
        !isOpen && 'translate-x-full-left'
      }`}
    >
      <MenuSlidingPaneHeader headline={headline} />

      <Box className="pb-8 pt-8">
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
