import { Row } from 'common/row';
import { Text } from 'common/text';

export const MenuSlidingPaneHeader = ({ headline }: { headline: string }) => (
  <Row className="align-items-center linear-gradient-to-top-left-from-redPrimary-via-redSecondary-to-redTertiary padding-1 padding-top-3">
    <Row className="align-items-center justify-content-center border-radius-full margin-right-0-5 height-48 width-48 border-white-1 border-white-opacity-50">
      <Text className="text-size-0-875">0:30</Text>
    </Row>
    <Text className="text-size-1-25 text-center font-semibold">{headline}</Text>
  </Row>
);
