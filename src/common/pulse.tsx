import { Box } from 'common/box';
import { Span } from 'common/span';

type PulseProps = { isAnimating: boolean };

export const Pulse = ({ isAnimating }: PulseProps) => (
  <Box className={`pulse ${isAnimating ? 'pulse-animation' : ''}`}>
    <Span className="pulse-wave-one" />
    <Span className="pulse-wave-two" />
    <Span className="pulse-wave-three" />
    <Span className="pulse-wave-four" />
  </Box>
);
