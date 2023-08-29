import React, { ReactElement, ReactNode } from 'react';

import { Row } from 'common/row';
import { Text } from 'common/text';

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
    <Row className="modal-header">
      {inlineStart}
      <Text className="modal-header-intro">{inlineEnd}</Text>
    </Row>
    <Text className="modal-header-intensity">{blockEnd}</Text>
  </>
);
