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
        className={`margin-right-0-5 ${
          isSelected ? 'stroke-red-primary__SCSS' : 'stroke-black-50'
        }`}
      />
    ),
    [Page.HISTORY]: (
      <CalendarIcon
        className={`margin-right-0-5 ${
          isSelected ? 'stroke-red-primary__SCSS' : 'stroke-black-50'
        }`}
      />
    ),
    [Page.HOME]: (
      <ClockIcon
        className={`margin-right-0-5 ${
          isSelected ? 'stroke-red-primary__SCSS' : 'stroke-black-50'
        }`}
      />
    ),
    [Page.STATISTICS]: (
      <ChartIcon
        className={`margin-right-0-5 ${
          isSelected ? 'stroke-red-primary__SCSS' : 'stroke-black-50'
        }`}
      />
    ),
  };

  // --- RENDER ---

  return (
    <Link href={`/${currentLocale}/${menuOption.page}`}>
      <Row
        className={`align-items-center padding-1 margin-bottom-0-5 ${
          isSelected && 'gradient-to-right-from-redOpacity33-to-redOpacity-5'
        }`}
        onClick={onClick}
      >
        {MENU_OPTION_TO_ICON_MAP[menuOption.page]}
        <Text
          className={`text-color-black-dark font-medium ${
            isSelected && 'text-color-red-primary'
          }`}
        >
          {menuOption.translation}
        </Text>
      </Row>
    </Link>
  );
};
