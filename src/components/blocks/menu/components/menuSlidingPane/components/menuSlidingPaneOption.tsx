import { Row } from 'components/core/row';
import { Text } from 'components/core/text';
import { LoggedInPage } from 'utils/types';
import { ReactNode } from 'react';
import { useClientTranslation, useParams } from 'utils/hooks';
import { Link } from 'components/core/link';

export const MenuSlidingPaneOption = ({
  page,
  onClick,
  isSelected,
  icon,
}: {
  page: LoggedInPage;
  onClick: () => void;
  isSelected: boolean;
  icon: ReactNode;
}) => {
  const t = useClientTranslation();
  const params = useParams();

  // --- RENDER ---
  return (
    <Link href={`/${page}`} locale={params.lang}>
      <Row
        className={`menu-sliding-pane-option ${
          isSelected && 'menu-sliding-pane-option-selected '
        }`}
        onClick={onClick}
      >
        {icon}

        <Text
          className={`menu-sliding-pane-option-text ${
            isSelected && 'menu-sliding-pane-option-text-selected'
          }`}
        >
          {t(`pages.${page}.menuOption`)}
        </Text>
      </Row>
    </Link>
  );
};
