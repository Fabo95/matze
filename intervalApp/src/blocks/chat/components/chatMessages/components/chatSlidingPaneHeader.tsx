import { Row } from "@Interval/components/core/row";
import { UnstyledButton } from "@Interval/components/core/unstyledButton";
import { Chevron } from "@Interval/components/icons/chevron";
import { Text } from "@Interval/components/core/text";
import { User } from "@Interval/api/utils/apiTypes";

type ChatSlidingPaneHeaderProps = { friend: User; handleCloseChat: () => void };

export const ChatSlidingPaneHeader = ({ friend, handleCloseChat }: ChatSlidingPaneHeaderProps) => {
    return (
        <Row className="chat-messages-nav-bar-top">
            <UnstyledButton className="chat-messages-nav-bar-top-chevron" onClick={handleCloseChat}>
                <Chevron direction="left" />
            </UnstyledButton>

            <Text>{friend?.nickname || friend.email}</Text>
        </Row>
    );
};
