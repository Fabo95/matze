import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  const [data, setData] = useState<any>('');

  const params = useParams();

  useEffect(() => {
    const test = async () => {
      const test1 = await fetch('http://localhost:8080/intervals', {
        // If the requests come from another origin we need this to set the cookies correctly.
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      setData(test1);
    };

    test();
  }, []);

  console.log('RESULT', data);

  // --- CALLBACKS ---

  const handleMenuOptionChange = (page: Page) => {
    setCurrentPage(page);
  };

  // --- RENDER ---

  return (
    <Box
      className={`absolute bottom-0 left-0 right-0 top-0 w-8/12 overflow-hidden rounded-r-lg bg-white-full text-white-full duration-300 ${
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
