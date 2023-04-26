import Link from 'next/link';

import { Row } from 'base/row';
import { ClockIcon } from 'icons/clockIcon';
import { Text } from 'base/text';
import { SettingsIcon } from 'icons/settingsIcon';
import { CalendarIcon } from 'icons/calendarIcon';
import { Page } from 'utils/types';
import { ChartIcon } from 'icons/chartIcon';

export const MenuSlidingPaneOption = ({
  currentLocale,
  menuOption,
  onClick,
  isSelected,
}: {
  currentLocale: string;
  menuOption: { translation: string; page: Page };
  onClick: () => void;
  isSelected: boolean;
}) => {
  // --- HELPERS ---

  const MENU_OPTION_TO_ICON_MAP = {
    [Page.SETTINGS]: (
      <SettingsIcon
        className={`mr-1.5 ${
          isSelected ? 'stroke-red-primary' : 'stroke-black-200'
        }`}
      />
    ),
    [Page.HISTORY]: (
      <CalendarIcon
        className={`mr-1.5 ${
          isSelected ? 'stroke-red-primary' : 'stroke-black-200'
        }`}
      />
    ),
    [Page.HOME]: (
      <ClockIcon
        className={`mr-1.5 ${
          isSelected ? 'stroke-red-primary' : 'stroke-black-200'
        }`}
      />
    ),
    [Page.STATISTICS]: (
      <ChartIcon
        className={`mr-1.5 ${
          isSelected ? 'stroke-red-primary' : 'stroke-black-200'
        }`}
      />
    ),
  };

  // --- RENDER ---

  return (
    <Link href={`/${currentLocale}/${menuOption.page}`}>
      <Row
        className={`mb-2 items-center p-4 ${
          isSelected && 'bg-gradient-to-r from-red-op-33 to-red-op-5'
        }`}
        onClick={onClick}
      >
        {MENU_OPTION_TO_ICON_MAP[menuOption.page]}
        <Text
          className={`text-black-dark font-medium ${
            isSelected && 'text-red-primary'
          }`}
        >
          {menuOption.translation}
        </Text>
      </Row>
    </Link>
  );
};
