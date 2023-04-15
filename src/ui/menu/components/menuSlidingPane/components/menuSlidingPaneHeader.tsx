import { Row } from 'base/row';
import { Text } from 'base/text';

export const MenuSlidingPaneHeader = ({ headline }: { headline: string }) => (
  <Row className="items-center bg-gradient-to-tl from-red-primary via-red-secondary to-red-tertiary p-4 pt-8">
    <Row className="mr-2 h-12 w-12 items-center justify-center rounded-full border border-white-half">
      <Text className="text-sm">0:30</Text>
    </Row>
    <Text className="text-center text-xl font-semibold"> {headline}</Text>
  </Row>
);
