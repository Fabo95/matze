import { Box } from 'base/box';
import { Row } from 'base/row';
import { Text } from 'base/text';
import { ClockIcon } from 'icons/clockIcon';

export const MenuSlidingPane = ({
  isOpen,
  headline,
}: {
  isOpen: boolean;
  headline: string;
}) => (
  <Box
    className={`absolute bottom-0 left-0 right-0 top-0 w-8/12 overflow-hidden rounded-r-lg bg-white-full text-white-full opacity-0 duration-300 ${
      isOpen ? 'opacity-100' : 'translate-x-full-left'
    }`}
  >
    <Row className="items-center bg-gradient-to-tl from-red-from via-red-via to-red-to p-4 pt-8">
      <Row className="mr-2 h-12 w-12 items-center justify-center rounded-full border border-white-half">
        <Text className="text-sm">0:30</Text>
      </Row>
      <Text className="text-center text-xl font-semibold"> {headline}</Text>
    </Row>
    <Box className="p-4 pb-8 pt-8">
      {['Timer', 'History', 'Settings'].map((e) => (
        <Row className="mb-6 items-center" key={e}>
          <ClockIcon className="mr-1.5 stroke-black-900" />
          <Text className="text-black-900">{e}</Text>
        </Row>
      ))}
    </Box>
  </Box>
);
