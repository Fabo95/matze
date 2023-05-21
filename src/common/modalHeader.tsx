import { Row } from 'common/row';
import { Text } from 'common/text';
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
    <Row className="justify-content-center margin-bottom-2">
      {inlineStart}
      <Text className="text-size-1-875 text-color-white-dark font-semibold">
        {inlineEnd}
      </Text>
    </Row>
    <Text className="margin-bottom-3-5 text-size-3-75 text-color-white-dark text-center font-bold">
      {blockEnd}
    </Text>
  </>
);
