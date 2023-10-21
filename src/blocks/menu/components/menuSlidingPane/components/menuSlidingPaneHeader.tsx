import { Row } from 'core/row';
import { Text } from 'core/text';

export const MenuSlidingPaneHeader = ({ headline }: { headline: string }) => (
  <Row className="menu-sliding-pane-header">
    <Row className="menu-sliding-pane-header-time-icon">
      <Text>0:30</Text>
    </Row>
    <Text className="menu-sliding-pane-header-time-text">{headline}</Text>
  </Row>
);
