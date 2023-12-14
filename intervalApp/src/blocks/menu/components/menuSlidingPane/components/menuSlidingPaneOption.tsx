import { ReactNode } from "react";

import { Link } from "@Interval/components/core/link";
import { Row } from "@Interval/components/core/row";
import { Text } from "@Interval/components/core/text";
import { useParams } from "@Interval/utils/routing/routingHooks";
import { LoggedInPage } from "@Interval/utils/types";
import { useClientTranslation } from "@Interval/utils/hooks";

export const MenuSlidingPaneOption = ({
    icon,
    isSelected,
    onClick,
    page,
}: {
    icon: ReactNode;
    isSelected: boolean;
    onClick: () => void;
    page: LoggedInPage;
}) => {
    const t = useClientTranslation();
    const params = useParams();

    // --- RENDER ---
    return (
        <Link href={`/${page}`} locale={params.lang}>
            <Row
                className={`menu-sliding-pane-option ${isSelected && "menu-sliding-pane-option-selected "}`}
                onClick={onClick}
            >
                {icon}

                <Text
                    className={`menu-sliding-pane-option-text ${
                        isSelected && "menu-sliding-pane-option-text-selected"
                    }`}
                >
                    {t(`pages.${page}.menuOption`)}
                </Text>
            </Row>
        </Link>
    );
};
