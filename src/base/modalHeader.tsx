import { Row } from 'base/row';
import { Text } from 'base/text';
import React, { ReactElement, ReactNode } from 'react';

type ModalHeaderProps = {
  inlineStart: ReactElement;
  blockEnd: ReactNode;
  inlineEnd: ReactNode;
};

export const ModalHeader = ({
  inlineStart,
  blockEnd,
  inlineEnd,
}: ModalHeaderProps) => (
  <>
    <Row className="mb-8 justify-center">
      {inlineStart}
      <Text className="text-3xl font-semibold">{inlineEnd}</Text>
    </Row>
    <Text className="mb-14 text-center text-6xl font-bold text-white-full">
      {blockEnd}
    </Text>
  </>
);
